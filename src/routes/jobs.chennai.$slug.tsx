import { createRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { MapPin, Briefcase, Banknote, ExternalLink, ArrowLeft, FileQuestion } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { Route as RootRoute } from './__root'
import { buildPageMeta } from '@/lib/seo'
import { Button } from '@/components/ui/button'
import { fetchJob, jobKeys } from '@/lib/jobs-api'
import type { Job } from '@/types/jobs'

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

function JobDetail({ job }: { job: Job }) {
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
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold">{job.name}</h1>
          {job.applyLink ? (
            <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Button size="sm" className="gap-1.5">
                Apply <ExternalLink className="size-3" />
              </Button>
            </a>
          ) : null}
        </div>

        <p className="text-lg text-muted-foreground">{job.companyName}</p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="size-4 shrink-0" />
            {job.location}
          </span>
          {job.role && (
            <span className="flex items-center gap-1.5">
              <Briefcase className="size-4 shrink-0" />
              {job.role}
            </span>
          )}
          {job.experience && (
            <span className="flex items-center gap-1.5">
              <Briefcase className="size-4 shrink-0" />
              {job.experience}
            </span>
          )}
          {job.salary && (
            <span className="flex items-center gap-1.5">
              <Banknote className="size-4 shrink-0" />
              {job.salary}
            </span>
          )}
        </div>
      </div>

      <hr className="border-border" />

      {/* Description */}
      <div className="prose prose-sm dark:prose-invert max-w-none">
        <LexicalRenderer nodes={job.description?.root?.children ?? []} />
      </div>

      {/* Bottom apply */}
      {job.applyLink && (
        <div className="pt-2">
          <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
            <Button className="gap-1.5">
              Apply for this role <ExternalLink className="size-4" />
            </Button>
          </a>
        </div>
      )}
    </div>
  )
}

// ── Lexical rich text renderer ────────────────────────────────────────────────

// Text format bitmask values from Lexical
const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_STRIKETHROUGH = 4
const FORMAT_UNDERLINE = 8
const FORMAT_CODE = 16

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LexicalRenderer({ nodes }: { nodes: any[] }) {
  return (
    <>
      {nodes.map((node, i) => (
        <LexicalNode key={i} node={node} />
      ))}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LexicalNode({ node }: { node: any }) {
  if (!node) return null

  switch (node.type) {
    case 'paragraph':
      return (
        <p>
          <LexicalRenderer nodes={node.children ?? []} />
        </p>
      )

    case 'heading':
      return <LexicalHeading node={node} />

    case 'text': {
      const fmt: number = node.format ?? 0
      let el: React.ReactNode = node.text

      if (fmt & FORMAT_CODE) el = <code>{el}</code>
      if (fmt & FORMAT_BOLD) el = <strong>{el}</strong>
      if (fmt & FORMAT_ITALIC) el = <em>{el}</em>
      if (fmt & FORMAT_STRIKETHROUGH) el = <s>{el}</s>
      if (fmt & FORMAT_UNDERLINE) el = <u>{el}</u>

      return <>{el}</>
    }

    case 'linebreak':
      return <br />

    case 'link':
      return (
        <a href={node.fields?.url ?? '#'} target="_blank" rel="noopener noreferrer">
          <LexicalRenderer nodes={node.children ?? []} />
        </a>
      )

    case 'list':
      return node.listType === 'number' ? (
        <ol>
          <LexicalRenderer nodes={node.children ?? []} />
        </ol>
      ) : (
        <ul>
          <LexicalRenderer nodes={node.children ?? []} />
        </ul>
      )

    case 'listitem':
      return (
        <li>
          <LexicalRenderer nodes={node.children ?? []} />
        </li>
      )

    case 'quote':
      return (
        <blockquote>
          <LexicalRenderer nodes={node.children ?? []} />
        </blockquote>
      )

    case 'horizontalrule':
      return <hr />

    default:
      // Unknown node — render children if any
      if (node.children?.length) {
        return <LexicalRenderer nodes={node.children} />
      }
      return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LexicalHeading({ node }: { node: any }) {
  const children = <LexicalRenderer nodes={node.children ?? []} />
  switch (node.tag) {
    case 'h1': return <h1>{children}</h1>
    case 'h2': return <h2>{children}</h2>
    case 'h3': return <h3>{children}</h3>
    case 'h4': return <h4>{children}</h4>
    case 'h5': return <h5>{children}</h5>
    default:   return <h6>{children}</h6>
  }
}

function JobDetailSkeleton() {
  return (
    <div className="flex flex-col flex-1 p-6 max-w-3xl mx-auto w-full gap-6 animate-pulse">
      <div className="h-4 bg-muted rounded w-28" />
      <div className="flex flex-col gap-3">
        <div className="h-7 bg-muted rounded w-2/3" />
        <div className="h-5 bg-muted rounded w-1/3" />
        <div className="flex gap-4">
          <div className="h-4 bg-muted rounded w-24" />
          <div className="h-4 bg-muted rounded w-24" />
        </div>
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
