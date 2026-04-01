# Q33: What is **componentDidUpdate** and its Hook equivalent?

| | |
|---|---|
| **Category** | Component Lifecycle |
| **Difficulty** | 🟡 Intermediate |

---

`componentDidUpdate` runs **after every re-render** (but not after the initial mount). It receives the previous props and state so you can compare and respond to specific changes.

### Class component

```jsx
class UserProfile extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    // Only fetch when userId actually changed
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser(this.props.userId);
    }
  }
}
```

Without the comparison check, you'd fetch on **every** re-render — causing an infinite loop if `setState` is called inside.

---

### Functional component equivalent

`useEffect` with a specific dependency:

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(setUser);
  }, [userId]); // runs on first render AND whenever userId changes

  return user ? <h1>{user.name}</h1> : <p>Loading...</p>;
}
```

---

### Accessing previous values in functional components

`useEffect` doesn't give you `prevProps` directly — use `useRef`:

```jsx
function Component({ value }) {
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      console.log(`Changed from ${prevValue.current} to ${value}`);
    }
    prevValue.current = value; // update after render
  });
}
```

---

### Key differences

| | `componentDidUpdate` | `useEffect` with deps |
|---|---|---|
| Runs on mount? | ❌ No | ✅ Yes (first time) |
| Access prev values? | ✅ Via arguments | Via `useRef` |
| Granularity | One method for all changes | Separate effect per dependency |

---

### Running effect only on update (skip first render)

```jsx
const isFirstRender = useRef(true);

useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return; // skip first render
  }

  console.log('Value updated:', value);
}, [value]);
```