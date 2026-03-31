import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { QuizQuestion } from '@/data/quiz-questions'

export interface ActiveQuiz {
  id: string
  title: string
  emoji: string
  questions: QuizQuestion[]
  current: number // 1-based, Q1..Q25
  answers: (number | null)[] // index = question index (0-based), value = selected option (0-3)
  reviewFlags: boolean[] // index = question index (0-based)
  answeredCount: number
  reviewCount: number
  timeLeft: number // seconds
  isPaused: boolean
  startedAt: number // timestamp ms
}

interface QuizState {
  screen: 'hub' | 'active' | 'results'
  activeQuiz: ActiveQuiz | null
}

const initialState: QuizState = {
  screen: 'hub',
  activeQuiz: null,
}

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    startQuiz(
      state,
      action: PayloadAction<{
        id: string
        title: string
        emoji: string
        questions: QuizQuestion[]
        duration: number // minutes
      }>
    ) {
      const { id, title, emoji, questions, duration } = action.payload
      state.screen = 'active'
      state.activeQuiz = {
        id,
        title,
        emoji,
        questions,
        current: 1,
        answers: new Array(questions.length).fill(null),
        reviewFlags: new Array(questions.length).fill(false),
        answeredCount: 0,
        reviewCount: 0,
        timeLeft: duration * 60,
        isPaused: false,
        startedAt: Date.now(),
      }
    },

    answerQuestion(state, action: PayloadAction<number>) {
      if (!state.activeQuiz) return
      const qIndex = state.activeQuiz.current - 1
      const wasAnswered = state.activeQuiz.answers[qIndex] !== null
      state.activeQuiz.answers[qIndex] = action.payload
      if (!wasAnswered) {
        state.activeQuiz.answeredCount++
      }
    },

    nextQuestion(state) {
      if (!state.activeQuiz) return
      if (state.activeQuiz.current < state.activeQuiz.questions.length) {
        state.activeQuiz.current++
      }
    },

    prevQuestion(state) {
      if (!state.activeQuiz) return
      if (state.activeQuiz.current > 1) {
        state.activeQuiz.current--
      }
    },

    goToQuestion(state, action: PayloadAction<number>) {
      if (!state.activeQuiz) return
      const n = action.payload
      if (n >= 1 && n <= state.activeQuiz.questions.length) {
        state.activeQuiz.current = n
      }
    },

    toggleReview(state) {
      if (!state.activeQuiz) return
      const qIndex = state.activeQuiz.current - 1
      const wasReviewed = state.activeQuiz.reviewFlags[qIndex]
      state.activeQuiz.reviewFlags[qIndex] = !wasReviewed
      state.activeQuiz.reviewCount += wasReviewed ? -1 : 1
    },

    tickTimer(state) {
      if (!state.activeQuiz || state.activeQuiz.isPaused) return
      if (state.activeQuiz.timeLeft > 0) {
        state.activeQuiz.timeLeft--
      }
    },

    togglePause(state) {
      if (!state.activeQuiz) return
      state.activeQuiz.isPaused = !state.activeQuiz.isPaused
    },

    submitQuiz(state) {
      state.screen = 'results'
      if (state.activeQuiz) {
        state.activeQuiz.isPaused = true
      }
    },

    resetQuiz(state) {
      state.screen = 'hub'
      state.activeQuiz = null
    },

    resumeQuiz(state) {
      if (state.activeQuiz) {
        state.screen = 'active'
      }
    },
  },
})

export const {
  startQuiz,
  answerQuestion,
  nextQuestion,
  prevQuestion,
  goToQuestion,
  toggleReview,
  tickTimer,
  togglePause,
  submitQuiz,
  resetQuiz,
  resumeQuiz,
} = quizSlice.actions

export default quizSlice.reducer

// ─── Selectors ────────────────────────────────────────────────────────────────

export function selectCurrentQuestion(activeQuiz: ActiveQuiz) {
  return activeQuiz.questions[activeQuiz.current - 1]
}

export function selectScore(activeQuiz: ActiveQuiz): { correct: number; total: number; percent: number } {
  let correct = 0
  activeQuiz.questions.forEach((q, i) => {
    if (activeQuiz.answers[i] === q.answer) correct++
  })
  const total = activeQuiz.questions.length
  return { correct, total, percent: Math.round((correct / total) * 100) }
}

export function selectTimeTaken(activeQuiz: ActiveQuiz, totalSeconds: number): string {
  const taken = totalSeconds - activeQuiz.timeLeft
  const m = Math.floor(taken / 60)
  const s = taken % 60
  return `${m}m ${s.toString().padStart(2, '0')}s`
}

export function selectCategoryBreakdown(activeQuiz: ActiveQuiz): Record<string, { correct: number; total: number }> {
  const breakdown: Record<string, { correct: number; total: number }> = {}
  activeQuiz.questions.forEach((q, i) => {
    if (!breakdown[q.category]) breakdown[q.category] = { correct: 0, total: 0 }
    breakdown[q.category].total++
    if (activeQuiz.answers[i] === q.answer) breakdown[q.category].correct++
  })
  return breakdown
}
