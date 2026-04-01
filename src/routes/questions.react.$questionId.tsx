 import { createRoute, Link } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { questionMap } from '@/data/react-questions'
import type { ReactQuestion } from '@/data/react-questions'
import { useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Share2,
  ArrowUp,
} from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { buildPageMeta, truncate } from '@/lib/seo'
import ReactMarkdown from 'react-markdown'
import { DIFFICULTY_STYLES, DIFFICULTY_LABELS, DIFFICULTY_EMOJIS } from '@/data/react-questions'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/store'
import { toggleBookmark, isQuestionBookmarked } from '@/store/slices/questionsSlice'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/questions/react/$questionId',
  head: ({ params }) => {
    const question = questionMap.get(params.questionId)
    if (!question) {
      return { meta: [{ title: 'Not Found | Ingenious React' }, { name: 'robots', content: 'noindex' }] }
    }
    return buildPageMeta({
      title: `Q${question.number}: ${question.title} – React Interview Question`,
      description: truncate(question.content.split('\n').find((l) => l.trim() && !l.startsWith('#') && !l.startsWith('|')) || '', 155),
      path: `/questions/${question.id}`,
    })
  },
  component: QuestionPage,
})

const CATEGORY_STYLES = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'

function QuestionPage() {
  const { questionId } = Route.useParams()
  const question = questionMap.get(questionId)

  if (!question) {
    return (
      <Empty className="flex-1">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <ChevronRight className="rotate-90" />
          </EmptyMedia>
          <EmptyTitle>Question not found</EmptyTitle>
          <EmptyDescription>
            <Link to="/questions/react">Back to Questions</Link>
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return <QuestionDetail question={question} />
}

function QuestionDetail({ question }: { question: ReactQuestion }) {
  const dispatch = useDispatch<AppDispatch>()
  const bookmarked = useSelector((state: RootState) => isQuestionBookmarked(state, question.id))

  const [copied, setCopied] = useState(false)

  // Find navigation questions
  const allQuestions = Array.from(questionMap.values()).sort((a, b) => a.number - b.number)
  const currentIndex = allQuestions.findIndex((q) => q.id === question.id)
  const prevQuestion = currentIndex > 0 ? allQuestions[currentIndex - 1] : null
  const nextQuestion = currentIndex < allQuestions.length - 1 ? allQuestions[currentIndex + 1] : null

  const handleBookmark = () => {
    dispatch(toggleBookmark(question.id))
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      navigator.clipboard.writeText(url)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Extract source link if present
  const sourceMatch = question.content.match(/\*Source:\s*\[([^\]]+)\]\(([^)]+)\)\*/)
  const sourceLink = sourceMatch ? { name: sourceMatch[1], url: sourceMatch[2] } : null

  // Remove the source line from content for rendering
  const contentToRender = sourceLink
    ? question.content.replace(/\*Source:\s*\[([^\]]+)\]\(([^)]+)\)\*/, '').trim()
    : question.content

  return (
    <div className="flex flex-col min-h-[calc(100vh-57px)]">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b bg-background shrink-0 sticky top-[57px] z-10">
        <Link
          to="/questions/react"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Questions
        </Link>
        <span className="text-muted-foreground">/</span>
        <h1 className="text-sm font-medium truncate">Q{question.number}: {question.title}</h1>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize shrink-0 ${DIFFICULTY_STYLES[question.difficulty]}`}
        >
          {DIFFICULTY_EMOJIS[question.difficulty]} {DIFFICULTY_LABELS[question.difficulty]}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleBookmark}
            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${
              bookmarked
                ? 'bg-primary/10 text-primary'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {bookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            {copied ? 'Copied!' : 'Share'}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-6">
        {/* Header */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground text-sm">Q{question.number}</span>
            <span className="text-muted-foreground">·</span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_STYLES}`}>
              {question.category}
            </span>
          </div>
          <h1 className="text-2xl font-semibold leading-tight">{question.title}</h1>
        </div>

        {/* Markdown content */}
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown
            components={{
              // Custom styling for code blocks
              code({ className, children, ...props }) {
                const isBlock = className?.includes('language-')
                if (isBlock) {
                  return (
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
                      <code {...props} className={className}>
                        {children}
                      </code>
                    </pre>
                  )
                }
                return (
                  <code className="bg-muted px-1.5 py-0.5 rounded text-sm" {...props}>
                    {children}
                  </code>
                )
              },
              // Custom styling for tables
              table({ children, ...props }) {
                return (
                  <div className="overflow-x-auto my-4">
                    <table {...props} className="border-collapse border border-border text-sm">
                      {children}
                    </table>
                  </div>
                )
              },
              th({ children, ...props }) {
                return (
                  <th {...props} className="border border-border bg-muted px-3 py-2 text-left font-semibold">
                    {children}
                  </th>
                )
              },
              td({ children, ...props }) {
                return (
                  <td {...props} className="border border-border px-3 py-2">
                    {children}
                  </td>
                )
              },
              // Custom styling for blockquotes
              blockquote({ children, ...props }) {
                return (
                  <blockquote {...props} className="border-l-4 border-primary pl-4 py-2 my-4 text-muted-foreground italic">
                    {children}
                  </blockquote>
                )
              },
              // Custom styling for headings
              h1({ children, ...props }) {
                return <h1 {...props} className="text-2xl font-semibold mt-8 mb-4">{children}</h1>
              },
              h2({ children, ...props }) {
                return <h2 {...props} className="text-xl font-semibold mt-6 mb-3">{children}</h2>
              },
              h3({ children, ...props }) {
                return <h3 {...props} className="text-lg font-semibold mt-4 mb-2">{children}</h3>
              },
              // Custom styling for lists
              ul({ children, ...props }) {
                return <ul {...props} className="list-disc list-inside space-y-1 my-3">{children}</ul>
              },
              ol({ children, ...props }) {
                return <ol {...props} className="list-decimal list-inside space-y-1 my-3">{children}</ol>
              },
              li({ children, ...props }) {
                return <li {...props} className="pl-1">{children}</li>
              },
              // Custom styling for paragraphs
              p({ children, ...props }) {
                return <p {...props} className="leading-relaxed my-3">{children}</p>
              },
              // Custom styling for horizontal rules
              hr() {
                return <hr className="my-6 border-border" />
              },
              // Custom styling for links
              a({ children, ...props }) {
                return (
                  <a {...props} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                )
              },
            }}
          >
            {contentToRender}
          </ReactMarkdown>
        </article>

        {/* Source attribution */}
        {sourceLink && (
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Source:{' '}
              <a
                href={sourceLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {sourceLink.name}
              </a>
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
          {prevQuestion ? (
            <Link
              to="/questions/react/$questionId"
              params={{ questionId: prevQuestion.id }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowUp className="w-4 h-4 rotate-[-90deg] shrink-0" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground group-hover:text-foreground">Previous</p>
                <p className="font-medium line-clamp-1">Q{prevQuestion.number}: {prevQuestion.title}</p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {nextQuestion ? (
            <Link
              to="/questions/react/$questionId"
              params={{ questionId: nextQuestion.id }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group text-right"
            >
              <div className="text-right">
                <p className="text-xs text-muted-foreground group-hover:text-foreground">Next</p>
                <p className="font-medium line-clamp-1">Q{nextQuestion.number}: {nextQuestion.title}</p>
              </div>
              <ArrowUp className="w-4 h-4 rotate-90 shrink-0" />
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Back to top button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to top
          </button>
        </div>
      </div>
    </div>
  )
}