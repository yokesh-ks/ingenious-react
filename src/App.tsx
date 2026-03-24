import { useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Header } from '@/components/Header'
import { queryClient } from '@/lib/queryClient'

function App() {
  const [count, setCount] = useState(0)

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center p-8">
        <div className="flex flex-col gap-6 w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle>Counter</CardTitle>
              <CardDescription>Click the button to increment</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-center">{count}</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
              <Button variant="outline" onClick={() => setCount((c) => c - 1)}>
                Decrement
              </Button>
              <Button variant="ghost" onClick={() => setCount(0)}>
                Reset
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>All available shadcn button styles</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
