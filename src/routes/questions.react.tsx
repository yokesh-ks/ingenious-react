import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { questions, CATEGORIES, type QuestionCategory, type Difficulty } from '@/data/react-questions'
import { useState, useMemo } from 'react'
import { Search, SearchX } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { buildPageMeta } from '@/lib/seo'
import { ReactQuestionCard } from '@/components/cards/ReactQuestionCard'
import { DIFFICULTY_LABELS, DIFFICULTY_EMOJIS } from '@/data/react-questions'

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
  component: QuestionsList,
})

// Calculate difficulty counts
const DIFFICULTY_COUNT: Record<Difficulty, number> = {
  beginner: questions.filter((q) => q.difficulty === 'beginner').length,
  intermediate: questions.filter((q) => q.difficulty === 'intermediate').length,
  advanced: questions.filter((q) => q.difficulty === 'advanced').length,
}

type DiffFilter = 'all' | Difficulty
type CatFilter = 'all' | QuestionCategory

function QuestionsList() {
  const [diffFilter, setDiffFilter] = useState<DiffFilter>('all')
  const [catFilter, setCatFilter] = useState<CatFilter>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const matchesDiff = diffFilter === 'all' || q.difficulty === diffFilter
      const matchesCat = catFilter === 'all' || q.category === catFilter
      const matchesQuery =
        !query ||
        q.title.toLowerCase().includes(query.toLowerCase()) ||
        q.category.toLowerCase().includes(query.toLowerCase())
      return matchesDiff && matchesCat && matchesQuery
    })
  }, [diffFilter, catFilter, query])

  return (
    <div className="flex flex-col flex-1 p-6 max-w-6xl mx-auto w-full gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">React Interview Questions</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {questions.length} questions · Master React interview preparation
        </p>
      </div>

      {/* Difficulty filter + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {(['all', 'beginner', 'intermediate', 'advanced'] as DiffFilter[]).map((d) => (
            <button
              key={d}
              onClick={() => setDiffFilter(d)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors capitalize ${
                diffFilter === d
                  ? 'bg-background shadow text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {d === 'all' ? (
                `All (${questions.length})`
              ) : (
                <>
                  <span className="mr-1">{DIFFICULTY_EMOJIS[d]}</span>
                  {DIFFICULTY_LABELS[d]} ({DIFFICULTY_COUNT[d]})
                </>
              )}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1">
        <button
          onClick={() => setCatFilter('all')}
          className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
            catFilter === 'all'
              ? 'bg-foreground text-background'
              : 'bg-muted text-muted-foreground hover:text-foreground'
          }`}
        >
          All Categories
        </button>
        {CATEGORIES.map((cat) => {
          const count = questions.filter((q) => q.category === cat).length
          if (count === 0) return null
          return (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-colors ${
                catFilter === cat
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat} ({count})
            </button>
          )
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SearchX />
            </EmptyMedia>
            <EmptyTitle>No questions found</EmptyTitle>
            <EmptyDescription>No questions match your search.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((question) => (
            <ReactQuestionCard key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  )
}