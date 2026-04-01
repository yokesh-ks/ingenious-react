# Q86: What is **PropTypes** validation in React?

| | |
|---|---|
| **Category** | Component Design |
| **Difficulty** | 🟢 Beginner |

---

**PropTypes** is a runtime type-checking library for React props. It warns you in the browser console when a component receives the wrong type of data.

---

### Basic usage

```jsx
import PropTypes from 'prop-types';

function UserCard({ name, age, isAdmin, onClick }) {
  return (
    <div onClick={onClick}>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isAdmin && <span>Admin</span>}
    </div>
  );
}

UserCard.propTypes = {
  name:    PropTypes.string.isRequired,
  age:     PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
  onClick: PropTypes.func,
};

UserCard.defaultProps = {
  isAdmin: false,
  onClick: () => {},
};
```

---

### Common PropTypes

| Type | Example |
|---|---|
| `PropTypes.string` | `"hello"` |
| `PropTypes.number` | `42` |
| `PropTypes.bool` | `true` |
| `PropTypes.func` | `() => {}` |
| `PropTypes.array` | `[]` |
| `PropTypes.object` | `{}` |
| `PropTypes.node` | any renderable (JSX, string, number) |
| `PropTypes.element` | a React element |
| `PropTypes.oneOf` | `PropTypes.oneOf(['red', 'blue'])` |
| `PropTypes.arrayOf` | `PropTypes.arrayOf(PropTypes.string)` |
| `PropTypes.shape` | object with specific shape |

---

### Shape validation for objects

```jsx
UserCard.propTypes = {
  user: PropTypes.shape({
    id:    PropTypes.number.isRequired,
    name:  PropTypes.string.isRequired,
    email: PropTypes.string,
  }).isRequired,
};
```

---

### PropTypes vs TypeScript

| | PropTypes | TypeScript |
|---|---|---|
| When checked | **Runtime** (browser console) | **Compile time** (editor/CI) |
| Setup | `npm install prop-types` | TypeScript configuration |
| Coverage | Props only | Entire codebase |
| Performance | Slight overhead in dev | Zero runtime cost |

**Recommendation:** Use **TypeScript** for new projects. PropTypes are useful for JavaScript projects or when working with third-party consumers of your component library.

```tsx
// TypeScript equivalent — no import needed
interface UserCardProps {
  name: string;
  age: number;
  isAdmin?: boolean;
  onClick?: () => void;
}

function UserCard({ name, age, isAdmin = false, onClick }: UserCardProps) {
  // ...
}
```

---

### PropTypes only run in development

PropTypes checks are **stripped in production builds** to avoid performance overhead. They only show warnings in `development` mode — never in production.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
