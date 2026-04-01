# Q75: What is **Concurrent Mode** in React?

| | |
|---|---|
| **Category** | React 18+ |
| **Difficulty** | 🔴 Advanced |

---

**Concurrent Mode** (now called "Concurrent React") is a set of features that allow React to work on **multiple versions of the UI at the same time** — pausing, interrupting, and resuming renders to keep the UI responsive.

### The core problem it solves

In React 17 and below, rendering was **synchronous and uninterruptible**. Once React started rendering, it had to finish — even if a more urgent update (like a user keystroke) came in. This caused UI jank on slow renders.

```
React 17: Start render → can't stop → finish (UI blocked during this time)
React 18: Start render → interrupt for urgent work → resume later
```

---

### How Concurrent React works

React assigns **priority levels** to updates:

- **Urgent** — typing, clicking, direct user interactions (must be instant)
- **Transition** — search results updating, tab switching (can be deferred)

```jsx
import { startTransition, useTransition } from 'react';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  function handleInput(e) {
    // Urgent — update input immediately
    setQuery(e.target.value);

    // Non-urgent — results can wait, can be interrupted
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
```

---

### Concurrent features in React 18

| Feature | Description |
|---|---|
| `useTransition` | Mark updates as interruptible |
| `useDeferredValue` | Defer a value until the browser is free |
| Streaming SSR | Send HTML to browser in chunks |
| Selective hydration | Hydrate visible/interacted parts first |
| React Server Components | Server-only components |

---

### Enabling Concurrent React

You get Concurrent React automatically by switching to `createRoot`:

```jsx
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<App />);
```

There's no "mode toggle" — Concurrent React is activated when you use `createRoot`.

---

### React Fiber — the engine underneath

Concurrent Mode is powered by **React Fiber**, introduced in React 16. Fiber breaks rendering work into small units that can be:
- **Paused** — yield to the browser for user input
- **Prioritized** — urgent updates run first
- **Resumed** — continue where it left off
- **Aborted** — discard and restart if stale
