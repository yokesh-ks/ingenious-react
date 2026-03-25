import { createRoute, Link } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { challenges, type Difficulty } from '@/data/challenges'
import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Search } from 'lucide-react'
import { buildPageMeta } from '@/lib/seo'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/frontend-coding',
  head: () => buildPageMeta({
    title: 'Frontend Coding Challenges',
    description: 'Browse 50+ hands-on React coding challenges — easy, medium, and hard. Build real components in your browser with live preview powered by WebContainers.',
    path: '/frontend-coding',
  }),
  component: FrontendCoding,
})

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

const DIFFICULTY_COUNT: Record<Difficulty, number> = {
  easy: challenges.filter((c) => c.difficulty === 'easy').length,
  medium: challenges.filter((c) => c.difficulty === 'medium').length,
  hard: challenges.filter((c) => c.difficulty === 'hard').length,
}

type Filter = 'all' | Difficulty

function FrontendCoding() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return challenges.filter((c) => {
      const matchesDiff = filter === 'all' || c.difficulty === filter
      const matchesQuery =
        !query ||
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      return matchesDiff && matchesQuery
    })
  }, [filter, query])

  return (
    <div className="flex flex-col flex-1 p-6 max-w-6xl mx-auto w-full gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Frontend Coding Challenges</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {challenges.length} challenges · Practice React in the browser with live preview
        </p>
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Difficulty tabs */}
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {(['all', 'easy', 'medium', 'hard'] as Filter[]).map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors capitalize ${
                filter === d
                  ? 'bg-background shadow text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {d === 'all' ? `All (${challenges.length})` : `${d} (${DIFFICULTY_COUNT[d]})`}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search challenges or tags..."
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          No challenges match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((challenge) => (
            <Link
              key={challenge.id}
              to="/frontend-coding/$challengeId"
              params={{ challengeId: challenge.id }}
              className="block group"
            >
              <Card className="h-full transition-shadow hover:shadow-md group-hover:border-primary/50">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                      {challenge.title}
                    </CardTitle>
                    <span
                      className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full capitalize ${DIFFICULTY_STYLES[challenge.difficulty]}`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 space-y-3">
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {challenge.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {challenge.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {challenge.tags.length > 3 && (
                      <span className="text-xs text-muted-foreground">
                        +{challenge.tags.length - 3}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
