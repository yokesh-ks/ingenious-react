# Q14: What is **lifting state up** in **React**?

| | |
|---|---|
| **Category** | React State Management |
| **Difficulty** | 🟢 Beginner |

---

**Lifting State Up** in React entails managing state in parent components to propagate it to multiple children, typically to ensure synchronization or data flow.

### Why Use Lifting State Up?

- **Consistent Data**: Prevents inconsistencies in related data scattered across components.
- **Easier Data Modifications**: Minimizes complexity when updating shared data, especially with complex data structures or numerous children.

### Core Mechanism: Props

React components communicate using `props`, where child components receive data from parents. During **lifting state up**, the parent maintains the state and passes down relevant data as props.

### Lifting State Up in Code

Here is the React code:

#### Parent Component: RectangleAreaCalculator

```jsx
class RectangleAreaCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  render() {
    return (
      <div>
        <ShapeInput
          type="number"
          label="Width"
          value={this.state.width}
          onChange={(e) => this.setState({ width: e.target.value })}
        />
        <ShapeInput
          type="number"
          label="Height"
          value={this.state.height}
          onChange={(e) => this.setState({ height: e.target.value })}
        />
        <ShapeArea area={this.state.width * this.state.height} />
      </div>
    );
  }
}
```

#### Child Components: ShapeInput and ShapeArea

```jsx
const ShapeInput = ({ type, label, value, onChange }) => (
  <div>
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} />
  </div>
);

const ShapeArea = ({ area }) => <div>Area: {area}</div>;
```

In this example, the `RectangleAreaCalculator` maintains the `width` and `height` state and passes them as props to the `ShapeInput` components. The `ShapeArea` component calculates the area and receives `width` and `height` as props, keeping its state logic-free.

### Advantages

- **Single Source of Truth**: Shared data lives in the parent, reducing complexities stemming from data redundancy or inconsistencies.
- **Predictable Data Flow**: Changes to the data layer (parent) trigger updates to all its children. This helps in maintaining the coding standards and data integrity.

### Most Common Implementations

- **Form State**: Centralizes form data management in one place, simplifying form submissions or data validation.
- **Shared Logic**: Multiple components using the same data or functionality can benefit from centralized state management.

### When It's Overkill

For small-scale apps or in situations with data that lacks a clear **source of "truth"**, the technique might introduce unnecessary complexity.

Aiming for a balance between centralized and localized state management is key, and React provides tools like `useContext` and `useState` that cater to both requirements.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
