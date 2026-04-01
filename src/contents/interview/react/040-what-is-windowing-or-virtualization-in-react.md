# Q40: What is **windowing** or **virtualization** in React?

| | |
|---|---|
| **Category** | Performance Optimization |
| **Difficulty** | 🟡 Intermediate |

---

**Windowing (virtualization)** is a technique where only the **visible items** in a long list are rendered in the DOM — not the entire list. As the user scrolls, items are created and destroyed dynamically.

### The problem

Rendering 10,000 rows at once creates 10,000 DOM nodes — extremely slow to render and causes browser lag.

### The solution

Only render the ~15–20 rows the user can actually see. All other rows are "virtual" — their space is reserved, but no DOM nodes are created.

---

### Popular libraries

**react-window** (lightweight, recommended):

```jsx
import { FixedSizeList } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Row #{index}</div>
);

function VirtualList() {
  return (
    <FixedSizeList
      height={400}       // visible container height (px)
      itemCount={10000}  // total rows
      itemSize={35}      // each row height (px)
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

---

**@tanstack/react-virtual** (more flexible):

```bash
npm install @tanstack/react-virtual
```

```jsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 35,
  });

  return (
    <div ref={parentRef} style={{ height: 400, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize() }}>
        {virtualizer.getVirtualItems().map(virtualRow => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            {items[virtualRow.index].name}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

### When to use it

✅ Use for lists with **hundreds or thousands** of items:
- Infinite scroll feeds
- Data tables with many rows
- Large dropdown lists
- Chat message history

❌ Don't bother for lists with < 100 items — plain rendering is fine.

---

### Performance gains

| List size | Without virtualization | With virtualization |
|---|---|---|
| 100 items | Fast | Same |
| 1,000 items | Slow | Fast |
| 10,000 items | Browser hangs | Fast |
