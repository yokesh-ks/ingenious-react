// Import all markdown files from the react interview questions directory as raw text
const markdownModules = import.meta.glob('/src/contents/interview/react/*.md', {
  eager: true,
  query: '?raw',
})

export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

export interface ReactQuestion {
  id: string
  number: number
  title: string
  category: string
  difficulty: Difficulty
  content: string
  slug: string
}

function parseMarkdownContent(fileName: string, content: string): ReactQuestion | null {
  // Extract title from first heading
  const titleMatch = content.match(/^# Q\d+:\s*(.+)$/m)
  if (!titleMatch) return null

  let title = titleMatch[1].trim()
  // Remove bold markers from title for cleaner display
  title = title.replace(/\*\*/g, '')

  // Extract category and difficulty from the table
  const categoryMatch = content.match(/\|\s*\*\*Category\*\*\s*\|\s*(.+?)\s*\|/)
  const difficultyMatch = content.match(/\|\s*\*\*Difficulty\*\*\s*\|\s*(.+?)\s*\|/)

  let category = categoryMatch ? categoryMatch[1].trim() : 'General'
  let difficulty: Difficulty = 'intermediate'

  if (difficultyMatch) {
    const diffText = difficultyMatch[1].trim().toLowerCase()
    if (diffText.includes('beginner') || diffText.includes('🟢')) {
      difficulty = 'beginner'
    } else if (diffText.includes('advanced') || diffText.includes('🔴')) {
      difficulty = 'advanced'
    }
  }

  // Generate ID from file name (remove .md extension)
  const id = fileName.replace('.md', '')

  // Extract number from filename (e.g., "001-what-is-react..." -> 1)
  const numberMatch = fileName.match(/^(\d+)/)
  const number = numberMatch ? parseInt(numberMatch[1], 10) : 0

  return {
    id,
    number,
    title,
    category,
    difficulty,
    content,
    slug: id,
  }
}

// Build the questions array and map
const questionsArray: ReactQuestion[] = []
const questionsMap = new Map<string, ReactQuestion>()

Object.entries(markdownModules).forEach(([path, module]) => {
  // With query: '?raw', the content is in module.default
  const content = typeof module === 'string' ? module : (module as { default?: string }).default
  if (!content) {
    console.warn('[react-questions] No content for:', path)
    return
  }

  // Extract just the filename from the path
  const fileName = path.split('/').pop() || ''
  if (fileName === 'index.md') return

  const question = parseMarkdownContent(fileName, content)
  if (question) {
    questionsArray.push(question)
    questionsMap.set(question.id, question)
  }
})

// Sort by number
questionsArray.sort((a, b) => a.number - b.number)

export const questions = questionsArray
export const questionMap = questionsMap

export function getReactQuestions(): ReactQuestion[] {
  return questions
}

export function getReactQuestionById(id: string): ReactQuestion | undefined {
  return questionMap.get(id)
}

export const CATEGORIES = [
  'React Basics',
  'React State Management (Basics)',
  'React Hooks',
  'Component Lifecycle',
  'Performance Optimization',
  'Advanced Patterns',
  'State Management',
  'Forms',
  'React Router',
  'Testing',
  'TypeScript with React',
  'React 18+',
  'Architecture & Best Practices',
  'Component Design',
  'Tooling & Ecosystem',
] as const

export type QuestionCategory = (typeof CATEGORIES)[number]

export const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

export const DIFFICULTY_EMOJIS: Record<Difficulty, string> = {
  beginner: '🟢',
  intermediate: '🟡',
  advanced: '🔴',
}