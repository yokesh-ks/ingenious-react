# Q27: What is **useTransition** in React 18?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🔴 Advanced |

---

`useTransition` lets you mark some state updates as **non-urgent** (transitions), keeping the UI responsive while slower updates happen in the background.

### The problem

Without `useTransition`, a slow render (like filtering a huge list) blocks the entire UI — the user can't type or interact:

```jsx
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
```

### Solution with useTransition

```jsx
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
```

---

### How it works

- Updates inside `startTransition` are marked as **low priority**
- If a more urgent update (like another keystroke) comes in, React **interrupts** the transition and starts fresh
- `isPending` is `true` while the transition is in progress — use it to show a loading indicator

---

### useTransition vs useDeferredValue

| | `useTransition` | `useDeferredValue` |
|---|---|---|
| Control | You wrap the state setter | You wrap the value |
| Use when | You control the state update | You receive a value from props |
| Pending indicator | `isPending` available | ❌ Not available |

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
