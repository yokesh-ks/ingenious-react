# Q79: What is **useSyncExternalStore** in React 18?

| | |
|---|---|
| **Category** | React 18+ |
| **Difficulty** | 🔴 Advanced |

---

`useSyncExternalStore` is a React 18 Hook for **safely subscribing to external stores** — state that lives outside React (like Redux, Zustand, Jotai, or browser APIs like `navigator.onLine`).

It solves a concurrency issue: in Concurrent Mode, React can render components multiple times before committing. If an external store updates between renders, you can get "tearing" — different parts of the UI showing different values from the same store.

---

### Syntax

```jsx
const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?);
```

- **subscribe** — function to subscribe to the store; returns an unsubscribe function
- **getSnapshot** — returns the current store value (must be stable if value hasn't changed)
- **getServerSnapshot** — returns the initial value for SSR (optional)

---

### Example: browser online status

```jsx
function useOnlineStatus() {
  return useSyncExternalStore(
    // subscribe
    (callback) => {
      window.addEventListener('online', callback);
      window.addEventListener('offline', callback);
      return () => {
        window.removeEventListener('online', callback);
        window.removeEventListener('offline', callback);
      };
    },
    // getSnapshot (client)
    () => navigator.onLine,
    // getServerSnapshot (SSR)
    () => true
  );
}

function StatusBar() {
  const isOnline = useOnlineStatus();
  return <p>{isOnline ? '✅ Online' : '❌ Offline'}</p>;
}
```

---

### Why not useEffect + useState?

```jsx
// ❌ Not Concurrent Mode safe
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline  = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}
```

The `useEffect` approach can read a stale snapshot between React's render and commit phases in Concurrent Mode. `useSyncExternalStore` guarantees consistency.

---

### Custom store example

```jsx
// Simple external store
const store = {
  state: { count: 0 },
  listeners: new Set(),
  getState: () => store.state,
  setState: (updates) => {
    store.state = { ...store.state, ...updates };
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
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
