# Q59: What is **Zustand** and why is it popular?

| | |
|---|---|
| **Category** | State Management |
| **Difficulty** | 🟡 Intermediate |

---

**Zustand** is a small, fast state management library for React. It provides global state with minimal boilerplate — much simpler than Redux while avoiding the performance pitfalls of Context API.

The name means "state" in German.

---

### Setup

```bash
npm install zustand
```

### Create a store

```jsx
import { create } from 'zustand';

const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset:     () => set({ count: 0 }),
}));
```

### Use in any component — no Provider needed

```jsx
function Counter() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>−</button>
    </>
  );
}
```

---

### Selective subscription (performance)

Components only re-render when the selected slice changes:

```jsx
// Only re-renders when count changes
const count = useCounterStore((state) => state.count);

// Only re-renders when increment reference changes (almost never)
const increment = useCounterStore((state) => state.increment);
```

---

### Async actions

```jsx
const useUserStore = create((set) => ({
  user: null,
  loading: false,
  fetchUser: async (id) => {
    set({ loading: true });
    const user = await fetch(`/api/users/${id}`).then(r => r.json());
    set({ user, loading: false });
  }
}));

// Usage
const { user, loading, fetchUser } = useUserStore();
useEffect(() => { fetchUser(1); }, []);
```

---

### Why developers love Zustand

| Feature | Zustand |
|---|---|
| Boilerplate | Minimal |
| Provider needed? | ❌ No |
| Redux DevTools support | ✅ Yes |
| TypeScript | ✅ Excellent |
| Bundle size | ~1KB |
| Granular re-renders | ✅ Fine-grained subscriptions |

---

### TypeScript usage

```tsx
interface BearStore {
  bears: number;
  increase: (by: number) => void;
}

const useBearStore = create<BearStore>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
