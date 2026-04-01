# Q42: How does React's **reconciliation** algorithm work?

| | |
|---|---|
| **Category** | Performance Optimization |
| **Difficulty** | 🔴 Advanced |

---

**Reconciliation** is the process React uses to figure out **what changed** in the virtual DOM and apply the minimum number of DOM updates.

When state or props change, React creates a new virtual DOM tree and compares it with the previous one. This comparison is called **diffing**.

---

### The diffing algorithm

React's diffing makes two assumptions that make it O(n) instead of O(n³):

#### 1. Elements of different types produce different trees

If a `<div>` changes to a `<section>`, React **tears down the old tree entirely** and builds a new one — even if children are the same.

```jsx
// Old:  <div><Counter /></div>
// New:  <section><Counter /></section>
// React destroys Counter and creates a new one from scratch
```

#### 2. Keys help React identify which items changed in lists

```jsx
// Without keys — React re-renders everything when order changes
<li>Alice</li>
<li>Bob</li>

// With keys — React knows exactly which item moved
<li key="alice">Alice</li>
<li key="bob">Bob</li>
```

---

### The Virtual DOM

React keeps an in-memory copy of the DOM (the virtual DOM). When state changes:

```
1. React renders the new Virtual DOM tree
2. React diffs old tree vs new tree (reconciliation)
3. React computes the minimal set of DOM operations
4. React applies those operations to the real DOM (commit phase)
```

This is much faster than directly manipulating the real DOM on every update.

---

### Same element type — update only the changed props

```jsx
// Old: <div className="red" title="foo" />
// New: <div className="blue" title="foo" />
// React updates only className — leaves title alone
```

---

### React Fiber (React 16+)

**Fiber** is the reimplementation of React's reconciliation engine. It breaks rendering work into **small units** that can be paused, prioritized, and resumed — enabling Concurrent Mode features like `useTransition`.

Before Fiber, reconciliation was synchronous and couldn't be interrupted. A slow render would block the UI completely.

With Fiber:
- High-priority updates (user input) can interrupt low-priority renders
- React can work on multiple versions of the UI simultaneously

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
