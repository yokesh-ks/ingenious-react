# Q48: What is **prop drilling** and how do you avoid it?

| | |
|---|---|
| **Category** | Advanced Patterns |
| **Difficulty** | 🟢 Beginner |

---

**Prop drilling** is when you pass props through multiple layers of components just to get data from a top-level component to a deeply nested one — even though intermediate components don't use that data.

### The problem

```jsx
function App() {
  const [user, setUser] = useState({ name: 'Alice' });
  return <PageLayout user={user} />;
}

function PageLayout({ user }) {
  return <Header user={user} />; // just passing through, doesn't use user
}

function Header({ user }) {
  return <UserMenu user={user} />; // just passing through
}

function UserMenu({ user }) {
  return <p>Hello, {user.name}</p>; // finally uses user!
}
```

`PageLayout` and `Header` are "middlemen" — they don't use `user` but are forced to receive and forward it.

---

### Solutions

#### 1. Context API (most common)

```jsx
const UserContext = createContext(null);

function App() {
  const [user] = useState({ name: 'Alice' });
  return (
    <UserContext.Provider value={user}>
      <PageLayout /> {/* no user prop needed */}
    </UserContext.Provider>
  );
}

function UserMenu() {
  const user = useContext(UserContext); // directly reads from context
  return <p>Hello, {user.name}</p>;
}
```

#### 2. Component composition (slots)

Pass the already-rendered component, skipping intermediaries:

```jsx
function App() {
  const [user] = useState({ name: 'Alice' });
  return (
    <PageLayout
      header={<Header rightSlot={<UserMenu user={user} />} />}
    />
  );
}

// PageLayout doesn't need to know about user at all
function PageLayout({ header }) {
  return (
    <div>
      {header}
      <main>...</main>
    </div>
  );
}
```

#### 3. State management library (Redux, Zustand, Jotai)

Any component can subscribe directly to global state without prop chains.

---

### When is prop drilling acceptable?

1–2 levels deep is fine. Only extract to context/global state when:
- Props are passed through 3+ unrelated levels
- Many components need the same data
- The "middlemen" components become polluted with unrelated props
