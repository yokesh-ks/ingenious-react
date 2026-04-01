# Q10: How do you pass **data** between **components** in **React**?

| | |
|---|---|
| **Category** | React Basics |
| **Difficulty** | 🟢 Beginner |

---

**Data propagation** in React components primarily relies on two mechanisms:

- **Props**: For unidirectional data flow, parent components pass data to their children via props.
  
- **Callback Functions**: Data moves up the tree when children invoke specific functions passed down from their parents.

Let's have a look at the best-practices for these two mechanisms.

### Using Props

  - **Role**: Primarily used for one-way data flow. The parent furnishes the child with props that the child component can neither alter nor reassign.
  
  - **Best Practices**:
    - Leverage props for read-only data in child components.
    - Rerender the child component, if necessary, when the prop values change.

  - **Code Example: Read-Only Checkbox**:

  Your task is to write the full code for the React Application to demonstrate passing data to child components using props.

### Children Built With Props

In this code example, `App` maintains the `optionSelected` state that it shares with the `DropDown` and `SelectedOption` components. `DropDown` uses the `optionSelected` state to determine which option was picked, shared with `SelectedOption` to display it.

```tsx
// src/components/DropDown.tsx
interface DropDownProps {
  options: string[]
}

const DropDown: React.FC<DropDownProps> = ({ options }) => {
  const [selected, setSelected] = React.useState(0);

  return (
    <div>
      <div>Options:</div>
      {options.map((opt, index) => (
        <button key={index} onClick={() => setSelected(index)}>{opt}</button>
      )}
      <SelectedOption option={options[selected]} />
    </div>
  );
};

// src/components/SelectedOption.tsx
interface SelectedOptionProps {
  option: string
}

const SelectedOption: React.FC<SelectedOptionProps> = ({ option }) => {
  return <div>You selected: {option}</div>;
};

// src/App.tsx
const App: React.FC = () => {
  const options = ['Apple', 'Banana', 'Cherry'];
  return <DropDown options={options} />;
};

export default App;
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
