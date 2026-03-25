import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { challenges, type Difficulty } from '@/data/challenges'
import { useState, useMemo } from 'react'
import { Search, SearchX } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { buildPageMeta } from '@/lib/seo'
import { FrontendChallengeCard } from '@/components/cards/FrontendChallengeCard'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

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

const DIFFICULTY_COUNT: Record<Difficulty, number> = {
  easy: challenges.filter((c) => c.difficulty === 'easy').length,
  medium: challenges.filter((c) => c.difficulty === 'medium').length,
  hard: challenges.filter((c) => c.difficulty === 'hard').length,
}

type Filter = 'all' | Difficulty

function FrontendCoding() {
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const completed = useSelector((state: RootState) => state.frontendChallenges.completed)

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
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon"><SearchX /></EmptyMedia>
            <EmptyTitle>No challenges found</EmptyTitle>
            <EmptyDescription>No challenges match your search.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((challenge) => (
            <FrontendChallengeCard key={challenge.id} challenge={challenge} isCompleted={completed.includes(challenge.id)} />
          ))}
        </div>
      )}
    </div>
  )
}
