# Q44: What is **shouldComponentUpdate** in React?

| | |
|---|---|
| **Category** | Performance Optimization |
| **Difficulty** | 🟡 Intermediate |

---

`shouldComponentUpdate` is a class component lifecycle method that lets you **control whether a component re-renders** after a state or props change.

By default, React re-renders a component whenever its parent renders or its state changes. `shouldComponentUpdate` lets you skip unnecessary renders.

### Syntax

```jsx
shouldComponentUpdate(nextProps, nextState) {
  // Return true = re-render (default)
  // Return false = skip re-render
  return nextProps.value !== this.props.value;
}
```

---

### Full example

```jsx
class Counter extends React.Component {
  state = { count: 0 };

  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render if count or label actually changed
    return (
      nextState.count !== this.state.count ||
      nextProps.label !== this.props.label
    );
  }

  render() {
    return <p>{this.props.label}: {this.state.count}</p>;
  }
}
```

---

### PureComponent is the easy version

Manually implementing `shouldComponentUpdate` is error-prone. `PureComponent` does shallow comparison automatically:

```jsx
// This is equivalent to implementing shouldComponentUpdate with shallow comparison
class Counter extends React.PureComponent {
  render() {
    return <p>{this.props.label}: {this.props.count}</p>;
  }
}
```

---

### Functional component equivalent

`React.memo` replaces `shouldComponentUpdate` for functional components:

```jsx
const Counter = React.memo(function Counter({ label, count }) {
  return <p>{label}: {count}</p>;
});

// With custom comparison (like a custom shouldComponentUpdate):
const Counter = React.memo(
  ({ label, count }) => <p>{label}: {count}</p>,
  (prev, next) => prev.count === next.count && prev.label === next.label
  // Return true = same (don't re-render) — OPPOSITE of shouldComponentUpdate!
);
```

**Note:** `React.memo`'s comparison function return value is the **opposite** of `shouldComponentUpdate`:
- `shouldComponentUpdate` returns `true` = re-render
- `React.memo` comparison returns `true` = skip re-render (same props)

---

### Caution

Incorrectly returning `false` from `shouldComponentUpdate` can cause **stale UI** — the component doesn't update when it should. Always profile before optimizing.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
