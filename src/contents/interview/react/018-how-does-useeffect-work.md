# Q18: How does **useEffect** work?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🟢 Beginner |

---

`useEffect` lets you run **side effects** in functional components. Side effects are anything that happens outside of rendering — like fetching data, setting up subscriptions, or updating the document title.

### Basic syntax

```jsx
useEffect(() => {
  // your side effect here
  return () => {
    // cleanup (optional)
  };
}, [dependencies]);
```

---

### The dependency array controls when the effect runs

| Dependency array | When effect runs |
|---|---|
| Not provided | After **every** render |
| `[]` (empty) | Only once — after the **first** render |
| `[value]` | After first render + whenever `value` changes |

```jsx
// Runs after every render
useEffect(() => {
  console.log('rendered');
});

// Runs once on mount
useEffect(() => {
  document.title = 'Hello';
}, []);

// Runs when userId changes
useEffect(() => {
  fetchUser(userId);
}, [userId]);
```

---

### Cleanup function

Return a function from `useEffect` to clean up when the component unmounts or before the effect re-runs:

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  return () => clearInterval(timer); // cleanup prevents memory leaks
}, []);
```

---

### Common use cases

- **Data fetching** — fetch API data when component mounts or a prop changes
- **Subscriptions** — WebSocket, event listeners
- **DOM manipulation** — update page title, scroll position
- **Timers** — intervals, timeouts

---

### Important: avoid infinite loops

```jsx
// ❌ WRONG — setCount changes count, which re-runs the effect → infinite loop!
useEffect(() => {
  setCount(count + 1);
}, [count]);

// ✅ CORRECT — functional update, no dependency on count
useEffect(() => {
  const timer = setInterval(() => setCount(c => c + 1), 1000);
  return () => clearInterval(timer);
}, []); // runs once
```

### Async in useEffect

```jsx
useEffect(() => {
  // Can't make useEffect itself async — create an inner async function
  async function loadUser() {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    setUser(data);
  }

  loadUser();
}, [userId]);
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
