# Q19: What is **useCallback** and when should you use it?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🟡 Intermediate |

---

`useCallback` returns a **memoized version of a function** — it only creates a new function reference when its dependencies change.

### The problem it solves

In React, every re-render creates new function instances. When you pass a function as a prop to a child component, the child sees a "new" function every time and re-renders unnecessarily.

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ❌ New function created on every render
  const handleClick = () => console.log('clicked');

  return <ExpensiveChild onClick={handleClick} />;
}
```

### Solution with useCallback

```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // ✅ Same function reference unless dependencies change
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // empty deps = created once

  return <ExpensiveChild onClick={handleClick} />;
}
```

### Syntax

```jsx
const memoizedFn = useCallback(fn, [dependencies]);
```

---

### When to use useCallback

✅ Use it when:
- Passing a callback to a **child component wrapped in `React.memo`**
- The function is a dependency of a `useEffect`
- The function triggers re-renders in an expensive subtree

❌ Don't use it:
- Everywhere by default — it adds overhead
- For inline handlers that don't get passed to children
- When the child isn't memoized — it won't help

---

### With useEffect dependency

```jsx
const fetchData = useCallback(() => {
  fetch(`/api/user/${userId}`).then(/* ... */);
}, [userId]); // fetchData only changes when userId changes

useEffect(() => {
  fetchData();
}, [fetchData]); // safe to use in deps array
```

---

### useCallback vs useMemo

| Hook | Returns | Use for |
|---|---|---|
| `useCallback(fn, deps)` | A memoized **function** | Stable callback references |
| `useMemo(() => value, deps)` | A memoized **value** | Expensive computed values |

`useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
