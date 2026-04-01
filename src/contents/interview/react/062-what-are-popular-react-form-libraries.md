# Q62: What are popular **React form libraries** and when do you use them?

| | |
|---|---|
| **Category** | Forms |
| **Difficulty** | 🟡 Intermediate |

---

Managing forms manually with `useState` works for small forms, but becomes messy for large forms with validation, async submission, and complex field logic. Libraries solve this cleanly.

---

### React Hook Form

**Best for:** Performance-critical forms, minimal re-renders.

Uses **uncontrolled inputs** with refs internally — inputs don't trigger re-renders on every keystroke.

```jsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Minimum 8 characters'),
  age: z.number().min(18, 'Must be 18+'),
});

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    await loginUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('email')} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <input type="password" {...register('password')} placeholder="Password" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <button disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

---

### Formik

**Best for:** Teams familiar with controlled forms, multi-step wizard forms.

```jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8).required('Required'),
});

function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        await loginUser(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="email" type="email" />
          <ErrorMessage name="email" component="p" />

          <Field name="password" type="password" />
          <ErrorMessage name="password" component="p" />

          <button disabled={isSubmitting}>Login</button>
        </Form>
      )}
    </Formik>
  );
}
```

---

### Comparison

| Feature | React Hook Form | Formik |
|---|---|---|
| Re-renders on keystroke | ❌ Minimal | ✅ Every keystroke |
| Bundle size | ~9KB | ~13KB |
| Validation | Zod, Yup, custom | Yup, custom |
| Learning curve | Low | Medium |
| Best for | Performance | Simplicity |

**Recommendation:** React Hook Form is generally preferred for new projects.
