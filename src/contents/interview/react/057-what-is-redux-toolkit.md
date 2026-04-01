# Q57: What is **Redux Toolkit** (RTK)?

| | |
|---|---|
| **Category** | State Management |
| **Difficulty** | 🟡 Intermediate |

---

**Redux Toolkit (RTK)** is the official, opinionated way to write Redux. It simplifies Redux setup with less boilerplate and includes best practices built-in.

It's now the **recommended way** to write Redux — the old "manual" Redux approach has too much boilerplate.

### What RTK provides

| Feature | What it does |
|---|---|
| `configureStore` | Sets up store with good defaults (Redux DevTools, Thunk middleware) |
| `createSlice` | Combines actions + reducer in one place |
| `createAsyncThunk` | Handles async operations with loading/error states |
| `createEntityAdapter` | Normalizes and manages collections of data |

---

### Example: Counter with RTK

```jsx
import { createSlice, configureStore } from '@reduxjs/toolkit';

// createSlice generates actions AND reducer automatically
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state, action) => {
      state.value += action.payload; // "mutating" is safe — RTK uses Immer internally
    },
    decrement: (state, action) => {
      state.value -= action.payload;
    },
    reset: (state) => {
      state.value = 0;
    }
  }
});

export const { increment, decrement, reset } = counterSlice.actions;

const store = configureStore({
  reducer: { counter: counterSlice.reducer }
});
```

---

### Async with createAsyncThunk

```jsx
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const fetchUser = createAsyncThunk('users/fetchById', async (userId) => {
  const res = await fetch(`/api/users/${userId}`);
  return res.json(); // returned value becomes action.payload
});

const userSlice = createSlice({
  name: 'users',
  initialState: { user: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending,   (state) => { state.loading = true; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected,  (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
```

---

### Why "mutating" state is safe in RTK

RTK uses **Immer** under the hood. When you write `state.value += 1`, Immer intercepts it and produces a new immutable state object behind the scenes. You write mutable-looking code, but get immutable updates.

---

### React component usage

```jsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './counterSlice';

function Counter() {
  const count    = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <p>{count}</p>
      <button onClick={() => dispatch(increment(1))}>+</button>
      <button onClick={() => dispatch(decrement(1))}>−</button>
    </>
  );
}
```

---

*Source: [devinterview.io](https://devinterview.io/questions/web-and-mobile-development/react-interview-questions/)*
