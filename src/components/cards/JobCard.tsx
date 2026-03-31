import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getJobPreview } from '@/lib/jobs-api'
import type { Post } from '@/types/jobs'

export function JobCard({ job }: { job: Post }) {
  const preview = getJobPreview(job.content ?? '')

  return (
    <Link to="/jobs/chennai/$slug" params={{ slug: job.id }} className="block group">
      <Card className="flex flex-col h-full transition-shadow hover:shadow-md group-hover:border-primary/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
            {job.title}
          </CardTitle>
          {job.labels && job.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {job.labels.map((label) => (
                <span
                  key={label}
                  className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent className="flex flex-col gap-3 flex-1 pb-3">
          {preview && <p className="text-sm text-muted-foreground line-clamp-2">{preview}</p>}
        </CardContent>
      </Card>
    </Link>
  )
}

export function JobCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="flex gap-2">
        <div className="h-4 bg-muted rounded-full w-16" />
        <div className="h-4 bg-muted rounded-full w-16" />
      </div>
      <div className="h-3 bg-muted rounded w-full" />
      <div className="h-3 bg-muted rounded w-5/6" />
    </div>
  )
}
