import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { jsProblems, type Difficulty, type JSProblemCategory } from '@/data/js-problems'
import { useState, useMemo } from 'react'
import { Search } from 'lucide-react'
import { buildPageMeta } from '@/lib/seo'
import { JSProblemCard } from '@/components/cards/JSProblemCard'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/js-problems',
  head: () => buildPageMeta({
    title: 'JavaScript Algorithm Problems',
    description: 'Practice 50+ JavaScript algorithm problems covering arrays, strings, recursion, sorting, trees, and hash tables. Solve in the browser with automated test cases.',
    path: '/js-problems',
  }),
  component: JSProblems,
})

const DIFFICULTY_COUNT: Record<Difficulty, number> = {
  easy: jsProblems.filter((p) => p.difficulty === 'easy').length,
  medium: jsProblems.filter((p) => p.difficulty === 'medium').length,
  hard: jsProblems.filter((p) => p.difficulty === 'hard').length,
}

const ALL_CATEGORIES: JSProblemCategory[] = [
  'Basic',
  'Strings',
  'Arrays',
  'Higher-Order Functions',
  'Recursion',
  'Hash Tables',
  'Data Structures',
  'Sorting',
  'Trees',
]

type DiffFilter = 'all' | Difficulty
type CatFilter = 'all' | JSProblemCategory

function JSProblems() {
  const [diffFilter, setDiffFilter] = useState<DiffFilter>('all')
  const [catFilter, setCatFilter] = useState<CatFilter>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return jsProblems.filter((p) => {
      const matchesDiff = diffFilter === 'all' || p.difficulty === diffFilter
      const matchesCat = catFilter === 'all' || p.category === catFilter
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      return matchesDiff && matchesCat && matchesQuery
    })
  }, [diffFilter, catFilter, query])

  return (
    <div className="flex flex-col flex-1 p-6 max-w-6xl mx-auto w-full gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">JS Problems</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {jsProblems.length} problems · Practice algorithms and JavaScript fundamentals in the browser
        </p>
      </div>

      {/* Difficulty filter + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {(['all', 'easy', 'medium', 'hard'] as DiffFilter[]).map((d) => (
            <button
              key={d}
              onClick={() => setDiffFilter(d)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors capitalize ${
                diffFilter === d
                  ? 'bg-background shadow text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {d === 'all' ? `All (${jsProblems.length})` : `${d} (${DIFFICULTY_COUNT[d]})`}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems or tags..."
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
        {ALL_CATEGORIES.map((cat) => {
          const count = jsProblems.filter((p) => p.category === cat).length
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
        <div className="flex flex-1 items-center justify-center text-muted-foreground">
          No problems match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((problem) => (
            <JSProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      )}
    </div>
  )
}
