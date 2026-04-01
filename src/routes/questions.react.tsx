import { createRoute, Outlet, useLocation } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { questions } from '@/data/react-questions'
import { useState, useMemo } from 'react'
import { Search, SearchX } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { buildPageMeta } from '@/lib/seo'
import { DIFFICULTY_STYLES } from '@/data/react-questions'
import { Link } from '@tanstack/react-router'
import type { ReactQuestion } from '@/data/react-questions'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/questions/react',
  head: () =>
    buildPageMeta({
      title: 'React Interview Questions',
      description:
        '100 React interview questions covering fundamentals to advanced topics. Practice React interview questions with detailed answers.',
      path: '/questions/react',
    }),
  component: QuestionsLayout,
})

function QuestionsLayout() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      return !query ||
        q.title.toLowerCase().includes(query.toLowerCase()) ||
        q.category.toLowerCase().includes(query.toLowerCase())
    })
  }, [query])

  return (
    <div className="flex flex-1 overflow-hidden h-[calc(100vh-57px)]">
      {/* Sidebar - Questions List */}
      <aside className="w-80 shrink-0 border-r bg-background flex flex-col">
        {/* Header */}
        <div className="p-4 border-b shrink-0">
          <h1 className="text-lg font-semibold">React Questions</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {filtered.length} of {questions.length} questions
          </p>
        </div>

        {/* Search */}
        <div className="p-3 border-b shrink-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Questions list */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {filtered.length === 0 ? (
            <div className="p-4">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <SearchX />
                  </EmptyMedia>
                  <EmptyTitle>No questions found</EmptyTitle>
                  <EmptyDescription>No questions match your search.</EmptyDescription>
                </EmptyHeader>
              </Empty>
            </div>
          ) : (
            <div className="p-2 space-y-1">
              {filtered.map((question) => (
                <QuestionListItem key={question.id} question={question} />
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto bg-muted/20">
        <Outlet />
      </main>
    </div>
  )
}

function QuestionListItem({ question }: { question: ReactQuestion }) {
  // Check if this question is currently active
  const location = useLocation()
  const isActive = location.href.endsWith(`/${question.id}`)

  return (
    <Link
      to="/questions/react/$questionId"
      params={{ questionId: question.id }}
      className={`block p-2 rounded-md transition-colors ${
        isActive
          ? 'bg-primary/10 text-primary'
          : 'hover:bg-muted'
      }`}
    >
      <div className="flex items-start gap-2">
        <span className={`shrink-0 text-xs font-medium px-1.5 py-0.5 rounded ${DIFFICULTY_STYLES[question.difficulty as keyof typeof DIFFICULTY_STYLES]}`}>
          Q{question.number}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-snug line-clamp-2">{question.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{question.category}</p>
        </div>
      </div>
    </Link>
  )
}