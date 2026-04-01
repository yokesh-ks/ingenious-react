# Q61: How do you handle **forms** in React?

| | |
|---|---|
| **Category** | Forms |
| **Difficulty** | 🟢 Beginner |

---

React forms can be handled in two main ways: **controlled** (React manages values) or **uncontrolled** (DOM manages values via refs).

---

### Controlled form (recommended)

```jsx
function SignupForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const errs = {};
    if (!form.name)  errs.name  = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    if (form.password.length < 8) errs.password = 'Min 8 characters';
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    console.log('Submit:', form);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div>
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

---

### React Hook Form (recommended for real projects)

Minimal re-renders, great performance:

```jsx
import { useForm } from 'react-hook-form';

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Email required' })} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...register('password', { minLength: { value: 8, message: 'Min 8 chars' } })} />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### Key form concepts

| Concept | Description |
|---|---|
| `e.preventDefault()` | Prevent default browser form submission |
| `[e.target.name]` | Dynamic key update for multiple fields |
| `onSubmit` | Called when form is submitted |
| Validation | Check fields before submitting |
| `defaultValue` | Initial value for uncontrolled inputs |

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
