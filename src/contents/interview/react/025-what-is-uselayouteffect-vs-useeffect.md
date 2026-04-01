# Q25: What is **useLayoutEffect** and how does it differ from **useEffect**?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🔴 Advanced |

---

Both `useLayoutEffect` and `useEffect` run side effects — but at **different points** in React's rendering process.

---

### Timing difference

```
React renders → paints to screen → useEffect runs      (non-blocking, async)
React renders → useLayoutEffect runs → paints to screen (blocking, sync)
```

| | `useEffect` | `useLayoutEffect` |
|---|---|---|
| When it runs | **After** the browser paints | **Before** the browser paints |
| Blocks painting? | ❌ No (async) | ✅ Yes (sync) |
| Performance | Better (default choice) | Can cause visual delays |
| Use for | Most side effects | DOM measurements, prevent flicker |

---

### When to use useLayoutEffect

Use it when you need to **read the DOM and immediately update it** before the user sees anything — to prevent a visual flicker.

```jsx
import { useLayoutEffect, useRef, useState } from 'react';

function Tooltip({ text, targetRef }) {
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useLayoutEffect(() => {
    // Read DOM dimensions synchronously, before browser paints
    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    setPosition({
      top: targetRect.top - tooltipRect.height,
      left: targetRect.left,
    });
    // If we used useEffect, tooltip would briefly flash at the wrong position
  }, []);

  return (
    <div ref={tooltipRef} style={{ position: 'absolute', ...position }}>
      {text}
    </div>
  );
}
```

---

### Rule of thumb

> Always start with `useEffect`. Only switch to `useLayoutEffect` if you see visual flickering caused by DOM reads/writes.

---

### SSR warning

`useLayoutEffect` causes a warning during **server-side rendering** because there's no DOM on the server. Two options:

```jsx
// Option 1: use useEffect for SSR-compatible behavior
// Option 2: conditionally use useLayoutEffect only in browser
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
```