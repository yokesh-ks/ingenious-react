import { createRoute, Link } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { challenges } from '@/data/challenges'
import { useWebContainer } from '@/hooks/useWebContainer'
import { CodeEditor } from '@/components/CodeEditor'
import { useState } from 'react'
import { buildPageMeta, truncate } from '@/lib/seo'
import { FileQuestion } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/frontend-coding/$challengeId',
  head: ({ params }) => {
    const challenge = challenges.find((c) => c.id === params.challengeId)
    if (!challenge) {
      return { meta: [{ title: 'Not Found | Ingenious React' }, { name: 'robots', content: 'noindex' }] }
    }
    const difficulty = challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)
    return buildPageMeta({
      title: `${challenge.title} – ${difficulty} React Challenge`,
      description: truncate(challenge.description, 155),
      path: `/frontend-coding/${challenge.id}`,
    })
  },
  component: ChallengePage,
})

const DIFFICULTY_STYLES = {
  easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

const STATUS_DOT = {
  booting: 'bg-yellow-400 animate-pulse',
  installing: 'bg-blue-400 animate-pulse',
  running: 'bg-green-400',
  error: 'bg-red-500',
}

function ChallengePage() {
  const { challengeId } = Route.useParams()
  const challenge = challenges.find((c) => c.id === challengeId)

  if (!challenge) {
    return (
      <Empty className="flex-1">
        <EmptyHeader>
          <EmptyMedia variant="icon"><FileQuestion /></EmptyMedia>
          <EmptyTitle>Challenge not found</EmptyTitle>
          <EmptyDescription>
            <Link to="/frontend-coding">Back to challenges</Link>
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return <ChallengeEditor key={challenge.id} challenge={challenge} />
}

function ChallengeEditor({ challenge }: { challenge: NonNullable<ReturnType<typeof challenges.find>> }) {
  const [code, setCode] = useState(challenge.starterCode)
  const { status, statusMessage, previewUrl, updateCode } = useWebContainer(challenge.starterCode)

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    updateCode(newCode)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-57px)]">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-2 border-b bg-background shrink-0">
        <Link
          to="/frontend-coding"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Challenges
        </Link>
        <span className="text-muted-foreground">/</span>
        <h1 className="text-sm font-medium truncate">{challenge.title}</h1>
        <span
          className={`ml-auto text-xs font-medium px-2 py-0.5 rounded-full capitalize ${DIFFICULTY_STYLES[challenge.difficulty]}`}
        >
          {challenge.difficulty}
        </span>
      </div>

      {/* 3-pane layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Pane 1: Problem description */}
        <div className="w-72 shrink-0 border-r overflow-y-auto p-4 space-y-4">
          <div>
            <h2 className="text-base font-semibold">{challenge.title}</h2>
            <span
              className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full capitalize ${DIFFICULTY_STYLES[challenge.difficulty]}`}
            >
              {challenge.difficulty}
            </span>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{challenge.description}</p>

          <div className="flex flex-wrap gap-1">
            {challenge.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pane 2: Code editor */}
        <div className="flex-1 min-w-0 border-r overflow-hidden">
          <div className="h-8 flex items-center px-3 border-b bg-muted/50 shrink-0">
            <span className="text-xs text-muted-foreground font-mono">App.tsx</span>
          </div>
          <div className="h-[calc(100%-2rem)]">
            <CodeEditor value={code} onChange={handleCodeChange} />
          </div>
        </div>

        {/* Pane 3: Preview */}
        <div className="w-[40%] shrink-0 flex flex-col overflow-hidden">
          <div className="h-8 flex items-center gap-2 px-3 border-b bg-muted/50 shrink-0">
            <span className={`w-2 h-2 rounded-full ${STATUS_DOT[status]}`} />
            <span className="text-xs text-muted-foreground">{statusMessage}</span>
          </div>

          <div className="flex-1 relative bg-white">
            {status !== 'running' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/95 z-10">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">{statusMessage}</p>
                {status === 'error' && (
                  <p className="text-xs text-red-500 text-center px-4">
                    WebContainers require a Chromium-based browser (Chrome, Edge, Brave) and HTTPS.
                  </p>
                )}
              </div>
            )}
            {previewUrl && (
              <iframe
                src={previewUrl}
                className="w-full h-full border-0"
                title="Preview"
                allow="cross-origin-isolated"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
