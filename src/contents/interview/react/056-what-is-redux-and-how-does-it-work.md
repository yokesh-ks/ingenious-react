# Q56: What is **Redux** and how does it work?

| | |
|---|---|
| **Category** | State Management |
| **Difficulty** | 🟡 Intermediate |

---

**Redux** is a predictable state management library for JavaScript apps. All application state lives in a **single global store**, and state can only be changed by dispatching **actions** that pass through **reducers**.

### Core concepts

```
Action → Reducer → Store → View → Action (cycle)
```

**1. Store** — the single source of truth (one big JavaScript object)

**2. Action** — a plain object describing what happened

```jsx
const action = { type: 'counter/increment', payload: 1 };
```

**3. Reducer** — a pure function: `(state, action) => newState`

```jsx
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/increment':
      return { value: state.value + action.payload };
    case 'counter/decrement':
      return { value: state.value - action.payload };
    default:
      return state;
  }
}
```

**4. Dispatch** — the only way to trigger state changes

```jsx
store.dispatch({ type: 'counter/increment', payload: 1 });
```

---

### With React (react-redux)

```jsx
import { Provider, useSelector, useDispatch } from 'react-redux';

// Wrap your app in Provider
function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

function Counter() {
  const count    = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <p>{count}</p>
      <button onClick={() => dispatch({ type: 'counter/increment', payload: 1 })}>+</button>
    </>
  );
}
```

---

### Three principles of Redux

1. **Single source of truth** — one store, one state tree
2. **State is read-only** — only actions can trigger changes
3. **Changes are made with pure functions** — reducers are pure

---

### When to use Redux

✅ Large apps with complex, shared state across many components
✅ You need time-travel debugging (Redux DevTools)
✅ Complex async flows

For smaller apps, Context API + useReducer is often sufficient.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
