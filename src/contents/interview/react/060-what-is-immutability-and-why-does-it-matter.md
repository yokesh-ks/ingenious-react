# Q60: What is **immutability** and why does it matter in React?

| | |
|---|---|
| **Category** | State Management |
| **Difficulty** | 🟡 Intermediate |

---

**Immutability** means never modifying existing data — instead, creating a **new copy** with the changes applied.

This is fundamental to React because React uses **reference equality** (`===`) to detect state changes. If you mutate an object, its reference stays the same — React thinks nothing changed and skips re-rendering.

---

### The mutation bug

```jsx
function App() {
  const [user, setUser] = useState({ name: 'Alice', age: 30 });

  function birthday() {
    // ❌ WRONG — mutates the existing object
    user.age += 1;
    setUser(user); // same reference! React sees no change → no re-render
  }

  return <button onClick={birthday}>{user.name}: {user.age}</button>;
}
```

### The correct, immutable way

```jsx
function birthday() {
  // ✅ CORRECT — create a new object with the change
  setUser({ ...user, age: user.age + 1 }); // new reference → React re-renders
}
```

---

### Immutable update patterns

**Updating an object:**
```jsx
// ❌ Mutation
state.user.name = 'Bob';

// ✅ Immutable
const newState = { ...state, user: { ...state.user, name: 'Bob' } };
```

**Adding to an array:**
```jsx
// ❌ Mutation
items.push(newItem);

// ✅ Immutable
const newItems = [...items, newItem];
```

**Removing from an array:**
```jsx
// ✅ Immutable — filter creates a new array
const newItems = items.filter(item => item.id !== targetId);
```

**Updating an item in an array:**
```jsx
// ✅ Immutable — map creates a new array
const newItems = items.map(item =>
  item.id === targetId ? { ...item, done: true } : item
);
```

---

### Tools that help

**Immer** — lets you write "mutating" code that produces immutable updates:

```jsx
import produce from 'immer';

const newState = produce(state, draft => {
  draft.user.age += 1;     // looks like mutation but produces new object
  draft.items.push(item);  // safe!
});
```

Redux Toolkit uses Immer internally, which is why you can "mutate" state in RTK slices.

---

### Why immutability enables performance optimizations

`React.memo`, `PureComponent`, `useSelector` (Redux) — they all rely on **reference equality**. Immutable updates create new references → these optimizations work correctly.

```
Mutated: oldObj === newObj → true → React skips update ❌
Immutable: oldObj !== newObj → false → React re-renders ✅
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
