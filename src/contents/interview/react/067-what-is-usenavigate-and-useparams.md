# Q67: What is **useNavigate** and **useParams** in React Router?

| | |
|---|---|
| **Category** | React Router |
| **Difficulty** | 🟢 Beginner |

---

These are two essential React Router v6 hooks for navigation and URL parameters.

---

## useNavigate

`useNavigate` returns a function for **programmatic navigation** — navigating without a `<Link>` click.

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await login(credentials);

    if (success) {
      navigate('/dashboard');  // navigate to a path
    }
  }

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Navigation options

```jsx
navigate('/about');                            // go to /about
navigate(-1);                                  // go back (browser back button)
navigate(1);                                   // go forward
navigate('/login', { replace: true });         // replace current history entry
navigate('/profile', {
  state: { from: 'dashboard' }                 // pass data to destination
});
```

### Reading passed state

```jsx
function Profile() {
  const location = useLocation();
  const from = location.state?.from; // 'dashboard'
}
```

---

## useParams

`useParams` returns an object of **URL parameters** from the current route.

```jsx
import { useParams } from 'react-router-dom';

// Route: <Route path="/users/:userId/posts/:postId" element={<Post />} />
// URL:   /users/42/posts/17

function Post() {
  const { userId, postId } = useParams();
  // userId = "42", postId = "17" (always strings!)

  useEffect(() => {
    fetchPost(userId, postId);
  }, [userId, postId]);

  return <p>Post {postId} by User {userId}</p>;
}
```

**Note:** URL params are always **strings** — convert to numbers if needed: `Number(userId)` or `parseInt(userId, 10)`.

---

## Other navigation hooks

| Hook | Purpose |
|---|---|
| `useLocation` | Current URL, pathname, search string, state |
| `useSearchParams` | Read/write URL query string (`?q=react&page=2`) |
| `useMatch` | Check if current URL matches a pattern |

### useSearchParams example

```jsx
import { useSearchParams } from 'react-router-dom';

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category') || 'all';

  function handleNextPage() {
    setSearchParams({ page: page + 1, category });
  }

  return (
    <div>
      <p>Page: {page}, Category: {category}</p>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  );
}
```
