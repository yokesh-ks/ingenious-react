# Q28: What is **useDeferredValue** in React 18?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🔴 Advanced |

---

`useDeferredValue` defers updating a value to keep the UI responsive. Instead of wrapping a state setter (like `useTransition`), you wrap the **value itself**.

### Syntax

```jsx
const deferredValue = useDeferredValue(value);
```

The `deferredValue` lags behind the actual `value` — it stays at the old value while React renders the urgent update, then catches up when the browser is free.

---

### Example: search input

```jsx
import { useState, useDeferredValue, useMemo } from 'react';

function SearchPage({ allItems }) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query); // lags behind query

  const results = useMemo(
    () => filterItems(allItems, deferredQuery),
    [allItems, deferredQuery]
  );

  const isStale = query !== deferredQuery;

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <div style={{ opacity: isStale ? 0.5 : 1 }}>
        {/* results render with deferred query — input stays responsive */}
        <ResultsList results={results} />
      </div>
    </>
  );
}
```

---

### Stale UI indicator

While results are updating, you can dim them to signal to the user:

```jsx
<div style={{ opacity: query !== deferredQuery ? 0.5 : 1, transition: 'opacity 0.2s' }}>
  <ResultsList results={results} />
</div>
```

---

### When to use useDeferredValue

✅ Use when:
- You receive a value from **props or parent state** (can't control when it updates)
- You want to defer re-rendering of a slow child component

Use `useTransition` instead when you **own the state update** (you call the setter).

---

### What it is NOT

`useDeferredValue` is not debouncing or throttling — it doesn't add a time delay. It defers work until React has time, which is more efficient and integrates with Concurrent Mode.