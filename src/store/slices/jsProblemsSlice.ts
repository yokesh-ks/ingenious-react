import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface JSProblemsState {
  solutions: Record<string, string>
  completed: string[]
}

const initialState: JSProblemsState = {
  solutions: {},
  completed: [],
}

const jsProblemsSlice = createSlice({
  name: 'jsProblems',
  initialState,
  reducers: {
    setSolution(state, action: PayloadAction<{ id: string; code: string }>) {
      state.solutions[action.payload.id] = action.payload.code
    },
    resetSolution(state, action: PayloadAction<string>) {
      delete state.solutions[action.payload]
    },
    markCompleted(state, action: PayloadAction<string>) {
      if (!state.completed.includes(action.payload)) {
        state.completed.push(action.payload)
      }
    },
    unmarkCompleted(state, action: PayloadAction<string>) {
      state.completed = state.completed.filter(id => id !== action.payload)
    },
  },
})

export const { setSolution, resetSolution, markCompleted, unmarkCompleted } =
  jsProblemsSlice.actions

export default jsProblemsSlice.reducer
