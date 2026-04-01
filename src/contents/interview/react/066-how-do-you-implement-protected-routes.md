# Q66: How do you implement **protected routes** in React Router?

| | |
|---|---|
| **Category** | React Router |
| **Difficulty** | 🟡 Intermediate |

---

**Protected routes** redirect unauthenticated users to a login page before they can access certain parts of your app.

---

### The ProtectedRoute component (v6)

```jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

function ProtectedRoute() {
  const { isAuthenticated } = useAuth(); // your auth hook/store

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // render the protected content
}
```

---

### Using it in Routes

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes — all nested routes require auth */}
        <Route element={<ProtectedRoute />}>
          <Route path="/"          element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile"   element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

---

### Preserve the redirect URL

After login, redirect back to where the user was trying to go:

```jsx
function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}  // save where they were going
        replace
      />
    );
  }

  return <Outlet />;
}

// In the Login component:
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  async function handleLogin(credentials) {
    await auth.login(credentials);
    navigate(from, { replace: true }); // back to original destination
  }
}
```

---

### Role-based protection

```jsx
function RoleRoute({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/forbidden" replace />;

  return <Outlet />;
}

// Usage
<Route element={<RoleRoute allowedRoles={['admin', 'manager']} />}>
  <Route path="/admin"   element={<AdminPanel />} />
  <Route path="/reports" element={<Reports />} />
</Route>
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
