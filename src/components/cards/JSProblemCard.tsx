import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { JSProblem, Difficulty } from '@/data/js-problems'

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

const CATEGORY_STYLES = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'

export function JSProblemCard({ problem }: { problem: JSProblem }) {
  return (
    <Link
      to="/js-problems/$problemId"
      params={{ problemId: problem.id }}
      className="block group"
    >
      <Card className="h-full transition-shadow hover:shadow-md group-hover:border-primary/50">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
              {problem.title}
            </CardTitle>
            <span
              className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full capitalize ${DIFFICULTY_STYLES[problem.difficulty]}`}
            >
              {problem.difficulty}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {problem.description.split('\n')[0]}
          </p>
          <div className="flex flex-wrap gap-1">
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${CATEGORY_STYLES}`}>
              {problem.category}
            </span>
            {problem.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
