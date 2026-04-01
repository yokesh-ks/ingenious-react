# Q13: How do you update the **state** of a **parent component** from a **child component**?

| | |
|---|---|
| **Category** | React State Management |
| **Difficulty** | 🟢 Beginner |

---

**React** encourages **unidirectional data flow**, primarily passing data from parent to child. However, occasional need arises to update parent state from a child component. This can be facilitated using specific patterns and techniques.

### Primary Methods

1. **Props Callback**: Pass a function `onStateChange` as a prop which the child can call to update parent state.
  
2. **Context API**: Use `Context` to make state accessible and modifiable from descendant components.

### Advanced Techniques

1. **UseRef and ForwardRef**: Utilize `useRef` and `forwardRef` to get a reference to a child component, allowing you to directly manipulate its properties.

2. **Global State Management**: Implement a global state management solution like Redux or MobX if state changes are pervasive.  

3. **Data Services**: Use a service to manage shared state, which can be updated and read by different components.

### Code Example: State Management

Here is the React Component:

```jsx
// App.js - Parent component
import React, { useState } from 'react';
import Child from './Child';

function Parent() {
  const [state, setState] = useState('');

  const updateState = (newState) => {
    setState(newState);
  };

  return <Child updateParentState={updateState} />;
}
```

```jsx
// Child.js - Child component
import React from 'react';

function Child({ updateParentState }) {
  const handleClick = () => {
    updateParentState('New state from child!');
  };

  return <button onClick={handleClick}>Update Parent</button>;
}
```

In this example, the `Parent` component maintains the state, which is updated via the function `updateState` passed as a prop to `Child`. When a button inside `Child` is clicked, the `updateParentState` function updates the parent state.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
