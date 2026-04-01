# Q64: What is the difference between **BrowserRouter** and **HashRouter**?

| | |
|---|---|
| **Category** | React Router |
| **Difficulty** | 🟡 Intermediate |

---

Both `BrowserRouter` and `HashRouter` provide client-side routing, but they use different strategies to manage URLs.

---

### BrowserRouter

Uses the **HTML5 History API** (`pushState`, `replaceState`) to create clean URLs:

```
https://myapp.com/about
https://myapp.com/users/42
https://myapp.com/dashboard/settings
```

**Pros:**
- Clean, professional URLs
- Works with SEO tools and meta tags
- Standard for modern apps

**Cons:**
- Requires **server configuration** — the server must serve the same `index.html` for all routes
- Without server config, refreshing `/about` returns a 404 (server looks for an `/about` file)

**Nginx config:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

### HashRouter

Uses the **URL hash (`#`)** to manage routing — everything after `#` is handled client-side and never sent to the server:

```
https://myapp.com/#/about
https://myapp.com/#/users/42
```

**Pros:**
- Works with **any static file server** — no server config needed
- Safe to refresh any route (hash is not sent to server)

**Cons:**
- Ugly URLs with `#`
- Hash portion not sent in HTTP requests — can affect analytics
- Not ideal for SEO

---

### Which to use?

| Situation | Use |
|---|---|
| Production app with configurable server | `BrowserRouter` ✅ |
| Static hosting with no config (simple) | `HashRouter` |
| GitHub Pages (workaround) | `HashRouter` |
| Vercel, Netlify, AWS Amplify | `BrowserRouter` (they support SPA routing) |

**In most cases, use `BrowserRouter`** and configure your server/host to handle client-side routing.

---

### MemoryRouter

A third option for testing or non-browser environments:

```jsx
// Used in unit tests — doesn't interact with the browser URL at all
import { MemoryRouter } from 'react-router-dom';

test('renders home page', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
});
```
