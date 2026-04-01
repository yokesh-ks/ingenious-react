# Q4: How do you create a **component** in **React**?

| | |
|---|---|
| **Category** | React Basics |
| **Difficulty** | 🟢 Beginner |

---

Creating a React component involves defining its structure, behavior, and sometimes lifecycle methods for dynamic updates. Components can be **functional** or **class-based**.

### Code Example

Here's a  **Class-based** component:

```jsx
import React, { Component } from 'react';

class Greeting extends Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

And here's a **Functional** one:

```jsx
import React from 'react';

const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;
```

Both examples showcase a basic greeting component that takes in a prop `name` and displays a greeting message.

#### Linters and JSX
Many modern text editors and IDEs support JSX and JavaScript syntax, especially when integrated with linters like ESLint. This setup provides real-time feedback on errors and formatting issues.

#### Code Styling with AirBNB and Prettier
It's common to see code bases following the **Airbnb** style guide, often coupled with **Prettier** for consistent and automated code formatting.

In the context of component creation, these standards can dictate whether to use single or double quotes for JSX attributes and the method for defining components.

### Key Takeaways

- JSX offers a natural, HTML-like syntax for building components in React.
- Components can be function-based or class-based.
- Use modern editing tools and linters for improved code consistency and spotting potential issues in real-time.
