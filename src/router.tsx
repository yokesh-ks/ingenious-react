import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'

// Import the generated route tree
import { Route as RootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as AboutRoute } from './routes/about'
import { Route as FrontendCodingRoute } from './routes/frontend-coding'
import { Route as FrontendCodingChallengeRoute } from './routes/frontend-coding.$challengeId'
import { Route as JSProblemsRoute } from './routes/js-problems'
import { Route as JobsChennaiRoute } from './routes/jobs.chennai'

// Create the route tree
const routeTree = RootRoute.addChildren([IndexRoute, AboutRoute, FrontendCodingRoute, FrontendCodingChallengeRoute, JSProblemsRoute, JobsChennaiRoute])

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
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}