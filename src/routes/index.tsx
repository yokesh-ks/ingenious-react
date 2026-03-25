import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { Button } from '@/components/ui/button'
import { ArrowRight, Code2, BrainCircuit, MapPin, BookOpen, Zap } from 'lucide-react'
import { buildPageMeta } from '@/lib/seo'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  head: () => buildPageMeta({
    title: 'Master React. Land Your Dream Job.',
    description: 'Practice React coding challenges, solve JS algorithm problems, and find frontend jobs in Chennai. Your all-in-one React practice platform.',
    path: '/',
  }),
  component: Home,
})

const FEATURES = [
  {
    icon: Code2,
    title: 'Frontend Coding',
    description: 'Practice real-world frontend challenges and sharpen your coding skills.',
    href: '/frontend-coding',
  },
  {
    icon: BrainCircuit,
    title: 'JS Problems',
    description: 'Tackle curated JavaScript problems from beginner to advanced level.',
    href: '/js-problems',
  },
  {
    icon: MapPin,
    title: 'Jobs in Chennai',
    description: 'Browse the latest React & frontend job openings in Chennai.',
    href: '/jobs/chennai',
  },
  {
    icon: BookOpen,
    title: 'Learn React',
    description: 'Structured learning paths to take you from zero to production-ready.',
    href: 'https://react.learn.ingeniousclan.com/',
    external: true,
  },
]

function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-4 py-24 text-center md:py-36">
        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="h-[500px] w-[800px] rounded-full bg-primary/10 blur-3xl" />
        </div>

        <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          <Zap className="size-3 text-primary" />
          Built for React Developers
        </span>

        <h1 className="max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Master React.{' '}
          <span className="text-primary">Land Your Dream Job.</span>
        </h1>

        <p className="mt-6 max-w-xl text-balance text-lg text-muted-foreground">
          Practice frontend challenges, solve JS problems, and discover top React jobs in
          Chennai — all in one place.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="gap-2">
            <a href="/frontend-coding">
              Start Practicing <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="/jobs/chennai">Browse Jobs</a>
          </Button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, description, href, external }) => (
            <a
              key={title}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md hover:shadow-primary/5"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </div>
              <ArrowRight className="mt-auto size-4 text-muted-foreground/40 transition-all group-hover:translate-x-1 group-hover:text-primary" />
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
