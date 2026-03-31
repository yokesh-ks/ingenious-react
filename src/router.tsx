import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './store'

// Import the generated route tree
import { Route as RootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as AboutRoute } from './routes/about'
import { Route as FrontendCodingRoute } from './routes/frontend-coding'
import { Route as FrontendCodingChallengeRoute } from './routes/frontend-coding.$challengeId'
import { Route as JSProblemsRoute } from './routes/js-problems'
import { Route as JSProblemDetailRoute } from './routes/js-problems.$problemId'
import { Route as JobsChennaiRoute } from './routes/jobs.chennai'
import { Route as JobsChennaiDetailRoute } from './routes/jobs.chennai.$slug'
import { Route as QuizRoute } from './routes/quiz'
import { Route as QuizPlayRoute } from './routes/quiz.$quizId'

// Create the route tree
const routeTree = RootRoute.addChildren([IndexRoute, AboutRoute, FrontendCodingRoute, FrontendCodingChallengeRoute, JSProblemsRoute, JSProblemDetailRoute, JobsChennaiRoute, JobsChennaiDetailRoute, QuizRoute, QuizPlayRoute])

// Create the router
const router = createRouter({
  routeTree,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Create the app component with router and query client providers
export function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  )
}