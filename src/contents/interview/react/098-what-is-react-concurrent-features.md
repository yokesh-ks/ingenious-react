# Q98: What are **React Concurrent Features** and how do they work?

| | |
|---|---|
| **Category** | React 18+ |
| **Difficulty** | 🔴 Advanced |

---

**Concurrent Features** are React 18's most significant upgrade. They allow React to work on multiple tasks simultaneously — pausing, interrupting, and resuming rendering based on priority.

---

### The problem with synchronous rendering

Before React 18, rendering was **synchronous and blocking**:

```
User types in input
  → React starts re-rendering the entire component tree
  → Browser is blocked during this time
  → UI freezes until render is done
  → Input feels laggy
```

For expensive re-renders (big lists, complex dashboards), this caused noticeable jank.

---

### How Concurrent Mode helps

React 18 can now **interrupt** a render in progress:

```
User types in input
  → React starts re-rendering
  → User types again (high priority!)
  → React pauses current render
  → Processes the new keypress first (keeps input responsive)
  → Resumes the lower-priority render in background
```

---

### useTransition — mark updates as non-urgent

```jsx
import { useState, useTransition } from 'react';

function SearchPage() {
  const [query, setQuery]   = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    // Urgent: update the input immediately
    setQuery(e.target.value);

    // Non-urgent: defer the expensive search results update
    startTransition(() => {
      setResults(searchDatabase(e.target.value));
    });
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      <ResultsList results={results} />  {/* can be deferred */}
    </>
  );
}
```

The input stays responsive (no lag) while React processes the expensive results update in the background.

---

### useDeferredValue — defer a value, not an action

```jsx
import { useState, useDeferredValue, memo } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);  // lags behind query

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {/* ExpensiveList re-renders with deferredQuery, not the live query */}
      <ExpensiveList query={deferredQuery} />
    </>
  );
}

// Must be memoized to benefit from deferral
const ExpensiveList = memo(function ExpensiveList({ query }) {
  // expensive filtering...
});
```

---

### Automatic batching

Before React 18, state updates in setTimeout/Promises were NOT batched:

```jsx
// Before React 18 — 2 separate re-renders
setTimeout(() => {
  setCount(c => c + 1);   // re-render 1
  setIsOpen(true);        // re-render 2
}, 1000);

// React 18 — automatically batched → 1 re-render
setTimeout(() => {
  setCount(c => c + 1);   // ↓
  setIsOpen(true);        // batched → 1 re-render
}, 1000);
```

Opt out with `flushSync` when you need immediate DOM updates:

```jsx
import { flushSync } from 'react-dom';

flushSync(() => {
  setCount(c => c + 1);  // forces immediate re-render
});
// DOM is updated here before the next line runs
scrollToBottom();
```

---

### Suspense with Concurrent rendering

Concurrent Mode makes Suspense much more powerful. While a component is suspended:

- React can render other parts of the tree
- React can show a transition instead of immediately showing the fallback
- React can display "stale" content while new content loads

```jsx
function App() {
  return (
    <Suspense fallback={<Skeleton />}>
      {/* React shows stale content while new content loads */}
      <UserProfile />
    </Suspense>
  );
}
```

---

### Summary of Concurrent Features

| Feature | Hook/API | What it does |
|---|---|---|
| Transition | `useTransition` | Mark updates as interruptible |
| Deferred value | `useDeferredValue` | Keep old value while new one loads |
| Automatic batching | Built-in | Group multiple state updates |
| Suspense streaming | `<Suspense>` | Show parts of page as they're ready |

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
