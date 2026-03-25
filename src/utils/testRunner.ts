import type { JSProblem, TestCase } from '@/data/js-problems'

export interface TestResult {
  index: number
  description: string
  passed: boolean
  input: string
  expected: string
  actual: string
  error?: string
  durationMs: number
}

export interface RunResult {
  results: TestResult[]
  passCount: number
  failCount: number
  consoleOutput: string[]
  totalDurationMs: number
}

// ─── Deep equality ────────────────────────────────────────────────────────────

function deepEqual(a: unknown, b: unknown, tolerance = 0): boolean {
  if (a === b) return true

  // NaN check / tolerance for floats
  if (typeof a === 'number' && typeof b === 'number') {
    if (isNaN(a) && isNaN(b)) return true
    if (tolerance > 0) return Math.abs(a - b) <= tolerance
    return false
  }

  if (a === null || b === null) return false
  if (typeof a !== typeof b) return false

  // Map
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false
    for (const [key, val] of a) {
      if (!b.has(key) || !deepEqual(val, b.get(key), tolerance)) return false
    }
    return true
  }

  // Set
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) return false
    for (const val of a) {
      if (!b.has(val)) return false
    }
    return true
  }

  // Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false
    return a.every((item, i) => deepEqual(item, (b as unknown[])[i], tolerance))
  }

  if (Array.isArray(a) !== Array.isArray(b)) return false

  // Plain objects
  if (typeof a === 'object' && typeof b === 'object') {
    const aObj = a as Record<string, unknown>
    const bObj = b as Record<string, unknown>
    const keysA = Object.keys(aObj)
    const keysB = Object.keys(bObj)
    if (keysA.length !== keysB.length) return false
    return keysA.every((key) => deepEqual(aObj[key], bObj[key], tolerance))
  }

  return false
}

// ─── Serialise a value for display ───────────────────────────────────────────

function serialize(val: unknown): string {
  if (val instanceof Map) {
    const entries = [...val.entries()].map(([k, v]) => `${serialize(k)} => ${serialize(v)}`)
    return `Map { ${entries.join(', ')} }`
  }
  if (val instanceof Set) {
    return `Set { ${[...val].map(serialize).join(', ')} }`
  }
  if (typeof val === 'function') {
    return `[Function: ${(val as { name?: string }).name ?? 'anonymous'}]`
  }
  try {
    return JSON.stringify(val)
  } catch {
    return String(val)
  }
}

// ─── Console capture ─────────────────────────────────────────────────────────

function captureConsole(): { output: string[]; restore: () => void } {
  const output: string[] = []
  const original = console.log
  console.log = (...args: unknown[]) => {
    output.push(args.map(serialize).join(' '))
  }
  return {
    output,
    restore: () => {
      console.log = original
    },
  }
}

// ─── Timeout wrapper ──────────────────────────────────────────────────────────

const TIMEOUT_MS = 5000

function withTimeout<T>(promise: Promise<T>): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Execution timed out (5s). Check for infinite loops.')), TIMEOUT_MS)
    ),
  ])
}

// ─── Extract user function / class ───────────────────────────────────────────

function extractFn(userCode: string, functionName: string): unknown {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const factory = new Function(`"use strict"; ${userCode}; return ${functionName};`)
  return factory()
}

// ─── Run a single function test case ─────────────────────────────────────────

async function runFunctionCase(
  fn: (...args: unknown[]) => unknown,
  testCase: TestCase,
): Promise<{ actual: unknown; error?: string; durationMs: number }> {
  const start = performance.now()
  try {
    const result = await withTimeout(
      Promise.resolve().then(() => fn(...testCase.input))
    )
    return { actual: result, durationMs: performance.now() - start }
  } catch (e) {
    return {
      actual: undefined,
      error: e instanceof Error ? e.message : String(e),
      durationMs: performance.now() - start,
    }
  }
}

// ─── Run a single class test case ────────────────────────────────────────────
// For class problems, input is an array of [method, args[]] tuples.
// The result of the LAST call is compared to expected.

async function runClassCase(
  Cls: new () => Record<string, (...args: unknown[]) => unknown>,
  testCase: TestCase,
): Promise<{ actual: unknown; error?: string; durationMs: number }> {
  const start = performance.now()
  try {
    const ops = testCase.input as [string, unknown[]][]
    const instance = new Cls()
    let lastResult: unknown
    await withTimeout(
      Promise.resolve().then(() => {
        for (const [method, args] of ops) {
          lastResult = instance[method](...args)
        }
      })
    )
    return { actual: lastResult, durationMs: performance.now() - start }
  } catch (e) {
    return {
      actual: undefined,
      error: e instanceof Error ? e.message : String(e),
      durationMs: performance.now() - start,
    }
  }
}

// ─── Main export ─────────────────────────────────────────────────────────────

export async function runTests(userCode: string, problem: JSProblem): Promise<RunResult> {
  const capture = captureConsole()
  const totalStart = performance.now()
  const results: TestResult[] = []

  try {
    let fn: unknown
    try {
      fn = extractFn(userCode, problem.functionName)
    } catch (e) {
      // Syntax or reference error — fail all test cases with the same error
      const errMsg = e instanceof Error ? e.message : String(e)
      for (let i = 0; i < problem.testCases.length; i++) {
        const tc = problem.testCases[i]
        results.push({
          index: i,
          description: tc.description,
          passed: false,
          input: serialize(tc.input),
          expected: serialize(tc.expected),
          actual: 'N/A',
          error: errMsg,
          durationMs: 0,
        })
      }
      return buildResult(results, capture.output, totalStart)
    }

    const isClass = problem.problemType === 'class'

    for (let i = 0; i < problem.testCases.length; i++) {
      const tc = problem.testCases[i]

      const { actual, error, durationMs } = isClass
        ? await runClassCase(fn as new () => Record<string, (...args: unknown[]) => unknown>, tc)
        : await runFunctionCase(fn as (...args: unknown[]) => unknown, tc)

      const passed = !error && deepEqual(actual, tc.expected, tc.tolerance ?? 0)

      results.push({
        index: i,
        description: tc.description,
        passed,
        input: serialize(tc.input),
        expected: serialize(tc.expected),
        actual: serialize(actual),
        error,
        durationMs,
      })
    }
  } finally {
    capture.restore()
  }

  return buildResult(results, capture.output, totalStart)
}

function buildResult(results: TestResult[], consoleOutput: string[], totalStart: number): RunResult {
  return {
    results,
    passCount: results.filter((r) => r.passed).length,
    failCount: results.filter((r) => !r.passed).length,
    consoleOutput,
    totalDurationMs: Math.round(performance.now() - totalStart),
  }
}
