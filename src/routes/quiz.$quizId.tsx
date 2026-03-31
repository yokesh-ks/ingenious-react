import { createRoute, useNavigate, useParams } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { buildPageMeta } from '@/lib/seo'
import { getQuizById } from '@/data/quiz-questions'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import {
  startQuiz,
  answerQuestion,
  nextQuestion,
  prevQuestion,
  goToQuestion,
  toggleReview,
  tickTimer,
  togglePause,
  submitQuiz,
  resetQuiz,
  selectCurrentQuestion,
  selectScore,
  selectTimeTaken,
  selectCategoryBreakdown,
} from '@/store/slices/quizSlice'
import type { ActiveQuiz } from '@/store/slices/quizSlice'
import { useEffect, useRef, useCallback, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Pause,
  Play,
  Home,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/quiz/$quizId',
  head: ({ params }) => {
    const pack = getQuizById(params.quizId)
    return buildPageMeta({
      title: pack ? `${pack.title} Quiz` : 'Quiz',
      description: pack?.description ?? 'Take a timed quiz',
      path: `/quiz/${params.quizId}`,
    })
  },
  component: QuizPlay,
})

// ─── Timer Display ────────────────────────────────────────────────────────────
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

function TimerDisplay({ timeLeft, totalSeconds }: { timeLeft: number; totalSeconds: number }) {
  const ratio = timeLeft / totalSeconds
  const isRed = timeLeft < 120
  const isYellow = !isRed && timeLeft < 300

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 font-mono text-sm font-semibold tabular-nums px-2.5 py-1 rounded-lg',
        isRed
          ? 'bg-red-500/15 text-red-600 dark:text-red-400 animate-pulse'
          : isYellow
          ? 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-400'
          : 'bg-muted text-foreground'
      )}
    >
      <Clock className="w-3.5 h-3.5" />
      {formatTime(timeLeft)}
    </div>
  )
}

// ─── Top Nav Bar ──────────────────────────────────────────────────────────────
function TopNavBar({
  quiz,
  onPause,
  onExit,
  onGoToQuestion,
}: {
  quiz: ActiveQuiz
  onPause: () => void
  onExit: () => void
  onGoToQuestion: (n: number) => void
}) {
  const totalSeconds = quiz.questions.length * 36
  const currentQ = quiz.current
  const total = quiz.questions.length
  const [reviewOpen, setReviewOpen] = useState(false)

  const flaggedQuestions = quiz.reviewFlags
    .map((flagged, i) => (flagged ? i + 1 : null))
    .filter((n): n is number => n !== null)

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-background/95 backdrop-blur-sm shrink-0">
      {/* Exit */}
      <button
        onClick={onExit}
        className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Quizzes</span>
      </button>

      <div className="w-px h-5 bg-border" />

      {/* Title */}
      <span className="text-sm font-semibold truncate max-w-[120px] sm:max-w-none">
        {quiz.emoji} {quiz.title}
      </span>

      {/* Progress */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground ml-1">
        <span className="font-semibold text-foreground">Q{currentQ}</span>
        <span>/</span>
        <span>{total}</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Stats */}
      <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
          <span>{quiz.answeredCount} answered</span>
        </span>

        {/* Review badge — clickable */}
        {quiz.reviewCount > 0 && (
          <div className="relative">
            <button
              onClick={() => setReviewOpen((v) => !v)}
              className="flex items-center gap-1 rounded-md px-2 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 transition-colors"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>{quiz.reviewCount} review</span>
            </button>

            {reviewOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setReviewOpen(false)}
                />
                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-1 z-20 min-w-[160px] rounded-lg border border-border bg-background shadow-lg p-2">
                  <p className="text-xs text-muted-foreground px-2 pb-1.5 font-medium">
                    Jump to flagged
                  </p>
                  {flaggedQuestions.map((qNum) => (
                    <button
                      key={qNum}
                      onClick={() => {
                        onGoToQuestion(qNum)
                        setReviewOpen(false)
                      }}
                      className={cn(
                        'flex items-center gap-2 w-full rounded-md px-2 py-1.5 text-sm text-left hover:bg-muted transition-colors',
                        qNum === currentQ && 'bg-muted font-semibold'
                      )}
                    >
                      <Flag className="w-3 h-3 text-orange-500 shrink-0" />
                      <span>Q{qNum} — {quiz.questions[qNum - 1].category}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Timer */}
      <TimerDisplay timeLeft={quiz.timeLeft} totalSeconds={totalSeconds} />

      {/* Pause */}
      <button
        onClick={onPause}
        className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        title={quiz.isPaused ? 'Resume' : 'Pause'}
      >
        {quiz.isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      </button>
    </div>
  )
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ current, total, answers }: { current: number; total: number; answers: (number | null)[] }) {
  return (
    <div className="flex gap-0.5 px-4 shrink-0">
      {Array.from({ length: total }, (_, i) => {
        const isActive = i + 1 === current
        const isAnswered = answers[i] !== null
        return (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              isActive
                ? 'bg-primary'
                : isAnswered
                ? 'bg-primary/40'
                : 'bg-muted'
            )}
          />
        )
      })}
    </div>
  )
}

// ─── Question Display ─────────────────────────────────────────────────────────
function QuestionDisplay({
  quiz,
  onAnswer,
}: {
  quiz: ActiveQuiz
  onAnswer: (optionIndex: number) => void
}) {
  const question = selectCurrentQuestion(quiz)
  const qIndex = quiz.current - 1
  const selectedAnswer = quiz.answers[qIndex]
  const isReviewed = quiz.reviewFlags[qIndex]

  const optionLabels = ['A', 'B', 'C', 'D']

  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-4 py-6 gap-6">
      {/* Category badge */}
      <div className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
        {question.category}
      </div>

      {/* Question text */}
      <h2 className="text-center text-lg sm:text-xl font-semibold max-w-2xl leading-relaxed">
        {question.question}
      </h2>

      {/* Review flag indicator */}
      {isReviewed && (
        <div className="flex items-center gap-1.5 text-xs text-orange-600 dark:text-orange-400">
          <Flag className="w-3.5 h-3.5" />
          Marked for review
        </div>
      )}

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {question.options.map((option, i) => {
          const isSelected = selectedAnswer === i
          return (
            <button
              key={i}
              onClick={() => onAnswer(i)}
              className={cn(
                'flex items-start gap-3 rounded-xl border p-4 text-left transition-all',
                isSelected
                  ? 'border-primary bg-primary/10 text-foreground shadow-sm'
                  : 'border-border bg-card hover:border-primary/50 hover:bg-muted/50'
              )}
            >
              <span
                className={cn(
                  'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold',
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted-foreground/40 text-muted-foreground'
                )}
              >
                {optionLabels[i]}
              </span>
              <span className="text-sm leading-relaxed">{option}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Bottom Actions ───────────────────────────────────────────────────────────
function BottomActions({
  quiz,
  onToggleReview,
  onNext,
  onPrev,
  onSubmit,
}: {
  quiz: ActiveQuiz
  onToggleReview: () => void
  onNext: () => void
  onPrev: () => void
  onSubmit: () => void
}) {
  const qIndex = quiz.current - 1
  const isAnswered = quiz.answers[qIndex] !== null
  const isReviewed = quiz.reviewFlags[qIndex]
  const isFirst = quiz.current === 1
  const isLast = quiz.current === quiz.questions.length

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-border bg-background shrink-0">
      {/* Prev */}
      <Button variant="ghost" size="sm" onClick={onPrev} disabled={isFirst} className="gap-1">
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Prev</span>
      </Button>

      {/* Center actions */}
      <div className="flex items-center gap-2">
        {isAnswered && (
          <Button
            variant={isReviewed ? 'default' : 'outline'}
            size="sm"
            onClick={onToggleReview}
            className={cn(
              'gap-1.5',
              isReviewed && 'bg-orange-500 hover:bg-orange-600 border-transparent text-white'
            )}
          >
            <Flag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isReviewed ? 'Unmark' : 'Mark Review'}</span>
          </Button>
        )}

        {isLast ? (
          <Button
            size="sm"
            onClick={onSubmit}
            className="gap-1.5 bg-green-600 hover:bg-green-700 text-white border-transparent"
          >
            <CheckCircle2 className="w-4 h-4" />
            Finish Quiz
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={onNext}
            className={cn(
              'gap-1.5',
              isAnswered
                ? 'bg-primary text-primary-foreground'
                : 'animate-[pulse_3s_ease-in-out_infinite]'
            )}
          >
            {isAnswered ? 'Next' : 'Answer & Next'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Right: Q counter on mobile */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground sm:hidden">
        <span className="font-semibold text-foreground">{quiz.current}</span>
        <span>/</span>
        <span>{quiz.questions.length}</span>
      </div>

      {/* Desktop: answered/review stats */}
      <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground">
        <span>
          <span className="font-semibold text-foreground">{quiz.answeredCount}</span>/{quiz.questions.length} answered
        </span>
      </div>
    </div>
  )
}

// ─── Paused Overlay ───────────────────────────────────────────────────────────
function PausedOverlay({ onResume, onExit }: { onResume: () => void; onExit: () => void }) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm gap-6">
      <div className="text-center">
        <div className="text-5xl mb-4">⏸️</div>
        <h2 className="text-2xl font-bold">Quiz Paused</h2>
        <p className="text-muted-foreground mt-2">Your progress is saved</p>
      </div>
      <div className="flex gap-3">
        <Button onClick={onResume} className="gap-2">
          <Play className="w-4 h-4" />
          Resume
        </Button>
        <Button variant="outline" onClick={onExit} className="gap-2">
          <Home className="w-4 h-4" />
          Exit Quiz
        </Button>
      </div>
    </div>
  )
}

// ─── Results Screen ───────────────────────────────────────────────────────────
function ResultsScreen({ quiz, onPlayAgain, onExit }: { quiz: ActiveQuiz; onPlayAgain: () => void; onExit: () => void }) {
  const { correct, total, percent } = selectScore(quiz)
  const timeTaken = selectTimeTaken(quiz, quiz.questions.length * 36)
  const breakdown = selectCategoryBreakdown(quiz)

  const medal =
    percent >= 90 ? '🥇' : percent >= 75 ? '🥈' : percent >= 60 ? '🥉' : '📋'

  const grade =
    percent >= 90
      ? 'Excellent!'
      : percent >= 75
      ? 'Great job!'
      : percent >= 60
      ? 'Good effort!'
      : 'Keep practicing!'

  return (
    <div className="flex-1 overflow-y-auto flex flex-col items-center px-4 py-8 gap-6 max-w-2xl mx-auto w-full">
      {/* Score header */}
      <div className="text-center">
        <div className="text-6xl mb-3">{medal}</div>
        <h1 className="text-3xl font-bold">
          {correct}/{total} ({percent}%)
        </h1>
        <p className="text-muted-foreground mt-1">{grade}</p>
        <div className="flex items-center justify-center gap-1.5 mt-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          Time taken: {timeTaken}
        </div>
      </div>

      {/* Category breakdown */}
      <div className="w-full rounded-xl border border-border bg-card p-4">
        <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
          📊 Category Breakdown
        </h2>
        <div className="flex flex-col gap-2">
          {Object.entries(breakdown).map(([cat, { correct: c, total: t }]) => {
            const pct = Math.round((c / t) * 100)
            return (
              <div key={cat}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{cat}</span>
                  <span className={cn('font-semibold', pct >= 70 ? 'text-green-600 dark:text-green-400' : 'text-red-500')}>
                    {c}/{t} ({pct}%)
                  </span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all',
                      pct >= 70 ? 'bg-green-500' : 'bg-red-400'
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Answer review */}
      <div className="w-full rounded-xl border border-border bg-card p-4">
        <h2 className="font-semibold text-sm mb-3">📋 Answer Review</h2>
        <div className="flex flex-col gap-3">
          {quiz.questions.map((q, i) => {
            const userAnswer = quiz.answers[i]
            const isCorrect = userAnswer === q.answer
            const optionLabels = ['A', 'B', 'C', 'D']
            return (
              <div key={q.id} className="text-sm">
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground leading-snug">
                      Q{i + 1}. {q.question}
                    </p>
                    <div className="mt-1 space-y-0.5">
                      {!isCorrect && userAnswer !== null && (
                        <p className="text-red-500 text-xs">
                          Your answer: {optionLabels[userAnswer]}) {q.options[userAnswer]}
                        </p>
                      )}
                      {!isCorrect && userAnswer === null && (
                        <p className="text-muted-foreground text-xs">Not answered</p>
                      )}
                      <p className="text-green-600 dark:text-green-400 text-xs">
                        Correct: {optionLabels[q.answer]}) {q.options[q.answer]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex gap-3 flex-wrap justify-center pb-4">
        <Button variant="outline" onClick={onExit} className="gap-2">
          <Home className="w-4 h-4" />
          All Quizzes
        </Button>
        <Button onClick={onPlayAgain} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Play Again
        </Button>
      </div>
    </div>
  )
}

// ─── Main Quiz Play Component ─────────────────────────────────────────────────
function QuizPlay() {
  const { quizId } = useParams({ from: '/quiz/$quizId' })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { screen, activeQuiz } = useSelector((state: RootState) => state.quiz)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const pack = getQuizById(quizId)

  // Start or resume quiz on mount
  useEffect(() => {
    if (!pack) return

    // Start fresh if no active quiz or different quiz
    if (!activeQuiz || activeQuiz.id !== quizId || screen === 'hub') {
      dispatch(
        startQuiz({
          id: pack.id,
          title: pack.title,
          emoji: pack.emoji,
          questions: pack.questions,
          duration: pack.duration,
        })
      )
    }
  }, [quizId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Timer
  useEffect(() => {
    if (screen !== 'active' || !activeQuiz || activeQuiz.isPaused) {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      return
    }

    timerRef.current = setInterval(() => {
      dispatch(tickTimer())
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [screen, activeQuiz?.isPaused, dispatch])

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (activeQuiz && activeQuiz.timeLeft === 0 && screen === 'active') {
      dispatch(submitQuiz())
    }
  }, [activeQuiz?.timeLeft, screen, dispatch])

  const handleExit = useCallback(() => {
    dispatch(resetQuiz())
    navigate({ to: '/quiz' })
  }, [dispatch, navigate])

  const handlePlayAgain = useCallback(() => {
    if (!pack) return
    dispatch(
      startQuiz({
        id: pack.id,
        title: pack.title,
        emoji: pack.emoji,
        questions: pack.questions,
        duration: pack.duration,
      })
    )
  }, [dispatch, pack])

  if (!pack) {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Quiz not found.</p>
        <Button onClick={() => navigate({ to: '/quiz' })}>Back to Quizzes</Button>
      </div>
    )
  }

  if (!activeQuiz) return null

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col overflow-hidden">
      {screen === 'active' && (
        <>
          <TopNavBar
            quiz={activeQuiz}
            onPause={() => dispatch(togglePause())}
            onExit={handleExit}
            onGoToQuestion={(n) => dispatch(goToQuestion(n))}
          />
          <ProgressBar
            current={activeQuiz.current}
            total={activeQuiz.questions.length}
            answers={activeQuiz.answers}
          />

          {activeQuiz.isPaused && (
            <PausedOverlay
              onResume={() => dispatch(togglePause())}
              onExit={handleExit}
            />
          )}

          <QuestionDisplay
            quiz={activeQuiz}
            onAnswer={(i) => dispatch(answerQuestion(i))}
          />

          <BottomActions
            quiz={activeQuiz}
            onToggleReview={() => dispatch(toggleReview())}
            onNext={() => dispatch(nextQuestion())}
            onPrev={() => dispatch(prevQuestion())}
            onSubmit={() => dispatch(submitQuiz())}
          />
        </>
      )}

      {screen === 'results' && activeQuiz && (
        <>
          {/* Results top bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border shrink-0">
            <button
              onClick={handleExit}
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Quizzes
            </button>
            <div className="w-px h-5 bg-border" />
            <span className="text-sm font-semibold">
              {activeQuiz.emoji} {activeQuiz.title} — Results
            </span>
          </div>
          <ResultsScreen
            quiz={activeQuiz}
            onPlayAgain={handlePlayAgain}
            onExit={handleExit}
          />
        </>
      )}
    </div>
  )
}
