# Q8: How do you handle **events** in **React**?

| | |
|---|---|
| **Category** | React Basics |
| **Difficulty** | 🟢 Beginner |

---

**React** simplifies the process of managing and handling events through its use of **synthetic events**.

### Handling Events in React

#### Synthetic Events

React **abstracts browser events** into what are known as *synthetic events*. This ensures a consistent interface across different browsers.

#### Event Subscription

- When handling events, **React behaves consistently** across all elements, not just form elements.

- React events use _camelCase_, unlike HTML, which is helpful for both **consistency and avoiding reserved words in JavaScript**.

- Use **boolean attributes** in JSX for default browser events.

#### Special Event Handling

React provides _special interfaces_ for certain types of events: input components benefit from the `value` attribute, while media components make use of `src` or other similar attributes specific to their type.



### Code Example: Event Handling

Here is the JavaScript code:

```javascript
import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
