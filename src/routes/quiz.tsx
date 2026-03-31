import { createRoute, useNavigate } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { buildPageMeta } from '@/lib/seo'
import { quizPacks } from '@/data/quiz-questions'
import type { QuizPack } from '@/data/quiz-questions'
import { Play, Trophy, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/quiz',
  head: () =>
    buildPageMeta({
      title: 'Quiz Play – Test Your Frontend Knowledge',
      description:
        'Challenge yourself with 5 timed quiz packs covering React, Next.js, JavaScript, TypeScript, Web Fundamentals, and System Design.',
      path: '/quiz',
    }),
  component: QuizHub,
})

function QuizCard({ pack }: { pack: QuizPack }) {
  const navigate = useNavigate()

  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{pack.emoji}</span>
          <div>
            <h3 className="font-semibold text-foreground leading-tight">{pack.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{pack.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
            {pack.topScore}%
          </span>
        </div>
      </div>

      {/* Topics */}
      <div className="flex flex-wrap gap-1.5">
        {pack.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
          >
            {topic}
          </span>
        ))}
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="font-medium text-foreground">{pack.questions.length}Q</span>
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {pack.duration}min
        </span>
        <span className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          {pack.totalPlays >= 1000
            ? `${(pack.totalPlays / 1000).toFixed(1)}k`
            : pack.totalPlays}{' '}
          plays
        </span>
      </div>

      {/* CTA */}
      <Button
        className="w-full gap-2"
        onClick={() => navigate({ to: '/quiz/$quizId', params: { quizId: pack.id } })}
      >
        <Play className="w-4 h-4 fill-current" />
        Play Now
      </Button>
    </div>
  )
}

function QuizHub() {
  return (
    <div className="flex flex-col flex-1 p-6 max-w-6xl mx-auto w-full gap-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-2xl">🔥</span>
          <h1 className="text-2xl font-semibold">Top Quizzes</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          5 quiz packs · 125 questions · Test your frontend engineering knowledge
        </p>
      </div>

      {/* Quiz Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizPacks.map((pack) => (
          <QuizCard key={pack.id} pack={pack} />
        ))}
      </div>

      {/* How it works */}
      <div className="rounded-xl border border-border bg-muted/40 p-5">
        <h2 className="font-semibold mb-3 text-sm">How it works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
          <div className="flex gap-3">
            <span className="text-lg">⏱️</span>
            <div>
              <p className="font-medium text-foreground">15-minute timer</p>
              <p>Answer 25 questions before time runs out</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">🚩</span>
            <div>
              <p className="font-medium text-foreground">Mark for review</p>
              <p>Flag tricky questions and revisit them</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-lg">📊</span>
            <div>
              <p className="font-medium text-foreground">Instant results</p>
              <p>See your score with category breakdown</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
