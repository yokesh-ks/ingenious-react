# Q16: What are React **Hooks** and why were they introduced?

| | |
|---|---|
| **Category** | React Hooks |
| **Difficulty** | 🟢 Beginner |

---

React **Hooks** are special functions that let you use React features like state and lifecycle methods inside **functional components** — without writing a class.

They were introduced in **React 16.8** (February 2019).

### Why were they needed?

Before Hooks, if you needed state or lifecycle logic, you had to use a class component:

```jsx
// Old way — class component just to use state
class Counter extends React.Component {
  state = { count: 0 };
  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}
```

With Hooks, the same logic is much simpler:

```jsx
// New way — functional component with useState Hook
function Counter() {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Problems Hooks solved

| Problem | How Hooks help |
|---|---|
| Reusing stateful logic was hard (needed HOCs/render props) | Custom Hooks let you extract and share logic cleanly |
| Large class components became hard to understand | Split logic into focused `useEffect` calls |
| Classes confused beginners (`this`, binding) | Functions are simpler — no `this` needed |
| Logic was scattered across lifecycle methods | Related logic lives together in one Hook |

### Common built-in Hooks

- `useState` — local state
- `useEffect` — side effects (data fetching, subscriptions)
- `useContext` — read context values
- `useReducer` — complex state logic
- `useRef` — DOM references / mutable values
- `useMemo` / `useCallback` — performance optimization

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
