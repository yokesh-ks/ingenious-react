# Q84: What is the difference between **SSR**, **CSR**, and **SSG**?

| | |
|---|---|
| **Category** | Architecture |
| **Difficulty** | 🟡 Intermediate |

---

These three terms describe **where and when** a web page's HTML is generated.

---

### CSR — Client-Side Rendering

HTML is generated in the **browser** by JavaScript.

```
1. Browser receives a nearly-empty HTML file
2. Downloads JavaScript bundle
3. JavaScript runs → React renders HTML → page appears
4. Interactions work
```

**Used by:** Create React App, Vite (by default)

```html
<!-- Initial HTML — almost empty -->
<div id="root"></div>
<script src="/bundle.js"></script>
<!-- JavaScript renders the actual content -->
```

✅ Rich interactivity, fast page transitions after initial load
❌ Slow initial load (download + parse + execute JS first)
❌ Poor SEO (crawlers may not wait for JS)
❌ Blank page until JS runs (Time to First Paint is slow)

---

### SSR — Server-Side Rendering

HTML is generated on the **server** on each request.

```
1. Browser requests /page
2. Server fetches data + renders HTML
3. Browser receives complete HTML → page appears
4. JavaScript downloads + hydrates → interactions work
```

**Used by:** Next.js (`getServerSideProps`, App Router), Remix

✅ Fast initial page visible (complete HTML sent)
✅ Good SEO
❌ Slower server response (must fetch data for every request)
❌ Higher server costs

---

### SSG — Static Site Generation

HTML is generated at **build time** — the same HTML file is served to every user.

```
Build time: Fetch data → Render HTML → Save as .html files
Request:    Browser receives pre-built HTML → instant!
```

**Used by:** Next.js (`getStaticProps`), Gatsby, Astro

✅ Fastest possible load time (served from CDN)
✅ Excellent SEO
✅ Cheapest hosting (just static files)
❌ Content can go stale (needs rebuild to update)
❌ Not suitable for real-time/personalized data

---

### Comparison

| | CSR | SSR | SSG |
|---|---|---|---|
| Generated | Browser | Server (per request) | Build time |
| Initial load | Slow | Fast | Fastest |
| SEO | Poor | Good | Excellent |
| Dynamic content | ✅ | ✅ | Limited |
| Hosting cost | Low (CDN) | Higher (server) | Lowest (CDN) |
| Best for | Dashboards, apps | E-commerce, news | Blogs, docs, marketing |

---

### ISR — Incremental Static Regeneration (bonus, Next.js)

Static pages that auto-revalidate in the background after a specified time — combines SSG speed with fresh content:

```jsx
// app/products/[id]/page.tsx
export const revalidate = 60; // revalidate every 60 seconds
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
