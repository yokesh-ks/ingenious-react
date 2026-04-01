# Q52: What is the **compound component** pattern?

| | |
|---|---|
| **Category** | Advanced Patterns |
| **Difficulty** | 🔴 Advanced |

---

The **compound component** pattern lets a group of components work together with **shared implicit state** — similar to how HTML's `<select>` and `<option>` work together.

The parent manages state and shares it with its children through Context — without the children needing explicit props.

---

### Example: Tabs component

```jsx
import { createContext, useContext, useState } from 'react';

const TabsContext = createContext(null);

// Parent manages state
function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// Children consume shared state
function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

function Tab({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      className={activeTab === value ? 'active' : ''}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

function TabPanel({ value, children }) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === value ? <div>{children}</div> : null;
}

// Attach sub-components to parent for a clean API
Tabs.List  = TabList;
Tabs.Tab   = Tab;
Tabs.Panel = TabPanel;
```

### Usage

```jsx
<Tabs defaultTab="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="specs">Specs</Tabs.Tab>
    <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
  </Tabs.List>

  <Tabs.Panel value="overview">Overview content...</Tabs.Panel>
  <Tabs.Panel value="specs">Specs content...</Tabs.Panel>
  <Tabs.Panel value="reviews">Reviews content...</Tabs.Panel>
</Tabs>
```

---

### Benefits

- **Flexible composition** — caller decides layout and structure
- **No prop drilling** — state shared via Context
- **Intuitive API** — reads like declarative HTML
- **Encapsulation** — implementation details hidden inside parent

---

### Real-world examples

This pattern is used in: **Radix UI**, **Headless UI**, **Reach UI**, **shadcn/ui**, React Select.

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
