# Q31: What are the **lifecycle phases** of a React component?

| | |
|---|---|
| **Category** | Component Lifecycle |
| **Difficulty** | 🟡 Intermediate |

---

Every React component goes through three main **lifecycle phases**:

---

### 1. Mounting — component is created and added to the DOM

Class component methods (in order):
1. `constructor()` — initialize state and bind methods
2. `static getDerivedStateFromProps()` — sync state with props before render
3. `render()` — return JSX
4. `componentDidMount()` — runs after DOM is ready (fetch data, set up subscriptions)

Functional equivalent:
```jsx
useEffect(() => {
  // runs once after the first render (componentDidMount equivalent)
}, []);
```

---

### 2. Updating — component re-renders due to state/props change

Class component methods (in order):
1. `static getDerivedStateFromProps()`
2. `shouldComponentUpdate()` — return false to skip re-render
3. `render()`
4. `getSnapshotBeforeUpdate()` — capture DOM state before update
5. `componentDidUpdate(prevProps, prevState)` — react to updates

Functional equivalent:
```jsx
useEffect(() => {
  // runs when `value` changes (componentDidUpdate equivalent)
}, [value]);
```

---

### 3. Unmounting — component is removed from the DOM

Class component method:
- `componentWillUnmount()` — clean up timers, subscriptions, event listeners

Functional equivalent:
```jsx
useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer); // componentWillUnmount equivalent
}, []);
```

---

### Full lifecycle diagram

```
Mount:
  constructor
  → getDerivedStateFromProps
  → render
  → DOM update
  → componentDidMount

Update:
  getDerivedStateFromProps
  → shouldComponentUpdate
  → render
  → getSnapshotBeforeUpdate
  → DOM update
  → componentDidUpdate

Unmount:
  componentWillUnmount
```

---

### In functional components

All lifecycle behavior is handled by `useEffect` — the dependency array controls which phase triggers the effect:

| useEffect signature | Lifecycle equivalent |
|---|---|
| `useEffect(() => {}, [])` | componentDidMount |
| `useEffect(() => {}, [val])` | componentDidUpdate (for val) |
| `useEffect(() => { return cleanup; }, [])` | componentWillUnmount |

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
