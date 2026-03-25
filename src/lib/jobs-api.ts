import { truncate } from '@/lib/seo'
import type { Job, JobsResponse } from '@/types/jobs'

const JOBS_API = 'https://cms.ingeniousclan.com/api/jobs'

export const jobKeys = {
  list: (page: number) => ['jobs', 'list', page] as const,
  detail: (slug: string) => ['jobs', 'detail', slug] as const,
}

export async function fetchJob(slug: string): Promise<Job | null> {
  const url = new URL(JOBS_API)
  url.searchParams.set('where[slug][equals]', slug)
  url.searchParams.set('depth', '1')
  url.searchParams.set('limit', '1')

  const res = await fetch(url.toString())
  if (!res.ok) return null
  const data: JobsResponse = await res.json()
  return data.docs[0] ?? null
}

export async function fetchJobs(page: number, limit = 10): Promise<JobsResponse> {
  const url = new URL(JOBS_API)
  url.searchParams.set('limit', String(limit))
  url.searchParams.set('page', String(page))
  url.searchParams.set('depth', '1')
  url.searchParams.set('where[_status][equals]', 'published')

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.status}`)
  return res.json()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractText(node: any): string {
  if (node.type === 'text') return node.text ?? ''
  return ((node.children ?? []) as any[]).map(extractText).join(' ')
}

export function getJobPreview(description: Job['description'], max = 120): string {
  const text = (description?.root?.children ?? [])
    .map(extractText)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
  return truncate(text, max)
}
