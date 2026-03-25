interface LexicalTextNode {
  type: 'text'
  text: string
}

interface LexicalElementNode {
  type: string
  children?: LexicalNode[]
}

type LexicalNode = LexicalTextNode | LexicalElementNode

export interface Job {
  id: string
  name: string
  companyName: string
  role?: string | null
  experience?: string | null
  location: string
  salary?: string | null
  description: { root: { children: LexicalNode[] } }
  slug: string
  applyLink?: string | null
  updatedAt: string
  createdAt: string
  _status?: 'draft' | 'published' | null
}

export interface JobsResponse {
  docs: Job[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}
