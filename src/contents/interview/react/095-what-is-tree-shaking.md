# Q95: What is **tree shaking** and how does it work in React apps?

| | |
|---|---|
| **Category** | Performance |
| **Difficulty** | 🟡 Intermediate |

---

**Tree shaking** is the process of removing unused (dead) code from your final JavaScript bundle. The name comes from shaking a tree to make dead leaves fall off — unused exports are "shaken out" of the bundle.

---

### How tree shaking works

Modern bundlers (Vite/Rollup/Webpack) analyze your `import` and `export` statements statically. If you import only part of a module, only that part is included in the bundle.

```js
// ✅ Named import — tree-shakeable
import { debounce } from 'lodash-es';
// Only debounce is included in the bundle

// ❌ Default import of the whole library — NOT tree-shakeable
import _ from 'lodash';
// The entire lodash library is bundled!
_.debounce(fn, 300);
```

---

### Why ESM matters for tree shaking

Tree shaking requires **ES Modules** (`import`/`export`) — it does NOT work with CommonJS (`require`/`module.exports`) because CommonJS imports are dynamic and can't be analyzed statically.

```js
// ✅ ES Module — statically analyzable
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// If a consumer only imports add():
import { add } from './math';
// subtract() is excluded from the bundle
```

---

### Common tree shaking pitfalls

**1. Side-effect imports**

```js
// ❌ This can't be tree-shaken — bundler doesn't know if this has side effects
import './setup-globals';
```

Mark side-effect-free packages in `package.json`:
```json
{ "sideEffects": false }
// or specify which files have side effects:
{ "sideEffects": ["*.css", "./src/polyfills.js"] }
```

**2. Re-exporting everything**

```js
// ❌ Barrel file that exports everything — forces bundler to include it all
export * from './Button';
export * from './Input';
export * from './Modal';
// Some bundlers can't tree-shake this effectively
```

**3. Using CommonJS libraries**

```js
// ❌ lodash (CJS) — always bundles everything
import { debounce } from 'lodash';

// ✅ lodash-es (ESM) — tree-shakeable
import { debounce } from 'lodash-es';
```

---

### Checking your bundle size

```bash
# With Vite
npm run build
# Output shows size of each chunk

# Analyze with rollup-plugin-visualizer
npm install -D rollup-plugin-visualizer
```

```ts
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }),  // opens an interactive bundle map
  ],
});
```

---

### React-specific tree shaking tips

```jsx
// ✅ Import only what you need from icon libraries
import { FiHome, FiSettings } from 'react-icons/fi';
// ❌ Not this:
import * as Icons from 'react-icons/fi';

// ✅ Named imports from date libraries
import { format, parseISO } from 'date-fns';
// ❌ Not:
import dateFns from 'date-fns';

// ✅ Lazy load large components/routes
const HeavyEditor = lazy(() => import('./HeavyEditor'));
```

---

### Impact

A well-configured React app with tree shaking can reduce bundle size by **30–70%**, dramatically improving load times.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
