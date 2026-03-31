import { createRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { Route as RootRoute } from './__root'
import { buildPageMeta } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { ServerCrash } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from '@/components/ui/empty'
import { fetchJobs, jobKeys } from '@/lib/jobs-api'
import type { Post } from '@/types/jobs'
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
  const [pageToken, setPageToken] = useState<string | null>(null)
  const [allJobs, setAllJobs] = useState<Post[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | null>(null)

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: jobKeys.list(pageToken),
    queryFn: () => fetchJobs(pageToken),
    retry: false,
  })

  useEffect(() => {
    if (data?.success && data.data) {
      setAllJobs((prev) => (!pageToken ? data.data : [...prev, ...data.data]))
      setNextPageToken(data.meta?.nextPageToken ?? null)
    }
  }, [data, pageToken])

  const isInitialLoading = isLoading && allJobs.length === 0

  return (
    <div className="flex flex-col flex-1 p-6 max-w-6xl mx-auto w-full gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Jobs — Chennai</h1>
        <p className="text-muted-foreground text-sm mt-1">
          React &amp; Frontend roles in Chennai
        </p>
      </div>

      {isError && allJobs.length === 0 ? (
        <ErrorState
          onRetry={() => {
            setPageToken(null)
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

          {nextPageToken && (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                onClick={() => setPageToken(nextPageToken)}
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
    <Empty className="flex-1">
      <EmptyHeader>
        <EmptyMedia variant="icon"><ServerCrash /></EmptyMedia>
        <EmptyTitle>Failed to load jobs</EmptyTitle>
        <EmptyDescription>Something went wrong. Please try again.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" onClick={onRetry}>
          Retry
        </Button>
      </EmptyContent>
    </Empty>
  )
}
