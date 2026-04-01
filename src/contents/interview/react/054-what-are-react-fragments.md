# Q54: What are **React Fragments**?

| | |
|---|---|
| **Category** | Advanced Patterns |
| **Difficulty** | 🟢 Beginner |

---

**React Fragments** let you group multiple elements without adding an extra DOM node.

### The problem

React components must return a single root element. Before Fragments, developers wrapped everything in a `<div>` — adding unnecessary DOM nodes.

```jsx
// ❌ Extra <div> pollutes the DOM
function UserInfo() {
  return (
    <div>
      <h1>Alice</h1>
      <p>alice@example.com</p>
    </div>
  );
}
```

### Solution: Fragments

```jsx
import { Fragment } from 'react';

// ✅ No extra DOM node
function UserInfo() {
  return (
    <Fragment>
      <h1>Alice</h1>
      <p>alice@example.com</p>
    </Fragment>
  );
}
```

### Short syntax (most common)

```jsx
function UserInfo() {
  return (
    <>
      <h1>Alice</h1>
      <p>alice@example.com</p>
    </>
  );
}
```

---

### When to use Fragments

**1. Returning multiple elements (especially table rows):**

```jsx
function TableRow({ name, role }) {
  return (
    <>
      <td>{name}</td>
      <td>{role}</td>
    </>
  );
  // Renders as <td>Alice</td><td>Developer</td>
  // No extra <div> that would break the table structure!
}
```

**2. Conditional rendering of multiple elements:**

```jsx
function UserDetails({ user }) {
  return (
    <>
      <h2>{user.name}</h2>
      {user.isAdmin && (
        <>
          <span className="badge">Admin</span>
          <button>Manage Users</button>
        </>
      )}
    </>
  );
}
```

---

### Fragment with key (for lists)

Use `<Fragment key={id}>` when you need to add a key — the `<>` shorthand doesn't support keys:

```jsx
items.map(item => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </Fragment>
))
```
