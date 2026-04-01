# Q97: What is **code splitting** and how do you implement it in React?

| | |
|---|---|
| **Category** | Performance |
| **Difficulty** | 🟡 Intermediate |

---

**Code splitting** is the technique of breaking your JavaScript bundle into smaller chunks that are loaded on demand — instead of loading the entire app upfront.

Without code splitting, every page in your app is bundled into one large file. The user must download all of it before anything renders — even if they only visit one page.

---

### The problem

```
// Without code splitting
bundle.js = HomePage + Dashboard + Products + Settings + AdminPanel + Charts + ...
           = 2MB downloaded on first visit, even if user only sees HomePage
```

### The solution

```
// With code splitting
bundle.js     = Core app shell (~100KB)
dashboard.js  = Loaded when user visits /dashboard
products.js   = Loaded when user visits /products
admin.js      = Loaded when user visits /admin
```

---

### React.lazy + Suspense — route-level splitting

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Instead of: import Dashboard from './pages/Dashboard';
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Products  = lazy(() => import('./pages/Products'));
const Settings  = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products"  element={<Products />} />
          <Route path="/settings"  element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

Each route is now a separate chunk. When a user navigates to `/dashboard`, the browser downloads `dashboard.js` for the first time.

---

### Component-level splitting

Split heavy components that aren't needed on initial render:

```jsx
const HeavyChart     = lazy(() => import('./HeavyChart'));
const RichTextEditor = lazy(() => import('./RichTextEditor'));
const PdfViewer      = lazy(() => import('./PdfViewer'));

function ReportPage() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<ChartSkeleton />}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

---

### Prefetching — load before the user navigates

```jsx
// Prefetch on hover — user is likely to click
function NavLink({ to, children }) {
  const handleMouseEnter = () => {
    // Start downloading the chunk in the background
    import(`./pages/${to}`);
  };

  return (
    <Link to={to} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  );
}
```

---

### Vite/Webpack automatic splitting

Modern bundlers automatically split vendor code:

```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunk for large libraries
          'react-vendor': ['react', 'react-dom'],
          'chart-vendor': ['recharts', 'd3'],
        },
      },
    },
  },
});
```

---

### Measuring the impact

```bash
npm run build

# Vite output shows each chunk:
dist/assets/index-DzF3xGCA.js          87.45 kB │ gzip: 28.10 kB
dist/assets/Dashboard-B3kJhLqP.js      42.31 kB │ gzip: 14.20 kB
dist/assets/Products-CyTbwXkF.js       28.17 kB │ gzip:  9.80 kB
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
