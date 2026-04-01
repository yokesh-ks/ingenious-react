# Q50: What are **Error Boundaries** in React?

| | |
|---|---|
| **Category** | Advanced Patterns |
| **Difficulty** | 🟡 Intermediate |

---

**Error Boundaries** are class components that **catch JavaScript errors** in their child component tree, log them, and display a fallback UI — instead of crashing the entire app.

They're React's equivalent of a try/catch block, but for the component tree.

---

### Creating an Error Boundary

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // Log the error to an error reporting service
    console.error('Error caught:', error, info.componentStack);
    // logErrorToSentry(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Usage

```jsx
function App() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}
```

---

### Granular error boundaries

Wrap individual sections so one broken widget doesn't kill the whole page:

```jsx
<ErrorBoundary fallback={<p>Weather widget failed</p>}>
  <WeatherWidget />
</ErrorBoundary>

<ErrorBoundary fallback={<p>Ads failed to load</p>}>
  <AdsBanner />
</ErrorBoundary>
```

---

### What errors are NOT caught

| Error type | Caught? |
|---|---|
| Errors in event handlers | ❌ No — use try/catch |
| Async errors (setTimeout, fetch) | ❌ No |
| SSR errors | ❌ No |
| Errors in the boundary itself | ❌ No |
| Errors in child component render | ✅ Yes |
| Errors in lifecycle methods | ✅ Yes |

---

### react-error-boundary library (recommended)

Avoids writing the class component yourself:

```bash
npm install react-error-boundary
```

```jsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <p>Something went wrong: {error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

<ErrorBoundary FallbackComponent={ErrorFallback} onError={logToSentry}>
  <MyWidget />
</ErrorBoundary>
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
