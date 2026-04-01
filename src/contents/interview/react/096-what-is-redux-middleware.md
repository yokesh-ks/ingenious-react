# Q96: What is **Redux middleware** and how does it work?

| | |
|---|---|
| **Category** | State Management |
| **Difficulty** | 🟡 Intermediate |

---

**Redux middleware** is code that sits between the moment an action is dispatched and the moment it reaches the reducer. It lets you intercept, modify, log, or delay actions.

---

### The Redux data flow without middleware

```
dispatch(action) → reducer(state, action) → new state
```

### With middleware

```
dispatch(action) → middleware 1 → middleware 2 → reducer → new state
```

Each middleware can:
- Log the action
- Cancel the action
- Transform the action
- Dispatch additional actions
- Handle async operations

---

### Writing a simple middleware

A middleware is a function that returns a function that returns a function (curried):

```js
const loggerMiddleware = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  console.log('State before:', store.getState());

  const result = next(action);  // pass to next middleware / reducer

  console.log('State after:', store.getState());
  return result;
};
```

---

### Applying middleware

```js
import { createStore, applyMiddleware } from 'redux';

const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware, anotherMiddleware)
);
```

With **Redux Toolkit** (the modern way):

```js
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
```

---

### Redux Thunk — async middleware

**Redux Thunk** (included in Redux Toolkit by default) lets you dispatch functions instead of plain objects:

```js
// Without thunk — only plain objects
dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });

// With thunk — dispatch a function that performs async work
const fetchUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: 'FETCH_USER_REQUEST' });
  try {
    const user = await api.getUser(userId);
    dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
  } catch (error) {
    dispatch({ type: 'FETCH_USER_FAILURE', error: error.message });
  }
};

// Usage
dispatch(fetchUser(123));
```

---

### RTK Query — modern alternative to thunks

Redux Toolkit Query replaces manual thunks for data fetching:

```js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getUser: builder.query({ query: (id) => `/users/${id}` }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/users/${id}`, method: 'PUT', body }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = api;
```

---

### Common middleware use cases

| Middleware | Purpose |
|---|---|
| `redux-thunk` | Async actions (included in RTK) |
| `redux-logger` | Log actions and state changes |
| `redux-persist` | Persist and rehydrate state |
| `redux-saga` | Complex async flows with generators |
| Custom auth middleware | Attach auth tokens to API calls |

---

### Custom auth middleware example

```js
const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'auth/logout') {
    // Clear token before the state updates
    localStorage.removeItem('token');
    api.clearAuthHeader();
  }
  return next(action);
};
```
