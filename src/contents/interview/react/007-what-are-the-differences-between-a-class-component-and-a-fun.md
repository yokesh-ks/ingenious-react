# Q7: What are the differences between a **class component** and a **functional component**?

| | |
|---|---|
| **Category** | React Basics |
| **Difficulty** | 🟢 Beginner |

---

Let's look at the various aspects and differences between **Class Components** and **Functional Components**.

### Core Distinctions

**Class Components**:

- Utilize the `class` keyword for component definition.
- Can have state management.
- Allow lifecycle methods.
- Are typically verbose.

**Functional Components**:

- Defined using ES6 functions.
- Lack inherent state or lifecycle management.
- Primarily used for UI representation.
- Introduced `Hooks` in **React 16.8** for state and lifecycle control.

### Detail Evaluation

#### Code Structure

**Class Components**:

- Consists of a `render()` method.
- Can incorporate other methods for state updates and lifecycle management.

**Functional Components**:

- Evolved with introduction of React hooks.
- `useState()` and `useEffect()` for state and lifecycle management respectively.

#### Purpose and Use-Cases

**Class Components**:

- Suitable for more complex components.
- May be necessary in older codebases.
- Gradually being replaced by hooks and functional components.

**Functional Components**:

- Focused on UI without managing state.
- Introduced hooks to handle state and lifecycle methods.

#### Editable State

**Class Components**:

- Use `this.state` and `this.setState()` to manage state.
- Useful when state contains complex data types.

**Functional Components**:

- Implement `useState` hook to enable state management in functions.
- Introduced for state management in functional components, simplifying state handling.

#### Lifecycle Methods

**Class Components**:

- Offer a wide range of lifecycle methods.
- Example methods include `componentDidMount` and `componentWillUnmount`.

**Functional Components**:

- Limited lifecycle management before the introduction of hooks.
- Use `useEffect()` to handle actions based on state and props changes. 

#### Context API and Redux Usage

**Class Components**:

- Can easily be paired with both Context API and Redux.
- Typically used with render props.

**Functional Components**:

- With hooks like `useContext`, have become proficient in handling shared state.
- Can now be seamlessly integrated with newer global state management libraries like Redux.

### Adoption and Transition

- Initial React versions were heavily reliant on class components.
- **Hooks'** introduction in **React 16.8** facilitated the shift towards fully functional components.
- While gradual migration from class to functional is encouraged because of performance benefits, both paradigms can still coexist.

### Key Takeaways

- **Class Components**:
  - Traditional class-based components.
  - Prefers `this` context.
  - Houses extensive lifecycle methods.
  - Stands as a more elaborate and structured option.

- **Functional Components**:
  - Evolved to include hooks for state management.
  - Favored for their simplicity and ease of reusability.
  - Perfect for simpler, stateless components.
