# Q68: How do you **test React components**?

| | |
|---|---|
| **Category** | Testing |
| **Difficulty** | 🟡 Intermediate |

---

Testing React components ensures your UI works correctly and prevents regressions. The standard testing stack is **Jest + React Testing Library (RTL)**.

---

### Setup

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

---

### What to test

| Type | What | Tool |
|---|---|---|
| Unit | Single component in isolation | Jest + RTL |
| Integration | Multiple components together | Jest + RTL |
| E2E | Full user flows in a real browser | Playwright / Cypress |

---

### Basic component test

```jsx
// Button.tsx
function Button({ onClick, children, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}>{children}</button>
  );
}

// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button onClick={() => {}}>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});

test('calls onClick when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('does not call onClick when disabled', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick} disabled>Click me</Button>);
  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).not.toHaveBeenCalled();
});
```

---

### Testing with user events (preferred over fireEvent)

`@testing-library/user-event` simulates real user interactions more accurately:

```jsx
import userEvent from '@testing-library/user-event';

test('types into input and submits', async () => {
  const user = userEvent.setup();
  const handleSubmit = jest.fn();
  render(<LoginForm onSubmit={handleSubmit} />);

  await user.type(screen.getByLabelText(/email/i), 'alice@test.com');
  await user.type(screen.getByLabelText(/password/i), 'secret123');
  await user.click(screen.getByRole('button', { name: /login/i }));

  expect(handleSubmit).toHaveBeenCalledWith({
    email: 'alice@test.com',
    password: 'secret123',
  });
});
```

---

### Testing async components

```jsx
test('loads and displays user', async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => ({ name: 'Alice', email: 'alice@test.com' })
  });

  render(<UserProfile userId="1" />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await screen.findByText('Alice'); // waits for element to appear
  expect(screen.getByText('alice@test.com')).toBeInTheDocument();
});
```

---

### Core RTL query methods

| Query | When to use |
|---|---|
| `getBy*` | Expect element to exist (throws if not found) |
| `queryBy*` | Expect element to NOT exist (returns null) |
| `findBy*` | Async — wait for element to appear |
| `getAllBy*` | Expect multiple elements |

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
