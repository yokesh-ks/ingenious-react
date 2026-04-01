# Q87: What are **React DevTools** and how do you use them?

| | |
|---|---|
| **Category** | Tooling |
| **Difficulty** | 🟢 Beginner |

---

**React DevTools** is a browser extension (Chrome/Firefox/Edge) that lets you inspect, debug, and profile React applications. It adds two panels to your browser's developer tools: **Components** and **Profiler**.

---

### Installation

Install from the Chrome Web Store or Firefox Add-ons as "React Developer Tools". Once installed, open DevTools (`F12`) and look for the **Components** and **Profiler** tabs.

---

### Components panel

Lets you inspect your component tree, props, state, and context:

```
▼ App
  ▼ Router
    ▼ Header
        NavLink  (isActive: true)
        NavLink  (isActive: false)
    ▼ ProductPage
        ProductDetails  (product: {id: 1, name: "Laptop"})
        ProductReviews  (count: 42)
```

**What you can do:**
- Click any component to inspect its current **props** and **state**
- Edit props/state live to test different scenarios
- See which **context** values a component consumes
- Click the source icon to jump directly to the component's code

---

### Profiler panel

Records render performance so you can find slow components:

```
Commit #1 — 12ms
  ▼ App             (1ms)
    ▼ ProductList   (9ms)  ← slow!
        ProductCard (0.5ms each × 20)
```

**How to use:**
1. Click **Record** (circle icon)
2. Interact with your app (scroll, click, type)
3. Click **Stop**
4. Inspect the flame graph — wide bars = slow renders

---

### Useful tricks

**Highlight re-renders** — in Components settings, enable "Highlight updates when components render". Components flash blue when they re-render, making unnecessary re-renders visible.

**Why did this render?** — in Profiler settings, enable "Record why each component rendered while profiling". Each commit then shows:
- Props changed
- State changed
- Context changed
- Parent re-rendered

**`$r` in console** — after selecting a component in the Components panel, type `$r` in the console to get a reference to the component instance.

---

### Programmatic profiling

```jsx
import { Profiler } from 'react';

function onRender(id, phase, actualDuration) {
  console.log(`${id} (${phase}) took ${actualDuration}ms`);
}

<Profiler id="ProductList" onRender={onRender}>
  <ProductList items={items} />
</Profiler>
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
