# Q72: How do you use **TypeScript** with React?

| | |
|---|---|
| **Category** | TypeScript with React |
| **Difficulty** | 🟡 Intermediate |

---

TypeScript adds **static typing** to React, catching errors at compile time instead of runtime. It's now the default for most new React projects.

---

### Setup

With Vite (recommended):
```bash
npm create vite@latest my-app -- --template react-ts
```

Files use `.tsx` for JSX + TypeScript.

---

### Typing props

```tsx
// Define an interface for props
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;                               // optional prop
  variant?: 'primary' | 'secondary' | 'danger';   // union type
  size?: 'sm' | 'md' | 'lg';
}

function Button({
  label,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md'
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size}`}
    >
      {label}
    </button>
  );
}
```

---

### Typing useState

```tsx
// TypeScript infers from initial value
const [count, setCount]   = useState(0);           // number
const [name, setName]     = useState('');           // string
const [active, setActive] = useState(false);        // boolean

// Explicit generic for objects or nullable types
const [user, setUser] = useState<User | null>(null);

interface User {
  id: number;
  name: string;
  email: string;
}
```

---

### Typing events

```tsx
function Form() {
  const handleChange  = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit  = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClick   = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { /* submit */ }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} onKeyDown={handleKeyDown} />
      <button onClick={handleClick}>Submit</button>
    </form>
  );
}
```

---

### Typing useRef

```tsx
const inputRef = useRef<HTMLInputElement>(null);
// inputRef.current is HTMLInputElement | null

const counterRef = useRef<number>(0);
// counterRef.current is number (never null)
```

---

### Typing children

```tsx
interface CardProps {
  children: React.ReactNode;  // accepts any valid JSX
  title: string;
}

function Card({ children, title }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

---

### Extending HTML element props

```tsx
// Button that accepts all native button props + custom ones
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
}

function Button({ variant = 'primary', loading, children, ...rest }: ButtonProps) {
  return (
    <button className={`btn-${variant}`} disabled={loading} {...rest}>
      {loading ? 'Loading...' : children}
    </button>
  );
}
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
