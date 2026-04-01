# Q17: What are the **rules of Hooks**?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🟢 Beginner |

---

React enforces **two fundamental rules** for Hooks. Breaking them causes bugs that are hard to debug.

---

### Rule 1: Only call Hooks at the top level

Never call Hooks inside loops, conditions, or nested functions.

```jsx
// ❌ WRONG — conditional Hook
function MyComponent({ isLoggedIn }) {
  if (isLoggedIn) {
    const [name, setName] = useState(''); // violates the rule!
  }
}

// ✅ CORRECT — Hook always runs
function MyComponent({ isLoggedIn }) {
  const [name, setName] = useState('');
  if (!isLoggedIn) return null; // condition goes after the Hook
}
```

**Why?** React tracks Hooks by their **call order**. If you call them conditionally, the order changes between renders and React can't match state to the right Hook.

---

### Rule 2: Only call Hooks from React functions

Call Hooks from:
- ✅ Functional components
- ✅ Custom Hooks

Never call them from:
- ❌ Regular JavaScript functions
- ❌ Class components
- ❌ Event handlers directly

```jsx
// ❌ WRONG — Hook inside a regular function
function fetchData() {
  const [data, setData] = useState(null); // not a component or Hook
}

// ✅ CORRECT — custom Hook (name starts with "use")
function useFetchData(url) {
  const [data, setData] = useState(null);
  useEffect(() => { /* fetch logic */ }, [url]);
  return data;
}
```

---

### How to enforce the rules

Install the ESLint plugin — it catches violations automatically:

```bash
npm install eslint-plugin-react-hooks
```

Add to your ESLint config:

```json
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

This plugin is included by default in Create React App and Vite's React templates.
