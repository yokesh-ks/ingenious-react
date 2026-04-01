# Q29: What is **useImperativeHandle** and when do you use it?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🔴 Advanced |

---

`useImperativeHandle` customizes the **ref value exposed to a parent** when using `forwardRef`. It lets you control exactly what the parent can do with the ref — instead of exposing the entire DOM node.

### Why it exists

When a parent uses a ref on a child component via `forwardRef`, they normally get direct access to the DOM node. `useImperativeHandle` lets you expose only a **controlled API** instead.

---

### Example: Custom Input with controlled methods

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

// Child component
const FancyInput = forwardRef(function FancyInput(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus();
    },
    clear() {
      inputRef.current.value = '';
    }
    // The parent can ONLY call focus() and clear()
    // They cannot access inputRef.current directly
  }));

  return <input ref={inputRef} {...props} />;
});

// Parent component
function Form() {
  const inputRef = useRef(null);

  return (
    <>
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <button onClick={() => inputRef.current.clear()}>Clear</button>
    </>
  );
}
```

---

### Syntax

```jsx
useImperativeHandle(ref, () => ({
  // methods and properties to expose
}), [dependencies]); // optional deps array
```

---

### When to use it

✅ Use when:
- Building a reusable component library with a **controlled public API**
- The parent needs to trigger imperative actions (focus, scroll, play/pause) without exposing full DOM access
- You want to encapsulate the internal DOM structure

❌ Avoid overusing it — prefer the React data flow (props/state) whenever possible. Imperative APIs should be a last resort.
