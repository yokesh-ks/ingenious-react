# Q39: What are **React.lazy** and **Suspense**?

| | |
|---|---|
| **Category** | Performance Optimization |
| **Difficulty** | 🟡 Intermediate |

---

**`React.lazy`** lets you load a component **dynamically** (only when it's needed). **`Suspense`** is the wrapper that shows a fallback UI while the lazy component is loading.

They work together to implement **code splitting** at the component level.

---

### React.lazy

```jsx
import { lazy } from 'react';

// Dynamic import — this component is in a separate JS chunk
const HeavyChart = lazy(() => import('./components/HeavyChart'));
```

`import('./components/HeavyChart')` returns a Promise. `React.lazy` handles that Promise and renders the component once it resolves.

---

### Suspense

```jsx
import { Suspense } from 'react';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<div>Loading chart...</div>}>
        <HeavyChart /> {/* fetched on first render */}
      </Suspense>
    </div>
  );
}
```

While `HeavyChart` is loading, the fallback is shown. Once loaded, the chart replaces it.

---

### Suspense can wrap multiple lazy components

```jsx
<Suspense fallback={<PageSkeleton />}>
  <Header />
  <MainContent />
  <Sidebar />
</Suspense>
```

---

### Error handling with Error Boundary

Network errors during lazy loading are caught by an Error Boundary:

```jsx
<ErrorBoundary fallback={<p>Failed to load. Please retry.</p>}>
  <Suspense fallback={<Spinner />}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>
```

---

### Limitations

- `React.lazy` only works with **default exports**:
```jsx
// ✅ Works
export default function Dashboard() { ... }
const Dashboard = lazy(() => import('./Dashboard'));

// ❌ Doesn't work with named exports directly
// Workaround: re-export as default
```

- Only works on the **client** — for SSR use frameworks like Next.js (`next/dynamic`)

---

### React 18+: Suspense for data

In React 18, Suspense also works with data fetching (through libraries like React Query, SWR, or Relay that support the Suspense contract), not just code splitting.

```jsx
// With React Query's useSuspenseQuery
function UserProfile({ userId }) {
  const { data } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });
  // data is always defined here — no loading check needed!
  return <h1>{data.name}</h1>;
}

<Suspense fallback={<Skeleton />}>
  <UserProfile userId="1" />
</Suspense>
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
