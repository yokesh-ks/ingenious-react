# Q32: What is **componentDidMount** and its Hook equivalent?

| | |
|---|---|
| **Category** | Component Lifecycle |
| **Difficulty** | 🟢 Beginner |

---

`componentDidMount` is a class component lifecycle method that runs **once, immediately after the component is inserted into the DOM**.

It's the right place to:
- Fetch data from an API
- Set up event listeners or subscriptions
- Initialize third-party libraries that need a DOM node

### Class component

```jsx
class UserProfile extends React.Component {
  state = { user: null };

  componentDidMount() {
    // Component is in the DOM — safe to fetch data
    fetch(`/api/users/${this.props.userId}`)
      .then(res => res.json())
      .then(user => this.setState({ user }));
  }

  render() {
    return this.state.user
      ? <h1>{this.state.user.name}</h1>
      : <p>Loading...</p>;
  }
}
```

### Functional component equivalent

Use `useEffect` with an **empty dependency array `[]`**:

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, []); // [] means: run once after the first render (mount)

  return user ? <h1>{user.name}</h1> : <p>Loading...</p>;
}
```

---

### Why not fetch in the component body?

The component body runs on **every render**. Fetching there would send a request every re-render — wasteful and causes infinite loops if you set state from it.

`useEffect` with `[]` safely runs the fetch only once.

---

### Async in useEffect

```jsx
useEffect(() => {
  // Can't make useEffect callback async directly
  async function loadUser() {
    const res = await fetch(`/api/users/${userId}`);
    const data = await res.json();
    setUser(data);
  }

  loadUser();
}, []); // runs once on mount
```

---

### With cleanup

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/users/${userId}`, { signal: controller.signal })
    .then(res => res.json())
    .then(setUser)
    .catch(err => {
      if (err.name !== 'AbortError') setError(err.message);
    });

  return () => controller.abort(); // cancel request on unmount
}, [userId]);
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
