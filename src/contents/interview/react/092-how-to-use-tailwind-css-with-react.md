# Q92: How do you use **Tailwind CSS** with React?

| | |
|---|---|
| **Category** | Styling |
| **Difficulty** | 🟢 Beginner |

---

**Tailwind CSS** is a utility-first CSS framework where you style components by composing small utility classes directly in JSX — no separate CSS files needed for most cases.

---

### Setup with Vite

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### Basic usage

```jsx
// ❌ Traditional CSS approach
function Button({ children }) {
  return <button className="btn-primary">{children}</button>;
}
// btn-primary defined somewhere in a CSS file

// ✅ Tailwind approach — styles are right here in the component
function Button({ children }) {
  return (
    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
      {children}
    </button>
  );
}
```

---

### Responsive design

Tailwind uses breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`):

```jsx
<div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-3
  gap-4
  p-4
">
  {products.map(p => <ProductCard key={p.id} {...p} />)}
</div>
```

---

### Dark mode

```jsx
// tailwind.config.js — enable class-based dark mode
export default {
  darkMode: 'class',  // toggle with .dark class on <html>
  // ...
};

// Usage
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  Content
</div>
```

---

### Conditional classes with clsx / cn

Managing conditional class names cleanly:

```bash
npm install clsx tailwind-merge
```

```tsx
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Common pattern: cn() utility
function cn(...inputs: string[]) {
  return twMerge(clsx(inputs));
}

function Button({ variant = 'primary', disabled, children }) {
  return (
    <button
      className={cn(
        'font-semibold py-2 px-4 rounded-lg transition-colors',
        variant === 'primary' && 'bg-blue-600 hover:bg-blue-700 text-white',
        variant === 'secondary' && 'bg-gray-200 hover:bg-gray-300 text-gray-900',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

---

### Reusable styles with @apply

For frequently reused combinations, extract them in CSS:

```css
/* src/index.css */
@layer components {
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors;
  }

  .card {
    @apply bg-white rounded-xl shadow-md p-6 border border-gray-100;
  }
}
```

---

### Tailwind vs CSS Modules vs Styled Components

| | Tailwind | CSS Modules | Styled Components |
|---|---|---|---|
| Approach | Utility classes | Scoped CSS files | CSS-in-JS |
| Bundle size | Small (purges unused) | Small | Larger (runtime) |
| DX speed | Fast once learned | Medium | Medium |
| Customization | Config-based | Full CSS | Full CSS |
| Popular for | Rapid UI | Component libraries | Design systems |

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
