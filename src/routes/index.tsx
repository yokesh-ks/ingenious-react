import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { Button } from '@/components/ui/button'
import { Code2, BrainCircuit, MapPin, BookOpen, Zap, ArrowRight, ListVideo } from 'lucide-react'
import { buildPageMeta } from '@/lib/seo'
import { HomeFeatureCard } from '@/components/cards/HomeFeatureCard'

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
    icon: ListVideo,
    title: 'Namaste JavaScript',
    description: 'Watch Akshay Saini\'s full Namaste JS series — 26 episodes on core JS concepts.',
    href: '/videos',
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
          {FEATURES.map((feature) => (
            <HomeFeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </div>
  )
}
