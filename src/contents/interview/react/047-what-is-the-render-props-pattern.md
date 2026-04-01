# Q47: What is the **render props** pattern?

| | |
|---|---|
| **Category** | Advanced Patterns |
| **Difficulty** | 🟡 Intermediate |

---

The **render props** pattern shares stateful logic between components by passing a **function as a prop**. The parent component calls this function with data and the child renders whatever the function returns.

```jsx
<DataProvider render={(data) => <Chart data={data} />} />
// or more commonly via children:
<DataProvider>
  {(data) => <Chart data={data} />}
</DataProvider>
```

---

### Example: Mouse tracker

```jsx
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (e) => {
    this.setState({ x: e.clientX, y: e.clientY });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove} style={{ height: 300 }}>
        {/* Call the render prop with current mouse position */}
        {this.props.children(this.state)}
      </div>
    );
  }
}

// Usage — consumer decides what to render
function App() {
  return (
    <MouseTracker>
      {({ x, y }) => (
        <p>Mouse is at ({x}, {y})</p>
      )}
    </MouseTracker>
  );
}
```

---

### Another example: Toggle

```jsx
function Toggle({ children }) {
  const [on, setOn] = useState(false);
  return children({ on, toggle: () => setOn(o => !o) });
}

// Usage
<Toggle>
  {({ on, toggle }) => (
    <>
      <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
      {on && <p>The toggle is on!</p>}
    </>
  )}
</Toggle>
```

---

### Render Props vs Custom Hooks

Custom Hooks have largely replaced render props — the same logic can be extracted into a hook without the extra JSX nesting:

```jsx
// Old way — render props
<Toggle>{({ on, toggle }) => <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>}</Toggle>

// New way — custom Hook (simpler!)
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  return { on, toggle: () => setOn(o => !o) };
}

function Component() {
  const { on, toggle } = useToggle();
  return <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>;
}
```

Render props still appear in some libraries (older React Router API, Formik, Downshift, etc.).
