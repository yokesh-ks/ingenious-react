import { createRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Route as RootRoute } from './__root'
import { buildPageMeta } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { fetchJobs, jobKeys } from '@/lib/jobs-api'
import type { Job } from '@/types/jobs'
import { JobCard, JobCardSkeleton } from '@/components/cards/JobCard'

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
