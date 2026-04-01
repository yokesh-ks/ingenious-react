# Q45: How do you optimize **React app performance**?

| | |
|---|---|
| **Category** | Performance Optimization |
| **Difficulty** | 🟡 Intermediate |

---

React performance optimization falls into several categories. Always **profile first** with React DevTools before optimizing — don't guess.

---

### 1. Prevent unnecessary re-renders

```jsx
// Memoize components
const Child = React.memo(ChildComponent);

// Memoize computed values
const result = useMemo(() => expensiveCalc(data), [data]);

// Memoize callbacks
const handleClick = useCallback(() => doSomething(), []);
```

---

### 2. Code splitting & lazy loading

```jsx
const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>
```

---

### 3. Virtualize long lists

```jsx
import { FixedSizeList } from 'react-window';

<FixedSizeList height={500} itemCount={10000} itemSize={40}>
  {Row}
</FixedSizeList>
```

---

### 4. State management

- Keep state **as low as possible** in the component tree
- Split Context into multiple contexts — one large context re-renders all consumers on any change
- Use `useReducer` for complex state instead of multiple `useState` calls

---

### 5. Avoid expensive operations in render

```jsx
// ❌ Sorting inside render — runs every time
const sorted = items.sort((a, b) => a.name.localeCompare(b.name));

// ✅ Memoized — only recomputes when items changes
const sorted = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);
```

---

### 6. Debounce expensive handlers

```jsx
const debouncedSearch = useMemo(
  () => debounce((term) => fetchResults(term), 300),
  []
);
```

---

### 7. Use transitions for non-urgent updates (React 18)

```jsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setSearchResults(filter(query)); // non-urgent — can be interrupted
});
```

---

### 8. Image & asset optimization

- Use WebP/AVIF image formats
- Lazy load images: `<img loading="lazy" />`
- Serve from a CDN
- Preload critical assets

---

### 9. Use React DevTools Profiler

The Profiler tab shows:
- Which components re-rendered
- How long each render took
- **Why** each component rendered (state change, props change, parent re-render)

This identifies real bottlenecks — don't optimize blindly.

---

### Optimization checklist

| Technique | When to apply |
|---|---|
| `React.memo` | Expensive child component with stable props |
| `useMemo` | Expensive calculation, many renders |
| `useCallback` | Callback passed to memoized child |
| `React.lazy` | Large components not needed on initial load |
| Virtualization | Lists > 100 items |
| State splitting | Large Context causing too many re-renders |

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
