import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'

interface QuestionsState {
  bookmarks: string[]
}

const initialState: QuestionsState = {
  bookmarks: [],
}

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    toggleBookmark(state, action: PayloadAction<string>) {
      const id = action.payload
      const index = state.bookmarks.indexOf(id)
      if (index === -1) {
        state.bookmarks.push(id)
      } else {
        state.bookmarks.splice(index, 1)
      }
    },
    addBookmark(state, action: PayloadAction<string>) {
      if (!state.bookmarks.includes(action.payload)) {
        state.bookmarks.push(action.payload)
      }
    },
    removeBookmark(state, action: PayloadAction<string>) {
      state.bookmarks = state.bookmarks.filter(id => id !== action.payload)
    },
  },
})

export const { toggleBookmark, addBookmark, removeBookmark } = questionsSlice.actions

export default questionsSlice.reducer

// Selectors
export const isQuestionBookmarked = (state: RootState, questionId: string) =>
  state.questions.bookmarks.includes(questionId)

export const selectBookmarkedQuestions = (state: RootState) => state.questions.bookmarks