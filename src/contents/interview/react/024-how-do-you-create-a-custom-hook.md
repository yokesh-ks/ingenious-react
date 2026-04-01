# Q24: How do you create a **custom Hook** in React?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🟡 Intermediate |

---

A **custom Hook** is a JavaScript function whose name starts with `use` and that calls other Hooks internally. It lets you **extract and reuse stateful logic** across multiple components.

### Why custom Hooks?

Before Hooks, sharing logic between components required HOCs or render props — complex patterns. Custom Hooks are much simpler and don't add extra components to the tree.

---

### Creating a custom Hook

```jsx
// useFetch.js — a reusable data fetching hook
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```

### Using the custom Hook

```jsx
function UserProfile({ userId }) {
  const { data, loading, error } = useFetch(`/api/users/${userId}`);

  if (loading) return <p>Loading...</p>;
  if (error)   return <p>Error: {error}</p>;
  return <h1>{data.name}</h1>;
}

function PostsList() {
  const { data, loading } = useFetch('/api/posts');
  // Same hook, different component — each gets its own state!
}
```

---

### More examples of custom Hooks

```jsx
// useLocalStorage — persists state in localStorage
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? initialValue;
  });

  const setItem = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setItem];
}

// useToggle — simple boolean toggle
function useToggle(initial = false) {
  const [value, setValue] = useState(initial);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle];
}

// useWindowSize — track browser window size
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
```

---

### Rules for custom Hooks

1. Name must start with **`use`** — tells React and ESLint it's a Hook
2. Can call other Hooks inside it
3. Each component using the Hook gets **its own isolated state** — state is NOT shared between components

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
