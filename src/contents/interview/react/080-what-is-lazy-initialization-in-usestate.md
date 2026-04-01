# Q80: What is **lazy initialization** in useState?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🟡 Intermediate |

---

**Lazy initialization** in `useState` lets you pass a **function** as the initial value instead of a value directly. This function runs only on the **first render** — avoiding expensive computations on every re-render.

---

### The problem

```jsx
// ❌ getExpensiveInitialState() runs on EVERY render
// Even though useState only uses it once (on first render)!
function MyComponent() {
  const [state, setState] = useState(getExpensiveInitialState());
}
```

Every re-render of `MyComponent` calls `getExpensiveInitialState()` — wasted work.

---

### Solution: lazy initializer

```jsx
// ✅ Pass a function — React calls it only once (on mount)
function MyComponent() {
  const [state, setState] = useState(() => getExpensiveInitialState());
}
```

Key: pass `() => value`, not `value`.

---

### Real-world examples

**Reading from localStorage (common pattern):**
```jsx
// ❌ Reads localStorage on every render
const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

// ✅ Reads localStorage only once on mount
const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
```

**Parsing JSON:**
```jsx
// ❌ Expensive parse on every render
const [data, setData] = useState(JSON.parse(props.rawJson));

// ✅ Parsed only once
const [data, setData] = useState(() => JSON.parse(props.rawJson));
```

**Generating initial data:**
```jsx
function createInitialTodos() {
  const todos = [];
  for (let i = 0; i < 5000; i++) {
    todos.push({ id: i, text: `Task ${i}`, done: false });
  }
  return todos;
}

// Pass function reference (not a call) — runs createInitialTodos only once
const [todos, setTodos] = useState(createInitialTodos);
//                                  ↑ no parentheses!
```

---

### Same pattern with useReducer

```jsx
// Third argument is the initializer function
const [state, dispatch] = useReducer(reducer, undefined, () => getInitialState());
```

---

### Why this matters in practice

The performance gain is most noticeable when:
- Reading from localStorage, sessionStorage, or cookies
- Parsing large JSON strings
- Creating large initial arrays or maps
- Any computation that takes more than a trivial amount of time
