# Q85: What are **React best practices** for building scalable apps?

| | |
|---|---|
| **Category** | Architecture |
| **Difficulty** | 🟡 Intermediate |

---

### 1. Component design — Single Responsibility

Each component should do one thing well:

```jsx
// ❌ One giant component doing everything
function ProductPage() { /* fetches, validates, renders everything */ }

// ✅ Split by concern
function ProductPage() {
  return (
    <ProductLayout>
      <ProductDetails />
      <ProductReviews />
      <RelatedProducts />
    </ProductLayout>
  );
}
```

---

### 2. Folder structure

```
src/
  components/          # shared/reusable UI components
    Button/
      Button.tsx
      Button.module.css
      Button.test.tsx
      index.ts         # re-export
  features/            # feature-specific components + logic
    auth/
    products/
    cart/
  hooks/               # custom hooks
  store/               # global state (Redux/Zustand slices)
  utils/               # pure helper functions
  types/               # TypeScript types/interfaces
  pages/ or routes/    # route components
```

---

### 3. State management hierarchy

Start simple, add complexity only when needed:

```
Local state (useState) → Lift up → Context → Zustand/Redux
```

- Use **local state** first — lift up only when needed
- Don't put everything in global state
- Use **React Query/SWR** for server state (API data)
- Use **Zustand/Redux Toolkit** for complex UI state

---

### 4. Performance

```jsx
// Memoize expensive renders
const List = React.memo(({ items }) => (
  <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
));

// Lazy load routes
const Dashboard = lazy(() => import('./Dashboard'));

// Memoize expensive computations
const sorted = useMemo(
  () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);
```

---

### 5. TypeScript everywhere

Type your props, state, API responses, and custom hooks. It prevents bugs at compile time and improves developer experience across the team.

---

### 6. Consistent naming conventions

- Components: `PascalCase` (`UserCard`, `ProductList`)
- Hooks: `useSomething` (`useAuth`, `useFetch`)
- Event handlers: `handleEvent` (`handleSubmit`, `handleClick`)
- Context: `SomethingContext` + `useSomething` hook
- Files: match component name (`UserCard.tsx`)

---

### 7. Error boundaries

Wrap sections of your app so one broken widget doesn't crash the entire page:

```jsx
<ErrorBoundary fallback={<WidgetError />}>
  <WeatherWidget />
</ErrorBoundary>
```

---

### 8. Accessibility (a11y)

```jsx
// Use semantic HTML + ARIA attributes
<button onClick={toggle} aria-expanded={isOpen} aria-controls="menu">
  Menu
</button>
<ul id="menu" role="menu" hidden={!isOpen}>
  <li role="menuitem"><a href="/home">Home</a></li>
</ul>
```

---

### 9. Testing strategy

- Unit test: custom hooks and utility functions
- Integration test: user flows with RTL (`userEvent.type`, `userEvent.click`)
- E2E test: critical paths (checkout, login, signup) with Playwright/Cypress

---

### 10. Code quality tools

```json
// package.json
{
  "devDependencies": {
    "eslint": "latest",
    "eslint-plugin-react-hooks": "latest",
    "eslint-plugin-jsx-a11y": "latest",
    "prettier": "latest",
    "husky": "latest",
    "lint-staged": "latest"
  }
}
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
