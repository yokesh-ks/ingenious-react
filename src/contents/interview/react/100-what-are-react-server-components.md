# Q100: What are **React Server Components** (RSC)?

| | |
|---|---|
| **Category** | React 18+ |
| **Difficulty** | 🔴 Advanced |

---

**React Server Components** (RSC) are a new type of component that runs **only on the server** — they never run in the browser. They can directly access databases, file systems, and backend APIs without shipping that code to the client.

---

### Two types of components

```
Server Components (default in Next.js 13+ App Router)
  ├── Run only on the server
  ├── Can be async
  ├── Can access DB, filesystem, secrets directly
  ├── CANNOT use useState, useEffect, event handlers
  └── CANNOT use browser APIs (window, document)

Client Components ('use client' directive)
  ├── Run in the browser (and can also SSR)
  ├── CAN use useState, useEffect, event handlers
  ├── CAN use browser APIs
  └── CANNOT be async (at the top level)
```

---

### Server Component example

```tsx
// app/products/page.tsx — Server Component (no 'use client')
// This code NEVER ships to the browser

async function ProductsPage() {
  // Direct database query — no API route needed!
  const products = await db.query('SELECT * FROM products LIMIT 20');
  // Secrets are safe — never exposed to client
  const apiData = await fetch('https://internal-api.company.com/data', {
    headers: { Authorization: `Bearer ${process.env.INTERNAL_SECRET}` },
  }).then(r => r.json());

  return (
    <div>
      <h1>Products</h1>
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
```

---

### Client Component example

```tsx
'use client';  // opts into client rendering

import { useState } from 'react';

export function AddToCartButton({ productId }) {
  const [added, setAdded] = useState(false);

  return (
    <button onClick={() => {
      addToCart(productId);
      setAdded(true);
    }}>
      {added ? 'Added!' : 'Add to Cart'}
    </button>
  );
}
```

---

### Composition — mixing server and client

Server Components can import Client Components (not the other way around):

```tsx
// Server Component
async function ProductPage({ id }) {
  const product = await db.getProduct(id);  // server-only

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Client Component embedded inside Server Component */}
      <AddToCartButton productId={product.id} />
    </div>
  );
}
```

---

### Benefits of Server Components

**Reduced bundle size**

```
Traditional React:
  Browser downloads: UI code + data fetching logic + DB client + formatters + ...

With RSC:
  Browser downloads: UI code only
  Server code NEVER reaches the browser
```

**Faster initial load**

Server renders the HTML with data already fetched — the browser displays content immediately, before any JavaScript runs.

**Direct backend access**

```tsx
// No API route needed — query DB directly
async function UserProfile({ userId }) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return <div>{user.name}</div>;
}
```

---

### RSC vs SSR — what's the difference?

| | SSR | RSC |
|---|---|---|
| When it runs | Server, per request | Server (never re-runs on client) |
| Can use hooks? | Yes (hydrated on client) | No |
| Shipped to browser? | Yes (JS for hydration) | No (zero JS) |
| Can access DB? | Via API routes | Directly |

SSR renders components to HTML and then **hydrates** them (re-runs the component in the browser). RSC components **never run in the browser at all**.

---

### Current support

RSC is supported in **Next.js 13+ (App Router)** today. Plain Vite/CRA don't support RSC — it requires a framework with a Node.js server.

```
✅ Next.js 13+ (App Router)
✅ Remix (partial)
✅ Waku
❌ Vite (client-only by default)
❌ Create React App
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
