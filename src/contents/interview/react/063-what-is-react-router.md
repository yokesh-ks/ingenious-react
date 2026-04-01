# Q63: What is **React Router** and how does it work?

| | |
|---|---|
| **Category** | React Router |
| **Difficulty** | 🟢 Beginner |

---

**React Router** is the standard library for client-side routing in React apps. It lets you build **single-page applications (SPAs)** where navigating between pages doesn't reload the browser — React handles the URL changes and renders the matching component.

---

### Installation

```bash
npm install react-router-dom
```

---

### Basic setup (React Router v6)

```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/users/42">User 42</Link>
      </nav>

      <Routes>
        <Route path="/"           element={<Home />} />
        <Route path="/about"      element={<About />} />
        <Route path="/users/:id"  element={<UserProfile />} />
        <Route path="*"           element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

### How it works

1. **BrowserRouter** uses the HTML5 History API to sync the URL with the app state — no page reloads
2. **Routes** looks at the current URL and renders the first matching **Route**
3. **Link** renders an `<a>` tag that updates the URL without reloading
4. Components receive URL info via hooks (`useParams`, `useLocation`, `useNavigate`)

---

### Essential hooks

```jsx
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function UserProfile() {
  const { id }    = useParams();       // get URL params (/users/:id)
  const navigate  = useNavigate();     // programmatic navigation
  const location  = useLocation();     // current URL info

  return (
    <>
      <p>User ID: {id}</p>
      <button onClick={() => navigate('/')}>Go Home</button>
      <p>Current path: {location.pathname}</p>
    </>
  );
}
```

---

### Link vs `<a>` tag

| | `<Link>` | `<a>` |
|---|---|---|
| Page reload | ❌ No | ✅ Yes |
| React state preserved | ✅ Yes | ❌ No |
| Use for | Internal routes | External URLs |

---

### NavLink (active link highlighting)

```jsx
import { NavLink } from 'react-router-dom';

<NavLink
  to="/about"
  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
>
  About
</NavLink>
```