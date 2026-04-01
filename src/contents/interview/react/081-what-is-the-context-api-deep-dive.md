# Q81: What is the **Context API** — a deep dive?

| | |
|---|---|
| **Category** | State Management |
| **Difficulty** | 🟡 Intermediate |

---

The **Context API** is React's built-in solution for sharing state across components without prop drilling. Understanding it deeply — including its performance characteristics — is key to using it correctly.

---

### Full production-ready pattern

```tsx
// ThemeContext.tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme(t => t === 'light' ? 'dark' : 'light');
  }, []);

  // Memoize the value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>');
  return context;
}
```

---

### Performance: the re-render problem

Every component that calls `useContext(MyContext)` re-renders when the context value changes — **even if it only uses one field that didn't change**.

```jsx
// ❌ Problem: one large context
const AppContext = createContext({ user, theme, cart, notifications });
// All consumers re-render when ANY value changes

// ✅ Solution: split into focused contexts
const UserContext          = createContext(user);
const ThemeContext         = createContext(theme);
const CartContext          = createContext(cart);
const NotificationsContext = createContext(notifications);
```

---

### Memoizing the value (critical for performance)

Without memoization, a new object is created on every render — causing all consumers to re-render even if values are the same:

```jsx
// ❌ New object every render — all consumers re-render
<Context.Provider value={{ user, logout }}>

// ✅ Stable reference — consumers only re-render when user or logout changes
const value = useMemo(() => ({ user, logout }), [user, logout]);
<Context.Provider value={value}>
```

---

### When Context is NOT enough

Context is great for low-frequency updates (theme, locale, auth user). For high-frequency updates (typed input, mouse position, animations), use **Zustand** or **Jotai** — they have granular subscriptions where components only re-render when their specific slice changes.

---

### Nesting multiple providers

```jsx
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <CartProvider>
          <Router />
        </CartProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
