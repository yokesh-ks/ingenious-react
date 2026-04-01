# Q26: What is **useId** in React?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🟡 Intermediate |

---

`useId` is a Hook introduced in **React 18** that generates a **stable, unique ID** consistent between the server and client.

### The problem it solves

When building accessible forms, labels must reference input IDs:

```jsx
// ❌ Problem: hard-coded IDs break when component is used multiple times
function EmailField() {
  return (
    <>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
    </>
  );
}

// If you render <EmailField /> twice, you get duplicate IDs — invalid HTML!
```

### Solution with useId

```jsx
import { useId } from 'react';

function EmailField() {
  const id = useId(); // generates ":r0:", ":r1:", etc.

  return (
    <>
      <label htmlFor={id}>Email</label>
      <input id={id} type="email" />
    </>
  );
}

// Now each instance gets a unique ID — safe to render multiple times
<EmailField />
<EmailField />
```

---

### Why not use Math.random() or a counter?

- `Math.random()` generates **different values** on server vs client → hydration mismatch in SSR
- A module-level counter also causes mismatches in SSR
- `useId` is **SSR-safe** — it produces the same ID on both server and client

---

### Multiple IDs from one call

```jsx
function PasswordField() {
  const id = useId();

  return (
    <div>
      <label htmlFor={`${id}-input`}>Password</label>
      <input id={`${id}-input`} type="password" />
      <p id={`${id}-hint`}>Must be at least 8 characters</p>
      <input aria-describedby={`${id}-hint`} />
    </div>
  );
}
```

---

### Important: not for list keys

`useId` is for **accessibility attributes** (`id`, `aria-labelledby`, `htmlFor`), not for list `key` props. For list keys, use stable IDs from your data source.