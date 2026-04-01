import { createRoute } from '@tanstack/react-router'
import { Route as ParentRoute } from './questions.react'
import { FileQuestion } from 'lucide-react'

export const Route = createRoute({
  getParentRoute: () => ParentRoute,
  path: '/',
  component: QuestionsIndex,
})

function QuestionsIndex() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-md px-6">
        <FileQuestion className="w-16 h-16 mx-auto text-muted-foreground/40 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Select a Question</h2>
        <p className="text-muted-foreground">
          Choose a question from the sidebar to view its details, or use the search and filters to find specific topics.
        </p>
      </div>
    </div>
  )
}