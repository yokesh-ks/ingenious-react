# Q30: What is **forwardRef** in React?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🟡 Intermediate |

---

`forwardRef` lets a component **pass a ref through to a child DOM element or inner component**. By default, refs don't work on custom components — `forwardRef` fixes that.

### The problem

```jsx
// ❌ This doesn't work — ref doesn't reach the input DOM node
function MyInput(props) {
  return <input {...props} />;
}

function Form() {
  const ref = useRef(null);
  return <MyInput ref={ref} />; // ref.current is null!
}
```

### Solution: forwardRef

```jsx
import { forwardRef, useRef } from 'react';

// ✅ Wrap the component with forwardRef
const MyInput = forwardRef(function MyInput(props, ref) {
  return <input ref={ref} {...props} />;
});

function Form() {
  const ref = useRef(null);

  return (
    <>
      <MyInput ref={ref} placeholder="Type here..." />
      <button onClick={() => ref.current.focus()}>Focus Input</button>
    </>
  );
}
```

---

### How it works

`forwardRef` takes a render function with two arguments:
1. `props` — the component's props (as usual)
2. `ref` — the ref passed by the parent

You attach that `ref` to whatever DOM element you want to expose.

---

### Common use cases

- **UI component libraries** — input, button, modal components that need programmatic focus/scroll
- **Animation libraries** — need refs to DOM elements to animate them
- **Form libraries** — React Hook Form uses refs to track uncontrolled inputs

---

### With TypeScript

```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const MyInput = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input ref={ref} {...props} />
    </div>
  );
});

MyInput.displayName = 'MyInput'; // helps with debugging in React DevTools
```

---

### forwardRef + useImperativeHandle

Combine them to expose a controlled API instead of the raw DOM node:

```jsx
const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ''; }
  }));

  return <input ref={inputRef} {...props} />;
});
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
