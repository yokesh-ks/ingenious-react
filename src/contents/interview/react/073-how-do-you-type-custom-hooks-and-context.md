# Q73: How do you type **custom Hooks** and **Context** in TypeScript?

| | |
|---|---|
| **Category** | TypeScript with React |
| **Difficulty** | 🔴 Advanced |

---

Typing Hooks and Context properly in TypeScript is essential for getting autocomplete and type safety throughout your app.

---

### Typing custom Hooks

```tsx
// useFetch.ts
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetch(url)
      .then(res => res.json() as Promise<T>)
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => setState({ data: null, loading: false, error: err.message }));
  }, [url]);

  return state;
}

// Usage — TypeScript infers the generic type
interface User { id: number; name: string; email: string; }

function Profile() {
  const { data, loading, error } = useFetch<User>('/api/user/1');
  // data is User | null — fully typed!
  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  return <h1>{data?.name}</h1>;
}
```

---

### Typing Context

```tsx
// AuthContext.tsx
interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password);
    setUser(user);
  };

  const logout = () => setUser(null);

  const value = useMemo(
    () => ({ user, login, logout, isAuthenticated: !!user }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook with null guard — guaranteed non-null return
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

// Usage — fully typed
function Dashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  // user: User | null
  // logout: () => void
  // isAuthenticated: boolean
}
```

---

### Generic components

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
  emptyMessage?: string;
}

function List<T>({ items, renderItem, keyExtractor, emptyMessage }: ListProps<T>) {
  if (items.length === 0) return <p>{emptyMessage || 'No items'}</p>;

  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage — T inferred as User
<List
  items={users}
  renderItem={user => <span>{user.name}</span>}
  keyExtractor={user => user.id.toString()}
/>
```
