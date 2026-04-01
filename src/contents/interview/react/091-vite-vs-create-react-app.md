# Q91: What is the difference between **Vite** and **Create React App**?

| | |
|---|---|
| **Category** | Tooling |
| **Difficulty** | 🟢 Beginner |

---

Both are tools for setting up a React project, but they work very differently and Vite has largely replaced Create React App (CRA) in modern development.

---

### Create React App (CRA)

CRA uses **Webpack** under the hood. When you save a file, Webpack re-bundles the entire app before the browser sees the change.

```
Code change → Webpack rebuilds all modules → Browser refreshes
```

**Problems with CRA:**
- Slow startup time (30s–2min on large projects)
- Slow hot reload (HMR can take 5–30s)
- Not actively maintained (deprecated by Meta)
- Limited configuration without "ejecting"

---

### Vite

Vite uses **native ES modules** in the browser during development. The browser handles imports directly — Vite only transforms the file you changed.

```
Code change → Vite transforms just that file → Browser updates instantly
```

**Key advantages:**
- **Instant startup** — no bundling on startup, browser imports on demand
- **Lightning fast HMR** — only the changed module is re-evaluated
- **Modern tooling** — uses esbuild (Go-based, 100x faster than Webpack) and Rollup
- **Actively maintained** and widely adopted

---

### Comparison

| | Create React App | Vite |
|---|---|---|
| Bundler | Webpack | Rollup (prod) + esbuild (dev) |
| Dev server startup | Slow (30s–2min) | Fast (~300ms) |
| Hot reload speed | Slow (5–30s) | Instant (~50ms) |
| Bundle size | Larger | Smaller |
| Configuration | Limited (eject to change) | Easy (vite.config.ts) |
| Maintenance | Deprecated | Actively maintained |
| TypeScript support | Slower (ts-loader) | Instant (esbuild strips types) |

---

### Creating a project

```bash
# CRA (old way)
npx create-react-app my-app

# Vite (modern way)
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

---

### Vite config example

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
```

---

### Migrating from CRA to Vite

1. Remove `react-scripts` dependencies
2. Add `vite` and `@vitejs/plugin-react`
3. Move `public/index.html` to root and update it
4. Add `import React from 'react'` where missing (Vite needs explicit imports in some configs)
5. Update `package.json` scripts

---

**Bottom line:** Use Vite for all new React projects. There is no good reason to use CRA anymore.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
