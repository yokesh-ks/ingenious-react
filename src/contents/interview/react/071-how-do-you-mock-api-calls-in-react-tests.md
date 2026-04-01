# Q71: How do you **mock API calls** in React tests?

| | |
|---|---|
| **Category** | Testing |
| **Difficulty** | 🟡 Intermediate |

---

When testing components that fetch data, you don't want to make real network requests — they're slow, unreliable, and depend on an external server. Instead, you **mock** the API calls.

---

### Option 1: Mock fetch with Jest

```jsx
// UserProfile.test.jsx
global.fetch = jest.fn();

test('displays user name after loading', async () => {
  fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ id: 1, name: 'Alice', email: 'alice@test.com' })
  });

  render(<UserProfile userId="1" />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await screen.findByText('Alice');
  expect(screen.getByText('alice@test.com')).toBeInTheDocument();
});

afterEach(() => jest.clearAllMocks());
```

---

### Option 2: MSW (Mock Service Worker) — recommended

**MSW** intercepts requests at the **network level** — the most realistic approach.

```bash
npm install --save-dev msw
```

```jsx
// src/mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: 'Alice',
      email: 'alice@test.com'
    });
  }),

  http.get('/api/posts', () => {
    return HttpResponse.json([
      { id: 1, title: 'Hello World' },
      { id: 2, title: 'React is great' },
    ]);
  }),
];
```

```jsx
// src/mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

```jsx
// src/setupTests.ts
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers()); // reset between tests
afterAll(() => server.close());
```

```jsx
// Tests work naturally — fetch is intercepted
test('displays user', async () => {
  render(<UserProfile userId="1" />);
  await screen.findByText('Alice'); // works!
});

// Override handler for specific tests
test('shows error when API fails', async () => {
  server.use(
    http.get('/api/users/:id', () => HttpResponse.error())
  );
  render(<UserProfile userId="1" />);
  await screen.findByText(/something went wrong/i);
});
```

---

### Option 3: Mock a module (for axios or custom API functions)

```jsx
// api.js
export const fetchUser = (id) => axios.get(`/users/${id}`).then(r => r.data);

// UserProfile.test.jsx
jest.mock('./api');
import { fetchUser } from './api';

test('shows user', async () => {
  fetchUser.mockResolvedValue({ id: 1, name: 'Bob' });
  render(<UserProfile userId="1" />);
  await screen.findByText('Bob');
});
```

---

### Choosing the right approach

| | Jest mock | MSW | Module mock |
|---|---|---|---|
| Realism | Low | High | Medium |
| Setup | Easy | Medium | Easy |
| Works with any fetch lib | ✅ | ✅ | ❌ (library-specific) |
| Best for | Quick one-off mocks | All API testing | Mocking specific functions |

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
