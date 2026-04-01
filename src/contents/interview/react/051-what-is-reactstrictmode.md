# Q51: What is **React.StrictMode**?

| | |
|---|---|
| **Category** | Advanced Patterns |
| **Difficulty** | 🟢 Beginner |

---

`React.StrictMode` is a development-only tool that helps you find potential problems in your app. It **renders no visible UI** and has **no effect in production**.

### How to use it

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

---

### What StrictMode does

#### 1. Double-invokes functions to detect side effects

In development, React intentionally renders components **twice** (mount → unmount → mount again) to detect side effects in the render phase.

Your component should produce the same output both times. This catches bugs like:
- State mutations during render
- Stale closures
- Inconsistent renders

#### 2. Warns about deprecated APIs

- `componentWillMount`, `componentWillUpdate`, `componentWillReceiveProps` are deprecated
- StrictMode logs warnings when they're used

#### 3. Warns about legacy string refs

```jsx
// ❌ Deprecated — StrictMode warns
<input ref="myInput" />

// ✅ Modern — no warning
<input ref={inputRef} />
```

#### 4. Detects unexpected side effects

Warns about patterns that could cause problems in Concurrent Mode — like non-pure renders or improper use of state.

---

### Why the double-render?

If your component is pure (same input → same output), rendering twice should produce the same result. If it doesn't, you have a bug. The double-render is how React catches it early.

You may notice `console.log` firing twice in development — this is intentional and only happens in StrictMode.

---

### StrictMode is safe to leave on

Enable it for the entire app in development. It has **zero runtime cost in production** — `StrictMode` is completely stripped from production builds.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
