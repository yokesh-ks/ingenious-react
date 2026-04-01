# Q93: What are **ESLint**, **Prettier**, and **Husky** and how do they work together?

| | |
|---|---|
| **Category** | Tooling |
| **Difficulty** | 🟢 Beginner |

---

These three tools form the standard code quality pipeline for React projects — catching bugs, enforcing style, and preventing bad code from being committed.

---

### ESLint — finds problems in your code

ESLint analyzes your code for **logical errors**, **bad practices**, and **React-specific issues**:

```bash
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

```js
// eslint.config.js (flat config, ESLint 9+)
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  {
    plugins: { 'react-hooks': reactHooks, 'jsx-a11y': jsxA11y },
    rules: {
      'react-hooks/rules-of-hooks': 'error',   // hooks only at top level
      'react-hooks/exhaustive-deps': 'warn',   // missing useEffect deps
      'jsx-a11y/alt-text': 'error',            // images need alt text
      'no-unused-vars': 'warn',
    },
  },
];
```

---

### Prettier — formats your code

Prettier is an **opinionated code formatter**. It doesn't check for bugs — it just makes code look consistent:

```bash
npm install -D prettier eslint-config-prettier
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

**ESLint vs Prettier:**
- ESLint: "You're missing a dependency in useEffect" (logic)
- Prettier: "This line is too long, let me reformat it" (style)

They can conflict — use `eslint-config-prettier` to disable ESLint formatting rules that Prettier handles.

---

### Husky — runs checks on git commit

Husky sets up **git hooks** — scripts that run automatically before commits or pushes:

```bash
npm install -D husky lint-staged
npx husky init
```

```sh
# .husky/pre-commit
npx lint-staged
```

---

### lint-staged — only lint changed files

Running ESLint on the entire codebase before every commit is slow. `lint-staged` runs linters only on files you've changed:

```json
// package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,json,md}": [
      "prettier --write"
    ]
  }
}
```

---

### The full flow

```
git commit
    │
    ▼
Husky pre-commit hook triggers
    │
    ▼
lint-staged runs on changed files
    │
    ├─ ESLint --fix  (auto-fixes what it can, fails on unfixable errors)
    └─ Prettier --write  (formats all files)
    │
    ▼
If all pass → commit succeeds
If any fail → commit is blocked (you must fix the errors first)
```

---

### package.json scripts

```json
{
  "scripts": {
    "lint":      "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:fix":  "eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "format":    "prettier --write src",
    "typecheck": "tsc --noEmit"
  }
}
```
