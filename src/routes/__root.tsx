import { Outlet, createRootRoute, HeadContent } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Header } from '@/components/Header'
import { SITE_NAME } from '@/lib/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: `${SITE_NAME} – Master React. Land Your Dream Job.` },
      { name: 'description', content: 'Practice React coding challenges, solve JS algorithm problems, and find frontend jobs in Chennai.' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <HeadContent />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <TanStackRouterDevtools />
      </div>
    </>
  )
}