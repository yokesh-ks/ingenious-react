# Q21: What is **useRef** and what are its use cases?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🟢 Beginner |

---

`useRef` returns a mutable **ref object** that persists across renders. It has one property: `.current`.

```jsx
const ref = useRef(initialValue);
// ref.current === initialValue
```

The key difference from state: **changing `ref.current` does NOT cause a re-render**.

---

### Use case 1: Access a DOM element directly

```jsx
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
```

---

### Use case 2: Store a mutable value without triggering re-renders

```jsx
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
```

---

### Use case 3: Track previous values

```jsx
function Component({ value }) {
  const prevValue = useRef(value);

  useEffect(() => {
    prevValue.current = value; // update after render
  });

  return <p>Current: {value}, Previous: {prevValue.current}</p>;
}
```

---

### useRef vs useState

| | `useRef` | `useState` |
|---|---|---|
| Triggers re-render? | ❌ No | ✅ Yes |
| Persists across renders? | ✅ Yes | ✅ Yes |
| Use for | DOM refs, mutable values | UI state |

### Typing with TypeScript

```tsx
const inputRef = useRef<HTMLInputElement>(null);
// inputRef.current is HTMLInputElement | null

const counterRef = useRef<number>(0);
// counterRef.current is number (always defined)
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
