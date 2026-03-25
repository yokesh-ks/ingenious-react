import { createRoute, Link } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { jsProblemMap } from '@/data/js-problems'
import type { JSProblem } from '@/data/js-problems'
import { runTests } from '@/utils/testRunner'
import type { RunResult } from '@/utils/testRunner'
import { CodeEditor } from '@/components/CodeEditor'
import { useState } from 'react'
import { CheckCircle2, XCircle, Loader2, Play, ChevronRight } from 'lucide-react'
import { buildPageMeta, truncate } from '@/lib/seo'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/js-problems/$problemId',
  head: ({ params }) => {
    const problem = jsProblemMap.get(params.problemId)
    if (!problem) {
      return { meta: [{ title: 'Not Found | Ingenious React' }, { name: 'robots', content: 'noindex' }] }
    }
    const difficulty = problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)
    return buildPageMeta({
      title: `${problem.title} – ${difficulty} JS Problem`,
      description: truncate(problem.description.split('\n')[0], 155),
      path: `/js-problems/${problem.id}`,
    })
  },
  component: ProblemPage,
})

const DIFFICULTY_STYLES = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

const CATEGORY_STYLES = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'

function ProblemPage() {
  const { problemId } = Route.useParams()
  const problem = jsProblemMap.get(problemId)

  if (!problem) {
    return (
      <div className="flex flex-1 items-center justify-center p-8 text-center">
        <div>
          <h1 className="text-2xl font-semibold mb-2">Problem not found</h1>
          <Link to="/js-problems" className="text-primary underline">
            Back to JS Problems
          </Link>
        </div>
      </div>
    )
  }

  return <ProblemEditor key={problem.id} problem={problem} />
}

function ProblemEditor({ problem }: { problem: JSProblem }) {
  const [code, setCode] = useState(problem.starterCode)
  const [runResult, setRunResult] = useState<RunResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const handleRun = async () => {
    setIsRunning(true)
    try {
      const result = await runTests(code, problem)
      setRunResult(result)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b bg-background shrink-0">
        <Link
          to="/js-problems"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← JS Problems
        </Link>
        <span className="text-muted-foreground">/</span>
        <h1 className="text-sm font-medium truncate">{problem.title}</h1>
        <span
          className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full capitalize ${DIFFICULTY_STYLES[problem.difficulty]}`}
        >
          {problem.difficulty}
        </span>
      </div>

      {/* 2-pane layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left pane: Problem description */}
        <div className="w-80 shrink-0 border-r overflow-y-auto p-4 space-y-5">
          {/* Title + badges */}
          <div className="space-y-2">
            <h2 className="text-base font-semibold">{problem.title}</h2>
            <div className="flex flex-wrap gap-1.5">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${DIFFICULTY_STYLES[problem.difficulty]}`}
              >
                {problem.difficulty}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_STYLES}`}>
                {problem.category}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {problem.description}
          </p>

          {/* Examples */}
          {problem.examples.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Examples
              </h3>
              {problem.examples.map((ex, i) => (
                <div key={i} className="bg-muted rounded-md p-3 space-y-1 text-xs font-mono">
                  <div>
                    <span className="text-muted-foreground">Input: </span>
                    <span>{ex.input}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Output: </span>
                    <span>{ex.output}</span>
                  </div>
                  {ex.explanation && (
                    <div className="text-muted-foreground italic text-[11px]">{ex.explanation}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Test Cases preview */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Test Cases
            </h3>
            <div className="space-y-1">
              {problem.testCases.slice(0, 3).map((tc, i) => (
                <div key={i} className="text-xs border rounded-md p-2 space-y-0.5">
                  <div className="font-medium text-foreground">{tc.description}</div>
                  <div className="font-mono text-muted-foreground truncate">
                    Expected: {serializePreview(tc.expected)}
                  </div>
                </div>
              ))}
              {problem.testCases.length > 3 && (
                <p className="text-xs text-muted-foreground pl-1">
                  +{problem.testCases.length - 3} more test cases
                </p>
              )}
            </div>
          </div>

          {/* Hints */}
          {problem.hints && problem.hints.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Hints
              </h3>
              {problem.hints.map((hint, i) => (
                <details
                  key={i}
                  className="border rounded-md text-sm group"
                >
                  <summary className="cursor-pointer list-none flex items-center gap-2 px-3 py-2 text-muted-foreground hover:text-foreground transition-colors select-none">
                    <ChevronRight className="w-3 h-3 shrink-0 transition-transform group-open:rotate-90" />
                    Hint {i + 1}
                  </summary>
                  <p className="px-3 pb-3 pt-1 text-xs text-muted-foreground leading-relaxed">
                    {hint}
                  </p>
                </details>
              ))}
            </div>
          )}
        </div>

        {/* Right pane: Editor + Results */}
        <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
          {/* Editor tab bar */}
          <div className="h-8 flex items-center px-3 border-b bg-muted/50 shrink-0">
            <span className="text-xs text-muted-foreground font-mono">solution.js</span>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <CodeEditor value={code} onChange={setCode} />
          </div>

          {/* Results panel */}
          <div className="border-t shrink-0 flex flex-col" style={{ maxHeight: '40%' }}>
            {/* Run button bar */}
            <div className="flex items-center gap-3 px-4 py-2 border-b bg-muted/30 shrink-0">
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isRunning ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
                {isRunning ? 'Running...' : 'Run Tests'}
              </button>

              {runResult && !isRunning && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex items-center gap-1 text-green-600 dark:text-green-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {runResult.passCount} passed
                  </span>
                  {runResult.failCount > 0 && (
                    <span className="flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
                      <XCircle className="w-3.5 h-3.5" />
                      {runResult.failCount} failed
                    </span>
                  )}
                  <span className="text-muted-foreground">{runResult.totalDurationMs}ms</span>
                </div>
              )}
            </div>

            {/* Results content */}
            <TestResultsPanel result={runResult} isRunning={isRunning} />
          </div>
        </div>
      </div>
    </div>
  )
}

function TestResultsPanel({
  result,
  isRunning,
}: {
  result: RunResult | null
  isRunning: boolean
}) {
  if (isRunning) {
    return (
      <div className="flex items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        Running tests...
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center p-6 text-sm text-muted-foreground">
        Click Run Tests to execute your solution
      </div>
    )
  }

  return (
    <div className="overflow-y-auto flex-1">
      {/* Per-test rows */}
      <div className="divide-y">
        {result.results.map((r) => (
          <details key={r.index} className={`group ${r.passed ? '' : 'open'}`}>
            <summary className="flex items-center gap-2.5 px-4 py-2.5 cursor-pointer list-none hover:bg-muted/40 transition-colors select-none">
              {r.passed ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 shrink-0 text-red-500" />
              )}
              <span className="text-xs font-medium">{r.description}</span>
              {r.durationMs > 0 && (
                <span className="ml-auto text-xs text-muted-foreground">{r.durationMs.toFixed(1)}ms</span>
              )}
            </summary>
            {!r.passed && (
              <div className="px-4 pb-3 pt-1 space-y-1 bg-red-50/50 dark:bg-red-950/20">
                <div className="text-xs font-mono space-y-0.5">
                  <div>
                    <span className="text-muted-foreground">Input:    </span>
                    <span className="text-foreground">{r.input}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expected: </span>
                    <span className="text-green-700 dark:text-green-400">{r.expected}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Got:      </span>
                    <span className="text-red-700 dark:text-red-400">
                      {r.error ? `Error: ${r.error}` : r.actual}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </details>
        ))}
      </div>

      {/* Console output */}
      {result.consoleOutput.length > 0 && (
        <div className="border-t">
          <details>
            <summary className="flex items-center gap-2 px-4 py-2 cursor-pointer list-none text-xs text-muted-foreground hover:text-foreground select-none">
              <ChevronRight className="w-3 h-3 transition-transform group-open:rotate-90" />
              Console Output ({result.consoleOutput.length} line{result.consoleOutput.length !== 1 ? 's' : ''})
            </summary>
            <div className="bg-slate-900 text-slate-100 font-mono text-xs p-3 space-y-0.5 max-h-32 overflow-y-auto">
              {result.consoleOutput.map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  )
}

function serializePreview(val: unknown): string {
  if (val instanceof Map) return `Map(${val.size})`
  if (val instanceof Set) return `Set(${val.size})`
  try {
    const s = JSON.stringify(val)
    return s.length > 40 ? s.slice(0, 40) + '…' : s
  } catch {
    return String(val)
  }
}
