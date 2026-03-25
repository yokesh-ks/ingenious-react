import { createRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { MapPin, Briefcase, Banknote } from 'lucide-react'
import { Route as RootRoute } from './__root'
import { buildPageMeta } from '@/lib/seo'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fetchJobs, getJobPreview, jobKeys } from '@/lib/jobs-api'
import type { Job } from '@/types/jobs'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/jobs/chennai',
  head: () =>
    buildPageMeta({
      title: 'React & Frontend Jobs in Chennai',
      description:
        'Browse the latest React and frontend developer job openings in Chennai. Find opportunities at top companies hiring React developers.',
      path: '/jobs/chennai',
    }),
  component: JobsChennai,
})

function JobsChennai() {
  const [page, setPage] = useState(1)
  const [allJobs, setAllJobs] = useState<Job[]>([])

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: jobKeys.list(page),
    queryFn: () => fetchJobs(page),
    retry: false,
  })

  useEffect(() => {
    if (data?.docs) {
      setAllJobs((prev) => (page === 1 ? data.docs : [...prev, ...data.docs]))
    }
  }, [data, page])

  const isInitialLoading = isLoading && allJobs.length === 0

  return (
    <div className="flex flex-col flex-1 p-6 max-w-6xl mx-auto w-full gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Jobs — Chennai</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {data?.totalDocs ? `${data.totalDocs} openings · ` : ''}
          React &amp; Frontend roles in Chennai
        </p>
      </div>

      {isError && allJobs.length === 0 ? (
        <ErrorState
          onRetry={() => {
            setPage(1)
            refetch()
          }}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {isInitialLoading
              ? Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)
              : allJobs.map((job) => <JobCard key={job.id} job={job} />)}
            {isFetching &&
              !isInitialLoading &&
              Array.from({ length: 3 }).map((_, i) => <JobCardSkeleton key={`more-${i}`} />)}
          </div>

          {data?.hasNextPage && (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => p + 1)}
                disabled={isFetching}
              >
                {isFetching ? 'Loading…' : 'Load More'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

function JobCard({ job }: { job: Job }) {
  const preview = getJobPreview(job.description)

  return (
    <Link to="/jobs/chennai/$slug" params={{ slug: job.slug }} className="block group">
      <Card className="flex flex-col h-full group-hover:border-foreground/30 transition-colors">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-snug">{job.name}</CardTitle>
            {job.role && (
              <span className="shrink-0 text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {job.role}
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
            {job.experience && (
              <span className="flex items-center gap-1">
                <Briefcase className="size-3" />
                {job.experience}
              </span>
            )}
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

function JobCardSkeleton() {
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

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center py-16">
      <p className="text-muted-foreground text-sm">Failed to load jobs. Please try again.</p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Retry
      </Button>
    </div>
  )
}
