# Q58: When should you use **Context API** vs **Redux**?

| | |
|---|---|
| **Category** | State Management |
| **Difficulty** | 🟡 Intermediate |

---

Both Context API and Redux manage shared state — but they solve different problems at different scales.

---

### Context API — built-in, simple

**Use Context when:**
- You have **global, infrequently-changing** data (theme, locale, current user)
- The app is **small to medium** sized
- You want no extra dependencies
- State is simple enough for `useState` or `useReducer`

```jsx
const ThemeContext = createContext('light');

function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}
```

**Limitation:** Every component that consumes a context re-renders when the context value changes — even if they only care about one slice of it.

---

### Redux — external library, powerful

**Use Redux when:**
- Many components across the tree share **frequently-changing** state
- You need **time-travel debugging** (Redux DevTools)
- Complex async flows (multiple related loading/error/data states)
- Large team needs a **strict, predictable pattern**
- You want to select specific slices efficiently (avoids unnecessary re-renders)

```jsx
// useSelector only re-renders when count changes — not ALL state changes
const count = useSelector(state => state.counter.value);
```

---

### Quick decision guide

| Situation | Use |
|---|---|
| Theme, language, current user | Context API |
| Complex app state across many features | Redux Toolkit |
| Simple forms, local state | `useState` |
| Server data caching (fetch/cache/sync) | React Query / SWR |
| Moderate complexity, less boilerplate | Zustand |

---

### Modern alternatives

- **Zustand** — minimal global state without Redux boilerplate (~1KB)
- **Jotai** — atomic state (like Recoil but simpler)
- **Valtio** — proxy-based reactive state
- **React Query / TanStack Query** — server state (caching, refetching)
- **SWR** — lightweight server state from Vercel

---

### Rule of thumb

> Start with local state → lift to Context when needed → add Redux/Zustand when Context becomes a performance bottleneck or the app grows complex.
