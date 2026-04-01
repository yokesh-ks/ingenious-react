# Q35: What is **getDerivedStateFromProps**?

| | |
|---|---|
| **Category** | Component Lifecycle |
| **Difficulty** | 🔴 Advanced |

---

`getDerivedStateFromProps` is a **static class component lifecycle method** that runs before every render (both mount and update). It lets you update state based on changes to props.

### Syntax

```jsx
static getDerivedStateFromProps(nextProps, prevState) {
  // Return an object to update state, or null to update nothing
  if (nextProps.userId !== prevState.userId) {
    return { userId: nextProps.userId, data: null }; // reset data when user changes
  }
  return null; // no state update needed
}
```

---

### Full example

```jsx
class UserProfile extends React.Component {
  state = { userId: null, data: null };

  static getDerivedStateFromProps(props, state) {
    if (props.userId !== state.userId) {
      return { userId: props.userId, data: null }; // reset when prop changes
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.fetchData(); // fetch new data after state reset
    }
  }

  fetchData() {
    fetch(`/api/users/${this.props.userId}`)
      .then(res => res.json())
      .then(data => this.setState({ data }));
  }

  render() {
    return this.state.data
      ? <h1>{this.state.data.name}</h1>
      : <p>Loading...</p>;
  }
}
```

---

### Why "static"?

Because it has **no access to `this`** — it can't call instance methods or access the component instance. It's a pure function of props and state.

---

### In functional components

There's no direct equivalent. Instead, derive the value during render or use `useEffect` to sync state with props:

```jsx
function UserProfile({ userId }) {
  const [data, setData] = useState(null);

  // Reset data when userId changes — functional equivalent
  useEffect(() => {
    setData(null); // reset
    fetchUser(userId).then(setData);
  }, [userId]);
}
```

---

### When to use it

Rarely — most cases are better handled with `useEffect` or by computing derived values directly during render. Overusing it makes components hard to understand.

Good rule of thumb: prefer computing values in render over storing them in state.
