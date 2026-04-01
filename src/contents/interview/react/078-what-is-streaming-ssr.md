# Q78: What is **Streaming SSR** in React 18?

| | |
|---|---|
| **Category** | React 18+ |
| **Difficulty** | 🔴 Advanced |

---

**Streaming SSR (Server-Side Rendering)** lets React send HTML to the browser **in chunks** as it's ready — instead of waiting for the entire page to render before sending anything.

---

### Traditional SSR (before React 18)

```
1. User requests /page
2. Server fetches ALL data (may take seconds)
3. Server renders ALL HTML
4. Server sends complete HTML  ← browser waits here (blank screen)
5. Browser shows page
6. JavaScript hydrates everything
```

---

### Streaming SSR (React 18)

```
1. User requests /page
2. Server starts sending HTML immediately (shell: header, nav, etc.)
3. Browser shows content right away
4. Slow parts stream as their data arrives (wrapped in Suspense)
5. Each section hydrates independently
```

---

### How it works with Suspense

```jsx
function App() {
  return (
    <html>
      <body>
        <Header />  {/* streams immediately */}

        <Suspense fallback={<ProductSkeleton />}>
          <ProductDetails />  {/* streams when product data ready */}
        </Suspense>

        <Suspense fallback={<ReviewsSkeleton />}>
          <Reviews />  {/* streams when reviews data ready */}
        </Suspense>
      </body>
    </html>
  );
}
```

Browser receives `<Header />` and skeleton placeholders instantly. Each `<Suspense>` boundary "resolves" and streams its HTML when data is ready.

---

### Node.js streaming API

```jsx
import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(<App />, {
  onShellReady() {
    // Send initial HTML shell immediately
    res.setHeader('Content-Type', 'text/html');
    pipe(res);
  },
  onError(error) {
    console.error(error);
  }
});
```

---

### Selective hydration

React 18 also enables **selective hydration** — React prioritizes hydrating the parts the user is interacting with first:

```
User clicks Reviews section → React hydrates Reviews first → then rest of page
```

This means the page becomes interactive faster for the areas the user cares about.

---

### In Next.js App Router

Streaming is built-in automatically:
- `loading.tsx` files define Suspense fallbacks
- `<Suspense>` boundaries trigger streaming
- No manual setup required

```
app/
  dashboard/
    loading.tsx  ← shown while page.tsx fetches data
    page.tsx     ← Server Component that fetches data
```
