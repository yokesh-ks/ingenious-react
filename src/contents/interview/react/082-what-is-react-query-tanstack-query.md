# Q82: What is **React Query** (TanStack Query)?

| | |
|---|---|
| **Category** | State Management |
| **Difficulty** | 🟡 Intermediate |

---

**TanStack Query** (formerly React Query) is a library for **server state management** — fetching, caching, synchronizing, and updating data from APIs. It replaces the common pattern of `useEffect` + `useState` for data fetching.

---

### The problem with manual data fetching

```jsx
// ❌ Manual fetching — repetitive, no caching, no refetch on focus
function Users() {
  const [users, setUsers]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]    = useState(null);

  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json())
      .then(data => { setUsers(data); setLoading(false); })
      .catch(e  => { setError(e.message); setLoading(false); });
  }, []);

  if (loading) return <Spinner />;
  if (error)   return <Error />;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

### Solution with TanStack Query

```jsx
import { useQuery } from '@tanstack/react-query';

function Users() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],                  // cache key
    queryFn: () => fetch('/api/users').then(r => r.json()),
    staleTime: 5 * 60 * 1000,            // data is fresh for 5 minutes
  });

  if (isLoading) return <Spinner />;
  if (error)     return <Error message={error.message} />;
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

---

### What you get for free

- ✅ **Caching** — same query in multiple components shares one request
- ✅ **Deduplication** — multiple requests for same data = one fetch
- ✅ **Background refetch** — stale data refetched when window regains focus
- ✅ **Loading/error states** — automatic
- ✅ **Retry** — failed requests automatically retry (3x by default)
- ✅ **Pagination & infinite scroll** — built-in helpers
- ✅ **Optimistic updates** — update UI before server confirms

---

### Mutations (creating/updating data)

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser) =>
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json' },
      }).then(r => r.json()),
    onSuccess: () => {
      // Invalidate cache → triggers refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  return (
    <button
      onClick={() => mutation.mutate({ name: 'Alice', email: 'alice@test.com' })}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? 'Adding...' : 'Add User'}
    </button>
  );
}
```

---

### Setup (wrap your app)

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
