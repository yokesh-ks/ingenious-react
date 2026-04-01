# Q76: What is **automatic batching** in React 18?

| | |
|---|---|
| **Category** | React 18+ |
| **Difficulty** | 🟡 Intermediate |

---

**Automatic batching** means React groups multiple state updates into a **single re-render** automatically — even outside React event handlers.

### Before React 18

React only batched updates inside **React event handlers**. Updates inside `setTimeout`, Promises, or native event listeners caused separate renders:

```jsx
// React 17

// ✅ Batched inside React event — 1 render
<button onClick={() => {
  setA(1);
  setB(2);
  // → single re-render
}}>

// ❌ NOT batched in setTimeout — 2 renders
setTimeout(() => {
  setA(1); // re-render
  setB(2); // re-render
}, 0);

// ❌ NOT batched in async/await — 2 renders
fetch('/api').then(() => {
  setA(1); // re-render
  setB(2); // re-render
});
```

### React 18 — batched everywhere automatically

```jsx
// React 18

// ✅ Batched in setTimeout — 1 render
setTimeout(() => {
  setA(1);
  setB(2);
  // → single re-render
}, 0);

// ✅ Batched in async/await — 1 render
fetch('/api').then(() => {
  setA(1);
  setB(2);
  // → single re-render
});

// ✅ Batched in native event listeners — 1 render
element.addEventListener('click', () => {
  setA(1);
  setB(2);
  // → single re-render
});
```

---

### Opting out of batching

If you need a specific update to render immediately (rare), use `flushSync`:

```jsx
import { flushSync } from 'react-dom';

setTimeout(() => {
  flushSync(() => setA(1)); // renders immediately
  // DOM is updated here
  flushSync(() => setB(2)); // renders immediately after
  // DOM is updated here
}, 0);
```

---

### Why does this matter?

Automatic batching means **fewer unnecessary re-renders** → better performance, with no code changes required when upgrading to React 18.

---

### Practical example

```jsx
function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(data => {
        // React 18: batched into one render — not three!
        setData(data);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
}
```