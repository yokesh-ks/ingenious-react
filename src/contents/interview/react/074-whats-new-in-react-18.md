# Q74: What's new in **React 18**?

| | |
|---|---|
| **Category** | React 18+ |
| **Difficulty** | 🟡 Intermediate |

---

React 18 (released March 2022) introduced **Concurrent React** — the biggest change since React Hooks. It enables React to prepare multiple UI versions simultaneously and work on them without blocking the main thread.

---

### 1. New root API

```jsx
// Old (React 17)
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// New (React 18)
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(<App />);
```

Switching to `createRoot` opts your app into all React 18 features.

---

### 2. Automatic batching

React 18 automatically batches state updates everywhere — not just inside React event handlers:

```jsx
// React 17 — two separate renders
setTimeout(() => {
  setCount(c => c + 1);  // render
  setFlag(f => !f);      // render
}, 1000);

// React 18 — batched into one render ✅
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // → single re-render
}, 1000);
```

---

### 3. New Hooks

| Hook | Purpose |
|---|---|
| `useTransition` | Mark updates as non-urgent (can be interrupted) |
| `useDeferredValue` | Defer rendering of a slow value |
| `useId` | Generate stable unique IDs (SSR-safe) |
| `useSyncExternalStore` | Subscribe to external stores safely |
| `useInsertionEffect` | For CSS-in-JS libraries, runs before DOM mutations |

---

### 4. Suspense improvements

- Suspense now works with **data fetching** (via libraries like React Query, SWR, Relay)
- Enables **Streaming SSR** — send HTML to the browser in chunks

---

### 5. React Server Components (experimental)

A new component type that runs only on the server — no JavaScript sent to the client. Adopted by Next.js App Router in production.

---

### 6. Streaming SSR

```jsx
// React 18 server API — streams HTML as it's ready
import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(<App />, {
  onShellReady() {
    res.setHeader('Content-Type', 'text/html');
    pipe(res); // start streaming immediately
  }
});
```

---

### Upgrading to React 18

```bash
npm install react@18 react-dom@18
```

Then change `ReactDOM.render` → `createRoot`. Most existing React 17 code works without changes — Concurrent features are opt-in.
