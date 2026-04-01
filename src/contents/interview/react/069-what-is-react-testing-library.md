# Q69: What is **React Testing Library** and its core philosophy?

| | |
|---|---|
| **Category** | Testing |
| **Difficulty** | 🟢 Beginner |

---

**React Testing Library (RTL)** is the standard library for testing React components. It's built on `@testing-library/dom` and focuses on testing components the way **users actually interact with them** — not implementation details.

### Core philosophy

> "The more your tests resemble the way your software is used, the more confidence they can give you."
> — Kent C. Dodds (creator)

This means:
- Test **what the user sees and does** (text, buttons, form fields)
- Don't test **internal implementation** (state variables, component methods)
- Query by **accessible attributes** (role, label, text) — not CSS classes or test IDs

---

### RTL vs Enzyme

| | RTL | Enzyme |
|---|---|---|
| Philosophy | User-facing behavior | Implementation details |
| DOM interaction | Realistic | Shallow/simulated |
| Refactor safety | ✅ High | ❌ Low (breaks on internals) |
| Maintained? | ✅ Active | ⚠️ Mostly inactive |

---

### Querying the DOM — priority order

RTL encourages queries in this priority order (most accessible → least):

```jsx
// 1. By role (best — mirrors the accessibility tree)
screen.getByRole('button', { name: /submit/i });
screen.getByRole('textbox', { name: /email/i });
screen.getByRole('heading', { level: 1 });

// 2. By label text
screen.getByLabelText('Password');

// 3. By placeholder
screen.getByPlaceholderText('Enter email...');

// 4. By text content
screen.getByText('Hello, Alice');

// 5. By display value (input value)
screen.getByDisplayValue('alice@example.com');

// 6. By alt text (images)
screen.getByAltText('Profile picture');

// 7. By title
screen.getByTitle('Close modal');

// 8. By test ID (last resort)
screen.getByTestId('submit-btn');
```

---

### Key assertion matchers

```jsx
import '@testing-library/jest-dom';

expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(element).toBeDisabled();
expect(element).toBeEnabled();
expect(element).toHaveValue('Alice');
expect(element).toHaveTextContent('Hello');
expect(element).toHaveClass('active');
expect(element).toHaveFocus();
expect(element).toHaveAttribute('href', '/about');
```

---

### Example: testing a complete form

```jsx
test('submits form with user data', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn();

  render(<ContactForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText(/name/i), 'Alice');
  await user.type(screen.getByLabelText(/email/i), 'alice@test.com');
  await user.click(screen.getByRole('button', { name: /send/i }));

  expect(onSubmit).toHaveBeenCalledWith({
    name: 'Alice',
    email: 'alice@test.com',
  });
});
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
