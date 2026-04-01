# Q11: What is a **stateful component**?

| | |
|---|---|
| **Category** | React State Management |
| **Difficulty** | 🟢 Beginner |

---

**Stateful components** in React are fueled by internal states, allowing them to adapt to user interactions and data changes.

By invoking `this.setState()`, components update their state, triggering a re-render and ensuring the UI and state are in sync.

### When to Use

- **Dynamic Interactions**: For components that require dynamic updates, such as a counter that increments on every click.
  
- **User Input Handling**: Useful for capturing and validating user inputs in forms.

- **Data Fetching**: To manage and display data obtained from API calls.

### Code Example: Stateful Component

Here is the JavaScript code:

```jsx
import React, { Component } from 'react';

class ClickCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  handleIncrement = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleIncrement}>Increment</button>
      </div>
    );
  }
}

export default ClickCounter;
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
