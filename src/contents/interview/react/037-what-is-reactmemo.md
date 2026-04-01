# Q37: What is **React.memo** and how does it work?

| | |
|---|---|
| **Category** | Performance Optimization |
| **Difficulty** | 🟡 Intermediate |

---

`React.memo` is a **Higher-Order Component** that prevents a functional component from re-rendering if its props haven't changed. It's the functional equivalent of `PureComponent` for class components.

### Without React.memo

```jsx
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
```

### With React.memo

```jsx
const ChildComponent = React.memo(function ChildComponent({ name }) {
  console.log('ChildComponent rendered'); // only logs when name changes
  return <p>Hello, {name}</p>;
});
```

Now `ChildComponent` only re-renders when `name` prop changes.

---

### How it works

React.memo does a **shallow comparison** of the previous and current props. If all props are equal (`===`), the render is skipped and the previous output is reused.

---

### Custom comparison function

For complex props, provide your own comparison:

```jsx
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
```

---

### When to use React.memo

✅ Use when:
- Component renders often but props rarely change
- Component is **expensive** to render (large lists, complex UI)
- Component receives the same props from a parent that re-renders often

❌ Don't use when:
- Props change on almost every render (memo overhead is wasted)
- The component is cheap to render
- Props include functions that are recreated each render (pair with `useCallback`)

---

### React.memo + useCallback (the pair)

```jsx
const Parent = () => {
  // Without useCallback, new function reference breaks memo
  const handleClick = useCallback(() => console.log('clicked'), []);
  return <MemoizedChild onClick={handleClick} />;
};

const MemoizedChild = React.memo(Child);
```
