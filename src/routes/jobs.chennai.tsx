import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/jobs/chennai',
  component: JobsChennai,
})

function JobsChennai() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="text-center text-muted-foreground">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Jobs - Chennai</h1>
        <p className="text-sm">Coming soon</p>
      </div>
    </div>
  )
}
