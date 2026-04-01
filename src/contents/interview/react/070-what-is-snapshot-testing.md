# Q70: What is **snapshot testing** in React?

| | |
|---|---|
| **Category** | Testing |
| **Difficulty** | 🟢 Beginner |

---

**Snapshot testing** captures the rendered output of a component and saves it to a file. On future test runs, it compares the output against the saved snapshot — and fails if anything changed.

---

### How it works

```jsx
import { render } from '@testing-library/react';
import Button from './Button';

test('Button renders correctly', () => {
  const { container } = render(<Button color="blue">Click me</Button>);
  expect(container).toMatchSnapshot();
});
```

**First run:** creates a `.snap` file:

```
// Button.test.tsx.snap
exports[`Button renders correctly 1`] = `
<div>
  <button
    class="btn btn-blue"
  >
    Click me
  </button>
</div>
`;
```

**Second run:** compares output to the saved snapshot. If the class changes to `btn-primary`, the test fails.

---

### Updating snapshots

When you intentionally change a component, update the snapshot:

```bash
jest --updateSnapshot
# or shorthand
jest -u
```

---

### Inline snapshots

Store the snapshot directly in the test file:

```jsx
test('renders button', () => {
  const { container } = render(<Button>Click</Button>);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <button>
        Click
      </button>
    </div>
  `);
});
```

---

### Pros and cons

| Pros | Cons |
|---|---|
| Easy to set up | Easy to mindlessly update snapshots |
| Catches accidental changes | Large snapshots are hard to review |
| Documents rendered output | Doesn't test behavior |
| Fast | Brittle — small changes break them |

---

### Best practices

- Keep snapshots **small** — snapshot only the meaningful part, not the whole page
- Prefer **behavioral tests** over snapshots (does clicking submit call the handler?)
- Snapshots are best for **stable, presentational components** (icons, badges, typography)
- Always **review snapshot diffs carefully** when they fail — don't blindly update
- Use inline snapshots for small, stable outputs

---

### When to use vs avoid

✅ Good for:
- Design system components (Button, Badge, Card)
- Components with complex but stable output
- Checking that refactors didn't change the UI

❌ Avoid for:
- Components with dynamic content (timestamps, random IDs)
- Components that change frequently
- Testing behavior — use interaction tests instead

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
