# Q89: What is **Next.js** and how does it relate to React?

| | |
|---|---|
| **Category** | Architecture |
| **Difficulty** | 🟡 Intermediate |

---

**Next.js** is a **React framework** built by Vercel that adds production-ready features on top of React. React is a UI library — Next.js is the full framework around it.

---

### React vs Next.js

| | React | Next.js |
|---|---|---|
| Type | UI library | Full framework |
| Routing | Need React Router | Built-in file-based routing |
| Rendering | CSR only (by default) | CSR, SSR, SSG, ISR |
| Data fetching | Manual (useEffect/React Query) | Built-in (Server Components, fetch) |
| SEO | Poor (CSR) | Excellent |
| API routes | No | Yes (`app/api/`) |
| Image optimization | No | Built-in (`<Image />`) |

---

### File-based routing (App Router)

```
app/
  page.tsx           → /
  about/
    page.tsx         → /about
  products/
    page.tsx         → /products
    [id]/
      page.tsx       → /products/123
  api/
    users/
      route.ts       → GET /api/users
```

---

### Server Components (default in Next.js 13+)

Components run on the server — they can fetch data directly without useEffect:

```tsx
// app/products/page.tsx — Server Component (no 'use client')
async function ProductsPage() {
  // Direct DB/API call on the server
  const products = await fetch('https://api.example.com/products').then(r => r.json());

  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>{p.name} — ${p.price}</li>
      ))}
    </ul>
  );
}
```

---

### Client Components

Add interactivity with `'use client'` directive:

```tsx
'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;
}
```

---

### Rendering strategies in Next.js

```tsx
// SSG — static at build time
export const dynamic = 'force-static';

// SSR — fresh on every request
export const dynamic = 'force-dynamic';

// ISR — static, revalidate every N seconds
export const revalidate = 60;

// Per-fetch control
const data = await fetch(url, { next: { revalidate: 3600 } });
```

---

### Built-in components

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Optimized image (lazy load, WebP, sizing)
<Image src="/hero.jpg" alt="Hero" width={800} height={400} />

// Client-side navigation
<Link href="/about">About</Link>

// Programmatic navigation
const router = useRouter();
router.push('/dashboard');
```

---

### When to use Next.js vs plain React

| Use Next.js when... | Use plain React when... |
|---|---|
| SEO matters (public pages) | Internal dashboards |
| You need SSR/SSG | Pure SPA with no SEO needs |
| You need API routes | Backend is completely separate |
| Fast initial load matters | You already have a routing setup |

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
