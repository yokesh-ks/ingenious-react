# Q77: What are **React Server Components**?

| | |
|---|---|
| **Category** | React 18+ |
| **Difficulty** | 🔴 Advanced |

---

**React Server Components (RSC)** are components that run **exclusively on the server** — they never execute in the browser. Their output (rendered HTML/UI description) is sent to the client, but the component code itself is never shipped to the browser.

Introduced in React 18, production-ready via **Next.js App Router**.

---

### Server Components vs Client Components

| | Server Component | Client Component |
|---|---|---|
| Where it runs | Server only | Browser (and server for SSR) |
| Can use Hooks? | ❌ No | ✅ Yes |
| Can access DB/filesystem? | ✅ Yes | ❌ No |
| JavaScript shipped to browser? | ❌ No | ✅ Yes |
| Interactive (click, input)? | ❌ No | ✅ Yes |
| Default in Next.js App Router? | ✅ Yes | No (must opt-in) |

---

### Server Component example (Next.js App Router)

```jsx
// app/products/page.tsx — Server Component by default
// This code NEVER runs in the browser
async function ProductsPage() {
  // Direct database access — no need for API route!
  const products = await db.query('SELECT * FROM products LIMIT 20');

  return (
    <main>
      <h1>Products</h1>
      {products.map(p => (
        <div key={p.id}>
          <h2>{p.name}</h2>
          <p>${p.price}</p>
          <AddToCartButton productId={p.id} /> {/* Client Component */}
        </div>
      ))}
    </main>
  );
}
```

```jsx
// components/AddToCartButton.tsx — Client Component
'use client'; // directive at the top of the file

function AddToCartButton({ productId }) {
  const [added, setAdded] = useState(false);

  return (
    <button onClick={() => { addToCart(productId); setAdded(true); }}>
      {added ? '✓ Added' : 'Add to Cart'}
    </button>
  );
}
```

---

### Benefits

1. **Zero JavaScript for server components** — drastically reduces bundle size
2. **Direct data access** — query databases, read files directly (no API layer)
3. **Secrets stay on server** — API keys, DB credentials never reach the browser
4. **Automatic code splitting** — only Client Components are sent to the browser

---

### The boundary rule

- Server Components **can import** Client Components
- Client Components **cannot import** Server Components
- But Client Components **can receive** Server Components as `children` props

```jsx
// ✅ Valid — Server Component as children prop
<ClientComponent>
  <ServerComponent />
</ClientComponent>
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
