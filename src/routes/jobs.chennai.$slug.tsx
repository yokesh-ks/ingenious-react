import * as React from 'react'
import { createRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, FileQuestion } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { Route as RootRoute } from './__root'
import { buildPageMeta } from '@/lib/seo'
import { fetchJob, jobKeys } from '@/lib/jobs-api'
import type { Post } from '@/types/jobs'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/jobs/chennai/$slug',
  head: ({ params }) => {
    return buildPageMeta({
      title: `Job Opening | Ingenious React`,
      description: 'View job details and apply.',
      path: `/jobs/chennai/${params.slug}`,
    })
  },
  component: JobDetailPage,
})

function JobDetailPage() {
  const { slug } = Route.useParams()

  const { data: job, isLoading, isError } = useQuery({
    queryKey: jobKeys.detail(slug),
    queryFn: () => fetchJob(slug),
    retry: false,
  })

  if (isLoading) return <JobDetailSkeleton />

  if (isError || job === null || job === undefined) {
    return (
      <Empty className="flex-1">
        <EmptyHeader>
          <EmptyMedia variant="icon"><FileQuestion /></EmptyMedia>
          <EmptyTitle>Job not found</EmptyTitle>
          <EmptyDescription>
            <Link to="/jobs/chennai">← Back to Jobs</Link>
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return <JobDetail job={job} />
}

function autolinkUrls(html: string): string {
  return html.replace(
    /(?<!href=["']|src=["'])(https?:\/\/[^\s<>"']+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
  )
}

function JobDetail({ job }: { job: Post }) {
  const publishedDate = new Date(job.published).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="flex flex-col flex-1 p-6 max-w-3xl mx-auto w-full gap-6">
      {/* Back link */}
      <Link
        to="/jobs/chennai"
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-4" />
        Jobs — Chennai
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold">{job.title}</h1>

        {job.labels && job.labels.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {job.labels.map((label) => (
              <span
                key={label}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {label}
              </span>
            ))}
          </div>
        )}

        <p className="text-sm text-muted-foreground">Posted {publishedDate}</p>
      </div>

      <hr className="border-border" />

      {/* Content */}
      <div
        className="prose prose-sm dark:prose-invert max-w-none prose-a:text-blue-500 prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: autolinkUrls(job.content ?? '') }}
      />
    </div>
  )
}

function JobDetailSkeleton() {
  return (
    <div className="flex flex-col flex-1 p-6 max-w-3xl mx-auto w-full gap-6 animate-pulse">
      <div className="h-4 bg-muted rounded w-28" />
      <div className="flex flex-col gap-3">
        <div className="h-7 bg-muted rounded w-2/3" />
        <div className="flex gap-2">
          <div className="h-5 bg-muted rounded-full w-16" />
          <div className="h-5 bg-muted rounded-full w-20" />
          <div className="h-5 bg-muted rounded-full w-14" />
        </div>
        <div className="h-4 bg-muted rounded w-32" />
      </div>
      <hr className="border-border" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 bg-muted rounded" style={{ width: `${75 + (i % 3) * 10}%` }} />
        ))}
      </div>
    </div>
  )
}
