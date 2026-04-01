# Q41: What is **PureComponent** in React?

| | |
|---|---|
| **Category** | Performance Optimization |
| **Difficulty** | 🟡 Intermediate |

---

`React.PureComponent` is a class component base that implements `shouldComponentUpdate` with a **shallow comparison** of props and state. If nothing changed shallowly, the component skips re-rendering.

It's the class component equivalent of `React.memo` for functional components.

---

### Regular Component vs PureComponent

```jsx
// Regular Component — re-renders on every parent render
class RegularList extends React.Component {
  render() {
    return <ul>{this.props.items.map(i => <li>{i}</li>)}</ul>;
  }
}

// PureComponent — skips re-render if props/state haven't shallowly changed
class PureList extends React.PureComponent {
  render() {
    return <ul>{this.props.items.map(i => <li>{i}</li>)}</ul>;
  }
}
```

---

### What is a shallow comparison?

Shallow comparison checks if **primitive values** are equal (`===`) and if **object/array references** are the same — it does NOT deep-compare object contents.

```jsx
// Shallow comparison examples:
5 === 5                // ✅ same — no re-render
'hello' === 'hello'   // ✅ same — no re-render
[] === []              // ❌ different references — re-render!
{ a: 1 } === { a: 1 } // ❌ different references — re-render!
```

---

### Pitfall: mutating objects/arrays breaks PureComponent

```jsx
// ❌ WRONG — PureComponent won't detect this change!
handleAddItem() {
  this.props.items.push('new item'); // mutates the same array reference
  this.setState({ items: this.props.items });
}

// ✅ CORRECT — new array reference triggers re-render
handleAddItem() {
  this.setState({ items: [...this.props.items, 'new item'] });
}
```

---

### Functional equivalent

```jsx
// React.memo = PureComponent for functional components
const PureList = React.memo(function PureList({ items }) {
  return <ul>{items.map(i => <li>{i}</li>)}</ul>;
});
```

---

### When to use

Use `PureComponent` (or `React.memo`) when:
- The component renders often but with the same props
- The render is expensive
- You follow **immutable data patterns** (always create new objects/arrays on change)
