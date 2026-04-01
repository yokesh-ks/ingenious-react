# Q99: What are the key differences between **React 17** and **React 18**?

| | |
|---|---|
| **Category** | React 18+ |
| **Difficulty** | 🟡 Intermediate |

---

React 18 (released March 2022) introduced a fundamentally new rendering engine. Here are the most important changes.

---

### 1. New Root API

```jsx
// React 17 — old way
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// React 18 — new way (enables Concurrent Features)
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

The new `createRoot` API opts your entire app into Concurrent Mode and unlocks all React 18 features.

---

### 2. Automatic Batching

```jsx
// React 17 — only batches inside React event handlers
// setTimeout, Promises, native events = 1 setState = 1 re-render

// React 18 — batches everywhere automatically
setTimeout(() => {
  setCount(c => c + 1);  // ↓ batched together
  setFlag(f => !f);      // → 1 re-render instead of 2
}, 100);
```

---

### 3. Concurrent Features (new in 18)

| Feature | React 17 | React 18 |
|---|---|---|
| `useTransition` | ❌ | ✅ |
| `useDeferredValue` | ❌ | ✅ |
| `useId` | ❌ | ✅ |
| `useSyncExternalStore` | ❌ | ✅ |
| Streaming SSR | ❌ | ✅ |
| Suspense in SSR | ❌ | ✅ |

---

### 4. Suspense improvements

```jsx
// React 17 — Suspense in SSR was not supported
// React 18 — Suspense works in SSR (streaming)

// Server sends HTML in chunks as Suspense boundaries resolve
<Suspense fallback={<Spinner />}>
  <Comments />  {/* streamed after main content */}
</Suspense>
```

---

### 5. New hooks

**`useId`** — generates stable unique IDs for accessibility:

```jsx
// React 17 — no built-in solution
// React 18
function Form() {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>Name</label>
      <input id={id} type="text" />
    </>
  );
}
```

**`useTransition`** — non-blocking state updates:

```jsx
const [isPending, startTransition] = useTransition();
startTransition(() => {
  setFilter(value);  // won't block user input
});
```

**`useDeferredValue`** — defer expensive re-renders:

```jsx
const deferredQuery = useDeferredValue(query);
```

**`useSyncExternalStore`** — safe external store subscriptions:

```jsx
const state = useSyncExternalStore(store.subscribe, store.getSnapshot);
```

---

### 6. StrictMode behavior change

React 18 StrictMode adds **double-invocation of effects** in development:

```
Mount → Run effects → Unmount → Run cleanup → Mount again → Run effects
```

This simulates fast refresh behavior and helps catch effects that don't clean up properly. In React 17, effects were only invoked once even in StrictMode.

---

### 7. `ReactDOM.render` is deprecated

Using the old `ReactDOM.render` in React 18 shows a warning and opts you out of Concurrent Features — it still works but is deprecated.

---

### Migration path (17 → 18)

```bash
npm install react@18 react-dom@18
```

```jsx
// Replace:
ReactDOM.render(<App />, container);

// With:
createRoot(container).render(<App />);
```

Most React 17 apps work in React 18 with just this one change.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
