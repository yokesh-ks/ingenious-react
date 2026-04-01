# Q43: Why are **keys** important in React lists?

| | |
|---|---|
| **Category** | Performance Optimization |
| **Difficulty** | 🟢 Beginner |

---

**Keys** are special props that help React identify which items in a list have **changed, been added, or removed**. Without keys, React can't tell list items apart and has to re-render the entire list.

### Without keys — wrong behavior

```jsx
// ❌ No keys — React compares by position
['Alice', 'Bob', 'Charlie'].map(name => <li>{name}</li>)

// If Alice is removed:
// Old: [Alice, Bob, Charlie]
// New: [Bob, Charlie]
// React thinks: Alice → Bob (update text), Bob → Charlie (update text), remove last
// React didn't "remove Alice" — it mutated all 3 items!
```

### With keys — correct behavior

```jsx
// ✅ Keys — React compares by identity
users.map(user => <li key={user.id}>{user.name}</li>)

// If Alice is removed:
// React sees: alice key is gone → remove exactly that DOM node
// Bob and Charlie are untouched
```

---

### Rules for good keys

| Rule | Why |
|---|---|
| Keys must be **unique among siblings** | Not globally unique — only within the list |
| Use **stable, permanent IDs** from your data | Database IDs, UUIDs |
| Don't use **array index** (usually) | Index changes when items are added/removed/reordered |

---

### When is index as key acceptable?

```jsx
// ✅ OK to use index when:
// - The list is static (never reordered or filtered)
// - Items have no stable IDs
// - List is never filtered, sorted, or reordered

items.map((item, index) => <li key={index}>{item}</li>)
```

Using index as key with reorderable lists causes:
- Wrong input values staying in the wrong position
- Incorrect animations
- Component state belonging to wrong items

---

### Why NOT to use Math.random() or Date.now()

```jsx
// ❌ NEVER do this — generates new key on every render
// React unmounts and remounts every list item each time!
items.map(item => <li key={Math.random()}>{item}</li>)
```

Keys must be **stable** — the same item must always get the same key across renders.

---

### Fragment with key (for multi-element rows)

```jsx
// When each item needs multiple elements, use <Fragment key>
items.map(item => (
  <Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.definition}</dd>
  </Fragment>
))
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
