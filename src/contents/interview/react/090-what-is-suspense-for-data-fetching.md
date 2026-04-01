# Q90: What is **Suspense for data fetching** in React 18+?

| | |
|---|---|
| **Category** | React 18+ |
| **Difficulty** | 🔴 Advanced |

---

**Suspense** lets you declaratively specify a loading state while a component is waiting for asynchronous data — without writing manual loading checks in every component.

---

### The old way (manual loading states)

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser(userId).then(data => {
      setUser(data);
      setLoading(false);
    });
  }, [userId]);

  if (loading) return <Spinner />;
  return <div>{user.name}</div>;
}
```

Every component has its own loading logic. They all show spinners independently, causing a "cascade of spinners" effect.

---

### The Suspense way

```jsx
// Parent declares the loading fallback
function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <UserProfile userId={1} />
    </Suspense>
  );
}

// Child just uses the data — no loading state needed
function UserProfile({ userId }) {
  const user = use(fetchUserPromise(userId)); // React 19 / frameworks
  return <div>{user.name}</div>;
}
```

---

### How Suspense works internally

When a component "suspends", it **throws a Promise**. React catches it, shows the `fallback`, and re-renders the component when the Promise resolves.

```
Component throws Promise
  → React catches it
  → Shows <Suspense fallback={...}>
  → Promise resolves
  → React re-renders the component
  → Shows actual content
```

---

### Suspense with TanStack Query

TanStack Query has first-class Suspense support:

```jsx
import { useSuspenseQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  // No isLoading check needed — suspends automatically
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  return <div>{user.name}</div>;
}

// Wrap with Suspense in the parent
function App() {
  return (
    <Suspense fallback={<UserSkeleton />}>
      <ErrorBoundary fallback={<UserError />}>
        <UserProfile userId={1} />
      </ErrorBoundary>
    </Suspense>
  );
}
```

---

### Nested Suspense boundaries

Show different loading states for different parts of the page:

```jsx
function Dashboard() {
  return (
    <div>
      <Suspense fallback={<HeaderSkeleton />}>
        <UserHeader />        {/* suspends independently */}
      </Suspense>

      <div className="grid">
        <Suspense fallback={<ChartSkeleton />}>
          <SalesChart />      {/* suspends independently */}
        </Suspense>

        <Suspense fallback={<ListSkeleton />}>
          <RecentOrders />    {/* suspends independently */}
        </Suspense>
      </div>
    </div>
  );
}
```

Each section shows its skeleton independently — no "all or nothing" loading.

---

### `use()` hook (React 19)

The new `use()` hook can unwrap any Promise inside a component:

```jsx
import { use, Suspense } from 'react';

const userPromise = fetchUser(1); // start fetching outside component

function UserName() {
  const user = use(userPromise); // suspends until resolved
  return <span>{user.name}</span>;
}

// Parent must wrap with Suspense
<Suspense fallback="Loading...">
  <UserName />
</Suspense>
```

---

### Suspense + Error Boundary

Always pair Suspense (for loading) with ErrorBoundary (for errors):

```jsx
<ErrorBoundary fallback={<p>Something went wrong.</p>}>
  <Suspense fallback={<Spinner />}>
    <DataComponent />
  </Suspense>
</ErrorBoundary>
```
