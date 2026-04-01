# Q12: Can you explain how **useState** works?

| | |
|---|---|
| **Category** | React State Management |
| **Difficulty** | 🟢 Beginner |

---

**`useState`** is a built-in **React Hook** that empowers components to preserve stateful values. It amalgamates a stateful value with a state-modifying function, enabling direct manipulation.

**Hooks** are utility functions that enable you to manage state, side effects, and other React features in **function components**.

### Core Components of `useState`

1. **Stateful Value**: The first element in the tuple returned by `useState` carries the current state, like any other state in React.

2. **Setter Function**: The second element is a function that determines the state's new value. Upon invocation, it imparts this new state to the component, just as `setState` does in classes.

Given `value` as the stateful value and `setValue` as the setter function, calling `setValue(newValue)` will alter `value` to `newValue`.

### Behavioral Traits of `useState`

- **Lazy Initialization**: If the stateful value necessitates a computationally intensive or time-consuming setup, employing `useState` ensures that this setup occurs exclusively when the component is first rendered rather than on every update.

- **Referential Integrity**: If you employ the `useState` Hook at distinct spots within a component or even dissimilar components, React guarantees that each endeavor manages its unique state underlying value, akin to using `this.state` in classes.

### Code Example: useState

Here is the React Component:

```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
