# Q36: What is **getSnapshotBeforeUpdate**?

| | |
|---|---|
| **Category** | Component Lifecycle |
| **Difficulty** | 🔴 Advanced |

---

`getSnapshotBeforeUpdate` captures information from the DOM **right before** it's updated. The value it returns is passed as the third argument (`snapshot`) to `componentDidUpdate`.

It's used in rare cases where you need to read the DOM state (like scroll position) before React changes it.

### Syntax

```jsx
getSnapshotBeforeUpdate(prevProps, prevState) {
  // Return a snapshot value (or null)
  return this.listRef.current.scrollHeight;
}

componentDidUpdate(prevProps, prevState, snapshot) {
  // Use the snapshot captured before the update
  if (snapshot !== null) {
    this.listRef.current.scrollTop +=
      this.listRef.current.scrollHeight - snapshot;
  }
}
```

---

### Classic use case: chat scroll preservation

When new messages are added to a chat list, the scroll position shifts. `getSnapshotBeforeUpdate` lets you capture the scroll height before the DOM updates, then adjust scroll position after:

```jsx
class ChatList extends React.Component {
  listRef = React.createRef();

  getSnapshotBeforeUpdate(prevProps) {
    // Was a new message added?
    if (prevProps.messages.length < this.props.messages.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop; // distance from bottom
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot; // restore position
    }
  }

  render() {
    return (
      <div ref={this.listRef} style={{ overflowY: 'auto', height: 400 }}>
        {this.props.messages.map(m => (
          <p key={m.id}>{m.text}</p>
        ))}
      </div>
    );
  }
}
```

---

### In functional components

There's no direct Hook equivalent. `useLayoutEffect` can be used to read the DOM right after React applies changes (but before the browser paints), which covers most of the same use cases:

```jsx
function ChatList({ messages }) {
  const listRef = useRef(null);
  const prevScrollHeight = useRef(null);

  useLayoutEffect(() => {
    // Capture scroll height before messages update
    prevScrollHeight.current = listRef.current.scrollHeight;
  });

  useLayoutEffect(() => {
    if (prevScrollHeight.current !== null) {
      const list = listRef.current;
      list.scrollTop += list.scrollHeight - prevScrollHeight.current;
    }
  }, [messages]);

  return (
    <div ref={listRef} style={{ overflowY: 'auto', height: 400 }}>
      {messages.map(m => <p key={m.id}>{m.text}</p>)}
    </div>
  );
}
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
