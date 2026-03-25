import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { buildPageMeta } from '@/lib/seo'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/about',
  head: () => buildPageMeta({
    title: 'About',
    description: 'Ingenious React is a platform built with React 19, TanStack Router, and WebContainers to help developers practice coding challenges and land frontend jobs.',
    path: '/about',
    noindex: true,
  }),
  component: About,
})

function About() {
  return (
    <div className="flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>About This App</CardTitle>
          <CardDescription>
            A React + TypeScript + Vite project with TanStack Router
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>React 19 with TypeScript</li>
              <li>TanStack Router for navigation</li>
              <li>TanStack Query for data fetching</li>
              <li>Tailwind CSS v4 for styling</li>
              <li>Shadcn UI components</li>
              <li>Vite for fast development</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">TanStack Router Benefits:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Full TypeScript support</li>
              <li>Code-based route definitions</li>
              <li>Excellent developer experience</li>
              <li>Seamless integration with TanStack Query</li>
              <li>Powerful dev tools</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}