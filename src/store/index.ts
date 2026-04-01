import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
}
import frontendChallengesReducer from './slices/frontendChallengesSlice'
import jsProblemsReducer from './slices/jsProblemsSlice'
import quizReducer from './slices/quizSlice'
import questionsReducer from './slices/questionsSlice'

const rootReducer = combineReducers({
  frontendChallenges: frontendChallengesReducer,
  jsProblems: jsProblemsReducer,
  quiz: quizReducer,
  questions: questionsReducer,
})

const persistConfig = {
  key: 'ingenious',
  storage,
  whitelist: ['frontendChallenges', 'jsProblems', 'quiz', 'questions'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
