# Q46: What are **Higher-Order Components** (HOCs)?

| | |
|---|---|
| **Category** | Advanced Patterns |
| **Difficulty** | 🟡 Intermediate |

---

A **Higher-Order Component (HOC)** is a function that takes a component and returns a **new enhanced component**. It's a pattern for reusing component logic.

```jsx
const EnhancedComponent = withSomething(OriginalComponent);
```

HOCs are named with the `with` prefix by convention.

---

### Example: withAuth HOC

```jsx
function withAuth(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
}

// Usage
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedProfile   = withAuth(Profile);
```

---

### Example: withLoading HOC

```jsx
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <Spinner />;
    return <WrappedComponent {...props} />;
  };
}

const UserListWithLoading = withLoading(UserList);
// <UserListWithLoading isLoading={true} users={[]} />
```

---

### Common use cases

- Authentication guards
- Loading/error states
- Logging and analytics
- Theme injection
- Permission-based rendering

---

### HOCs vs Custom Hooks

| | HOC | Custom Hook |
|---|---|---|
| Returns | A React component | A value / functions |
| Adds to JSX tree? | ✅ Yes (extra wrapper) | ❌ No |
| Complexity | Can lead to "wrapper hell" | Simpler and flatter |
| Best for | Rendering logic / conditional render | Stateful/behavioral logic |

Today, **custom Hooks** cover most cases where HOCs were used. But HOCs still have a place — especially in libraries and for conditional rendering logic.

---

### Important: pass through props

Always spread props to the wrapped component — don't swallow them:

```jsx
function withSomething(WrappedComponent) {
  return function EnhancedComponent(props) {
    const extraData = useSomething();

    // ✅ Forward all original props + add extras
    return <WrappedComponent {...props} extra={extraData} />;
  };
}
```

### Set displayName for debugging

```jsx
function withAuth(WrappedComponent) {
  function AuthComponent(props) { /* ... */ }
  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;
  return AuthComponent;
}
```
