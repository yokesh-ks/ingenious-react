# Q49: What are **React Portals**?

| | |
|---|---|
| **Category** | Advanced Patterns |
| **Difficulty** | 🟡 Intermediate |

---

**React Portals** let you render a component's output **into a different DOM node** than its parent — while keeping it part of the React component tree.

By default, React renders everything inside the root `<div id="root">`. Portals break out of that and render elsewhere in the DOM.

### Syntax

```jsx
import { createPortal } from 'react-dom';

function Modal({ children }) {
  return createPortal(
    children,
    document.getElementById('modal-root') // render target
  );
}
```

### Why is this useful?

**CSS stacking context problem**: A modal inside a deeply nested component with `overflow: hidden` or `z-index` constraints will be clipped or hidden. Portals let the modal render at the `<body>` level, outside those CSS constraints.

```html
<!-- index.html -->
<body>
  <div id="root"></div>
  <div id="modal-root"></div>  <!-- portal target -->
</body>
```

---

### Full Modal example

```jsx
import { useState } from 'react';
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}
      onClick={onClose}
    >
      <div
        style={{ background: 'white', padding: 24, borderRadius: 8 }}
        onClick={e => e.stopPropagation()}
      >
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <p>Modal content here</p>
      </Modal>
    </>
  );
}
```

---

### Key behaviors of Portals

- **Events bubble** through the React component tree (not the DOM tree) — a click inside a portal bubbles to the portal's React parent
- **Context** is still accessible — portals are logically part of the React tree
- **Lifecycle** works normally — portal components mount/unmount with their React parent

---

### Common use cases

- Modals and dialogs
- Tooltips and popovers
- Dropdown menus
- Notifications / toast messages
- Full-screen overlays

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
