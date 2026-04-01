# Q34: What is **componentWillUnmount** and its Hook equivalent?

| | |
|---|---|
| **Category** | Component Lifecycle |
| **Difficulty** | 🟢 Beginner |

---

`componentWillUnmount` runs **just before a component is removed from the DOM**. It's used to clean up anything set up during the component's life — preventing memory leaks and stale behavior.

### Common cleanup tasks

- Clear timers (`clearInterval`, `clearTimeout`)
- Remove event listeners
- Cancel API requests (AbortController)
- Unsubscribe from subscriptions (WebSocket, Redux store)

### Class component

```jsx
class Clock extends React.Component {
  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer); // prevent memory leak
  }

  tick() { /* update time */ }
}
```

### Functional component equivalent

Return a **cleanup function** from `useEffect`:

```jsx
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
```

---

### Real-world examples

**Canceling a fetch request:**
```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/data', { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err.message);
    });

  return () => controller.abort(); // cancel on unmount
}, []);
```

**Removing event listener:**
```jsx
useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

**Closing a WebSocket:**
```jsx
useEffect(() => {
  const ws = new WebSocket('wss://example.com/chat');
  ws.onmessage = (event) => setMessages(m => [...m, event.data]);
  return () => ws.close(); // close on unmount
}, []);
```

---

### When does the cleanup run?

1. When the component **unmounts** (removed from DOM)
2. **Before** the effect runs again (when dependencies change)

This means cleanup runs on both unmount and re-runs — so subscriptions don't leak between dependency changes.
