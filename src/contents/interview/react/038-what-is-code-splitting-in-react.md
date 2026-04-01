# Q38: What is **code splitting** in React?

| | |
|---|---|
| **Category** | Performance Optimization |
| **Difficulty** | 🟡 Intermediate |

---

**Code splitting** is the technique of breaking your app's JavaScript bundle into **smaller chunks** that are loaded on demand, rather than loading everything upfront.

Without code splitting, all your JavaScript is bundled into one large file. With code splitting, users only download the code they need for the current page or feature.

---

### Why it matters

```
Without splitting: user downloads 2MB bundle → waits → app loads
With splitting:    user downloads 200KB bundle → app loads → more code fetched as needed
```

---

### React.lazy — component-level code splitting

```jsx
import { lazy, Suspense } from 'react';

// The component is only loaded when it's first rendered
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings  = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings"  element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

When a user navigates to `/dashboard`, React fetches the `Dashboard` bundle — it's not in the initial download.

---

### Route-based splitting (most common pattern)

Splitting at the route level gives the best performance gain — each page is a separate chunk:

```jsx
const Home     = lazy(() => import('./pages/Home'));
const About    = lazy(() => import('./pages/About'));
const Products = lazy(() => import('./pages/Products'));
const Checkout = lazy(() => import('./pages/Checkout'));
```

---

### Dynamic imports (manual)

Load a heavy library only when needed:

```jsx
async function handleExport() {
  const { default: jsPDF } = await import('jspdf'); // loaded on demand
  const doc = new jsPDF();
  doc.save('report.pdf');
}
```

---

### Bundle analyzer

Use `rollup-plugin-visualizer` (Vite) to see what's in your bundle:

```bash
npm install --save-dev rollup-plugin-visualizer
```

```js
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default {
  plugins: [react(), visualizer({ open: true, gzipSize: true })]
};
```

Run `npm run build` → opens an interactive map of your bundle size.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
