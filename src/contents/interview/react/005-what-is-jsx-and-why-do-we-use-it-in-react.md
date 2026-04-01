# Q5: What is **JSX** and why do we use it in **React**?

| | |
|---|---|
| **Category** | React Basics |
| **Difficulty** | 🟢 Beginner |

---

**JSX** is a powerful JavaScript Extension that enables the seamless integration of HTML-like structures within React. Notably, it allows for a more **intuitive** component declaration and enhanced developer **productivity**.

### Key Features

- **Readable Syntax**: Familiar HTML tags make parsing code and debugging simpler.

- **Component Embedding**: JSX supports direct embedding of components, which enhances modularity.

- **Automatic Babel Conversion**: Behind the scenes, JSX and its HTML-like tags are transpiled into JavaScript for browser compatibility.

### Benefits of Using JSX

- **Code Compactness**: JSX helps avoid lengthy `React.createElement` calls.
  
- **Type Safety**: Modern IDEs provide extensive support for type checking and autocompletion with JSX.

- **Compile-Time Optimizations**: JSX allows for compile-time optimizations, enhancing app performance.

- **Enable Optional Syntax Checks**: For those developing in TypeScript, JSX enables Syntax Checks to ensure code quality.

### Code Example: JSX and Its Transpiled Output

Here is the JSX code

```jsx
// JSX
const element = <h1>Hello, World!</h1>;
```

Here is the equivalent JS code transpiled by Babel:

```javascript
// Transpiled JS
const element = React.createElement('h1', null, 'Hello, World!');
```

### Why Use JSX?

- **Concise Syntax**: JSX provides a succinct, declarative approach to building UIs.

- **Improved Readability**: Its obvious resemblance to HTML promotes code clarity and reduces cognitive load.

- **Static Type Checking**: When used with TypeScript or Flow, JSX brings the benefits of type safety, reducing the probability of runtime errors.

- **Development Efficiency**: By simplifying UI code and providing helpful developer features, JSX accelerates the development process.

- **React Ecosystem Integration**: JSX is the preferred way to write components across the React ecosystem, fostering community best practices.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
