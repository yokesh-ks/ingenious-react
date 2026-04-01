# Q55: What are **synthetic events** in React?

| | |
|---|---|
| **Category** | Advanced Patterns |
| **Difficulty** | 🟡 Intermediate |

---

**Synthetic events** are React's cross-browser wrapper around the browser's native events. They provide a consistent API that works the same way in every browser.

### How they work

When you write an event handler in React, you receive a `SyntheticEvent` object — not the browser's native event directly.

```jsx
function Button() {
  function handleClick(event) {
    // event is a SyntheticEvent, not a native MouseEvent
    console.log(event.type);          // "click"
    console.log(event.target);        // the DOM element
    event.preventDefault();           // works cross-browser
    event.stopPropagation();          // works cross-browser
    event.nativeEvent;                // access the underlying browser event
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

---

### SyntheticEvent properties

SyntheticEvent has the same interface as native events:
- `event.target` / `event.currentTarget`
- `event.type`
- `event.preventDefault()`
- `event.stopPropagation()`
- `event.nativeEvent` — the original browser event

---

### Event naming differences (JSX vs HTML)

| HTML | JSX |
|---|---|
| `onclick` | `onClick` |
| `onchange` | `onChange` |
| `onsubmit` | `onSubmit` |
| `onkeydown` | `onKeyDown` |
| `onmouseenter` | `onMouseEnter` |

JSX uses camelCase for all event names.

---

### React uses event delegation

React doesn't attach event listeners to every DOM node. Instead, it attaches **one listener at the root** (since React 17, at the root container) and uses event bubbling to handle all events. This is more efficient.

---

### Event pooling (React 16 and earlier)

In React 16, synthetic events were **pooled** — reused for performance. The event object was nullified after the handler ran:

```jsx
// ❌ React 16 gotcha — event is null in async code
function handleChange(event) {
  setTimeout(() => {
    console.log(event.target.value); // null! event was recycled
  }, 100);
}

// Fix: read the value synchronously before any async work
function handleChange(event) {
  const value = event.target.value; // read synchronously
  setTimeout(() => console.log(value), 100);
}
```

**In React 17+, event pooling was removed** — async access works fine without any workaround.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
