import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Header } from '@/components/Header'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  )
}