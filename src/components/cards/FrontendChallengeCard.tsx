import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Challenge, Difficulty } from '@/data/challenges'
import { CheckCircle2 } from 'lucide-react'

const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export function FrontendChallengeCard({ challenge, isCompleted }: { challenge: Challenge; isCompleted?: boolean }) {
  return (
    <Link
      to="/frontend-coding/$challengeId"
      params={{ challengeId: challenge.id }}
      className="block group"
    >
      <Card className={`h-full transition-shadow hover:shadow-md group-hover:border-primary/50 ${isCompleted ? 'border-green-500/50 dark:border-green-500/40' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
              {challenge.title}
            </CardTitle>
            <div className="flex items-center gap-1.5 shrink-0">
              {isCompleted && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${DIFFICULTY_STYLES[challenge.difficulty]}`}
              >
                {challenge.difficulty}
              </span>
            </div>
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
  )
}
