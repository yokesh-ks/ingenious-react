export interface Post {
  id: string
  title: string
  published: string
  updated: string
  url: string
  content: string
  selfLink: string
  author: {
    id: string
    displayName: string
    url: string
    image: { url: string }
  }
  replies: { totalItems: string; selfLink: string }
  labels?: string[]
  images?: { url: string }[]
}

export interface PostsApiResponse {
  success: boolean
  data: Post[]
  meta: {
    nextPageToken: string | null
    prevPageToken: string | null
  }
}

export interface PostApiResponse {
  success: boolean
  data: Post
  error?: string
}
