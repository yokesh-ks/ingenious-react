import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface FrontendChallengesState {
  solutions: Record<string, string>
  completed: string[]
}

const initialState: FrontendChallengesState = {
  solutions: {},
  completed: [],
}

const frontendChallengesSlice = createSlice({
  name: 'frontendChallenges',
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
  frontendChallengesSlice.actions

export default frontendChallengesSlice.reducer
