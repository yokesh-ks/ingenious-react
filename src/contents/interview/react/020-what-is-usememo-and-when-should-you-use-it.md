# Q20: What is **useMemo** and when should you use it?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🟡 Intermediate |

---

`useMemo` caches the **result of a calculation** between renders. It only recalculates when the specified dependencies change.

### Syntax

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

The function runs on the first render. On subsequent renders, it returns the cached value **unless `a` or `b` changed**.

---

### The problem it solves

Without `useMemo`, expensive calculations run on **every render**, even when the inputs haven't changed:

```jsx
function ProductList({ products, filter }) {
  // ❌ This runs on every render — even when just the theme changes
  const filtered = products.filter(p => p.category === filter);

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
```

With `useMemo`:

```jsx
function ProductList({ products, filter }) {
  // ✅ Only recalculates when products or filter changes
  const filtered = useMemo(
    () => products.filter(p => p.category === filter),
    [products, filter]
  );

  return <ul>{filtered.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
```

---

### Common use cases

**1. Expensive computations** — sorting/filtering large arrays, complex math:
```jsx
const sortedData = useMemo(
  () => [...data].sort((a, b) => a.name.localeCompare(b.name)),
  [data]
);
```

**2. Referential equality** — keeping object/array identity stable so child components or effects don't re-run:

```jsx
// Without useMemo, new object on every render → useEffect fires every time
const options = useMemo(() => ({ page: 1, limit: 10 }), []);

useEffect(() => {
  fetchData(options);
}, [options]); // stable reference — runs once
```

---

### When NOT to use useMemo

- For cheap calculations — the overhead of `useMemo` itself may cost more
- Everywhere by default — profile first, optimize where needed
- As a guarantee — React may discard cached values in the future

---

### Quick comparison

| | `useMemo` | `useCallback` |
|---|---|---|
| Memoizes | A **value** | A **function** |
| Returns | Result of `() => value` | The function itself |
