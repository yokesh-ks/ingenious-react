# Q65: How do you implement **nested routes** in React Router v6?

| | |
|---|---|
| **Category** | React Router |
| **Difficulty** | 🟡 Intermediate |

---

**Nested routes** let you render child routes inside a parent layout component. React Router v6 makes this significantly cleaner than v5.

---

### Setup

```jsx
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>           {/* parent layout */}
          <Route index element={<Home />} />             {/* /           */}
          <Route path="about" element={<About />} />    {/* /about       */}
          <Route path="dashboard" element={<DashboardLayout />}> {/* nested */}
            <Route index element={<DashHome />} />      {/* /dashboard   */}
            <Route path="settings" element={<Settings />} /> {/* /dashboard/settings */}
            <Route path="profile"  element={<Profile />} />  {/* /dashboard/profile  */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

### The Outlet component

`<Outlet />` is where the child route renders inside the parent component:

```jsx
function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <main>
        <Outlet />  {/* child route renders here */}
      </main>

      <footer>© 2026 My App</footer>
    </div>
  );
}

function DashboardLayout() {
  return (
    <div style={{ display: 'flex' }}>
      <aside>
        <Link to="/dashboard">Overview</Link>
        <Link to="/dashboard/settings">Settings</Link>
        <Link to="/dashboard/profile">Profile</Link>
      </aside>
      <main>
        <Outlet />  {/* nested dashboard routes render here */}
      </main>
    </div>
  );
}
```

---

### Index routes

The `index` prop marks the default child route (renders when the parent path is matched exactly):

```jsx
<Route path="dashboard" element={<DashboardLayout />}>
  <Route index element={<DashHome />} />          {/* renders at /dashboard */}
  <Route path="settings" element={<Settings />} /> {/* renders at /dashboard/settings */}
</Route>
```

---

### Passing data to Outlet (Outlet context)

```jsx
function DashboardLayout() {
  const [user] = useState({ name: 'Alice', role: 'admin' });
  return (
    <>
      <nav>...</nav>
      <Outlet context={{ user }} />
    </>
  );
}

function Settings() {
  const { user } = useOutletContext();
  return <p>Settings for {user.name}</p>;
}
```
