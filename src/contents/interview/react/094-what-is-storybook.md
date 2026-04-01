# Q94: What is **Storybook** and how is it used in React development?

| | |
|---|---|
| **Category** | Tooling |
| **Difficulty** | 🟡 Intermediate |

---

**Storybook** is a tool for developing, documenting, and testing UI components in isolation — without needing to run the full application.

Think of it as a "component playground" where designers, developers, and QA can see every component variant in one place.

---

### Why use Storybook?

- **Develop in isolation** — no need to navigate through the app to reach a specific state
- **Document** — auto-generates a living style guide
- **Test** — visual regression, interaction, and accessibility tests
- **Collaboration** — designers and developers share the same source of truth

---

### Setup

```bash
npx storybook@latest init
npm run storybook  # starts at localhost:6006
```

---

### Writing a story

A "story" is a named state of a component:

```tsx
// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],  // auto-generate docs page
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Each export is one story (one state)
export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Cancel',
    variant: 'secondary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Not available',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Saving...',
    isLoading: true,
  },
};
```

---

### Storybook UI

After running `npm run storybook`, you get:

```
Sidebar (left)          Main panel (right)
─────────────────       ──────────────────────
▼ UI                    [Component preview]
    Button
      Primary           Controls: variant ▼ primary
      Secondary                   disabled □
      Disabled                    children "Click me"
      Loading
▼ Forms
    Input
    Select
```

- **Controls** — change props via UI sliders/inputs/dropdowns
- **Actions** — see when event handlers fire
- **Docs** — auto-generated documentation
- **Accessibility** — a11y audit per story

---

### Testing with Storybook

**Interaction tests** — simulate user interactions:

```tsx
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const SubmitForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Email'), 'test@test.com');
    await userEvent.click(canvas.getByRole('button', { name: 'Submit' }));
    await expect(canvas.getByText('Success!')).toBeInTheDocument();
  },
};
```

**Visual regression** — Chromatic (made by the Storybook team) takes screenshots of every story and alerts you to visual changes.

---

### When to use Storybook

- Building a **design system** or component library
- Teams where **designers review UI** before it ships
- Components with **many states** (loading, error, empty, filled)
- Projects that need **visual regression testing**

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
