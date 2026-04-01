# Q88: What is **accessibility (a11y)** in React and how do you implement it?

| | |
|---|---|
| **Category** | Best Practices |
| **Difficulty** | 🟡 Intermediate |

---

**Accessibility (a11y)** means building web apps that everyone can use — including people who rely on screen readers, keyboard navigation, or other assistive technologies.

---

### 1. Use semantic HTML

Semantic elements communicate meaning to assistive technologies automatically:

```jsx
// ❌ Non-semantic — screen readers don't know this is a button
<div onClick={handleSubmit}>Submit</div>

// ✅ Semantic — screen readers announce "Submit, button"
<button onClick={handleSubmit}>Submit</button>
```

Use the right element for the right job:
- `<button>` for actions, `<a>` for navigation
- `<nav>`, `<main>`, `<header>`, `<footer>` for page landmarks
- `<h1>`–`<h6>` for headings (in order, don't skip levels)
- `<ul>/<li>` for lists, `<table>` for tabular data

---

### 2. ARIA attributes

ARIA (Accessible Rich Internet Applications) attributes supplement HTML when semantic elements aren't enough:

```jsx
// Labeling elements
<button aria-label="Close dialog">✕</button>

// Toggle state
<button
  aria-expanded={isOpen}
  aria-controls="menu-list"
  onClick={() => setIsOpen(!isOpen)}
>
  Menu
</button>
<ul id="menu-list" hidden={!isOpen}>
  <li><a href="/home">Home</a></li>
</ul>

// Live regions — announce dynamic content
<div aria-live="polite" aria-atomic="true">
  {statusMessage}
</div>
```

---

### 3. Keyboard navigation

Every interactive element must be reachable and operable with a keyboard:

```jsx
function Modal({ onClose }) {
  // Trap focus inside modal
  useEffect(() => {
    const firstFocusable = modalRef.current.querySelector('button, [href], input');
    firstFocusable?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={modalRef}>
      <h2 id="modal-title">Confirm Action</h2>
      <button onClick={onClose}>Cancel</button>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
}
```

---

### 4. Form accessibility

Always associate labels with inputs:

```jsx
// ✅ Using htmlFor (React's version of for attribute)
<label htmlFor="email">Email address</label>
<input
  id="email"
  type="email"
  aria-describedby="email-hint"
  aria-invalid={!!errors.email}
/>
{errors.email && (
  <span id="email-hint" role="alert">{errors.email}</span>
)}
```

---

### 5. Focus management

Move focus to relevant content after user actions:

```jsx
function SearchResults({ results }) {
  const headingRef = useRef(null);

  useEffect(() => {
    // After search completes, move focus to results heading
    headingRef.current?.focus();
  }, [results]);

  return (
    <section>
      <h2 tabIndex={-1} ref={headingRef}>
        {results.length} results found
      </h2>
      {results.map(r => <ResultCard key={r.id} {...r} />)}
    </section>
  );
}
```

---

### 6. Color and contrast

Never rely solely on color to convey information:

```jsx
// ❌ Color alone
<span style={{ color: 'red' }}>Error</span>

// ✅ Color + text/icon
<span style={{ color: 'red' }}>
  <ErrorIcon aria-hidden="true" /> Error: field is required
</span>
```

---

### Tools for testing a11y

- **eslint-plugin-jsx-a11y** — catches issues at write time
- **axe-core / @axe-core/react** — runtime accessibility auditing
- **Lighthouse** — browser DevTools audit
- **Screen readers**: NVDA (Windows), VoiceOver (Mac/iOS), TalkBack (Android)

```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

```json
// .eslintrc
{
  "plugins": ["jsx-a11y"],
  "extends": ["plugin:jsx-a11y/recommended"]
}
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
