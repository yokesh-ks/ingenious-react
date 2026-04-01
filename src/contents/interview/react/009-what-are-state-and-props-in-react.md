# Q9: What are **state** and **props** in **React**?

| | |
|---|---|
| **Category** | React Basics |
| **Difficulty** | 🟢 Beginner |

---

In React, **props** and **state** are both used to propagate and manage data. However, they have different roles and management patterns.

### Role & Life Cycle

- **Props (short for "properties")** are used **to pass data from a parent component to a child** one. Once passed, props in the child component are read-only and can't be directly modified by the child.

- **State** is used to manage data within a component, and is mutable. Any changes to state values trigger a component re-render.

### When to Use 

- **Props** are for data that does not change within the component and is provided by a parent.
- **State** is for data that does change within the component and is managed by that component itself.

### Management

- When a component receives new props, React will merge them with any existing state. However, it won't override state values unless you explicitly set them.
  
- Since React re-renders the entire component when you update state, it's important to be efficient in state management. Tools like `useMemo` or `shouldComponentUpdate` can help optimize re-renders.

### Unifying with Hooks

- The `useState` hook (along with other hooks like `useEffect`) allows functional components to manage state, bringing them closer in capability to class components.
  
- Prior to the introduction of hooks in React 16.8, state was the exclusive domain of class components. But now, both state and its associated lifecycle hooks belong to **functional components** as well.

### Code Example: State and Props Management

Here is the JavaScript code:

```javascript
import React, { useState } from 'react';

// Button Component
const Button = ({ text, color }) => {
  return <button style={{background: color}}>{text}</button>;
};

// ColorPicker Component
const ColorPicker = () => {
  const [color, setColor] = useState('blue');

  const changeColor = (newColor) => {
    setColor(newColor);
  };

  return (
    <div>
      <Button text="Red" color="red" onClick={() => changeColor('red')} />
      <Button text="Blue" color="blue" onClick={() => changeColor('blue')} />
      <Button text="Green" color="green" onClick={() => changeColor('green')} />
    </div>
  );
};

// App Component
const App = () => {
  return <ColorPicker />;
};
```
