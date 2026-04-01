# Q83: What are **React design patterns** you should know?

| | |
|---|---|
| **Category** | Advanced Patterns |
| **Difficulty** | 🔴 Advanced |

---

Design patterns are reusable solutions to common problems. Here are the most important React patterns you'll encounter in real codebases.

---

### 1. Container / Presentational (Smart / Dumb)

Separate **data fetching** from **rendering**:

```jsx
// Container — fetches data, handles state
function UserListContainer() {
  const { data: users, isLoading } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
  if (isLoading) return <Spinner />;
  return <UserList users={users} />;
}

// Presentational — pure UI, accepts data as props
function UserList({ users }) {
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

---

### 2. Custom Hook pattern

Extract stateful logic into reusable hooks:

```jsx
function useCart() {
  const [items, setItems] = useState([]);
  const add    = (item) => setItems(prev => [...prev, item]);
  const remove = (id)   => setItems(prev => prev.filter(i => i.id !== id));
  const total  = items.reduce((sum, item) => sum + item.price, 0);
  return { items, add, remove, total };
}
```

---

### 3. Compound Components

Components work together with shared implicit state (via Context):

```jsx
<Select>
  <Select.Trigger>Choose option</Select.Trigger>
  <Select.Options>
    <Select.Option value="a">Option A</Select.Option>
    <Select.Option value="b">Option B</Select.Option>
  </Select.Options>
</Select>
```

---

### 4. Controlled / Uncontrolled Component pattern

Build components that work both ways (like native inputs):

```jsx
function Toggle({ value, defaultValue, onChange }) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? false);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = () => {
    if (!isControlled) setInternalValue(v => !v);
    onChange?.(!currentValue);
  };

  return <button onClick={handleChange}>{currentValue ? 'ON' : 'OFF'}</button>;
}

// Both work:
<Toggle defaultValue={false} />                 // uncontrolled
<Toggle value={isOn} onChange={setIsOn} />      // controlled
```

---

### 5. Slot pattern (children composition)

Accept children in named slots instead of specific props:

```jsx
function Card({ header, footer, children }) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}

<Card
  header={<h2>Product Name</h2>}
  footer={<button>Buy Now</button>}
>
  <p>Product description...</p>
</Card>
```

---

### 6. Observer / Event Bus pattern

For decoupled communication between unrelated components:

```jsx
// Simple event emitter
const events = new EventTarget();

function publish(event, data) {
  events.dispatchEvent(new CustomEvent(event, { detail: data }));
}

function useSubscribe(event, handler) {
  useEffect(() => {
    events.addEventListener(event, e => handler(e.detail));
    return () => events.removeEventListener(event, handler);
  }, [event, handler]);
}
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
