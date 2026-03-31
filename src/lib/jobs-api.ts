import { truncate } from '@/lib/seo'
import type { Post, PostsApiResponse, PostApiResponse } from '@/types/jobs'

const JOBS_API = 'https://ingenious-react-jobs-nodejs-worker.ksyokesh98.workers.dev/api/v1/posts'

export const jobKeys = {
  list: (pageToken: string | null) => ['jobs', 'list', pageToken] as const,
  detail: (id: string) => ['jobs', 'detail', id] as const,
}

export async function fetchJob(id: string): Promise<Post | null> {
  const res = await fetch(`${JOBS_API}/${id}`)
  if (!res.ok) return null
  const json: PostApiResponse = await res.json()
  if (!json.success) return null
  return json.data ?? null
}

export async function fetchJobs(pageToken?: string | null, limit = 10): Promise<PostsApiResponse> {
  const params = new URLSearchParams({ maxResults: String(limit), fetchBodies: 'false' })
  if (pageToken) params.set('pageToken', pageToken)

  const res = await fetch(`${JOBS_API}?${params}`)
  if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.status}`)
  return res.json()
}

export function getJobPreview(content: string, max = 120): string {
  const text = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return truncate(text, max)
}
