import { Link } from '@tanstack/react-router'
import { MapPin, Banknote } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getJobPreview } from '@/lib/jobs-api'
import type { Job } from '@/types/jobs'

export function JobCard({ job }: { job: Job }) {
  const preview = getJobPreview(job.description)

  return (
    <Link to="/jobs/chennai/$slug" params={{ slug: job.slug }} className="block group">
      <Card className="flex flex-col h-full transition-shadow hover:shadow-md group-hover:border-primary/50">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">{job.role}</CardTitle>
            {job.experience && (
              <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {job.experience}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{job.companyName}</p>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 flex-1 pb-3">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="size-3" />
              {job.location}
            </span>
            {job.salary && (
              <span className="flex items-center gap-1">
                <Banknote className="size-3" />
                {job.salary}
              </span>
            )}
          </div>

          {preview && <p className="text-sm text-muted-foreground line-clamp-2">{preview}</p>}
        </CardContent>
      </Card>
    </Link>
  )
}

export function JobCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-4 flex flex-col gap-4 animate-pulse">
      <div className="flex justify-between gap-2">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/5" />
      </div>
      <div className="h-3 bg-muted rounded w-1/2" />
      <div className="flex gap-3">
        <div className="h-3 bg-muted rounded w-1/4" />
        <div className="h-3 bg-muted rounded w-1/4" />
      </div>
      <div className="h-3 bg-muted rounded w-full" />
      <div className="h-3 bg-muted rounded w-5/6" />
      <div className="h-8 bg-muted rounded mt-auto" />
    </div>
  )
}
