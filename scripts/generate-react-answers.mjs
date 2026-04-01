/**
 * Generates Q16–Q100 React interview markdown files.
 * Run: node scripts/generate-react-answers.mjs
 */
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "../contents/interview/react");
const B = "```"; // triple backtick helper — avoids escaping in template literals

const questions = [
  // ─────────────────────────────────────────────
  // REACT HOOKS
  // ─────────────────────────────────────────────
  {
    orderNumber: 16,
    title: "What are React _Hooks_ and why were they introduced?",
    group: "React Hooks",
    difficulty: 1,
    content: `React **Hooks** are special functions that let you use React features like state and lifecycle methods inside **functional components** — without writing a class.

They were introduced in **React 16.8** (February 2019).

### Why were they needed?

Before Hooks, if you needed state or lifecycle logic, you had to use a class component:

${B}jsx
// Old way — class component just to use state
class Counter extends React.Component {
  state = { count: 0 };
  render() {
    return <button onClick={() => this.setState({ count: this.state.count + 1 })}>
      {this.state.count}
    </button>;
  }
}
${B}

With Hooks, the same logic is much simpler:

${B}jsx
// New way — functional component with useState Hook
function Counter() {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
${B}

### Problems Hooks solved

| Problem | How Hooks help |
|---|---|
| Reusing stateful logic was hard (needed HOCs/render props) | Custom Hooks let you extract and share logic cleanly |
| Large class components became hard to understand | You can split logic into focused \`useEffect\` calls |
| Classes confused beginners (\`this\`, binding) | Functions are simpler — no \`this\` needed |
| Logic was scattered across lifecycle methods | Related logic lives together in one Hook |

### Common built-in Hooks

- \`useState\` — local state
- \`useEffect\` — side effects (data fetching, subscriptions)
- \`useContext\` — read context values
- \`useReducer\` — complex state logic
- \`useRef\` — DOM references / mutable values
- \`useMemo\` / \`useCallback\` — performance optimization`,
  },
  {
    orderNumber: 17,
    title: "What are the _rules of Hooks_?",
    group: "React Hooks",
    difficulty: 1,
    content: `React enforces **two fundamental rules** for Hooks. Breaking them causes bugs that are hard to debug.

---

### Rule 1: Only call Hooks at the top level

Never call Hooks inside loops, conditions, or nested functions.

${B}jsx
// ❌ WRONG — conditional Hook
function MyComponent({ isLoggedIn }) {
  if (isLoggedIn) {
    const [name, setName] = useState(''); // violates the rule!
  }
}

// ✅ CORRECT — Hook always runs
function MyComponent({ isLoggedIn }) {
  const [name, setName] = useState('');
  if (!isLoggedIn) return null; // condition goes after the Hook
}
${B}

**Why?** React tracks Hooks by their **call order**. If you call them conditionally, the order changes between renders and React can't match state to the right Hook.

---

### Rule 2: Only call Hooks from React functions

Call Hooks from:
- ✅ Functional components
- ✅ Custom Hooks

Never call them from:
- ❌ Regular JavaScript functions
- ❌ Class components
- ❌ Event handlers (unless those handlers call a Hook function)

${B}jsx
// ❌ WRONG — Hook inside a regular function
function fetchData() {
  const [data, setData] = useState(null); // not a React component or custom Hook
}

// ✅ CORRECT — custom Hook (name starts with "use")
function useFetchData(url) {
  const [data, setData] = useState(null);
  useEffect(() => { /* fetch logic */ }, [url]);
  return data;
}
${B}

---

### How to enforce the rules

Install the ESLint plugin — it catches violations automatically:

${B}bash
npm install eslint-plugin-react-hooks
${B}

It's included by default in Create React App and Vite's React templates.`,
  },
  {
    orderNumber: 18,
    title: "How does _useEffect_ work?",
    group: "React Hooks",
    difficulty: 1,
    content: `\`useEffect\` lets you run **side effects** in functional components. Side effects are anything that happens outside of rendering — like fetching data, setting up subscriptions, or updating the document title.

### Basic syntax

${B}jsx
useEffect(() => {
  // your side effect here
  return () => {
    // cleanup (optional)
  };
}, [dependencies]);
${B}

---

### The dependency array controls when the effect runs

| Dependency array | When effect runs |
|---|---|
| Not provided | After **every** render |
| \`[]\` (empty) | Only once — after the **first** render (like componentDidMount) |
| \`[value]\` | After first render + whenever \`value\` changes |

${B}jsx
// Runs after every render
useEffect(() => {
  console.log('rendered');
});

// Runs once on mount
useEffect(() => {
  document.title = 'Hello';
}, []);

// Runs when `userId` changes
useEffect(() => {
  fetchUser(userId);
}, [userId]);
${B}

---

### Cleanup function

Return a function from \`useEffect\` to clean up when the component unmounts or before the effect re-runs:

${B}jsx
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  return () => clearInterval(timer); // cleanup prevents memory leaks
}, []);
${B}

---

### Common use cases

- **Data fetching** — fetch API data when component mounts or a prop changes
- **Subscriptions** — WebSocket, event listeners
- **DOM manipulation** — update page title, scroll position
- **Timers** — intervals, timeouts

---

### Important: avoid infinite loops

${B}jsx
// ❌ WRONG — setCount changes count, which re-runs the effect, loop!
useEffect(() => {
  setCount(count + 1);
}, [count]);

// ✅ CORRECT — use functional update
useEffect(() => {
  setCount(c => c + 1);
}, []); // runs once
${B}`,
  },
  {
    orderNumber: 19,
    title: "What is _useCallback_ and when should you use it?",
    group: "React Hooks",
    difficulty: 2,
    content: `\`useCallback\` returns a **memoized version of a function** — it only creates a new function reference when its dependencies change.

### The problem it solves

In React, every re-render creates new function instances. When you pass a function as a prop to a child component, the child sees a "new" function every time and re-renders unnecessarily.

${B}jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ New function created on every render
  const handleClick = () => console.log('clicked');

  return <ExpensiveChild onClick={handleClick} />;
}
${B}

### Solution with useCallback

${B}jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ✅ Same function reference unless dependencies change
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // empty deps = created once

  return <ExpensiveChild onClick={handleClick} />;
}
${B}

### Syntax

${B}jsx
const memoizedFn = useCallback(fn, [dependencies]);
${B}

---

### When to use useCallback

✅ Use it when:
- Passing a callback to a **child component wrapped in \`React.memo\`**
- The function is a dependency of a \`useEffect\`
- The function is computationally expensive to create (rare)

❌ Don't use it:
- Everywhere by default — it adds overhead
- For inline handlers that don't get passed to children
- When the child isn't memoized (React.memo) — it won't help

---

### With useEffect dependency

${B}jsx
const fetchData = useCallback(() => {
  fetch(\`/api/user/\${userId}\`).then(...);
}, [userId]); // fetchData only changes when userId changes

useEffect(() => {
  fetchData();
}, [fetchData]); // safe to use in deps
${B}

---

### useCallback vs useMemo

| Hook | Returns | Use for |
|---|---|---|
| \`useCallback(fn, deps)\` | A memoized **function** | Stable callback references |
| \`useMemo(() => value, deps)\` | A memoized **value** | Expensive computed values |

\`useCallback(fn, deps)\` is equivalent to \`useMemo(() => fn, deps)\`.`,
  },
  {
    orderNumber: 20,
    title: "What is _useMemo_ and when should you use it?",
    group: "React Hooks",
    difficulty: 2,
    content: `\`useMemo\` caches the **result of a calculation** between renders. It only recalculates when the specified dependencies change.

### Syntax

${B}jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
${B}

The function runs on the first render. On subsequent renders, it returns the cached value **unless \`a\` or \`b\` changed**.

---

### The problem it solves

Without \`useMemo\`, expensive calculations run on **every render**, even when the inputs haven't changed:

${B}jsx
function ProductList({ products, filter }) {
  // ❌ This runs on every render — even when just the theme changes
  const filtered = products.filter(p => p.category === filter);

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
${B}

With \`useMemo\`:

${B}jsx
function ProductList({ products, filter }) {
  // ✅ Only recalculates when products or filter changes
  const filtered = useMemo(
    () => products.filter(p => p.category === filter),
    [products, filter]
  );

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
${B}

---

### Common use cases

1. **Expensive computations** — sorting/filtering large arrays, complex math
2. **Referential equality** — keeping object/array identity stable so child components (or effects) don't re-run

${B}jsx
// Without useMemo, new object is created on every render
// causing useEffect to fire every time
const options = useMemo(() => ({ page: 1, limit: 10 }), []);

useEffect(() => {
  fetchData(options);
}, [options]); // stable reference — runs once
${B}

---

### When NOT to use useMemo

- For cheap calculations — the overhead of \`useMemo\` itself may cost more
- Everywhere by default — profile first, optimize where needed
- As a guarantee — React may discard cached values in the future

---

### Quick comparison

| | \`useMemo\` | \`useCallback\` |
|---|---|---|
| Memoizes | A **value** | A **function** |
| Returns | Result of \`() => value\` | The function itself |`,
  },
  {
    orderNumber: 21,
    title: "What is _useRef_ and what are its use cases?",
    group: "React Hooks",
    difficulty: 1,
    content: `\`useRef\` returns a mutable **ref object** that persists across renders. It has one property: \`.current\`.

${B}jsx
const ref = useRef(initialValue);
// ref.current === initialValue
${B}

The key difference from state: **changing \`ref.current\` does NOT cause a re-render**.

---

### Use case 1: Access a DOM element directly

${B}jsx
function TextInput() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // directly access the DOM node
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}
${B}

---

### Use case 2: Store a mutable value without triggering re-renders

${B}jsx
function Timer() {
  const [count, setCount] = useState(0);
  const intervalRef = useRef(null); // store interval ID

  const start = () => {
    intervalRef.current = setInterval(() => setCount(c => c + 1), 1000);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
  };

  return (
    <>
      <p>{count}</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}
${B}

---

### Use case 3: Track previous values

${B}jsx
function Component({ value }) {
  const prevValue = useRef(value);

  useEffect(() => {
    prevValue.current = value; // update after render
  });

  return <p>Current: {value}, Previous: {prevValue.current}</p>;
}
${B}

---

### useRef vs useState

| | \`useRef\` | \`useState\` |
|---|---|---|
| Triggers re-render? | ❌ No | ✅ Yes |
| Persists across renders? | ✅ Yes | ✅ Yes |
| Use for | DOM refs, mutable values | UI state |`,
  },
  {
    orderNumber: 22,
    title: "What is _useContext_ and how do you use it?",
    group: "React Hooks",
    difficulty: 1,
    content: `\`useContext\` lets you read a **Context** value directly in a functional component, without wrapping it in a Consumer component.

### What is Context?

Context is React's built-in way to share data across components **without passing props through every level** (prop drilling).

---

### Setting up Context (3 steps)

**Step 1: Create the context**
${B}jsx
import { createContext } from 'react';

const ThemeContext = createContext('light'); // 'light' is the default value
${B}

**Step 2: Provide the value**
${B}jsx
function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
${B}

**Step 3: Consume with useContext**
${B}jsx
import { useContext } from 'react';

function Toolbar() {
  const theme = useContext(ThemeContext); // reads 'dark'

  return <div className={theme}>Toolbar</div>;
}
${B}

No matter how deeply nested \`Toolbar\` is, it can read the context directly — no prop drilling needed.

---

### Re-renders

A component re-renders whenever the **context value changes**. For performance, avoid putting frequently-changing values in a single context — split into multiple contexts instead.

---

### Common pattern: custom hook for context

${B}jsx
// Wrap context in a hook for better ergonomics
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}

// Usage
function Button() {
  const theme = useTheme();
  return <button className={theme}>Click</button>;
}
${B}`,
  },
  {
    orderNumber: 23,
    title: "What is _useReducer_ and when would you use it over _useState_?",
    group: "React Hooks",
    difficulty: 2,
    content: `\`useReducer\` is an alternative to \`useState\` for managing **complex state logic**. It follows the same pattern as Redux — state + action → new state.

### Syntax

${B}jsx
const [state, dispatch] = useReducer(reducer, initialState);
${B}

- **reducer** — a function \`(state, action) => newState\`
- **dispatch** — sends actions to the reducer
- **state** — current state value

---

### Example: Counter

${B}jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset':     return initialState;
    default: throw new Error('Unknown action: ' + action.type);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>−</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  );
}
${B}

---

### useReducer vs useState

| Situation | Use |
|---|---|
| Simple value (boolean, number, string) | \`useState\` |
| Multiple sub-values that change together | \`useReducer\` |
| Next state depends on the previous in complex ways | \`useReducer\` |
| You want predictable, testable state transitions | \`useReducer\` |
| Coming from Redux / like the action pattern | \`useReducer\` |

---

### Practical example: Form state

${B}jsx
function formReducer(state, action) {
  return { ...state, [action.field]: action.value };
}

function SignupForm() {
  const [form, dispatch] = useReducer(formReducer, { name: '', email: '', password: '' });

  const handleChange = (e) =>
    dispatch({ field: e.target.name, value: e.target.value });

  return (
    <form>
      <input name="name"     value={form.name}     onChange={handleChange} />
      <input name="email"    value={form.email}    onChange={handleChange} />
      <input name="password" value={form.password} onChange={handleChange} />
    </form>
  );
}
${B}

The reducer is also **easy to unit test** — it's a pure function.`,
  },
  {
    orderNumber: 24,
    title: "How do you create a _custom Hook_ in React?",
    group: "React Hooks",
    difficulty: 2,
    content: `A **custom Hook** is a JavaScript function whose name starts with \`use\` and that calls other Hooks internally. It lets you **extract and reuse stateful logic** across multiple components.

### Why custom Hooks?

Before Hooks, sharing logic between components required HOCs or render props — complex patterns. Custom Hooks are much simpler.

---

### Creating a custom Hook

${B}jsx
// useFetch.js — a reusable data fetching hook
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
${B}

### Using the custom Hook

${B}jsx
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(\`/api/users/\${userId}\`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <h1>{data.name}</h1>;
}

function PostsList() {
  const { data, loading } = useFetch('/api/posts');
  // same hook, different component!
}
${B}

---

### More examples of custom Hooks

${B}jsx
// useLocalStorage — persists state in localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? initialValue;
  });

  const setItem = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setItem];
}

// useToggle — simple boolean toggle
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// useWindowSize — track browser window size
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
${B}

---

### Rules for custom Hooks

1. Name must start with **\`use\`** — this tells React and ESLint it's a Hook
2. Can call other Hooks inside it
3. Each component using the Hook gets **its own isolated state** — state is not shared between components`,
  },
  {
    orderNumber: 25,
    title: "What is _useLayoutEffect_ and how does it differ from _useEffect_?",
    group: "React Hooks",
    difficulty: 3,
    content: `Both \`useLayoutEffect\` and \`useEffect\` run side effects — but at **different points** in React's rendering process.

---

### Timing difference

${B}text
React renders → paints to screen → useEffect runs     (non-blocking, async)
React renders → useLayoutEffect runs → paints to screen (blocking, sync)
${B}

| | \`useEffect\` | \`useLayoutEffect\` |
|---|---|---|
| When it runs | **After** the browser paints | **Before** the browser paints |
| Blocks painting? | No (async) | Yes (sync) |
| Performance | Better (default choice) | Can cause visual delays |
| Use for | Most side effects | DOM measurements, prevent flicker |

---

### When to use useLayoutEffect

Use it when you need to **read the DOM and immediately update it** before the user sees anything — to prevent a visual flicker.

${B}jsx
import { useLayoutEffect, useRef, useState } from 'react';

function Tooltip({ text, targetRef }) {
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    // Read DOM dimensions synchronously, before browser paints
    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    setPosition({
      top: targetRect.top - tooltipRect.height,
      left: targetRect.left,
    });
    // If we used useEffect, tooltip would briefly flash at wrong position
  }, []);

  return (
    <div ref={tooltipRef} style={{ position: 'absolute', ...position }}>
      {text}
    </div>
  );
}
${B}

---

### Rule of thumb

> Always start with \`useEffect\`. Only switch to \`useLayoutEffect\` if you see visual flickering caused by DOM reads/writes.

### SSR warning

\`useLayoutEffect\` causes a warning during **server-side rendering** because there's no DOM on the server. Use \`useEffect\` in SSR contexts, or conditionally use \`useLayoutEffect\` only in the browser.`,
  },
  {
    orderNumber: 26,
    title: "What is _useId_ in React?",
    group: "React Hooks",
    difficulty: 2,
    content: `\`useId\` is a Hook that generates a **stable, unique ID** that is consistent between the server and client. It was introduced in **React 18**.

### The problem it solves

When building accessible forms, labels need to reference input IDs:

${B}jsx
// ❌ Problem: hard-coded IDs break when component is used multiple times
function EmailField() {
  return (
    <>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
    </>
  );
}

// If you render <EmailField /> twice, you get duplicate IDs — invalid HTML!
${B}

### Solution with useId

${B}jsx
import { useId } from 'react';

function EmailField() {
  const id = useId(); // generates ":r0:", ":r1:", etc.

  return (
    <>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </>
  );
}

// Now each instance gets a unique ID — safe to render multiple times
${B}

---

### Why not use Math.random() or a counter?

- \`Math.random()\` generates **different values** on server vs client → hydration mismatch in SSR
- A module-level counter also causes mismatches in SSR
- \`useId\` is **SSR-safe** — it produces the same ID on both server and client

---

### Multiple IDs in one component

${B}jsx
function PasswordField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={id + '-input'}>Password</label>
      <input id={id + '-input'} type="password" />
      <p id={id + '-hint'}>Must be at least 8 characters</p>
      <input aria-describedby={id + '-hint'} />
    </div>
  );
}
${B}

---

### Important: not for list keys

\`useId\` is for **accessibility attributes** (id, aria-labelledby, etc.), not for list \`key\` props. For list keys, use data IDs from your data source.`,
  },
  {
    orderNumber: 27,
    title: "What is _useTransition_ in React 18?",
    group: "React Hooks",
    difficulty: 3,
    content: `\`useTransition\` lets you mark some state updates as **non-urgent** (transitions), keeping the UI responsive while slower updates happen in the background.

### The problem

Without \`useTransition\`, a slow render (like filtering a huge list) blocks the entire UI — the user can't type or interact:

${B}jsx
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(allItems);

  function handleChange(e) {
    setQuery(e.target.value);
    setResults(filterItems(allItems, e.target.value)); // slow — blocks input!
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      <ResultsList results={results} />
    </>
  );
}
${B}

### Solution with useTransition

${B}jsx
import { useState, useTransition } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(allItems);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setQuery(e.target.value); // urgent — update immediately

    startTransition(() => {
      setResults(filterItems(allItems, e.target.value)); // non-urgent — can be interrupted
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <p>Loading results...</p>}
      <ResultsList results={results} />
    </>
  );
}
${B}

---

### How it works

- Updates inside \`startTransition\` are marked as **low priority**
- If a more urgent update (like another keystroke) comes in, React **interrupts** the transition and starts fresh
- \`isPending\` is \`true\` while the transition is in progress — use it to show a loading indicator

---

### useTransition vs useDeferredValue

| | \`useTransition\` | \`useDeferredValue\` |
|---|---|---|
| Control | You wrap the state setter | You wrap the value |
| Use when | You control the state update | You receive a value from props |
| Pending indicator | \`isPending\` available | ❌ Not available |`,
  },
  {
    orderNumber: 28,
    title: "What is _useDeferredValue_ in React 18?",
    group: "React Hooks",
    difficulty: 3,
    content: `\`useDeferredValue\` defers updating a value to keep the UI responsive. It's the sibling of \`useTransition\` — but instead of wrapping a state setter, you wrap the **value itself**.

### Syntax

${B}jsx
const deferredValue = useDeferredValue(value);
${B}

The \`deferredValue\` will lag behind the actual \`value\` — it stays at the old value while React renders the urgent update, then catches up when the browser is free.

---

### Example: search input

${B}jsx
import { useState, useDeferredValue } from 'react';

function SearchPage({ allItems }) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query); // lags behind query

  const results = useMemo(
    () => filterItems(allItems, deferredQuery),
    [allItems, deferredQuery]
  );

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {/* results render with deferred query — input stays responsive */}
      <ResultsList results={results} isStale={query !== deferredQuery} />
    </>
  );
}
${B}

---

### Stale UI indicator

You can show a visual hint when the displayed results are stale (old query):

${B}jsx
<div style={{ opacity: query !== deferredQuery ? 0.5 : 1 }}>
  <ResultsList results={results} />
</div>
${B}

---

### When to use useDeferredValue

✅ Use it when:
- You receive a value from **props or parent state** and can't control when it updates
- You want to defer re-rendering of a slow child component

Use \`useTransition\` instead when you **own the state update** (you call the setter).

---

### What it is NOT

\`useDeferredValue\` is not debouncing or throttling — it doesn't add a time delay. It defers work until React has time, which is more efficient and integrates with Concurrent Mode.`,
  },
  {
    orderNumber: 29,
    title: "What is _useImperativeHandle_ and when do you use it?",
    group: "React Hooks",
    difficulty: 3,
    content: `\`useImperativeHandle\` customizes the **ref value exposed to a parent** when using \`forwardRef\`. It lets you control exactly what the parent can do with the ref — instead of exposing the entire DOM node.

### Why it exists

When a parent uses a ref on a child component, by default with \`forwardRef\` they get direct access to the DOM node. \`useImperativeHandle\` lets you expose only a **controlled API** instead.

---

### Example: Custom Input with exposed focus method

${B}jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

// Child component
const FancyInput = forwardRef(function FancyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
    clear() {
      inputRef.current.value = '';
    }
    // The parent cannot access inputRef.current directly — only focus() and clear()
  }));

  return <input ref={inputRef} {...props} />;
});

// Parent component
function Form() {
  const inputRef = useRef(null);

  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.clear()}>Clear</button>
    </>
  );
}
${B}

---

### Syntax

${B}jsx
useImperativeHandle(ref, () => ({
  // methods and properties to expose
}), [dependencies]);
${B}

---

### When to use it

✅ Use when:
- Building a reusable component library where you want a **controlled public API**
- The parent needs to trigger imperative actions (focus, scroll, play/pause) without exposing full DOM access

❌ Avoid overusing it — prefer the React data flow (props/state) whenever possible. Imperative APIs should be a last resort.`,
  },
  {
    orderNumber: 30,
    title: "What is _forwardRef_ in React?",
    group: "React Hooks",
    difficulty: 2,
    content: `\`forwardRef\` lets a component **pass a ref through to a child DOM element or inner component**. By default, refs don't work on custom components — \`forwardRef\` fixes that.

### The problem

${B}jsx
// ❌ This doesn't work — ref goes to the component instance, not the input
function MyInput(props) {
  return <input {...props} />;
}

function Form() {
  const ref = useRef(null);
  return <MyInput ref={ref} />; // ref.current is null!
}
${B}

### Solution: forwardRef

${B}jsx
import { forwardRef, useRef } from 'react';

// ✅ Wrap the component with forwardRef to accept and pass the ref
const MyInput = forwardRef(function MyInput(props, ref) {
  return <input ref={ref} {...props} />;
});

function Form() {
  const ref = useRef(null);

  return (
    <>
      <MyInput ref={ref} placeholder="Type here..." />
      <button onClick={() => ref.current.focus()}>Focus Input</button>
    </>
  );
}
${B}

---

### How it works

\`forwardRef\` takes a render function with two arguments:
1. \`props\` — the component's props (as usual)
2. \`ref\` — the ref passed by the parent

You then attach that \`ref\` to whatever DOM element you want to expose.

---

### Common use cases

- **UI component libraries** — input, button, modal components that need to be focused/scrolled programmatically
- **Animation libraries** — need refs to DOM elements to animate them
- **Form libraries** — like React Hook Form, which uses refs to track uncontrolled inputs

---

### With TypeScript

${B}tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const MyInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} {...props} />;
});
${B}`,
  },

  // ─────────────────────────────────────────────
  // COMPONENT LIFECYCLE
  // ─────────────────────────────────────────────
  {
    orderNumber: 31,
    title: "What are the _lifecycle phases_ of a React component?",
    group: "Component Lifecycle",
    difficulty: 2,
    content: `Every React component goes through three main **lifecycle phases**:

---

### 1. Mounting — component is created and added to the DOM

Class component methods:
- \`constructor()\` — initialize state and bind methods
- \`static getDerivedStateFromProps()\` — sync state with props before render
- \`render()\` — return JSX
- \`componentDidMount()\` — runs after DOM is ready (fetch data, set up subscriptions)

Functional equivalent:
${B}jsx
useEffect(() => {
  // componentDidMount equivalent
}, []); // empty deps = runs once after mount
${B}

---

### 2. Updating — component re-renders due to state/props change

Class component methods (in order):
- \`static getDerivedStateFromProps()\`
- \`shouldComponentUpdate()\` — return false to skip re-render
- \`render()\`
- \`getSnapshotBeforeUpdate()\` — capture DOM state before update
- \`componentDidUpdate(prevProps, prevState)\` — react to updates

Functional equivalent:
${B}jsx
useEffect(() => {
  // componentDidUpdate equivalent — runs when `value` changes
}, [value]);
${B}

---

### 3. Unmounting — component is removed from the DOM

Class component method:
- \`componentWillUnmount()\` — clean up timers, subscriptions, event listeners

Functional equivalent:
${B}jsx
useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer); // componentWillUnmount equivalent
}, []);
${B}

---

### Full lifecycle diagram

${B}text
Mount:   constructor → getDerivedStateFromProps → render → DOM update → componentDidMount
Update:  getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → DOM update → componentDidUpdate
Unmount: componentWillUnmount
${B}

### In functional components

All lifecycle behavior is handled by \`useEffect\` — the dependency array controls which phase triggers the effect.`,
  },
  {
    orderNumber: 32,
    title: "What is _componentDidMount_ and its Hook equivalent?",
    group: "Component Lifecycle",
    difficulty: 1,
    content: `\`componentDidMount\` is a class component lifecycle method that runs **once, immediately after the component is inserted into the DOM**.

It's the right place to:
- Fetch data from an API
- Set up event listeners or subscriptions
- Initialize third-party libraries that need a DOM node

### Class component

${B}jsx
class UserProfile extends React.Component {
  state = { user: null };

  componentDidMount() {
    // Component is in the DOM — safe to fetch data
    fetch(\`/api/users/\${this.props.userId}\`)
      .then(res => res.json())
      .then(user => this.setState({ user }));
  }

  render() {
    return this.state.user ? <h1>{this.state.user.name}</h1> : <p>Loading...</p>;
  }
}
${B}

### Functional component equivalent

Use \`useEffect\` with an **empty dependency array \`[]\`**:

${B}jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setUser);
  }, []); // [] means: run once after the first render (mount)

  return user ? <h1>{user.name}</h1> : <p>Loading...</p>;
}
${B}

---

### Why not fetch in the component body?

The component body runs on **every render**. Fetching there would send a request every re-render — wasteful and causes infinite loops if you set state from it.

\`useEffect\` with \`[]\` safely runs the fetch only once.

---

### Async in useEffect

${B}jsx
useEffect(() => {
  // Can't make useEffect itself async — create an inner async function
  async function loadUser() {
    const res = await fetch(\`/api/users/\${userId}\`);
    const data = await res.json();
    setUser(data);
  }

  loadUser();
}, []);
${B}`,
  },
  {
    orderNumber: 33,
    title: "What is _componentDidUpdate_ and its Hook equivalent?",
    group: "Component Lifecycle",
    difficulty: 2,
    content: `\`componentDidUpdate\` runs **after every re-render** (but not after the initial mount). It receives the previous props and state so you can compare and respond to specific changes.

### Class component

${B}jsx
class UserProfile extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    // Only fetch when userId actually changed
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId);
    }
  }
}
${B}

Without the comparison check, you'd fetch on **every** re-render — causing an infinite loop if \`setState\` is called inside.

---

### Functional component equivalent

\`useEffect\` with a dependency:

${B}jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]); // runs when userId changes (and on first render)

  return user ? <h1>{user.name}</h1> : <p>Loading...</p>;
}
${B}

---

### Accessing previous values in functional components

\`useEffect\` doesn't give you \`prevProps\` directly — use \`useRef\`:

${B}jsx
function Component({ value }) {
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      console.log(\`Changed from \${prevValue.current} to \${value}\`);
    }
    prevValue.current = value;
  });
}
${B}

---

### Key differences

| | \`componentDidUpdate\` | \`useEffect\` with deps |
|---|---|---|
| Runs on mount? | ❌ No | ✅ Yes (first time) |
| Access prev values? | ✅ Via arguments | Via \`useRef\` |
| Granularity | One method for all changes | Separate effect per dependency |`,
  },
  {
    orderNumber: 34,
    title: "What is _componentWillUnmount_ and its Hook equivalent?",
    group: "Component Lifecycle",
    difficulty: 1,
    content: `\`componentWillUnmount\` runs **just before a component is removed from the DOM**. It's used to clean up anything that was set up during the component's life — to prevent memory leaks and stale behavior.

### Common cleanup tasks

- Clear timers (\`clearInterval\`, \`clearTimeout\`)
- Remove event listeners
- Cancel API requests (AbortController)
- Unsubscribe from subscriptions (WebSocket, Redux)

### Class component

${B}jsx
class Clock extends React.Component {
  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer); // prevent memory leak
  }

  tick() { /* update time */ }
}
${B}

### Functional component equivalent

Return a **cleanup function** from \`useEffect\`:

${B}jsx
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);

    return () => {
      clearInterval(timer); // runs on unmount (and before effect re-runs)
    };
  }, []);

  return <p>{time.toLocaleTimeString()}</p>;
}
${B}

---

### Real-world example: canceling a fetch

${B}jsx
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') console.error(err);
    });

  return () => controller.abort(); // cancel on unmount
}, []);
${B}

---

### When does the cleanup run?

1. When the component **unmounts** (removed from DOM)
2. **Before** the effect runs again (if dependencies change)

This means cleanup runs on both unmount and re-runs — so you don't leak subscriptions between dependency changes.`,
  },
  {
    orderNumber: 35,
    title: "What is _getDerivedStateFromProps_?",
    group: "Component Lifecycle",
    difficulty: 3,
    content: `\`getDerivedStateFromProps\` is a **static class component lifecycle method** that runs before every render (both mount and update). It lets you update state based on changes to props.

### Syntax

${B}jsx
static getDerivedStateFromProps(nextProps, prevState) {
  // Return an object to update state, or null to update nothing
  if (nextProps.userId !== prevState.userId) {
    return { userId: nextProps.userId, data: null }; // reset data when user changes
  }
  return null; // no state update needed
}
${B}

---

### Full example

${B}jsx
class UserProfile extends React.Component {
  state = { userId: null, data: null };

  static getDerivedStateFromProps(props, state) {
    if (props.userId !== state.userId) {
      return { userId: props.userId, data: null }; // reset when prop changes
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.fetchData(); // fetch new data after state reset
    }
  }

  fetchData() {
    fetch(\`/api/users/\${this.props.userId}\`)
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  render() {
    return this.state.data ? <h1>{this.state.data.name}</h1> : <p>Loading...</p>;
  }
}
${B}

---

### Why "static"?

Because it has **no access to \`this\`** — it can't call instance methods or access the component instance. It's a pure function of props and state.

---

### In functional components

There's no direct equivalent. Instead, derive the value directly during render or use \`useEffect\` to sync state with props:

${B}jsx
function UserProfile({ userId }) {
  const [data, setData] = useState(null);

  // Reset data when userId changes — functional equivalent
  useEffect(() => {
    setData(null); // reset
    fetchUser(userId).then(setData);
  }, [userId]);
}
${B}

---

### When to use it

Rarely — most cases are better handled with \`useEffect\` or computing derived values directly in render. Overusing it makes components hard to understand.`,
  },
  {
    orderNumber: 36,
    title: "What is _getSnapshotBeforeUpdate_?",
    group: "Component Lifecycle",
    difficulty: 3,
    content: `\`getSnapshotBeforeUpdate\` captures information from the DOM **right before** it's updated. The value it returns is passed as the third argument (\`snapshot\`) to \`componentDidUpdate\`.

It's used in rare cases where you need to read the DOM state (like scroll position) before React changes it.

### Syntax

${B}jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
  // Return a snapshot value (or null)
  return this.listRef.current.scrollHeight;
}

componentDidUpdate(prevProps, prevState, snapshot) {
  // Use the snapshot captured before the update
  if (snapshot !== null) {
    this.listRef.current.scrollTop += this.listRef.current.scrollHeight - snapshot;
  }
}
${B}

---

### Classic use case: chat scroll preservation

When new messages are added to a chat list, the scroll position shifts. \`getSnapshotBeforeUpdate\` lets you capture the scroll height before the DOM updates, then adjust scroll position after:

${B}jsx
class ChatList extends React.Component {
  listRef = React.createRef();

  getSnapshotBeforeUpdate(prevProps) {
    // Was a new message added?
    if (prevProps.messages.length < this.props.messages.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop; // distance from bottom
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot; // restore position
    }
  }

  render() {
    return (
      <div ref={this.listRef} style={{ overflowY: 'auto', height: 400 }}>
        {this.props.messages.map(m => <p key={m.id}>{m.text}</p>)}
      </div>
    );
  }
}
${B}

---

### In functional components

There's no direct Hook equivalent. \`useLayoutEffect\` can be used to read the DOM right after React applies changes (but before the browser paints), which covers most of the same use cases.`,
  },

  // ─────────────────────────────────────────────
  // PERFORMANCE
  // ─────────────────────────────────────────────
  {
    orderNumber: 37,
    title: "What is _React.memo_ and how does it work?",
    group: "Performance Optimization",
    difficulty: 2,
    content: `\`React.memo\` is a **Higher-Order Component** that prevents a functional component from re-rendering if its props haven't changed. It's the functional equivalent of \`PureComponent\` for class components.

### Without React.memo

${B}jsx
function ChildComponent({ name }) {
  console.log('ChildComponent rendered');
  return <p>Hello, {name}</p>;
}

function Parent() {
  const [count, setCount] = useState(0);
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>
      <ChildComponent name="Alice" /> {/* re-renders on every count change! */}
    </>
  );
}
${B}

### With React.memo

${B}jsx
const ChildComponent = React.memo(function ChildComponent({ name }) {
  console.log('ChildComponent rendered'); // only logs when name changes
  return <p>Hello, {name}</p>;
});
${B}

Now \`ChildComponent\` only re-renders when \`name\` prop changes.

---

### How it works

React.memo does a **shallow comparison** of the previous and current props. If all props are equal (===), the render is skipped and the previous output is reused.

---

### Custom comparison function

For complex props, you can provide your own comparison:

${B}jsx
const ChildComponent = React.memo(
  function ChildComponent({ user }) {
    return <p>{user.name}</p>;
  },
  (prevProps, nextProps) => {
    // Return true = same props (skip re-render)
    // Return false = different props (re-render)
    return prevProps.user.id === nextProps.user.id;
  }
);
${B}

---

### When to use React.memo

✅ Use when:
- Component renders often but props rarely change
- Component is **expensive** to render
- Component receives the same props from a parent that re-renders often

❌ Don't use when:
- Props change on almost every render (memo overhead is wasted)
- The component is cheap to render
- Props include functions that are recreated each render — pair with \`useCallback\`

---

### React.memo + useCallback

${B}jsx
const Parent = () => {
  const handleClick = useCallback(() => console.log('clicked'), []);
  return <MemoizedChild onClick={handleClick} />;
};
const MemoizedChild = React.memo(Child);
${B}

Without \`useCallback\`, a new function reference is created each render, breaking the memo.`,
  },
  {
    orderNumber: 38,
    title: "What is _code splitting_ in React?",
    group: "Performance Optimization",
    difficulty: 2,
    content: `**Code splitting** is the technique of breaking your app's JavaScript bundle into **smaller chunks** that are loaded on demand, rather than loading everything upfront.

Without code splitting, all your JavaScript is bundled into one large file. With code splitting, users only download the code they need for the current page/feature.

---

### Why it matters

${B}text
Without splitting: user downloads 2MB bundle → waits → app loads
With splitting:    user downloads 200KB bundle → app loads → more code fetched as needed
${B}

---

### React.lazy — component-level code splitting

${B}jsx
import { lazy, Suspense } from 'react';

// The component is only loaded when it's first rendered
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
${B}

When a user navigates to \`/dashboard\`, React fetches the \`Dashboard\` bundle — it's not in the initial download.

---

### Route-based splitting (most common pattern)

Splitting at the route level gives the best performance gain because each page is a separate chunk:

${B}jsx
const Home     = lazy(() => import('./pages/Home'));
const About    = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
${B}

---

### Dynamic imports (manual)

${B}jsx
// Load a heavy library only when needed
async function handleExport() {
  const { default: jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  doc.save('file.pdf');
}
${B}

---

### Bundle analyzer

Use \`vite-bundle-visualizer\` or \`webpack-bundle-analyzer\` to see what's in your bundle and find splitting opportunities.`,
  },
  {
    orderNumber: 39,
    title: "What are _React.lazy_ and _Suspense_?",
    group: "Performance Optimization",
    difficulty: 2,
    content: `**\`React.lazy\`** lets you load a component **dynamically** (only when it's needed). **\`Suspense\`** is the wrapper that shows a fallback UI while the lazy component is loading.

They work together to implement **code splitting** at the component level.

---

### React.lazy

${B}jsx
import { lazy } from 'react';

// Dynamic import — this component is in a separate JS chunk
const HeavyChart = lazy(() => import('./components/HeavyChart'));
${B}

\`import('./components/HeavyChart')\` returns a Promise. \`React.lazy\` handles that Promise and renders the component once it resolves.

---

### Suspense

${B}jsx
import { Suspense } from 'react';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading chart...</div>}>
        <HeavyChart /> {/* fetched on first render */}
      </Suspense>
    </div>
  );
}
${B}

While \`HeavyChart\` is loading, \`<div>Loading chart...</div>\` is shown. Once loaded, the chart replaces it.

---

### Suspense can wrap multiple lazy components

${B}jsx
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <MainContent />
  <Sidebar />
</Suspense>
${B}

---

### Error handling with Error Boundary

Network errors during lazy loading are caught by an Error Boundary:

${B}jsx
<ErrorBoundary fallback={<p>Failed to load. Retry?</p>}>
  <Suspense fallback={<Spinner />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
${B}

---

### Limitations

- \`React.lazy\` only works with **default exports**
- It only works on the **client** — for SSR use frameworks like Next.js (\`next/dynamic\`)

---

### React 18+: Suspense for data

In React 18, Suspense also works with data fetching (through libraries like React Query, SWR, or Relay that support the Suspense contract), not just code splitting.`,
  },
  {
    orderNumber: 40,
    title: "What is _windowing_ or _virtualization_ in React?",
    group: "Performance Optimization",
    difficulty: 2,
    content: `**Windowing (virtualization)** is a technique where only the **visible items** in a long list are rendered in the DOM — not the entire list. As the user scrolls, items are created and destroyed dynamically.

### The problem

Rendering 10,000 rows at once creates 10,000 DOM nodes — extremely slow to render and causes browser lag.

### The solution

Only render the ~15-20 rows the user can actually see. All other rows are "virtual" — their space is reserved, but no DOM nodes are created.

---

### Popular libraries

**react-window** (lightweight, recommended):
${B}jsx
import { FixedSizeList } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Row #{index}</div>
);

function VirtualList() {
  return (
    <FixedSizeList
      height={400}       // visible container height
      itemCount={10000}  // total rows
      itemSize={35}      // each row height in px
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
${B}

**react-virtual** (TanStack Virtual — more flexible):
${B}bash
npm install @tanstack/react-virtual
${B}

**@tanstack/react-virtual** example:
${B}jsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div ref={parentRef} style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(item => (
          <div key={item.key} style={{ transform: \`translateY(\${item.start}px)\` }}>
            {items[item.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
${B}

---

### When to use it

✅ Lists with **hundreds or thousands** of items
✅ Infinite scroll feeds
✅ Data tables with many rows

❌ Lists with < 100 items — plain rendering is fine`,
  },
  {
    orderNumber: 41,
    title: "What is _PureComponent_ in React?",
    group: "Performance Optimization",
    difficulty: 2,
    content: `\`React.PureComponent\` is a class component base that implements \`shouldComponentUpdate\` with a **shallow comparison** of props and state. If nothing changed shallowly, the component skips re-rendering.

It's the class component equivalent of \`React.memo\` for functional components.

---

### Regular Component vs PureComponent

${B}jsx
// Regular Component — re-renders on every parent render
class RegularList extends React.Component {
  render() {
    return <ul>{this.props.items.map(i => <li>{i}</li>)}</ul>;
  }
}

// PureComponent — skips re-render if props/state haven't shallowly changed
class PureList extends React.PureComponent {
  render() {
    return <ul>{this.props.items.map(i => <li>{i}</li>)}</ul>;
  }
}
${B}

---

### What is a shallow comparison?

Shallow comparison checks if **primitive values** are equal (\`===\`) and if **object/array references** are the same — it does NOT deep-compare object contents.

${B}jsx
// Shallow comparison examples:
5 === 5             // ✅ same
'hello' === 'hello' // ✅ same
[] === []           // ❌ different references (new array each time!)
{ a: 1 } === { a: 1 } // ❌ different references
${B}

---

### Pitfall: mutating objects/arrays breaks PureComponent

${B}jsx
// ❌ WRONG — PureComponent won't detect this change!
handleAddItem() {
  this.props.items.push('new item'); // mutates the same array reference
  this.setState({ items: this.props.items });
}

// ✅ CORRECT — new array reference triggers re-render
handleAddItem() {
  this.setState({ items: [...this.props.items, 'new item'] });
}
${B}

---

### Functional equivalent

${B}jsx
// React.memo = PureComponent for functional components
const PureList = React.memo(function PureList({ items }) {
  return <ul>{items.map(i => <li>{i}</li>)}</ul>;
});
${B}

---

### When to use

Use \`PureComponent\` (or \`React.memo\`) when:
- The component renders often but with the same props
- The render is expensive
- You follow **immutable data patterns** (always create new objects/arrays)`,
  },
  {
    orderNumber: 42,
    title: "How does React's _reconciliation_ algorithm work?",
    group: "Performance Optimization",
    difficulty: 3,
    content: `**Reconciliation** is the process React uses to figure out **what changed** in the virtual DOM and apply the minimum number of DOM updates.

When state or props change, React creates a new virtual DOM tree and compares it with the previous one. This comparison is called **diffing**.

---

### The diffing algorithm

React's diffing makes two assumptions that make it O(n) instead of O(n³):

#### 1. Elements of different types produce different trees

If a \`<div>\` changes to a \`<section>\`, React **tears down the old tree** entirely and builds a new one — even if children are the same.

${B}jsx
// Old:  <div><Counter /></div>
// New:  <section><Counter /></section>
// React destroys Counter and creates a new one
${B}

#### 2. Keys help React identify which items changed in lists

${B}jsx
// Without keys — React re-renders everything when order changes
<li>Alice</li>
<li>Bob</li>

// With keys — React knows exactly which item moved
<li key="alice">Alice</li>
<li key="bob">Bob</li>
${B}

---

### The Virtual DOM

React keeps an in-memory copy of the DOM (the virtual DOM). When state changes:

${B}text
1. React renders the new Virtual DOM tree
2. React diffs old tree vs new tree (reconciliation)
3. React computes the minimal set of DOM operations
4. React applies those operations to the real DOM (commit phase)
${B}

This is much faster than directly manipulating the real DOM on every update.

---

### React Fiber (React 16+)

**Fiber** is the reimplementation of React's reconciliation engine. It breaks rendering work into **small units** that can be paused, prioritized, and resumed — enabling Concurrent Mode features like \`useTransition\`.

Before Fiber, reconciliation was synchronous and couldn't be interrupted.`,
  },
  {
    orderNumber: 43,
    title: "Why are _keys_ important in React lists?",
    group: "Performance Optimization",
    difficulty: 1,
    content: `**Keys** are special props that help React identify which items in a list have **changed, been added, or removed**. Without keys, React can't tell list items apart and has to re-render the entire list.

### Without keys — wrong behavior

${B}jsx
// ❌ No keys — React compares by position
['Alice', 'Bob', 'Charlie'].map(name => <li>{name}</li>)

// If Alice is removed:
// Old: [Alice, Bob, Charlie]
// New: [Bob, Charlie]
// React thinks: Alice → Bob (update text), Bob → Charlie (update text), remove last
// React didn't "remove Alice" — it mutated all 3 items!
${B}

### With keys — correct behavior

${B}jsx
// ✅ Keys — React compares by identity
users.map(user => <li key={user.id}>{user.name}</li>)

// If Alice is removed:
// React sees: alice key is gone → remove exactly that DOM node
// Bob and Charlie are untouched
${B}

---

### Rules for good keys

| Rule | Why |
|---|---|
| Keys must be **unique among siblings** | Not globally unique — only within the list |
| Use **stable, permanent IDs** from your data | Database IDs, UUIDs |
| Don't use **array index** (usually) | Index changes when items are added/removed/reordered |

---

### When is index as key okay?

${B}jsx
// ✅ OK to use index when:
// - The list is static (never reordered or filtered)
// - Items have no stable IDs
// - The list is never filtered or sorted

items.map((item, index) => <li key={index}>{item}</li>)
${B}

---

### Why NOT to use Math.random() or Date.now()

${B}jsx
// ❌ NEVER do this — generates new key on every render
// React unmounts and remounts every list item each time!
items.map(item => <li key={Math.random()}>{item}</li>)
${B}

Keys must be **stable** — the same item must always get the same key across renders.`,
  },
  {
    orderNumber: 44,
    title: "What is _shouldComponentUpdate_ in React?",
    group: "Performance Optimization",
    difficulty: 2,
    content: `\`shouldComponentUpdate\` is a class component lifecycle method that lets you **control whether a component re-renders** after a state or props change.

By default, React re-renders a component whenever its parent renders or its state changes. \`shouldComponentUpdate\` lets you skip unnecessary renders.

### Syntax

${B}jsx
shouldComponentUpdate(nextProps, nextState) {
  // Return true = re-render (default)
  // Return false = skip re-render
  return nextProps.value !== this.props.value;
}
${B}

---

### Full example

${B}jsx
class Counter extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render if count actually changed
    if (nextState.count === this.state.count &&
        nextProps.label === this.props.label) {
      return false; // skip render
    }
    return true;
  }

  render() {
    return <p>{this.props.label}: {this.state.count}</p>;
  }
}
${B}

---

### PureComponent is the easy version

Manually implementing \`shouldComponentUpdate\` is error-prone. \`PureComponent\` does shallow comparison automatically:

${B}jsx
// This is equivalent to implementing shouldComponentUpdate with shallow comparison
class Counter extends React.PureComponent {
  render() {
    return <p>{this.props.label}: {this.props.count}</p>;
  }
}
${B}

---

### Functional component equivalent

\`React.memo\` replaces \`shouldComponentUpdate\` for functional components:

${B}jsx
const Counter = React.memo(function Counter({ label, count }) {
  return <p>{label}: {count}</p>;
});

// With custom comparison:
const Counter = React.memo(
  ({ label, count }) => <p>{label}: {count}</p>,
  (prev, next) => prev.count === next.count && prev.label === next.label
);
${B}

---

### Caution

Incorrectly returning \`false\` from \`shouldComponentUpdate\` can cause **stale UI** — the component doesn't update when it should. Profile before optimizing.`,
  },
  {
    orderNumber: 45,
    title: "How do you optimize _React app performance_?",
    group: "Performance Optimization",
    difficulty: 2,
    content: `React performance optimization falls into several categories. Always **profile first** with React DevTools before optimizing — don't guess.

---

### 1. Prevent unnecessary re-renders

${B}jsx
// Memoize components
const Child = React.memo(ChildComponent);

// Memoize values
const result = useMemo(() => expensiveCalc(data), [data]);

// Memoize callbacks
const handleClick = useCallback(() => doSomething(), []);
${B}

---

### 2. Code splitting & lazy loading

${B}jsx
const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>
${B}

---

### 3. Virtualize long lists

${B}jsx
import { FixedSizeList } from 'react-window';

<FixedSizeList height={500} itemCount={10000} itemSize={40}>
  {Row}
</FixedSizeList>
${B}

---

### 4. State management

- Keep state **as low as possible** in the component tree
- Split Context into multiple contexts — one large context re-renders all consumers on any change
- Use \`useReducer\` instead of many \`useState\` calls for complex state

---

### 5. Avoid expensive operations in render

${B}jsx
// ❌ Sorting/filtering inside render — runs every time
const sorted = items.sort((a, b) => a.name.localeCompare(b.name));

// ✅ Memoized — only re-computes when items changes
const sorted = useMemo(() => [...items].sort((a, b) => a.name.localeCompare(b.name)), [items]);
${B}

---

### 6. Image & asset optimization

- Use WebP/AVIF formats
- Lazy load images with \`loading="lazy"\`
- Use a CDN

---

### 7. Debounce expensive handlers

${B}jsx
const debouncedSearch = useMemo(
  () => debounce((term) => fetchResults(term), 300),
  []
);
${B}

---

### 8. Use React DevTools Profiler

The Profiler tab shows which components are re-rendering and how long they take — invaluable for finding real bottlenecks.`,
  },

  // ─────────────────────────────────────────────
  // ADVANCED PATTERNS
  // ─────────────────────────────────────────────
  {
    orderNumber: 46,
    title: "What are _Higher-Order Components_ (HOCs)?",
    group: "Advanced Patterns",
    difficulty: 2,
    content: `A **Higher-Order Component (HOC)** is a function that takes a component and returns a **new enhanced component**. It's a pattern for reusing component logic.

${B}jsx
const EnhancedComponent = withSomething(OriginalComponent);
${B}

HOCs are named with the \`with\` prefix by convention.

---

### Example: withAuth HOC

${B}jsx
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedProfile   = withAuth(Profile);
${B}

---

### Example: withLoading HOC

${B}jsx
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <Spinner />;
    return <WrappedComponent {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);
// <UserListWithLoading isLoading={true} users={[]} />
${B}

---

### Common use cases

- Authentication guards
- Loading/error states
- Logging and analytics
- Theme injection
- Data fetching (less common now)

---

### HOCs vs Custom Hooks

| | HOC | Custom Hook |
|---|---|---|
| Returns | A React component | A value / functions |
| Adds to JSX tree? | ✅ Yes (extra wrapper) | ❌ No |
| Complexity | Can lead to "wrapper hell" | Simpler and flatter |
| Best for | Rendering logic | Stateful/behavioral logic |

Today, **custom Hooks** cover most cases where HOCs were used. But HOCs still have a place — especially in libraries and for conditional rendering logic.

---

### Important: pass through props

Always spread props to the wrapped component — don't swallow them:

${B}jsx
return <WrappedComponent {...props} extraProp={value} />;
${B}`,
  },
  {
    orderNumber: 47,
    title: "What is the _render props_ pattern?",
    group: "Advanced Patterns",
    difficulty: 2,
    content: `The **render props** pattern shares stateful logic between components by passing a **function as a prop**. The parent component calls this function with data and the child renders whatever the function returns.

${B}jsx
<DataProvider render={(data) => <Chart data={data} />} />
// or more commonly via children:
<DataProvider>
  {(data) => <Chart data={data} />}
</DataProvider>
${B}

---

### Example: Mouse tracker

${B}jsx
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (e) => {
    this.setState({ x: e.clientX, y: e.clientY });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove} style={{ height: 300 }}>
        {/* Call the render prop with current mouse position */}
        {this.props.children(this.state)}
      </div>
    );
  }
}

// Usage — consumer decides what to render
function App() {
  return (
    <MouseTracker>
      {({ x, y }) => (
        <p>Mouse is at ({x}, {y})</p>
      )}
    </MouseTracker>
  );
}
${B}

---

### More common: children as a function

${B}jsx
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  return children({ on, toggle: () => setOn(o => !o) });
}

// Usage
<Toggle>
  {({ on, toggle }) => (
    <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
  )}
</Toggle>
${B}

---

### Render Props vs Custom Hooks

Custom Hooks have largely replaced render props — the same logic can be extracted into a hook without the extra JSX nesting:

${B}jsx
// Custom Hook version — simpler!
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  return { on, toggle: () => setOn(o => !o) };
}

function Component() {
  const { on, toggle } = useToggle();
  return <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>;
}
${B}

Render props still appear in some libraries (like React Router's \`<Route>\` older API, Formik, etc.).`,
  },
  {
    orderNumber: 48,
    title: "What is _prop drilling_ and how do you avoid it?",
    group: "Advanced Patterns",
    difficulty: 1,
    content: `**Prop drilling** is when you pass props through multiple layers of components just to get data from a top-level component to a deeply nested one — even though intermediate components don't need that data.

### The problem

${B}jsx
function App() {
  const [user, setUser] = useState({ name: 'Alice' });
  return <PageLayout user={user} />;
}

function PageLayout({ user }) {
  return <Header user={user} />; // just passing through, doesn't use user
}

function Header({ user }) {
  return <UserMenu user={user} />; // just passing through
}

function UserMenu({ user }) {
  return <p>Hello, {user.name}</p>; // finally uses user
}
${B}

\`PageLayout\` and \`Header\` are "middlemen" — they don't use \`user\` but are forced to receive and forward it.

---

### Solutions

#### 1. Context API (most common)

${B}jsx
const UserContext = createContext(null);

function App() {
  const [user] = useState({ name: 'Alice' });
  return (
    <UserContext.Provider value={user}>
      <PageLayout /> {/* no props needed */}
    </UserContext.Provider>
  );
}

function UserMenu() {
  const user = useContext(UserContext); // directly reads from context
  return <p>Hello, {user.name}</p>;
}
${B}

#### 2. Component composition

Pass the already-rendered component as a prop, skipping intermediaries:

${B}jsx
function App() {
  const [user] = useState({ name: 'Alice' });
  return (
    <PageLayout
      header={<Header rightSlot={<UserMenu user={user} />} />}
    />
  );
}
${B}

#### 3. State management library (Redux, Zustand, Jotai)

Any component can subscribe directly to global state without prop chains.

---

### When is prop drilling acceptable?

1–2 levels deep is fine. Only extract to context/global state when:
- Props are passed through 3+ unrelated levels
- Many components need the same data
- The "middlemen" components become polluted with unrelated props`,
  },
  {
    orderNumber: 49,
    title: "What are _React Portals_?",
    group: "Advanced Patterns",
    difficulty: 2,
    content: `**React Portals** let you render a component's output **into a different DOM node** than its parent — while keeping it part of the React component tree.

By default, React renders everything inside the root \`<div id="root">\`. Portals break out of that and render elsewhere in the DOM.

### Syntax

${B}jsx
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    children,
    document.getElementById('modal-root') // render target
  );
}
${B}

### Why is this useful?

**CSS stacking context problem**: A modal inside a deeply nested component with \`overflow: hidden\` or \`z-index\` constraints will be clipped. Portals let the modal render at the \`<body\` level, outside those CSS constraints.

${B}html
<!-- index.html -->
<body>
  <div id="root"></div>
  <div id="modal-root"></div> <!-- portal target -->
</body>
${B}

---

### Full Modal example

${B}jsx
import { useState } from 'react';
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <p>Modal content here</p>
      </Modal>
    </>
  );
}
${B}

---

### Key behaviors of Portals

- **Events bubble** through the React component tree (not the DOM tree) — a click inside a portal will bubble to the portal's React parent
- **Context** is still accessible — portals are logically part of the React tree
- **Lifecycle** works normally — portal components mount/unmount with their parent

---

### Common use cases

- Modals and dialogs
- Tooltips and popovers
- Dropdown menus
- Notifications/toasts`,
  },
  {
    orderNumber: 50,
    title: "What are _Error Boundaries_ in React?",
    group: "Advanced Patterns",
    difficulty: 2,
    content: `**Error Boundaries** are class components that **catch JavaScript errors** in their child component tree, log them, and display a fallback UI — instead of crashing the entire app.

They're React's equivalent of a try/catch block, but for the component tree.

---

### Creating an Error Boundary

${B}jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI on next render
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log the error to an error reporting service
    console.error('Error caught:', error, info.componentStack);
    // logToSentry(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
${B}

### Usage

${B}jsx
function App() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}
${B}

---

### Granular error boundaries

Wrap individual sections so one broken widget doesn't kill the whole page:

${B}jsx
<ErrorBoundary fallback={<p>Widget failed</p>}>
  <WeatherWidget />
</ErrorBoundary>
<ErrorBoundary fallback={<p>Ads failed</p>}>
  <AdsBanner />
</ErrorBoundary>
${B}

---

### What errors are NOT caught

| Error type | Caught? |
|---|---|
| Errors in event handlers | ❌ No — use try/catch |
| Async errors (setTimeout, fetch) | ❌ No |
| SSR errors | ❌ No |
| Errors in the boundary itself | ❌ No |
| Errors in child component render | ✅ Yes |
| Errors in lifecycle methods | ✅ Yes |

---

### Functional alternative

React 19 introduces a \`use()\` hook and the \`<ErrorBoundary>\` component directly, but until then you need a class component or a library like **react-error-boundary**:

${B}jsx
import { ErrorBoundary } from 'react-error-boundary';

<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <MyWidget />
</ErrorBoundary>
${B}`,
  },
  {
    orderNumber: 51,
    title: "What is _React.StrictMode_?",
    group: "Advanced Patterns",
    difficulty: 1,
    content: `\`React.StrictMode\` is a development-only tool that helps you find potential problems in your app. It **doesn't render any visible UI** and has **no effect in production**.

### How to use it

${B}jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
${B}

---

### What StrictMode does

#### 1. Double-invokes functions to detect side effects

In development, React intentionally renders components **twice** (mount, unmount, mount again) to detect side effects in the render phase or constructor. Your component should produce the same output both times.

This catches bugs like:
- State mutations during render
- Stale closures
- Inconsistent renders

#### 2. Warns about deprecated APIs

- \`componentWillMount\`, \`componentWillUpdate\`, \`componentWillReceiveProps\` are deprecated
- StrictMode logs warnings when they're used

#### 3. Warns about legacy string refs

${B}jsx
// ❌ Deprecated — StrictMode warns
<input ref="myInput" />

// ✅ Modern — no warning
<input ref={inputRef} />
${B}

#### 4. Detects unexpected side effects

Warns about patterns that could cause problems in Concurrent Mode.

---

### Why the double-render?

If your component is pure (same input → same output), rendering twice should produce the same result. If it doesn't, you have a bug. The double-render is how React catches it.

You may notice console.logs firing twice — this is intentional and only happens in development.

---

### StrictMode is safe to leave on

Enable it for the entire app in development. It has zero runtime cost in production.`,
  },
  {
    orderNumber: 52,
    title: "What is the _compound component_ pattern?",
    group: "Advanced Patterns",
    difficulty: 3,
    content: `The **compound component** pattern lets a group of components work together with **shared implicit state** — similar to how HTML's \`<select>\` and \`<option>\` work together.

The parent manages state and shares it with its children through Context — without the children needing explicit props.

---

### Example: Tabs component

${B}jsx
import { createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

// Parent manages state
function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// Children consume shared state
function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={activeTab === value ? 'active' : ''}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

function TabPanel({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === value ? <div>{children}</div> : null;
}

// Attach sub-components to parent for clean API
Tabs.List  = TabList;
Tabs.Tab   = Tab;
Tabs.Panel = TabPanel;
${B}

### Usage

${B}jsx
<Tabs defaultTab="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="specs">Specs</Tabs.Tab>
    <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel value="overview">Overview content...</Tabs.Panel>
  <Tabs.Panel value="specs">Specs content...</Tabs.Panel>
  <Tabs.Panel value="reviews">Reviews content...</Tabs.Panel>
</Tabs>
${B}

---

### Benefits

- **Flexible composition** — caller decides layout and structure
- **No prop drilling** — state shared via Context
- **Intuitive API** — reads like declarative HTML
- **Encapsulation** — implementation details hidden inside parent

---

### Real-world examples

This pattern is used in: Radix UI, Headless UI, Reach UI, React Select.`,
  },
  {
    orderNumber: 53,
    title: "What are _controlled_ vs _uncontrolled_ components?",
    group: "Advanced Patterns",
    difficulty: 1,
    content: `These terms describe **who controls the value** of a form element — React or the DOM.

---

### Controlled Component

React is the **single source of truth**. The input value is driven by state, and every keystroke updates state via an event handler.

${B}jsx
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}               // React controls the value
      onChange={e => setValue(e.target.value)}
    />
  );
}
${B}

**Benefits:**
- Instant access to the current value (no DOM query)
- Easy to validate, transform, or conditionally disable
- Predictable — React state is the single source of truth

**Downside:** More boilerplate — every input needs a state and an onChange handler.

---

### Uncontrolled Component

The DOM manages its own value. You access it via a **ref** when needed (e.g., on form submit).

${B}jsx
function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value); // read on demand
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="initial" />
      <button type="submit">Submit</button>
    </form>
  );
}
${B}

**Benefits:**
- Less code
- Works well for simple forms
- Better for integrating with non-React code

**Downside:** Can't easily validate or conditionally format the input as the user types.

---

### Comparison

| | Controlled | Uncontrolled |
|---|---|---|
| Value managed by | React state | DOM |
| Access value | \`state\` variable | \`ref.current.value\` |
| Real-time validation | ✅ Easy | ❌ Hard |
| Libraries | Formik, React Hook Form (controlled mode) | React Hook Form (uses refs internally) |
| Default value prop | \`value\` | \`defaultValue\` |

---

### Which to use?

Use **controlled** for most cases — especially when you need validation, dynamic inputs, or computed values.

Use **uncontrolled** for file inputs (which can't be controlled) or simple forms where you only need the value on submit.`,
  },
  {
    orderNumber: 54,
    title: "What are _React Fragments_?",
    group: "Advanced Patterns",
    difficulty: 1,
    content: `**React Fragments** let you group multiple elements without adding an extra DOM node.

### The problem

React components must return a single root element. Before Fragments, developers wrapped everything in a \`<div>\` — adding unnecessary DOM nodes.

${B}jsx
// ❌ Extra <div> pollutes the DOM
function UserInfo() {
  return (
    <div>
      <h1>Alice</h1>
      <p>alice@example.com</p>
    </div>
  );
}
${B}

### Solution: Fragments

${B}jsx
import { Fragment } from 'react';

// ✅ No extra DOM node
function UserInfo() {
  return (
    <Fragment>
      <h1>Alice</h1>
      <p>alice@example.com</p>
    </Fragment>
  );
}
${B}

### Short syntax (most common)

${B}jsx
function UserInfo() {
  return (
    <>
      <h1>Alice</h1>
      <p>alice@example.com</p>
    </>
  );
}
${B}

---

### When to use Fragments

**1. Returning multiple elements from a component:**
${B}jsx
function TableRow() {
  return (
    <>
      <td>Alice</td>
      <td>Developer</td>
    </>
  );
}
// <tr><TableRow /></tr> → <tr><td>Alice</td><td>Developer</td></tr>
// No extra <div> that would break the table structure!
${B}

**2. Conditional rendering of multiple elements:**
${B}jsx
function UserDetails({ user }) {
  return (
    <>
      <h2>{user.name}</h2>
      {user.isAdmin && (
        <>
          <span>Admin</span>
          <button>Manage</button>
        </>
      )}
    </>
  );
}
${B}

---

### Fragment with key (for lists)

Use \`<Fragment key={id}>\` (not \`<>\`) when you need to add a key:

${B}jsx
items.map(item => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </Fragment>
))
${B}`,
  },
  {
    orderNumber: 55,
    title: "What are _synthetic events_ in React?",
    group: "Advanced Patterns",
    difficulty: 2,
    content: `**Synthetic events** are React's cross-browser wrapper around the browser's native events. They provide a consistent API that works the same way in every browser.

### How they work

When you write an event handler in React, you receive a \`SyntheticEvent\` object — not the browser's native event directly.

${B}jsx
function Button() {
  function handleClick(event) {
    // event is a SyntheticEvent, not a native MouseEvent
    console.log(event.type);        // "click"
    console.log(event.target);      // the DOM element
    event.preventDefault();         // works cross-browser
    event.stopPropagation();        // works cross-browser
  }

  return <button onClick={handleClick}>Click me</button>;
}
${B}

---

### SyntheticEvent properties

SyntheticEvent has the same interface as native events:
- \`event.target\` / \`event.currentTarget\`
- \`event.type\`
- \`event.preventDefault()\`
- \`event.stopPropagation()\`
- \`event.nativeEvent\` — access to the underlying browser event

---

### Event pooling (React 16 and earlier)

In React 16, synthetic events were **pooled** — reused for performance. This meant the event object was nullified after the handler ran:

${B}jsx
// ❌ React 16 gotcha — event is null in async code
function handleChange(event) {
  setTimeout(() => {
    console.log(event.target.value); // null! event was reused
  }, 100);
}

// Fix: call event.persist() or read the value synchronously
function handleChange(event) {
  const value = event.target.value; // read synchronously
  setTimeout(() => console.log(value), 100);
}
${B}

**In React 17+, event pooling was removed** — events are not reused and async access works fine.

---

### React uses event delegation

React doesn't attach event listeners to every DOM node. Instead, it attaches **one listener at the root** and uses event bubbling to handle all events. This is more efficient and the reason synthetic events exist.`,
  },

  // ─────────────────────────────────────────────
  // STATE MANAGEMENT
  // ─────────────────────────────────────────────
  {
    orderNumber: 56,
    title: "What is _Redux_ and how does it work?",
    group: "State Management",
    difficulty: 2,
    content: `**Redux** is a predictable state management library for JavaScript apps (commonly used with React). All application state lives in a **single global store**, and state can only be changed by dispatching **actions** that pass through **reducers**.

### Core concepts

${B}text
Action → Reducer → Store → View → Action (cycle)
${B}

**1. Store** — the single source of truth (one big JavaScript object)

**2. Action** — a plain object describing what happened

${B}jsx
const action = { type: 'counter/increment', payload: 1 };
${B}

**3. Reducer** — a pure function that takes (state, action) and returns new state

${B}jsx
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/increment':
      return { value: state.value + action.payload };
    case 'counter/decrement':
      return { value: state.value - action.payload };
    default:
      return state;
  }
}
${B}

**4. Dispatch** — the only way to trigger state changes

${B}jsx
store.dispatch({ type: 'counter/increment', payload: 1 });
${B}

---

### With React (react-redux)

${B}jsx
import { Provider, useSelector, useDispatch } from 'react-redux';

// Wrap your app in Provider
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

// Read state with useSelector
// Dispatch actions with useDispatch
function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'counter/increment', payload: 1 })}>+</button>
    </>
  );
}
${B}

---

### Three principles of Redux

1. **Single source of truth** — one store, one state tree
2. **State is read-only** — only actions can trigger changes
3. **Changes are made with pure functions** — reducers are pure

---

### When to use Redux

✅ Large apps with complex, shared state
✅ Many components need the same data
✅ Predictable state history (time-travel debugging)

For smaller apps, Context API + useReducer is often sufficient.`,
  },
  {
    orderNumber: 57,
    title: "What is _Redux Toolkit_ (RTK)?",
    group: "State Management",
    difficulty: 2,
    content: `**Redux Toolkit (RTK)** is the official, opinionated way to write Redux. It simplifies Redux setup with less boilerplate and includes best practices built-in.

It's now the **recommended way** to write Redux — the old "manual" Redux approach has too much boilerplate.

### What RTK provides

| Feature | What it does |
|---|---|
| \`configureStore\` | Sets up store with good defaults (Redux DevTools, Thunk middleware) |
| \`createSlice\` | Combines actions + reducer in one place |
| \`createAsyncThunk\` | Handles async operations with loading/error states |
| \`createEntityAdapter\` | Normalizes and manages collections of data |

---

### Example: Counter with RTK

${B}jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';

// createSlice generates actions AND reducer
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state, action) => {
      state.value += action.payload; // "mutating" is safe — RTK uses Immer internally
    },
    decrement: (state, action) => {
      state.value -= action.payload;
    },
    reset: (state) => {
      state.value = 0;
    }
  }
});

export const { increment, decrement, reset } = counterSlice.actions;

const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});
${B}

---

### Async with createAsyncThunk

${B}jsx
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchUser = createAsyncThunk('users/fetchById', async (userId) => {
  const res = await fetch(\`/api/users/\${userId}\`);
  return res.json();
});

const userSlice = createSlice({
  name: 'users',
  initialState: { user: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending,   (state) => { state.loading = true; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected,  (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
${B}

---

### Why "mutating" state is safe in RTK

RTK uses **Immer** under the hood. When you write \`state.value += 1\`, Immer intercepts it and produces a new immutable state object. You write mutable-looking code, but get immutable updates.`,
  },
  {
    orderNumber: 58,
    title: "What is _Redux middleware_?",
    group: "State Management",
    difficulty: 2,
    content: `**Redux middleware** sits between the dispatch call and the reducer, allowing you to intercept, modify, or add side effects to dispatched actions.

${B}text
dispatch(action) → middleware(s) → reducer → new state
${B}

---

### Why middleware is needed

Reducers must be **pure functions** — no API calls, no side effects. Middleware is where you handle:
- Async operations (API calls)
- Logging
- Crash reporting
- Analytics

---

### Creating custom middleware

${B}jsx
// Middleware structure
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action); // pass to next middleware or reducer
  console.log('New state:', store.getState());
  return result;
};

// Add to store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefault) => getDefault().concat(loggerMiddleware)
});
${B}

---

### Redux Thunk (built into RTK)

The most common middleware — lets action creators return **functions** instead of plain objects, enabling async logic:

${B}jsx
// Thunk action creator
function fetchPosts() {
  return async (dispatch) => {
    dispatch({ type: 'posts/loading' });
    try {
      const data = await fetch('/api/posts').then(r => r.json());
      dispatch({ type: 'posts/loaded', payload: data });
    } catch (err) {
      dispatch({ type: 'posts/error', payload: err.message });
    }
  };
}

// Dispatch it like any action
dispatch(fetchPosts());
${B}

---

### Redux Saga

An alternative to Thunk that uses **generator functions** for more complex async flows:

${B}jsx
function* fetchPostsSaga() {
  yield takeEvery('posts/fetch', function* handler() {
    try {
      const data = yield call(fetch, '/api/posts');
      yield put({ type: 'posts/loaded', payload: data });
    } catch (err) {
      yield put({ type: 'posts/error' });
    }
  });
}
${B}

Sagas are more powerful (complex flows, cancellation, debouncing) but have a steeper learning curve.`,
  },
  {
    orderNumber: 59,
    title: "When should you use _Context API_ vs _Redux_?",
    group: "State Management",
    difficulty: 2,
    content: `Both Context API and Redux manage shared state — but they solve different problems at different scales.

---

### Context API — built-in, simple

**Use Context when:**
- You have **global, infrequently-changing** data (theme, locale, current user)
- The app is **small to medium** sized
- You want no extra dependencies
- State is simple enough for \`useState\` or \`useReducer\`

${B}jsx
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}
${B}

**Limitation:** Every component that consumes a context re-renders when the context value changes — even if they only care about one slice.

---

### Redux — external library, powerful

**Use Redux when:**
- Many components across the tree share **frequently-changing** state
- You need **time-travel debugging** (Redux DevTools)
- Complex async flows with multiple related states (loading, error, data)
- Large team needs a **strict, predictable pattern**
- You want to **derive/select** specific slices of state efficiently (reselect)

${B}jsx
const count = useSelector(state => state.counter.value); // only re-renders when count changes
${B}

Redux's \`useSelector\` only re-renders the component if the **selected slice** changes — more granular than Context.

---

### Quick decision guide

| Situation | Use |
|---|---|
| Theme, language, auth user | Context API |
| Complex app state, many features | Redux Toolkit |
| Simple forms | Local state (\`useState\`) |
| Server state (caching) | React Query / SWR |
| Moderate complexity | Zustand |

---

### Modern alternatives

- **Zustand** — minimal Redux without the boilerplate
- **Jotai** — atomic state (like Recoil but simpler)
- **React Query / TanStack Query** — server state, not UI state
- **Valtio** — proxy-based reactive state`,
  },
  {
    orderNumber: 60,
    title: "What is _Zustand_ and why is it popular?",
    group: "State Management",
    difficulty: 2,
    content: `**Zustand** is a small, fast state management library for React. It provides global state with minimal boilerplate — much simpler than Redux while avoiding the performance pitfalls of Context API.

The name means "state" in German.

---

### Setup

${B}bash
npm install zustand
${B}

### Create a store

${B}jsx
import { create } from 'zustand';

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset:     () => set({ count: 0 }),
}));
${B}

### Use in any component — no Provider needed

${B}jsx
function Counter() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>−</button>
    </>
  );
}
${B}

---

### Selective subscription (performance)

Components only re-render when the selected slice changes:

${B}jsx
// Only re-renders when count changes — not when other store values change
const count = useCounterStore((state) => state.count);

// Only re-renders when increment function reference changes (rarely)
const increment = useCounterStore((state) => state.increment);
${B}

---

### Async actions

${B}jsx
const useUserStore = create((set) => ({
  user: null,
  loading: false,
  fetchUser: async (id) => {
    set({ loading: true });
    const user = await fetch(\`/api/users/\${id}\`).then(r => r.json());
    set({ user, loading: false });
  }
}));
${B}

---

### Why developers love Zustand

| Feature | Zustand |
|---|---|
| Boilerplate | Minimal |
| Provider needed? | ❌ No |
| DevTools support | ✅ Yes |
| TypeScript | ✅ Excellent |
| Bundle size | ~1KB |
| Performance | Fine-grained subscriptions |`,
  },
  {
    orderNumber: 61,
    title: "What is _immutability_ and why does it matter in React?",
    group: "State Management",
    difficulty: 2,
    content: `**Immutability** means never modifying existing data — instead, creating a **new copy** with the changes applied.

This is fundamental to React because React uses **reference equality** (===) to detect state changes. If you mutate an object, its reference stays the same — React thinks nothing changed and skips re-rendering.

---

### The mutation bug

${B}jsx
function App() {
  const [user, setUser] = useState({ name: 'Alice', age: 30 });

  function birthday() {
    // ❌ WRONG — mutates the existing object
    user.age += 1;
    setUser(user); // same reference! React sees no change → no re-render
  }

  return <button onClick={birthday}>{user.name}: {user.age}</button>;
}
${B}

### The correct, immutable way

${B}jsx
function birthday() {
  // ✅ CORRECT — create a new object
  setUser({ ...user, age: user.age + 1 }); // new reference → React re-renders
}
${B}

---

### Immutable patterns

**Updating an object:**
${B}jsx
// ❌ Mutation
state.user.name = 'Bob';

// ✅ Immutable
const newState = { ...state, user: { ...state.user, name: 'Bob' } };
${B}

**Adding to an array:**
${B}jsx
// ❌ Mutation
items.push(newItem);

// ✅ Immutable
const newItems = [...items, newItem];
${B}

**Removing from an array:**
${B}jsx
// ✅ Immutable
const newItems = items.filter(item => item.id !== targetId);
${B}

**Updating an item in an array:**
${B}jsx
// ✅ Immutable
const newItems = items.map(item =>
  item.id === targetId ? { ...item, done: true } : item
);
${B}

---

### Tools that help

- **Immer** — lets you write "mutating" code that produces immutable updates (used by Redux Toolkit)
- **structuredClone()** — native deep clone (not needed for most React cases)

---

### Why immutability enables performance

\`React.memo\`, \`PureComponent\`, \`useSelector\` (Redux) — they all rely on reference equality. Immutable updates create new references → these optimizations work correctly.`,
  },

  // ─────────────────────────────────────────────
  // FORMS
  // ─────────────────────────────────────────────
  {
    orderNumber: 62,
    title: "How do you handle _forms_ in React?",
    group: "Forms",
    difficulty: 1,
    content: `React forms can be handled in two main ways: **controlled** (React manages values) or **uncontrolled** (DOM manages values via refs).

---

### Controlled form (recommended)

${B}jsx
function SignupForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const errs = {};
    if (!form.name)  errs.name  = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    if (form.password.length < 8) errs.password = 'Min 8 characters';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    console.log('Submit:', form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="name"     value={form.name}     onChange={handleChange} placeholder="Name" />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <input name="email"    value={form.email}    onChange={handleChange} placeholder="Email" />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Password" />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
${B}

---

### Form libraries (recommended for complex forms)

**React Hook Form** — minimal re-renders, great performance:
${B}jsx
import { useForm } from 'react-hook-form';

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Email required' })} />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
${B}

**Formik** — controlled-style form management with validation:
${B}bash
npm install formik yup   # yup for schema validation
${B}

---

### Key concepts

| Concept | Description |
|---|---|
| \`e.preventDefault()\` | Prevent default browser form submission |
| \`[e.target.name]\` | Dynamic key update for multiple fields |
| \`onSubmit\` | Called when form is submitted |
| Validation | Check fields and set error state |`,
  },
  {
    orderNumber: 63,
    title: "What are popular _React form libraries_ and when do you use them?",
    group: "Forms",
    difficulty: 2,
    content: `Managing forms manually with \`useState\` works for small forms, but becomes messy for large forms with validation, async submission, and complex field logic. Libraries solve this cleanly.

---

### React Hook Form

**Best for:** Performance-critical forms, minimal re-renders.

Uses **uncontrolled inputs** with refs internally — inputs don't trigger re-renders on every keystroke.

${B}jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...register('password')} />
      {errors.password && <p>{errors.password.message}</p>}

      <button disabled={isSubmitting}>Login</button>
    </form>
  );
}
${B}

---

### Formik

**Best for:** Teams familiar with controlled forms, complex wizard/multi-step forms.

${B}jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  email: Yup.string().email().required(),
});

<Formik initialValues={{ email: '' }} validationSchema={schema} onSubmit={handleSubmit}>
  <Form>
    <Field name="email" />
    <ErrorMessage name="email" component="p" />
    <button type="submit">Submit</button>
  </Form>
</Formik>
${B}

---

### Comparison

| Feature | React Hook Form | Formik |
|---|---|---|
| Re-renders on keystroke | ❌ Minimal | ✅ Every keystroke |
| Bundle size | ~9KB | ~13KB |
| Validation | Zod, Yup, custom | Yup, custom |
| Learning curve | Low | Medium |
| Best for | Performance | Simplicity/familiarity |

**Verdict:** React Hook Form is generally preferred for new projects due to better performance.`,
  },

  // ─────────────────────────────────────────────
  // REACT ROUTER
  // ─────────────────────────────────────────────
  {
    orderNumber: 64,
    title: "What is _React Router_ and how does it work?",
    group: "React Router",
    difficulty: 1,
    content: `**React Router** is the standard library for client-side routing in React apps. It lets you build **single-page applications (SPAs)** where navigating between pages doesn't reload the browser — React handles the URL changes and renders the matching component.

---

### Installation

${B}bash
npm install react-router-dom
${B}

---

### Basic setup (React Router v6)

${B}jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users/42">User 42</Link>
      </nav>

      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/about"     element={<About />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="*"          element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
${B}

---

### How it works

1. **BrowserRouter** uses the HTML5 History API to sync the URL with the app state — no page reloads
2. **Routes** looks at the current URL and renders the first matching **Route**
3. **Link** renders an \`<a>\` tag that updates the URL without reloading
4. Components receive URL info via hooks (\`useParams\`, \`useLocation\`, \`useNavigate\`)

---

### Essential hooks

${B}jsx
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();          // get URL params (/users/:id)
  const navigate = useNavigate();       // programmatic navigation
  const location = useLocation();       // current URL info

  return (
    <>
      <p>User ID: {id}</p>
      <button onClick={() => navigate('/')}>Go Home</button>
      <p>Current path: {location.pathname}</p>
    </>
  );
}
${B}

---

### Link vs \`<a>\` tag

| | \`<Link>\` | \`<a>\` |
|---|---|---|
| Page reload | ❌ No | ✅ Yes |
| React state preserved | ✅ Yes | ❌ No |
| Use for | Internal routes | External URLs |`,
  },
  {
    orderNumber: 65,
    title: "What is the difference between _BrowserRouter_ and _HashRouter_?",
    group: "React Router",
    difficulty: 2,
    content: `Both \`BrowserRouter\` and \`HashRouter\` provide client-side routing, but they use different strategies to manage URLs.

---

### BrowserRouter

Uses the **HTML5 History API** (\`pushState\`, \`replaceState\`) to create clean URLs:

${B}text
https://myapp.com/about
https://myapp.com/users/42
https://myapp.com/dashboard/settings
${B}

**Pros:**
- Clean, professional URLs
- Works with \`<meta>\` tags and SEO tools
- Standard for modern apps

**Cons:**
- Requires **server configuration** — the server must serve the same \`index.html\` for all routes
- Without server config, refreshing \`/about\` returns a 404 (server looks for \`/about\` file)

**Nginx config:**
${B}nginx
location / {
  try_files $uri $uri/ /index.html;
}
${B}

---

### HashRouter

Uses the **URL hash (\`#\`)** to manage routing — everything after \`#\` is handled client-side and never sent to the server:

${B}text
https://myapp.com/#/about
https://myapp.com/#/users/42
${B}

**Pros:**
- Works with **any static file server** — no server config needed
- Safe to refresh any route (hash is not sent to server)

**Cons:**
- Ugly URLs with \`#\`
- Hash portion not included in HTTP requests — can break some analytics
- Not ideal for SEO

---

### Which to use?

| Situation | Use |
|---|---|
| Production app with configurable server | \`BrowserRouter\` ✅ |
| Static hosting (GitHub Pages, simple S3) | \`HashRouter\` |
| Need clean URLs anywhere | \`BrowserRouter\` + server config |
| GitHub Pages workaround | \`HashRouter\` |

**In most cases, use \`BrowserRouter\`** and configure your server/host to handle client-side routing.`,
  },
  {
    orderNumber: 66,
    title: "How do you implement _nested routes_ in React Router v6?",
    group: "React Router",
    difficulty: 2,
    content: `**Nested routes** let you render child routes inside a parent layout component. React Router v6 makes this significantly cleaner than v5.

---

### Setup

${B}jsx
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>          {/* parent */}
          <Route index element={<Home />} />            {/* /        */}
          <Route path="about"   element={<About />} />  {/* /about   */}
          <Route path="dashboard" element={<DashboardLayout />}> {/* nested */}
            <Route index element={<DashHome />} />      {/* /dashboard */}
            <Route path="settings" element={<Settings />} /> {/* /dashboard/settings */}
            <Route path="profile"  element={<Profile />} />  {/* /dashboard/profile  */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
${B}

---

### The Outlet component

\`<Outlet />\` is where the child route renders inside the parent component:

${B}jsx
function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <main>
        <Outlet /> {/* child route renders here */}
      </main>

      <footer>My App</footer>
    </div>
  );
}

function DashboardLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <aside>
        <Link to="/dashboard">Overview</Link>
        <Link to="/dashboard/settings">Settings</Link>
        <Link to="/dashboard/profile">Profile</Link>
      </aside>
      <section>
        <Outlet /> {/* nested dashboard routes render here */}
      </section>
    </div>
  );
}
${B}

---

### Index routes

The \`index\` prop marks the default child route (renders when the parent path is matched exactly):

${B}jsx
<Route path="dashboard" element={<DashboardLayout />}>
  <Route index element={<DashHome />} />    {/* renders at /dashboard */}
  <Route path="settings" element={<Settings />} /> {/* renders at /dashboard/settings */}
</Route>
${B}

---

### Passing data to Outlet (Outlet context)

${B}jsx
function DashboardLayout() {
  const [user] = useState({ name: 'Alice' });
  return <Outlet context={{ user }} />;
}

function Settings() {
  const { user } = useOutletContext();
  return <p>Settings for {user.name}</p>;
}
${B}`,
  },
  {
    orderNumber: 67,
    title: "How do you implement _protected routes_ in React Router?",
    group: "React Router",
    difficulty: 2,
    content: `**Protected routes** redirect unauthenticated users to a login page before they can access certain parts of your app.

---

### The ProtectedRoute component (v6)

${B}jsx
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
  const { isAuthenticated } = useAuth(); // your auth hook

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // redirect to login
  }

  return <Outlet />; // render the protected content
}
${B}

---

### Using it in Routes

${B}jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes — all nested routes require auth */}
        <Route element={<ProtectedRoute />}>
          <Route path="/"          element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile"   element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
${B}

---

### Preserve the redirect URL

After login, redirect back to where the user was trying to go:

${B}jsx
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Pass current location in state so login can redirect back
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

// In the Login component:
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  async function handleLogin(credentials) {
    await auth.login(credentials);
    navigate(from, { replace: true }); // back to original destination
  }
}
${B}

---

### Role-based protection

${B}jsx
function RoleRoute({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/forbidden" replace />;

  return <Outlet />;
}

// Usage
<Route element={<RoleRoute allowedRoles={['admin']} />}>
  <Route path="/admin" element={<AdminPanel />} />
</Route>
${B}`,
  },
  {
    orderNumber: 68,
    title: "What is _useNavigate_ and _useParams_ in React Router?",
    group: "React Router",
    difficulty: 1,
    content: `These are two essential React Router v6 hooks for working with navigation and URL parameters.

---

## useNavigate

\`useNavigate\` returns a function for **programmatic navigation** — navigating without a \`<Link>\` click.

${B}jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await login(credentials);

    if (success) {
      navigate('/dashboard');        // navigate to a path
    }
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
${B}

### Navigation options

${B}jsx
navigate('/about');                   // go to /about
navigate(-1);                         // go back (like browser back button)
navigate(1);                          // go forward
navigate('/login', { replace: true }); // replace current history entry (no back button)
navigate('/profile', {
  state: { from: 'dashboard' }         // pass data to the destination
});
${B}

### Reading state on destination

${B}jsx
function Profile() {
  const location = useLocation();
  const from = location.state?.from; // 'dashboard'
}
${B}

---

## useParams

\`useParams\` returns an object of **URL parameters** from the current route.

${B}jsx
import { useParams } from 'react-router-dom';

// Route: <Route path="/users/:userId/posts/:postId" element={<Post />} />
// URL:   /users/42/posts/17

function Post() {
  const { userId, postId } = useParams();

  useEffect(() => {
    fetchPost(userId, postId);
  }, [userId, postId]);

  return <p>Post {postId} by User {userId}</p>;
}
${B}

### Optional params

${B}jsx
// Route: <Route path="/products/:category?/:id" element={<Product />} />
// /products/electronics/5  → category: 'electronics', id: '5'
// /products/5              → category: undefined, id: '5'
function Product() {
  const { category, id } = useParams();
}
${B}

---

### Other navigation hooks

| Hook | Purpose |
|---|---|
| \`useLocation\` | Current URL, pathname, search, state |
| \`useSearchParams\` | Read/write URL query string (\`?q=react\`) |
| \`useMatch\` | Check if current URL matches a pattern |`,
  },

  // ─────────────────────────────────────────────
  // TESTING
  // ─────────────────────────────────────────────
  {
    orderNumber: 69,
    title: "How do you _test React components_?",
    group: "Testing",
    difficulty: 2,
    content: `Testing React components ensures your UI works correctly and prevents regressions. The standard testing stack is **Jest + React Testing Library (RTL)**.

---

### Setup

Most React projects (Vite, CRA) come with Jest pre-configured. Install RTL:

${B}bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
${B}

---

### What to test

| Type | What | Tool |
|---|---|---|
| Unit | Single component in isolation | Jest + RTL |
| Integration | Multiple components together | Jest + RTL |
| E2E | Full user flows in a real browser | Playwright / Cypress |

---

### Basic component test

${B}jsx
// Button.tsx
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button onClick={() => {}}>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
${B}

---

### Testing with user events (preferred over fireEvent)

${B}jsx
import userEvent from '@testing-library/user-event';

test('types into input', async () => {
  const user = userEvent.setup();
  render(<input aria-label="search" />);

  const input = screen.getByRole('textbox', { name: /search/i });
  await user.type(input, 'React');

  expect(input).toHaveValue('React');
});
${B}

---

### Testing async components

${B}jsx
test('loads and displays user', async () => {
  render(<UserProfile userId="1" />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await screen.findByText('Alice'); // waits for element to appear
  expect(screen.getByText('alice@example.com')).toBeInTheDocument();
});
${B}

---

### Core RTL queries

| Query | When to use |
|---|---|
| \`getBy*\` | Expect element to exist (throws if not found) |
| \`queryBy*\` | Expect element to NOT exist (returns null) |
| \`findBy*\` | Async — wait for element to appear |`,
  },
  {
    orderNumber: 70,
    title: "What is _React Testing Library_ and its core philosophy?",
    group: "Testing",
    difficulty: 1,
    content: `**React Testing Library (RTL)** is the standard library for testing React components. It's built on top of \`@testing-library/dom\` and focuses on testing components the way **users actually interact with them** — not implementation details.

### Core philosophy

> "The more your tests resemble the way your software is used, the more confidence they can give you."
> — Kent C. Dodds (creator)

This means:
- Test **what the user sees and does** (text, buttons, form fields)
- Don't test **internal implementation** (state variables, component methods)
- Query by **accessible attributes** (role, label, text) — not CSS classes or test IDs

---

### RTL vs Enzyme

| | RTL | Enzyme |
|---|---|---|
| Philosophy | User-facing behavior | Implementation details |
| DOM interaction | Realistic | Shallow/simulated |
| Refactor safety | ✅ High | ❌ Low (breaks on internals) |
| Maintained? | ✅ Active | ⚠️ Mostly inactive |

---

### Querying the DOM — priority order

RTL encourages queries in this priority order (most user-accessible → least):

${B}jsx
// 1. By role (best — mirrors accessibility tree)
screen.getByRole('button', { name: /submit/i });
screen.getByRole('textbox', { name: /email/i });

// 2. By label text
screen.getByLabelText('Password');

// 3. By placeholder
screen.getByPlaceholderText('Enter email...');

// 4. By text content
screen.getByText('Hello, Alice');

// 5. By display value (input value)
screen.getByDisplayValue('alice@example.com');

// 6. By alt text (images)
screen.getByAltText('Profile picture');

// 7. By title
screen.getByTitle('Close modal');

// 8. By test ID (last resort)
screen.getByTestId('submit-btn');
${B}

---

### Key assertion matchers

${B}jsx
import '@testing-library/jest-dom';

expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(element).toBeDisabled();
expect(element).toHaveValue('Alice');
expect(element).toHaveTextContent('Hello');
expect(element).toHaveClass('active');
expect(element).toHaveFocus();
${B}`,
  },
  {
    orderNumber: 71,
    title: "What is _snapshot testing_ in React?",
    group: "Testing",
    difficulty: 1,
    content: `**Snapshot testing** captures the rendered output of a component and saves it to a file. On future test runs, it compares the output against the saved snapshot — and fails if anything changed.

It's useful for detecting **unexpected UI changes**.

---

### How it works

${B}jsx
import { render } from '@testing-library/react';
import Button from './Button';

test('Button renders correctly', () => {
  const { container } = render(<Button color="blue">Click me</Button>);
  expect(container).toMatchSnapshot();
});
${B}

First run: creates a \`.snap\` file:
${B}text
// Button.test.tsx.snap
exports[\`Button renders correctly 1\`] = \`
<div>
  <button class="btn btn-blue">Click me</button>
</div>
\`;
${B}

Second run: compares output to the saved snapshot. If the button class changes to \`btn-primary\`, the test fails.

---

### Updating snapshots

When you intentionally change a component, update the snapshot:

${B}bash
jest --updateSnapshot
# or
jest -u
${B}

---

### Inline snapshots

Store the snapshot in the test file itself instead of a separate file:

${B}jsx
test('renders button', () => {
  const { container } = render(<Button>Click</Button>);
  expect(container).toMatchInlineSnapshot(\`
    <div>
      <button>Click</button>
    </div>
  \`);
});
${B}

---

### Pros and cons

| Pros | Cons |
|---|---|
| Easy to set up | Easy to mindlessly update snapshots |
| Catches accidental changes | Large snapshots are hard to review |
| Documents rendered output | Doesn't test behavior |
| Fast | Brittle — small changes break them |

---

### Best practices

- Keep snapshots **small** — snapshot only the meaningful part, not the whole page
- Prefer **behavioral tests** (does clicking submit call the handler?) over snapshots
- Snapshots are best for **stable, presentational components** (icons, badges, typography)
- Always **review snapshot diffs** when they fail — don't blindly update`,
  },
  {
    orderNumber: 72,
    title: "How do you _mock API calls_ in React tests?",
    group: "Testing",
    difficulty: 2,
    content: `When testing components that fetch data, you don't want to make real network requests — they're slow, unreliable, and depend on an external server. Instead, you **mock** the API calls.

---

### Option 1: Mock fetch with Jest

${B}jsx
// UserProfile.test.jsx
global.fetch = jest.fn();

test('displays user name after loading', async () => {
  // Mock fetch to return fake data
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1, name: 'Alice', email: 'alice@test.com' })
  });

  render(<UserProfile userId="1" />);

  // Loading state
  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  // Wait for user data to appear
  await screen.findByText('Alice');
  expect(screen.getByText('alice@test.com')).toBeInTheDocument();
});

afterEach(() => jest.clearAllMocks());
${B}

---

### Option 2: Mock with MSW (Mock Service Worker) — recommended

**MSW** intercepts requests at the network level — the same as a real server. This is the most realistic approach.

${B}bash
npm install --save-dev msw
${B}

${B}jsx
// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({ id: params.id, name: 'Alice' });
  }),
];

// src/mocks/server.js (for Node/Jest)
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
${B}

${B}jsx
// setupTests.js
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
${B}

${B}jsx
// In tests — override handlers for specific scenarios
test('shows error when API fails', async () => {
  server.use(
    http.get('/api/users/:id', () => HttpResponse.error())
  );

  render(<UserProfile userId="1" />);
  await screen.findByText(/something went wrong/i);
});
${B}

---

### Option 3: Mock module (for axios or custom API functions)

${B}jsx
// api.js
export const fetchUser = (id) => axios.get(\`/users/\${id}\`);

// UserProfile.test.jsx
jest.mock('./api');
import { fetchUser } from './api';

test('shows user', async () => {
  fetchUser.mockResolvedValue({ data: { name: 'Bob' } });
  render(<UserProfile userId="2" />);
  await screen.findByText('Bob');
});
${B}`,
  },

  // ─────────────────────────────────────────────
  // TYPESCRIPT
  // ─────────────────────────────────────────────
  {
    orderNumber: 73,
    title: "How do you use _TypeScript_ with React?",
    group: "TypeScript with React",
    difficulty: 2,
    content: `TypeScript adds **static typing** to React, catching errors at compile time instead of runtime. It's now the default for most new React projects.

---

### Setup

With Vite (recommended):
${B}bash
npm create vite@latest my-app -- --template react-ts
${B}

Files use \`.tsx\` for JSX + TypeScript.

---

### Typing props

${B}tsx
// Define an interface for props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;  // optional prop
  variant?: 'primary' | 'secondary' | 'danger'; // union type
}

function Button({ label, onClick, disabled = false, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`btn btn-\${variant}\`}
    >
      {label}
    </button>
  );
}
${B}

---

### Typing useState

${B}tsx
// TypeScript infers from initial value
const [count, setCount] = useState(0);          // number
const [name, setName]   = useState('');         // string
const [active, setActive] = useState(false);    // boolean

// Explicit generic for objects or nullable types
const [user, setUser] = useState<User | null>(null);

interface User {
  id: number;
  name: string;
  email: string;
}
${B}

---

### Typing events

${B}tsx
function Form() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
${B}

---

### Typing useRef

${B}tsx
const inputRef = useRef<HTMLInputElement>(null);
// inputRef.current is HTMLInputElement | null

const counterRef = useRef<number>(0);
// counterRef.current is number
${B}

---

### Typing children

${B}tsx
interface CardProps {
  children: React.ReactNode; // accepts any valid JSX
  title: string;
}

function Card({ children, title }: CardProps) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
${B}`,
  },
  {
    orderNumber: 74,
    title: "How do you type _custom Hooks_ and _context_ in TypeScript?",
    group: "TypeScript with React",
    difficulty: 3,
    content: `Typing Hooks and Context properly in TypeScript is essential for getting autocomplete and type safety throughout your app.

---

### Typing custom Hooks

${B}tsx
// useFetch.ts
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetch(url)
      .then(res => res.json() as Promise<T>)
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => setState({ data: null, loading: false, error: err.message }));
  }, [url]);

  return state;
}

// Usage — TypeScript infers the generic
interface User { id: number; name: string; }
const { data, loading } = useFetch<User>('/api/user/1');
// data is User | null — fully typed!
${B}

---

### Typing Context

${B}tsx
// AuthContext.tsx
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password);
    setUser(user);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook with null guard
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context; // guaranteed non-null
}

// Usage — fully typed
function Profile() {
  const { user, logout } = useAuth(); // user: User | null, logout: () => void
}
${B}

---

### Generic components

${B}tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage — T inferred as User
<List
  items={users}
  renderItem={user => <span>{user.name}</span>}
  keyExtractor={user => user.id.toString()}
/>
${B}`,
  },

  // ─────────────────────────────────────────────
  // REACT 18
  // ─────────────────────────────────────────────
  {
    orderNumber: 75,
    title: "What's new in _React 18_?",
    group: "React 18+",
    difficulty: 2,
    content: `React 18 (released March 2022) introduced **Concurrent React** — the biggest change since React Hooks. It enables React to prepare multiple UI versions simultaneously and work on them without blocking the main thread.

---

### 1. New root API

${B}jsx
// Old (React 17)
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// New (React 18)
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<App />);
${B}

Switching to \`createRoot\` opts your app into all React 18 features.

---

### 2. Automatic batching

React 18 automatically batches state updates in **all** contexts — not just React event handlers:

${B}jsx
// React 17 — two separate renders
setTimeout(() => {
  setCount(c => c + 1);  // render
  setFlag(f => !f);      // render
}, 1000);

// React 18 — one render (batched)
setTimeout(() => {
  setCount(c => c + 1);  // \
  setFlag(f => !f);      //  → batched → single render
}, 1000);
${B}

---

### 3. Concurrent features

| Feature | What it does |
|---|---|
| \`useTransition\` | Mark updates as non-urgent |
| \`useDeferredValue\` | Defer rendering of a value |
| \`<Suspense>\` improvements | Works with data fetching too |
| \`useId\` | SSR-safe unique IDs |
| \`useSyncExternalStore\` | Subscribe to external stores safely |

---

### 4. Suspense on the server (Streaming SSR)

React 18 enables **streaming HTML** from the server — the browser can start rendering HTML before the full response is complete:

${B}jsx
// Server streams HTML in chunks
// <Suspense> boundaries define streaming boundaries
<Suspense fallback={<Spinner />}>
  <SlowDataComponent />
</Suspense>
${B}

---

### 5. React Server Components (RSC)

A new component type that runs **only on the server** — no JavaScript sent to the client. Introduced in React 18, adopted by Next.js App Router.

---

### Upgrading to React 18

${B}bash
npm install react@18 react-dom@18
${B}

Then switch \`ReactDOM.render\` to \`createRoot\`. Most code works without changes.`,
  },
  {
    orderNumber: 76,
    title: "What is _Concurrent Mode_ in React?",
    group: "React 18+",
    difficulty: 3,
    content: `**Concurrent Mode** (now called "Concurrent React") is a set of React features that allow React to work on **multiple versions of the UI at the same time** — pausing, interrupting, and resuming renders to keep the UI responsive.

### The core problem Concurrent Mode solves

In React 17 and below, rendering was **synchronous and uninterruptible**. Once React started rendering, it had to finish — even if a more urgent update (like a user keystroke) came in. This caused UI jank.

${B}text
React 17: Start render → can't stop → finish (UI blocked during this time)
React 18: Start render → interrupt for urgent work → resume later
${B}

---

### How Concurrent React works

React assigns **priority levels** to updates:

- **Urgent** — typing, clicking, direct user interactions (must be instant)
- **Transition** — search results updating, tab switching (can be deferred)

${B}jsx
import { startTransition, useTransition } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleInput(e) {
    // Urgent — update input immediately
    setQuery(e.target.value);

    // Non-urgent — results can wait
    startTransition(() => {
      setResults(filterItems(e.target.value));
    });
  }

  return (
    <>
      <input value={query} onChange={handleInput} />
      {isPending && <Spinner />}
      <ResultsList results={results} />
    </>
  );
}
${B}

---

### Concurrent features enabled by React 18

| Feature | Description |
|---|---|
| \`useTransition\` | Mark updates as interruptible |
| \`useDeferredValue\` | Defer a value until the browser is free |
| Streaming SSR | Send HTML to browser in chunks |
| Selective hydration | Hydrate visible parts first |

---

### Enabling Concurrent Mode

You automatically get Concurrent React by switching to \`createRoot\`:

${B}jsx
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<App />);
${B}

There's no "mode toggle" — Concurrent React is built into React 18 when you use \`createRoot\`.`,
  },
  {
    orderNumber: 77,
    title: "What is _automatic batching_ in React 18?",
    group: "React 18+",
    difficulty: 2,
    content: `**Automatic batching** means React groups multiple state updates into a **single re-render** automatically — even outside React event handlers.

### Before React 18

React only batched updates inside **React event handlers**. Updates inside \`setTimeout\`, Promises, or native event listeners caused separate renders:

${B}jsx
// React 17

// ✅ Batched (inside React event) — 1 render
<button onClick={() => {
  setA(1);
  setB(2);
  // React batches these → 1 re-render
}}>

// ❌ NOT batched — 2 renders
setTimeout(() => {
  setA(1); // re-render
  setB(2); // re-render
}, 0);

// ❌ NOT batched — 2 renders
fetch('/api').then(() => {
  setA(1); // re-render
  setB(2); // re-render
});
${B}

### React 18 — automatic batching everywhere

${B}jsx
// React 18

// ✅ Batched — 1 render
setTimeout(() => {
  setA(1);
  setB(2);
  // automatically batched → 1 re-render
}, 0);

// ✅ Batched — 1 render
fetch('/api').then(() => {
  setA(1);
  setB(2);
  // automatically batched → 1 re-render
});

// ✅ Batched — 1 render
element.addEventListener('click', () => {
  setA(1);
  setB(2);
});
${B}

---

### Opting out of batching

If you need a specific update to render immediately (rare), use \`flushSync\`:

${B}jsx
import { flushSync } from 'react-dom';

setTimeout(() => {
  flushSync(() => setA(1)); // renders immediately
  flushSync(() => setB(2)); // renders immediately after
}, 0);
${B}

---

### Why does this matter?

Automatic batching means **fewer unnecessary re-renders** → better performance with no code changes required when upgrading to React 18.`,
  },
  {
    orderNumber: 78,
    title: "What are _React Server Components_?",
    group: "React 18+",
    difficulty: 3,
    content: `**React Server Components (RSC)** are components that run **exclusively on the server** — they never execute in the browser. Their output (rendered HTML) is sent to the client, but the component code itself is never shipped.

Introduced in React 18 and adopted by Next.js App Router.

---

### Server Components vs Client Components

| | Server Component | Client Component |
|---|---|---|
| Where it runs | Server only | Browser (and server for SSR) |
| Can use Hooks? | ❌ No | ✅ Yes |
| Can access DB/filesystem? | ✅ Yes | ❌ No |
| Sent to browser? | ❌ No code, only HTML | ✅ Yes |
| Interactive? | ❌ No | ✅ Yes |

---

### Server Component example (Next.js App Router)

${B}jsx
// app/page.tsx — Server Component by default
// This code runs ONLY on the server — never in the browser
async function ProductsPage() {
  // Direct DB access — no need for API route!
  const products = await db.query('SELECT * FROM products');

  return (
    <main>
      <h1>Products</h1>
      {products.map(p => (
        <div key={p.id}>
          <h2>{p.name}</h2>
          <AddToCartButton id={p.id} /> {/* Client Component */}
        </div>
      ))}
    </main>
  );
}
${B}

${B}jsx
// AddToCartButton.tsx — must opt into being a Client Component
'use client'; // directive at the top of the file

function AddToCartButton({ id }) {
  // Can use state and event handlers — it's a Client Component
  const [added, setAdded] = useState(false);

  return (
    <button onClick={() => setAdded(true)}>
      {added ? 'Added!' : 'Add to Cart'}
    </button>
  );
}
${B}

---

### Benefits

1. **Zero JavaScript sent for server components** — reduces bundle size dramatically
2. **Direct data access** — query databases, read files directly (no API layer needed)
3. **Secrets stay on server** — API keys, DB credentials never reach the browser
4. **Automatic code splitting** — only Client Components are sent to the browser

---

### The boundary rule

Server Components **can import** Client Components.
Client Components **cannot import** Server Components (but can accept them as \`children\` props).`,
  },
  {
    orderNumber: 79,
    title: "What is _Streaming SSR_ in React 18?",
    group: "React 18+",
    difficulty: 3,
    content: `**Streaming SSR (Server-Side Rendering)** lets React send HTML to the browser **in chunks** as it's ready — instead of waiting for the entire page to render before sending anything.

---

### Traditional SSR (before React 18)

${B}text
1. User requests /page
2. Server fetches ALL data
3. Server renders ALL HTML
4. Server sends complete HTML ← browser waits here
5. Browser shows page
6. JavaScript hydrates everything
${B}

The user sees a blank screen until ALL data is fetched and ALL HTML is generated.

---

### Streaming SSR (React 18)

${B}text
1. User requests /page
2. Server starts streaming HTML immediately
3. Fast parts stream first → browser shows content early
4. Slow parts stream as data arrives (inside Suspense boundaries)
5. Each section hydrates independently
${B}

---

### How it works with Suspense

${B}jsx
// server/app.jsx
function App() {
  return (
    <html>
      <body>
        <Header />                    {/* streams immediately */}

        <Suspense fallback={<ProductSkeleton />}>
          <ProductDetails />          {/* streams when product data is ready */}
        </Suspense>

        <Suspense fallback={<ReviewsSkeleton />}>
          <Reviews />                 {/* streams when reviews data is ready */}
        </Suspense>
      </body>
    </html>
  );
}
${B}

The browser receives \`<Header />\` and the skeletons instantly, then each \`<Suspense>\` boundary "resolves" and streams its HTML when the data is ready.

---

### Selective hydration

React 18 also enables **selective hydration** — React prioritizes hydrating the parts the user is interacting with first:

${B}text
User clicks Reviews section → React hydrates Reviews first → then rest
${B}

---

### APIs

${B}jsx
// Node.js streaming API
import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(<App />, {
  onShellReady() {
    res.setHeader('Content-Type', 'text/html');
    pipe(res); // start streaming
  }
});
${B}

In Next.js App Router, streaming is built-in automatically with \`loading.tsx\` files and \`<Suspense>\` boundaries.`,
  },

  // ─────────────────────────────────────────────
  // STYLING
  // ─────────────────────────────────────────────
  {
    orderNumber: 80,
    title: "What are the different ways to _style React components_?",
    group: "Styling",
    difficulty: 1,
    content: `React doesn't prescribe a styling approach — you have several options, each with tradeoffs.

---

### 1. Regular CSS / Global stylesheet

${B}jsx
// styles.css
.button { background: blue; color: white; border-radius: 4px; }

// Component
import './styles.css';
function Button() {
  return <button className="button">Click</button>;
}
${B}
✅ Simple, no learning curve
❌ Global scope — class names can conflict

---

### 2. CSS Modules

${B}jsx
// Button.module.css
.button { background: blue; color: white; }

// Component
import styles from './Button.module.css';
function Button() {
  return <button className={styles.button}>Click</button>;
}
// Renders as: <button class="Button_button__abc123">
${B}
✅ Locally scoped — no naming conflicts
✅ Built into Vite/CRA
❌ Separate file per component

---

### 3. CSS-in-JS (styled-components, Emotion)

${B}jsx
import styled from 'styled-components';

const Button = styled.button\`
  background: \${props => props.primary ? 'blue' : 'white'};
  color: \${props => props.primary ? 'white' : 'blue'};
  border-radius: 4px;
  padding: 8px 16px;
\`;

// Usage
<Button primary>Submit</Button>
<Button>Cancel</Button>
${B}
✅ Dynamic styles with props
✅ Co-located with component
❌ Runtime overhead
❌ Larger bundle

---

### 4. Tailwind CSS (utility-first)

${B}jsx
function Button({ primary }) {
  return (
    <button className={\`px-4 py-2 rounded font-medium \${
      primary ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border border-blue-500'
    }\`}>
      Click
    </button>
  );
}
${B}
✅ No CSS files needed
✅ Tiny production bundle (purges unused)
✅ Consistent design tokens
❌ Verbose class lists
❌ Learning curve for utility names

---

### 5. Inline styles

${B}jsx
function Box({ color }) {
  return <div style={{ backgroundColor: color, padding: 16 }}>Content</div>;
}
${B}
✅ Fully dynamic
❌ No pseudo-classes (\`:hover\`)
❌ No media queries
❌ Worse performance (new object each render)

---

### Popularity in 2026

1. **Tailwind CSS** — most popular in new projects
2. **CSS Modules** — solid, framework-agnostic choice
3. **styled-components / Emotion** — still widely used in component libraries`,
  },
  {
    orderNumber: 81,
    title: "What are _CSS Modules_ in React?",
    group: "Styling",
    difficulty: 1,
    content: `**CSS Modules** is a CSS approach where class names are **locally scoped** to the component that imports them — preventing naming conflicts across your app.

They're built into Vite, Create React App, and Next.js — no additional setup needed.

---

### How it works

You write regular CSS in a \`.module.css\` file:

${B}css
/* Button.module.css */
.button {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

.button:hover {
  background-color: #2563eb;
}

.button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
${B}

Import and use with the \`styles\` object:

${B}jsx
import styles from './Button.module.css';

function Button({ disabled, children }) {
  return (
    <button
      className={\`\${styles.button} \${disabled ? styles.disabled : ''}\`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
${B}

In the browser, the class names are transformed to unique hashes:

${B}html
<button class="Button_button__xK3mP Button_disabled__8jQ2N">
${B}

So even if another component has a \`.button\` class, they won't conflict.

---

### Composing CSS Module classes

${B}jsx
import clsx from 'clsx'; // utility for conditional class names

function Button({ variant = 'primary', size = 'md', className }) {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],  // styles.primary or styles.secondary
        styles[size],     // styles.sm, styles.md, styles.lg
        className         // allow external overrides
      )}
    >
      ...
    </button>
  );
}
${B}

---

### CSS Modules vs global CSS

| | CSS Modules | Global CSS |
|---|---|---|
| Scope | Local to component | Global |
| Name conflicts | ❌ Impossible | ✅ Common |
| Dynamic classes | Via JS | Via JS |
| Extra setup | ❌ None (built-in) | ❌ None |`,
  },
  {
    orderNumber: 82,
    title: "What is _CSS-in-JS_ and how does it work with React?",
    group: "Styling",
    difficulty: 2,
    content: `**CSS-in-JS** is an approach where you write CSS styles inside JavaScript files — co-located with your component logic. The styles are injected into the DOM at runtime (or build time with zero-runtime libraries).

Popular libraries: **styled-components**, **Emotion**, **Stitches**.

---

### styled-components

${B}jsx
import styled from 'styled-components';

// Create a styled component — it's a real React component
const Button = styled.button\`
  background: \${({ $primary }) => $primary ? '#3b82f6' : 'white'};
  color: \${({ $primary }) => $primary ? 'white' : '#3b82f6'};
  border: 2px solid #3b82f6;
  padding: 8px 20px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
\`;

// Use like any React component
function App() {
  return (
    <>
      <Button $primary>Submit</Button>
      <Button>Cancel</Button>
    </>
  );
}
${B}

---

### Extending styles

${B}jsx
const PrimaryButton = styled(Button)\`
  font-weight: bold;
  text-transform: uppercase;
\`;
${B}

---

### Emotion

Very similar API to styled-components, but slightly smaller and more flexible:

${B}jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

// Using css prop
function Box() {
  return (
    <div css={css\`
      background: hotpink;
      &:hover { background: deeppink; }
    \`}>
      Hello
    </div>
  );
}
${B}

---

### Zero-runtime CSS-in-JS (modern trend)

**vanilla-extract**, **Linaria**, **Panda CSS** generate static CSS at build time — no runtime overhead:

${B}tsx
// button.css.ts (vanilla-extract)
import { style } from '@vanilla-extract/css';

export const button = style({
  background: 'blue',
  color: 'white',
  ':hover': { background: 'darkblue' }
});
${B}

---

### Pros and cons

| Pros | Cons |
|---|---|
| Co-located with component | Runtime overhead (traditional) |
| Fully dynamic with props | Larger bundles |
| Scoped automatically | Server-side rendering complexity |
| Theming support built-in | Learning curve |`,
  },

  // ─────────────────────────────────────────────
  // ARCHITECTURE & BEST PRACTICES
  // ─────────────────────────────────────────────
  {
    orderNumber: 83,
    title: "What is the difference between _SSR_, _CSR_, and _SSG_?",
    group: "Architecture",
    difficulty: 2,
    content: `These three terms describe **where and when** a web page's HTML is generated.

---

### CSR — Client-Side Rendering

HTML is generated in the **browser** by JavaScript.

${B}text
1. Browser receives a nearly-empty HTML file
2. Downloads JavaScript bundle
3. JavaScript runs → React renders HTML → page appears
4. Interactions work
${B}

**Used by:** Create React App, Vite (by default)

${B}html
<!-- Initial HTML — almost empty -->
<div id="root"></div>
<script src="/bundle.js"></script>
<!-- JavaScript renders the actual content -->
${B}

✅ Rich interactivity, fast page transitions after initial load
❌ Slow initial load (download + parse + execute JS first)
❌ Poor SEO (crawlers may not wait for JS)
❌ Blank page until JS runs

---

### SSR — Server-Side Rendering

HTML is generated on the **server** on each request.

${B}text
1. Browser requests /page
2. Server fetches data + renders HTML
3. Browser receives complete HTML → page appears
4. JavaScript downloads + hydrates → interactions work
${B}

**Used by:** Next.js (\`getServerSideProps\`), Remix

✅ Fast initial page visible (complete HTML sent)
✅ Good SEO
❌ Slower server response (must fetch data for every request)
❌ TTFB (time to first byte) is higher

---

### SSG — Static Site Generation

HTML is generated at **build time** — the same HTML file is served to every user.

${B}text
Build time: Fetch data → Render HTML → Save as .html files
Request:    Browser receives pre-built HTML → instant!
${B}

**Used by:** Next.js (\`getStaticProps\`), Gatsby, Astro

✅ Fastest possible load time (serves pre-built HTML)
✅ Can be served from CDN globally
✅ Excellent SEO
❌ Content can go stale (needs rebuild to update)
❌ Not suitable for real-time/personalized data

---

### Comparison

| | CSR | SSR | SSG |
|---|---|---|---|
| Generated | Browser | Server (per request) | Build time |
| Initial load | Slow | Fast | Fastest |
| SEO | Poor | Good | Excellent |
| Dynamic content | ✅ | ✅ | Limited |
| Best for | Web apps, dashboards | E-commerce, news | Blogs, marketing |

---

### ISR — Incremental Static Regeneration (bonus)

Next.js feature: static pages that auto-revalidate in the background after a specified time — combines SSG speed with fresh content.`,
  },
  {
    orderNumber: 84,
    title: "What are React _best practices_ for building scalable apps?",
    group: "Architecture",
    difficulty: 2,
    content: `Building scalable React apps requires consistent patterns in architecture, state management, performance, and code organization.

---

### 1. Component design

**Single Responsibility** — each component does one thing:
${B}jsx
// ❌ One giant component doing everything
function ProductPage() { /* fetches, validates, renders */ }

// ✅ Split by concern
function ProductPage() {
  return <ProductLayout><ProductDetails /><ProductReviews /></ProductLayout>;
}
${B}

**Small, focused components** — easier to test, understand, and reuse.

---

### 2. Folder structure

${B}text
src/
  components/          # shared/reusable UI components
    Button/
      Button.tsx
      Button.module.css
      Button.test.tsx
  features/            # feature-specific components + logic
    auth/
    products/
  hooks/               # custom hooks
  store/               # global state
  utils/               # pure helper functions
  types/               # TypeScript types
${B}

---

### 3. State management

- Use **local state** first — lift up only when needed
- Don't put everything in global state
- Use **React Query / SWR** for server state (caching, refetching)
- Use **Zustand / Redux Toolkit** for UI state that's shared widely

---

### 4. Avoid prop drilling

Pass context or use a state library when props travel through 3+ levels of unrelated components.

---

### 5. Performance

${B}jsx
// Memoize expensive renders
const List = React.memo(({ items }) => (
  <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
));

// Lazy load routes
const Dashboard = lazy(() => import('./Dashboard'));

// Virtualize long lists
import { FixedSizeList } from 'react-window';
${B}

---

### 6. TypeScript everywhere

Type your props, state, API responses, and custom hooks. It prevents bugs and improves developer experience.

---

### 7. Consistent code style

- Use ESLint + Prettier
- Follow React Hooks rules (eslint-plugin-react-hooks)
- Use consistent naming: \`useSomething\` for hooks, \`handleEvent\` for handlers

---

### 8. Error boundaries

Wrap sections of your app in Error Boundaries so one broken widget doesn't crash the entire page.

---

### 9. Accessibility (a11y)

${B}jsx
// Use semantic HTML + ARIA attributes
<button onClick={toggle} aria-expanded={isOpen} aria-controls="menu">Menu</button>
<ul id="menu" role="menu" hidden={!isOpen}>...</ul>
${B}

---

### 10. Testing

- Unit test custom hooks and utilities
- Integration test user flows with RTL
- E2E test critical paths (checkout, login)`,
  },
  {
    orderNumber: 85,
    title: "What is the _Context API_ — a deep dive?",
    group: "State Management",
    difficulty: 2,
    content: `The **Context API** is React's built-in solution for sharing state across components without prop drilling. Understanding it deeply — including its performance characteristics — is key to using it correctly.

---

### Full setup pattern

${B}jsx
// 1. Create context with TypeScript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 2. Build a Provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom hook with error guard
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>');
  return context;
}

// 4. Consume anywhere in the tree
function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Current: {theme} — Switch
    </button>
  );
}
${B}

---

### Performance: the re-render problem

Every component that calls \`useContext(MyContext)\` re-renders when the context value changes — **even if the specific data it needs didn't change**.

${B}jsx
// ❌ Problem: one context for everything
const AppContext = createContext({ user, theme, cart, settings });
// Every consumer re-renders when ANY value changes

// ✅ Solution: split into focused contexts
const UserContext   = createContext(user);
const ThemeContext  = createContext(theme);
const CartContext   = createContext(cart);
${B}

---

### Memoizing the value

Without memoization, a new object is created on every render — causing all consumers to re-render even if values are the same:

${B}jsx
// ❌ New object every render
<Context.Provider value={{ user, logout }}>

// ✅ Stable reference
const value = useMemo(() => ({ user, logout }), [user, logout]);
<Context.Provider value={value}>
${B}

---

### When Context is NOT enough

Context is great for low-frequency updates (theme, locale, auth user). For high-frequency updates (typed input, animations, mouse position) use **Zustand** or **Jotai** which have granular subscriptions — components only re-render when their specific slice changes.`,
  },
  {
    orderNumber: 86,
    title: "What is _useSyncExternalStore_ in React 18?",
    group: "React 18+",
    difficulty: 3,
    content: `\`useSyncExternalStore\` is a React 18 Hook for **safely subscribing to external stores** — state that lives outside React (like Redux, Zustand, or browser APIs like \`localStorage\`).

It solves a concurrency issue: in Concurrent Mode, React can render components multiple times before committing — if an external store updates between renders, you can get "tearing" (different parts of the UI showing different values from the same store).

---

### Syntax

${B}jsx
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);
${B}

- **subscribe** — a function to subscribe to the store; returns an unsubscribe function
- **getSnapshot** — returns the current store value
- **getServerSnapshot** — returns the initial value for SSR (optional)

---

### Example: subscribing to browser online status

${B}jsx
function useOnlineStatus() {
  return useSyncExternalStore(
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    () => navigator.onLine,     // client snapshot
    () => true,                  // server snapshot
  );
}

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <p>{isOnline ? '✅ Online' : '❌ Offline'}</p>;
}
${B}

---

### Example: custom store

${B}jsx
// A simple external store
const store = {
  state: { count: 0 },
  listeners: new Set(),
  getState: () => store.state,
  setState: (newState) => {
    store.state = { ...store.state, ...newState };
    store.listeners.forEach(l => l());
  },
  subscribe: (listener) => {
    store.listeners.add(listener);
    return () => store.listeners.delete(listener);
  }
};

function Counter() {
  const { count } = useSyncExternalStore(
    store.subscribe,
    store.getState,
  );

  return (
    <button onClick={() => store.setState({ count: count + 1 })}>
      Count: {count}
    </button>
  );
}
${B}

---

### Why not useEffect + useState?

Using \`useEffect\` to subscribe and \`useState\` to store the snapshot is not Concurrent Mode safe — the store can update between React's render and commit phases. \`useSyncExternalStore\` is the correct solution.`,
  },
  {
    orderNumber: 87,
    title: "What is _lazy initialization_ in useState?",
    group: "React Hooks",
    difficulty: 2,
    content: `**Lazy initialization** in \`useState\` lets you pass a **function** as the initial value instead of a value directly. This function runs only on the **first render** — avoiding expensive computations on every re-render.

---

### The problem

${B}jsx
// ❌ getInitialState() runs on EVERY render
// even though useState only uses it on the first render!
function MyComponent() {
  const [state, setState] = useState(getExpensiveInitialState());
}
${B}

Every re-render of \`MyComponent\` calls \`getExpensiveInitialState()\` — wasted work since React ignores it after the first render.

---

### Solution: lazy initializer

${B}jsx
// ✅ Pass a function — React calls it only once (on mount)
function MyComponent() {
  const [state, setState] = useState(() => getExpensiveInitialState());
}
${B}

The key difference: pass \`() => value\` not \`value\`.

---

### Real-world examples

**Reading from localStorage:**
${B}jsx
// ❌ Reads localStorage on every render
const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

// ✅ Reads localStorage only once
const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
${B}

**Computing from props:**
${B}jsx
// ❌ Expensive parse on every render (even though result is discarded)
const [data, setData] = useState(JSON.parse(props.rawJson));

// ✅ Parsed only once
const [data, setData] = useState(() => JSON.parse(props.rawJson));
${B}

**Initial state from a function:**
${B}jsx
function createInitialTodos() {
  const todos = [];
  for (let i = 0; i < 5000; i++) {
    todos.push({ id: i, text: \`Task \${i}\`, done: false });
  }
  return todos;
}

// Runs createInitialTodos only once — not on every re-render
const [todos, setTodos] = useState(createInitialTodos);
// Notice: pass the function reference, not createInitialTodos()
${B}

---

### Same pattern with useReducer

${B}jsx
const [state, dispatch] = useReducer(reducer, undefined, () => getInitialState());
// Third argument is the initializer function
${B}`,
  },
  {
    orderNumber: 88,
    title: "What is _prop types_ validation in React?",
    group: "React Basics",
    difficulty: 1,
    content: `**PropTypes** is a runtime type checking library for React props. It warns in development when a component receives a prop of the wrong type.

> **Note:** In 2026, **TypeScript** is the recommended approach for type checking. PropTypes is a legacy solution — useful in JavaScript projects without TypeScript.

---

### Setup

${B}bash
npm install prop-types
${B}

### Basic usage

${B}jsx
import PropTypes from 'prop-types';

function UserCard({ name, age, email, isAdmin, onClick, tags }) {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      <p>{email}</p>
      {isAdmin && <span>Admin</span>}
    </div>
  );
}

UserCard.propTypes = {
  name:    PropTypes.string.isRequired,
  age:     PropTypes.number.isRequired,
  email:   PropTypes.string,
  isAdmin: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  tags:    PropTypes.arrayOf(PropTypes.string),
};

UserCard.defaultProps = {
  email:   'No email',
  isAdmin: false,
  tags:    [],
};
${B}

---

### Common PropTypes validators

${B}jsx
PropTypes.string           // string
PropTypes.number           // number
PropTypes.bool             // boolean
PropTypes.func             // function
PropTypes.array            // any array
PropTypes.object           // any object
PropTypes.node             // React-renderable (string, element, fragment...)
PropTypes.element          // React element
PropTypes.symbol           // Symbol
PropTypes.any              // anything

// Advanced
PropTypes.arrayOf(PropTypes.string)          // array of strings
PropTypes.objectOf(PropTypes.number)         // object with number values
PropTypes.shape({ id: PropTypes.number, name: PropTypes.string })
PropTypes.oneOf(['small', 'medium', 'large'])        // enum
PropTypes.oneOfType([PropTypes.string, PropTypes.number])
PropTypes.instanceOf(Date)
PropTypes.string.isRequired                  // add .isRequired to any
${B}

---

### PropTypes vs TypeScript

| | PropTypes | TypeScript |
|---|---|---|
| Checking | Runtime (dev only) | Compile-time |
| JS support | ✅ | Needs setup |
| Performance | Small overhead | No runtime cost |
| Recommended in 2026 | For JS projects | For all new projects |`,
  },
  {
    orderNumber: 89,
    title: "What is _React DevTools_ and how do you use it?",
    group: "Architecture",
    difficulty: 1,
    content: `**React DevTools** is a browser extension (Chrome/Firefox) that adds React-specific debugging capabilities to the browser's developer tools.

Install from the Chrome Web Store or Firefox Add-ons.

---

### Two main tabs

#### Components tab

Inspect the React component tree — like the Elements tab but for React:

- See all components and their **props** and **state**
- Search for a specific component by name
- Click a component to see and edit its props/state in real time
- Find which component corresponds to a DOM element (click the arrow icon in DevTools, hover over the element)

${B}text
<App>
  <Router>
    <Header user={{name: "Alice"}} />  ← click to inspect props
    <Main>
      <ProductList items=[...10 items] /> ← see state
    </Main>
  </Router>
</App>
${B}

#### Profiler tab

Record and analyze **performance**:

1. Click "Record"
2. Perform the actions you want to profile (click, type, navigate)
3. Click "Stop"
4. See a flame chart of which components rendered, how long each took, and why they rendered

Key metrics:
- **Render duration** — how long each component took to render
- **Why did this render?** — was it a state change, props change, or parent re-render?
- **Commits** — each group of DOM updates

---

### Tips for using DevTools

${B}text
• Use the ⚛ icon in Components tab to select a component by clicking it in the page
• Filter components by name in the search box
• The "eye" icon next to a component shows its rendered output
• "Highlight updates" option shows which components re-render (great for finding unnecessary re-renders)
• Use Profiler to verify React.memo and useMemo are working
${B}

---

### Standalone DevTools (for React Native or other environments)

${B}bash
npm install -g react-devtools
react-devtools
${B}

Then add to your app:

${B}html
<script src="http://localhost:8097"></script>
${B}`,
  },
  {
    orderNumber: 90,
    title: "How does _React handle accessibility_ (a11y)?",
    group: "Architecture",
    difficulty: 2,
    content: `Accessibility (a11y) in React means building components that work for all users — including those using screen readers, keyboard navigation, or other assistive technologies.

React itself is just JavaScript generating DOM, so standard HTML accessibility practices apply — with a few React-specific considerations.

---

### 1. Use semantic HTML

Always prefer semantic elements over generic divs:

${B}jsx
// ❌ Not accessible
<div onClick={handleSubmit}>Submit</div>

// ✅ Accessible — keyboard focusable, announced as "button"
<button onClick={handleSubmit}>Submit</button>
${B}

${B}jsx
// ✅ Use the right element
<nav> <header> <main> <article> <section> <aside> <footer>
<h1> ... <h6>  // proper heading hierarchy
<ul> <ol> <li>
<table> <th> <td>
${B}

---

### 2. ARIA attributes

JSX uses camelCase for ARIA attributes:

${B}jsx
<button
  aria-label="Close modal"      // accessible name (for icon buttons)
  aria-expanded={isOpen}        // state
  aria-controls="menu-list"     // relationship
  aria-disabled={disabled}      // preferred over HTML disabled for custom elements
>
  ✕
</button>

<ul
  id="menu-list"
  role="menu"
  aria-hidden={!isOpen}         // hide from screen readers when closed
>
  <li role="menuitem">Home</li>
</ul>
${B}

---

### 3. Focus management

Modals and dialogs must trap focus inside while open:

${B}jsx
function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.focus(); // move focus into modal on open
    }
  }, [isOpen]);

  return isOpen ? (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}             // makes div focusable
    >
      {children}
    </div>
  ) : null;
}
${B}

---

### 4. Keyboard navigation

All interactive elements must be reachable by keyboard:

${B}jsx
<div
  role="button"
  tabIndex={0}                  // make it focusable
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') handleClick();
  }}
>
  Custom Button
</div>
${B}

(Better: just use \`<button>\` which handles this automatically.)

---

### 5. Form accessibility

${B}jsx
// Always associate labels with inputs
<label htmlFor="email">Email address</label>
<input id="email" type="email" aria-required="true" />

// Error messages
<input aria-invalid="true" aria-describedby="email-error" />
<p id="email-error" role="alert">Please enter a valid email</p>
${B}

---

### Tools to check accessibility

- **axe DevTools** browser extension
- **eslint-plugin-jsx-a11y** — catches issues in your editor
- **Lighthouse** in Chrome DevTools
- **React Testing Library** — queries by role, testing a11y by default`,
  },
  {
    orderNumber: 91,
    title: "What is _Next.js_ and how does it relate to React?",
    group: "Architecture",
    difficulty: 1,
    content: `**Next.js** is a **React framework** built on top of React that adds full-stack capabilities out of the box. React is a UI library — Next.js provides everything else needed to build a production web application.

---

### What React gives you vs what Next.js adds

| Feature | React | Next.js |
|---|---|---|
| UI components | ✅ | ✅ |
| Routing | ❌ (need React Router) | ✅ File-based |
| SSR | ❌ Manual | ✅ Built-in |
| SSG | ❌ Manual | ✅ Built-in |
| API routes | ❌ | ✅ |
| Image optimization | ❌ | ✅ \`<Image />\` |
| Fonts optimization | ❌ | ✅ |
| Code splitting | Manual | ✅ Automatic |
| Server Components | ❌ | ✅ App Router |

---

### File-based routing

In Next.js, the file structure defines your routes:

${B}text
app/
  page.tsx         → /
  about/
    page.tsx       → /about
  blog/
    [slug]/
      page.tsx     → /blog/anything
  dashboard/
    layout.tsx     → shared layout
    page.tsx       → /dashboard
    settings/
      page.tsx     → /dashboard/settings
${B}

---

### App Router (Next.js 13+)

The modern way — uses **React Server Components** by default:

${B}jsx
// app/products/page.tsx — Server Component (runs on server)
async function ProductsPage() {
  const products = await db.getProducts(); // direct DB access!

  return (
    <main>
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </main>
  );
}
${B}

${B}jsx
// app/products/[id]/page.tsx — dynamic route with params
export default async function ProductPage({ params }) {
  const product = await db.getProduct(params.id);
  return <ProductDetails product={product} />;
}

// Generate static pages at build time
export async function generateStaticParams() {
  const products = await db.getAllProductIds();
  return products.map(p => ({ id: p.id.toString() }));
}
${B}

---

### API routes

${B}jsx
// app/api/users/route.ts
export async function GET(request: Request) {
  const users = await db.getUsers();
  return Response.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.createUser(body);
  return Response.json(user, { status: 201 });
}
${B}`,
  },
  {
    orderNumber: 92,
    title: "What is _React Query_ (TanStack Query)?",
    group: "State Management",
    difficulty: 2,
    content: `**TanStack Query** (formerly React Query) is a library for **server state management** — fetching, caching, synchronizing, and updating data from APIs. It replaces the pattern of \`useEffect\` + \`useState\` for data fetching.

---

### The problem with manual data fetching

${B}jsx
// ❌ Manual fetching — repetitive and error-prone
function Users() {
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(data => { setUsers(data); setLoading(false); })
      .catch(e => { setError(e); setLoading(false); });
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Error />;
  return <ul>{users.map(u => <li>{u.name}</li>)}</ul>;
}
// No caching, no refetch on window focus, no deduplication...
${B}

### Solution with TanStack Query

${B}jsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function Users() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],           // cache key
    queryFn: () => fetch('/api/users').then(r => r.json()),
    staleTime: 5 * 60 * 1000,     // data is fresh for 5 minutes
  });

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
${B}

---

### What you get for free

- ✅ **Caching** — same query in multiple components shares one request
- ✅ **Deduplication** — multiple components requesting same data = one fetch
- ✅ **Background refetch** — stale data refetched when window regains focus
- ✅ **Loading/error states** — automatic
- ✅ **Pagination & infinite scroll** — built-in
- ✅ **Optimistic updates** — update UI before server confirms
- ✅ **Retry** — failed requests automatically retry

---

### Mutations (creating/updating data)

${B}jsx
function AddUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) => fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
    }).then(r => r.json()),
    onSuccess: () => {
      // Invalidate cache → triggers refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  return (
    <button onClick={() => mutation.mutate({ name: 'Alice' })}>
      {mutation.isPending ? 'Adding...' : 'Add User'}
    </button>
  );
}
${B}`,
  },
  {
    orderNumber: 93,
    title: "What are _React design patterns_ you should know?",
    group: "Advanced Patterns",
    difficulty: 3,
    content: `Design patterns are reusable solutions to common problems. Here are the most important React patterns you'll encounter in real codebases.

---

### 1. Container / Presentational (Smart / Dumb)

Separate **data fetching** from **rendering**:

${B}jsx
// Container — fetches data, no JSX
function UserListContainer() {
  const { data: users } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
  return <UserList users={users ?? []} />;
}

// Presentational — pure UI, no data logic
function UserList({ users }) {
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
${B}

---

### 2. Custom Hook pattern

Extract stateful logic into reusable hooks:

${B}jsx
function useCart() {
  const [items, setItems] = useState([]);
  const add    = (item) => setItems(prev => [...prev, item]);
  const remove = (id)   => setItems(prev => prev.filter(i => i.id !== id));
  const total  = items.reduce((sum, item) => sum + item.price, 0);
  return { items, add, remove, total };
}

function Cart() {
  const { items, remove, total } = useCart();
  // ...
}
${B}

---

### 3. Provider pattern

Wrap a subtree with a provider to share context:

${B}jsx
function FeatureProvider({ children }) {
  const state = useFeatureState(); // contains all feature logic
  return <FeatureContext.Provider value={state}>{children}</FeatureContext.Provider>;
}
${B}

---

### 4. Compound Components

Components work together with shared implicit state (see Q52 for full example):

${B}jsx
<Select>
  <Select.Trigger>Choose option</Select.Trigger>
  <Select.Options>
    <Select.Option value="a">Option A</Select.Option>
    <Select.Option value="b">Option B</Select.Option>
  </Select.Options>
</Select>
${B}

---

### 5. Controlled / Uncontrolled pattern for components

Build components that work both ways (like HTML inputs):

${B}jsx
function Toggle({ value, defaultValue, onChange }) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? false);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = () => {
    if (!isControlled) setInternalValue(v => !v);
    onChange?.(!currentValue);
  };

  return <button onClick={handleChange}>{currentValue ? 'ON' : 'OFF'}</button>;
}

// Both work:
<Toggle defaultValue={false} />                  // uncontrolled
<Toggle value={isOn} onChange={setIsOn} />       // controlled
${B}

---

### 6. Slot pattern (children composition)

Instead of specific props, accept children in named slots:

${B}jsx
function Card({ header, footer, children }) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

<Card header={<h2>Title</h2>} footer={<button>Save</button>}>
  <p>Card content</p>
</Card>
${B}`,
  },
  {
    orderNumber: 94,
    title: "What is _React Suspense_ for data fetching?",
    group: "React 18+",
    difficulty: 3,
    content: `**Suspense for data fetching** lets components "suspend" (pause rendering) while they wait for data, showing a fallback UI automatically. This is the next evolution of React's data loading story.

Suspense for data requires libraries that implement the Suspense contract — React itself doesn't fetch data, but it provides the mechanism.

---

### How Suspense works with data

When a component is rendering and needs data that isn't ready yet, it **throws a Promise** (a special signal to React). React catches it, shows the nearest \`<Suspense>\` fallback, and when the Promise resolves, re-renders the component with the data.

---

### Using Suspense with React Query

${B}jsx
import { useSuspenseQuery } from '@tanstack/react-query';

// Component throws a promise internally — Suspense catches it
function UserProfile({ userId }) {
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  // data is always defined here — no loading/error state needed!
  return <h1>{user.name}</h1>;
}

// Wrap with Suspense + Error Boundary
function App() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Skeleton />}>
        <UserProfile userId="1" />
      </Suspense>
    </ErrorBoundary>
  );
}
${B}

---

### Waterfall problem and solutions

Without care, Suspense can cause data-fetching waterfalls:

${B}jsx
// ❌ Waterfall — Profile loads, THEN Posts loads
function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <Profile />          {/* suspends first */}
      <Suspense>
        <Posts />          {/* can't start until Profile is done */}
      </Suspense>
    </Suspense>
  );
}

// ✅ Parallel — both fetch simultaneously
function Page() {
  // Prefetch both queries before rendering
  prefetch(['profile']);
  prefetch(['posts']);

  return (
    <>
      <Suspense><Profile /></Suspense>
      <Suspense><Posts /></Suspense>
    </>
  );
}
${B}

---

### React use() hook (React 19 preview)

React 19 introduces \`use(Promise)\` for reading promises directly in components:

${B}jsx
import { use } from 'react';

function UserProfile({ userPromise }) {
  const user = use(userPromise); // suspends until resolved
  return <h1>{user.name}</h1>;
}

// Parent prefetches
function Page() {
  const userPromise = fetchUser(1); // start fetch immediately

  return (
    <Suspense fallback={<Skeleton />}>
      <UserProfile userPromise={userPromise} />
    </Suspense>
  );
}
${B}`,
  },
  {
    orderNumber: 95,
    title: "What is _Vite_ and why is it preferred over Create React App?",
    group: "Architecture",
    difficulty: 1,
    content: `**Vite** is a modern build tool and dev server for frontend projects. It's become the standard for new React projects, replacing Create React App (CRA) which is no longer actively maintained.

---

### Create React App (CRA) — the old standard

${B}bash
npx create-react-app my-app
${B}

**Problems with CRA:**
- Powered by Webpack — slow startup and hot reload (especially as apps grow)
- Bundles everything before starting dev server
- Opinionated, hard to customize (must eject)
- No longer actively maintained by Meta

---

### Vite — the modern choice

${B}bash
npm create vite@latest my-app -- --template react-ts
${B}

**Why Vite is better:**

| Feature | CRA (Webpack) | Vite |
|---|---|---|
| Dev server start | Slow (seconds-minutes) | Instant (\<1s) |
| Hot Module Replacement | Slow | Near-instant |
| Build speed | Slow | Fast (Rollup-based) |
| Config | Hidden (or eject) | Simple \`vite.config.ts\` |
| Maintenance | ⚠️ Low | ✅ Active |
| ESM support | ❌ | ✅ Native |

---

### How Vite is fast

**Dev server:** Vite serves source files as **native ES Modules** directly to the browser — no bundling needed. The browser requests files as needed.

**HMR:** Only the exact changed module is sent — not a re-bundle of everything.

**Production build:** Uses **Rollup** under the hood — produces optimized, tree-shaken bundles.

---

### Basic Vite config

${B}jsx
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080', // proxy API requests
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  }
});
${B}

---

### Setting up for the first time

${B}bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
${B}`,
  },
  {
    orderNumber: 96,
    title: "What is _Tailwind CSS_ and how do you use it with React?",
    group: "Styling",
    difficulty: 1,
    content: `**Tailwind CSS** is a **utility-first CSS framework** — instead of writing custom CSS, you compose styles directly in your JSX using pre-defined utility classes.

In 2026, Tailwind is the most popular styling approach for new React projects.

---

### Setup with Vite

${B}bash
npm install tailwindcss @tailwindcss/vite
${B}

${B}js
// vite.config.ts
import tailwindcss from '@tailwindcss/vite';
export default { plugins: [tailwindcss()] };
${B}

${B}css
/* src/index.css */
@import "tailwindcss";
${B}

---

### Basic usage

${B}jsx
// Instead of writing .btn { padding: 8px 16px; background: blue; ... }
// Use utility classes directly

function Button({ variant = 'primary', children }) {
  const base = 'px-4 py-2 rounded-md font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button className={\`\${base} \${variants[variant]}\`}>
      {children}
    </button>
  );
}
${B}

---

### Responsive design

Add a breakpoint prefix to any utility:

${B}jsx
<div className="
  w-full           /* all screens */
  md:w-1/2         /* ≥768px: half width */
  lg:w-1/3         /* ≥1024px: third */
  flex flex-col
  md:flex-row      /* horizontal on desktop */
">
${B}

---

### Dark mode

${B}jsx
<div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
  Content adapts to OS theme
</div>
${B}

---

### Conditional classes with clsx

${B}jsx
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...args) => twMerge(clsx(...args));

function Alert({ type, message }) {
  return (
    <div className={cn(
      'p-4 rounded-md border',
      type === 'error'   && 'bg-red-50 border-red-300 text-red-700',
      type === 'success' && 'bg-green-50 border-green-300 text-green-700',
      type === 'info'    && 'bg-blue-50 border-blue-300 text-blue-700',
    )}>
      {message}
    </div>
  );
}
${B}

---

### Design tokens

Customize your design system in \`tailwind.config.js\`:

${B}js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#6366f1', dark: '#4f46e5' }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  }
};
${B}`,
  },
  {
    orderNumber: 97,
    title: "What is _code quality_ tooling in React projects?",
    group: "Architecture",
    difficulty: 1,
    content: `Code quality tools help teams write consistent, bug-free code. The standard setup for React projects includes **ESLint** for linting, **Prettier** for formatting, and **TypeScript** for type safety.

---

### ESLint — catch bugs and enforce patterns

${B}bash
npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
${B}

${B}js
// eslint.config.js (flat config — ESLint 9+)
import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import a11yPlugin from 'eslint-plugin-jsx-a11y';

export default [
  js.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
      'jsx-a11y': a11yPlugin,
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',   // enforce Hook rules
      'react-hooks/exhaustive-deps': 'warn',    // warn on missing deps
      'jsx-a11y/alt-text': 'error',             // img must have alt
      'no-unused-vars': 'warn',
    },
  }
];
${B}

---

### Prettier — consistent formatting

${B}bash
npm install --save-dev prettier
${B}

${B}js
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
${B}

${B}bash
# Format all files
npx prettier --write .
${B}

---

### Husky + lint-staged — enforce on commit

Run linting/formatting automatically before every git commit:

${B}bash
npm install --save-dev husky lint-staged
npx husky init
${B}

${B}js
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,md,json}": "prettier --write"
  }
}
${B}

---

### VSCode settings

${B}json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
${B}

---

### Summary of the stack

| Tool | Purpose |
|---|---|
| TypeScript | Type safety |
| ESLint | Bug prevention, pattern enforcement |
| Prettier | Code formatting |
| Husky | Git hooks |
| lint-staged | Run tools only on changed files |`,
  },
  {
    orderNumber: 98,
    title: "What is _Storybook_ and how does it help React development?",
    group: "Architecture",
    difficulty: 2,
    content: `**Storybook** is a tool for building, documenting, and testing UI components in **isolation** — separate from your app. It creates an interactive component explorer where you can see and interact with every component in every state.

---

### Setup

${B}bash
npx storybook@latest init
npm run storybook    # opens at http://localhost:6006
${B}

---

### Writing a Story

A **Story** represents a specific state of a component:

${B}jsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],  // auto-generates documentation
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger'] },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Click me' }
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Cancel' }
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: 'Disabled' }
};

export const LongText: Story = {
  args: { children: 'This is a button with a very long label' }
};
${B}

---

### What you get

- **Interactive playground** — change props with controls in real time
- **Auto-generated docs** — prop tables, usage examples
- **Visual regression testing** (with Chromatic)
- **Accessibility checks** — a11y addon highlights issues
- **Design system documentation** — share with designers

---

### Component-driven development

Storybook encourages **building UI from the bottom up**:

${B}text
1. Build Button in Storybook (isolated)
2. Build Card using Button (isolated)
3. Build ProductCard using Card (isolated)
4. Assemble page from components
${B}

This forces components to be truly reusable and avoids tight coupling to app state.

---

### Addons

- \`@storybook/addon-essentials\` — controls, actions, docs (included by default)
- \`@storybook/addon-a11y\` — accessibility checks
- \`storybook-addon-designs\` — link to Figma designs
- \`@chromatic-com/storybook\` — visual regression testing`,
  },
  {
    orderNumber: 99,
    title: "What is _tree shaking_ and how does it work in React apps?",
    group: "Architecture",
    difficulty: 2,
    content: `**Tree shaking** is a build optimization technique that removes **unused code (dead code)** from your JavaScript bundle. The term comes from the idea of "shaking" a tree to make dead leaves fall off — only the live code remains.

---

### How it works

Tree shaking relies on **ES module static imports/exports** (\`import\`/\`export\`). Because ES module dependencies are static (known at build time), bundlers like Vite/Rollup can analyze the dependency graph and exclude exports that are never imported.

${B}jsx
// utils.js
export function add(a, b) { return a + b; }      // ✅ used — kept
export function multiply(a, b) { return a * b; } // ❌ unused — removed
export function divide(a, b) { return a / b; }   // ❌ unused — removed

// main.js
import { add } from './utils'; // only imports add
console.log(add(1, 2));
${B}

The bundler sees that only \`add\` is imported — \`multiply\` and \`divide\` are never used anywhere and are removed from the bundle.

---

### Why it matters for React

React libraries can be large. Tree shaking ensures you only bundle what you use:

${B}jsx
// ✅ Only imports the icons you use — others are tree-shaken
import { Search, User, Home } from 'lucide-react';
// vs
import * as Icons from 'lucide-react'; // ❌ includes ALL icons — huge bundle!
${B}

---

### What breaks tree shaking

${B}jsx
// ❌ CommonJS (require) — NOT tree-shakeable
const { useState } = require('react');

// ✅ ESM (import) — tree-shakeable
import { useState } from 'react';
${B}

**Side effects** also prevent tree shaking. Libraries mark themselves as side-effect-free in \`package.json\`:
${B}json
{ "sideEffects": false }
${B}

---

### Checking your bundle

Use the **Rollup Visualizer** plugin:

${B}bash
npm install --save-dev rollup-plugin-visualizer
${B}

${B}js
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [
    react(),
    visualizer({ open: true, gzipSize: true })
  ]
}
${B}

Run \`npm run build\` → opens an interactive map of your bundle.`,
  },
  {
    orderNumber: 100,
    title: "What are the key differences between _React 17_ and _React 18_?",
    group: "React 18+",
    difficulty: 2,
    content: `React 18 (released March 2022) was a major release that introduced **Concurrent React** — a fundamentally new rendering model. Here's a comprehensive comparison of what changed.

---

### 1. Root API

${B}jsx
// React 17 — legacy root
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// React 18 — new root (enables all React 18 features)
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<App />);
${B}

---

### 2. Automatic batching

${B}jsx
// React 17 — only batches inside React events
setTimeout(() => {
  setA(1); // render 1
  setB(2); // render 2 — two separate renders
}, 0);

// React 18 — batches everywhere automatically
setTimeout(() => {
  setA(1);
  setB(2); // single render
}, 0);
${B}

---

### 3. New Hooks

| Hook | Added in |
|---|---|
| \`useId\` | React 18 |
| \`useTransition\` | React 18 |
| \`useDeferredValue\` | React 18 |
| \`useSyncExternalStore\` | React 18 |
| \`useInsertionEffect\` | React 18 |

---

### 4. Concurrent features

React 17 rendering was **synchronous** — once started, it couldn't be interrupted.

React 18 rendering is **interruptible** — low-priority renders can be paused when urgent updates come in:

${B}jsx
// React 18 — mark updates as non-urgent
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setSearchResults(filter(query)); // can be interrupted
});
${B}

---

### 5. Suspense improvements

React 17: Suspense only worked for \`React.lazy\` (code splitting).
React 18: Suspense works with data fetching libraries + enables **streaming SSR**.

---

### 6. Streaming SSR

React 17 SSR: Had to wait for all data before sending any HTML.
React 18 SSR: Can stream HTML in chunks using \`renderToPipeableStream\`.

---

### 7. React Server Components

Introduced experimentally in React 18, production-ready via Next.js App Router — a completely new component type that runs only on the server.

---

### Upgrade path

React 18 is designed to be a **non-breaking upgrade** for most apps:

${B}bash
npm install react@18 react-dom@18
${B}

Change \`ReactDOM.render\` → \`createRoot\`. All existing React 17 code continues to work — Concurrent features are opt-in.`,
  },
];

// ─────────────────────────────────────────────
// FILE GENERATION
// ─────────────────────────────────────────────

function difficultyLabel(level) {
  switch (level) {
    case 1: return "🟢 Beginner";
    case 2: return "🟡 Intermediate";
    case 3: return "🔴 Advanced";
    default: return "Unknown";
  }
}

function buildMarkdown(q) {
  const title = q.title.replace(/_([^_]+)_/g, "**$1**");
  return `# Q${q.orderNumber}: ${title}

| | |
|---|---|
| **Category** | ${q.group} |
| **Difficulty** | ${difficultyLabel(q.difficulty)} |

---

${q.content}
`;
}

function sanitizeFilename(title) {
  return title
    .replace(/_([^_]+)_/g, "$1")
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .slice(0, 60)
    .replace(/-+$/, "");
}

function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const fileMap = {};
  for (const q of questions) {
    const filename = `${String(q.orderNumber).padStart(3, "0")}-${sanitizeFilename(q.title)}.md`;
    const filepath = join(OUTPUT_DIR, filename);
    writeFileSync(filepath, buildMarkdown(q), "utf8");
    fileMap[q.orderNumber] = filename;
    console.log(`  ✓ ${filename}`);
  }

  console.log(`\nGenerated ${questions.length} files (Q16–Q100)`);
  return { questions, fileMap };
}

export { questions, difficultyLabel, sanitizeFilename };
main();
