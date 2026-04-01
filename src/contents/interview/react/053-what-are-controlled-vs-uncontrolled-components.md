# Q53: What are **controlled** vs **uncontrolled** components?

| | |
|---|---|
| **Category** | Advanced Patterns |
| **Difficulty** | 🟢 Beginner |

---

These terms describe **who controls the value** of a form element — React or the DOM.

---

### Controlled Component

React is the **single source of truth**. The input value is driven by state, and every keystroke updates state via an event handler.

```jsx
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}                            // React controls the value
      onChange={e => setValue(e.target.value)} // sync every keystroke to state
    />
  );
}
```

**Benefits:**
- Instant access to the current value (just read `value` from state)
- Easy to validate, transform, or conditionally disable
- Predictable — React state is the single source of truth

**Downside:** More boilerplate — every input needs a state and an onChange handler.

---

### Uncontrolled Component

The DOM manages its own value. You access it via a **ref** when needed (e.g., on form submit).

```jsx
function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value); // read on demand
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="initial" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

**Benefits:**
- Less boilerplate
- Works well for simple forms
- Better for integrating with non-React code

**Downside:** Can't easily validate or conditionally format the input as the user types.

---

### Comparison

| | Controlled | Uncontrolled |
|---|---|---|
| Value managed by | React state | DOM |
| Access value | State variable | `ref.current.value` |
| Real-time validation | ✅ Easy | ❌ Hard |
| Default value prop | `value` | `defaultValue` |
| Re-renders on change | ✅ Yes | ❌ No |

---

### Which to use?

Use **controlled** for most cases — especially when you need validation, dynamic inputs, or computed values.

Use **uncontrolled** for:
- File inputs (which cannot be controlled — always use `ref`)
- Simple forms where you only need the value on submit
- Integrating with third-party DOM libraries
