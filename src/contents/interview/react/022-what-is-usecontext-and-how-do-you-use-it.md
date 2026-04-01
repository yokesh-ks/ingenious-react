# Q22: What is **useContext** and how do you use it?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🟢 Beginner |

---

`useContext` lets you read a **Context** value directly in a functional component, without wrapping it in a Consumer component.

### What is Context?

Context is React's built-in way to share data across components **without passing props through every level** (prop drilling).

---

### Setting up Context (3 steps)

**Step 1: Create the context**
```jsx
import { createContext } from 'react';

const ThemeContext = createContext('light'); // 'light' is the default value
```

**Step 2: Provide the value**
```jsx
function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
```

**Step 3: Consume with useContext**
```jsx
import { useContext } from 'react';

function Toolbar() {
  const theme = useContext(ThemeContext); // reads 'dark'

  return <div className={theme}>Toolbar</div>;
}
```

No matter how deeply nested `Toolbar` is, it reads the context directly — no prop drilling needed.

---

### Re-renders

A component re-renders whenever the **context value changes**. For performance, avoid putting frequently-changing values in a single context — split into multiple contexts instead.

---

### Common pattern: custom hook for context

```jsx
// Wrap context in a hook for better ergonomics + error handling
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}

// Usage
function Button() {
  const theme = useTheme();
  return <button className={theme}>Click</button>;
}
```

---

### Full TypeScript example

```tsx
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const toggleTheme = useCallback(() => setTheme(t => t === 'light' ? 'dark' : 'light'), []);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
}
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
