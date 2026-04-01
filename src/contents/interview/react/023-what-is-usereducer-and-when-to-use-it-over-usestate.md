# Q23: What is **useReducer** and when would you use it over **useState**?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🟡 Intermediate |

---

`useReducer` is an alternative to `useState` for managing **complex state logic**. It follows the same pattern as Redux — state + action → new state.

### Syntax

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- **reducer** — a function `(state, action) => newState`
- **dispatch** — sends actions to the reducer
- **state** — current state value

---

### Example: Counter

```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset':     return initialState;
    default: throw new Error('Unknown action: ' + action.type);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>−</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </>
  );
}
```

---

### useReducer vs useState

| Situation | Use |
|---|---|
| Simple value (boolean, number, string) | `useState` |
| Multiple sub-values that change together | `useReducer` |
| Next state depends on the previous in complex ways | `useReducer` |
| Predictable, testable state transitions | `useReducer` |
| Coming from Redux / like the action pattern | `useReducer` |

---

### Practical example: Form state

```jsx
function formReducer(state, action) {
  return { ...state, [action.field]: action.value };
}

function SignupForm() {
  const [form, dispatch] = useReducer(formReducer, {
    name: '', email: '', password: ''
  });

  const handleChange = (e) =>
    dispatch({ field: e.target.name, value: e.target.value });

  return (
    <form>
      <input name="name"     value={form.name}     onChange={handleChange} />
      <input name="email"    value={form.email}    onChange={handleChange} />
      <input name="password" value={form.password} onChange={handleChange} />
    </form>
  );
}
```

The reducer is a **pure function** — easy to unit test independently of React.
