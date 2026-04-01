import { createRoute, Link } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { buildPageMeta } from '@/lib/seo'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ArrowRight, Code } from 'lucide-react'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/questions',
  head: () =>
    buildPageMeta({
      title: 'Interview Questions',
      description:
        'Practice interview questions covering React, JavaScript, TypeScript, and more. Master your frontend engineering skills.',
      path: '/questions',
    }),
  component: QuestionsHub,
})

interface QuestionCategory {
  id: string
  name: string
  description: string
  count: number
  icon: React.ReactNode
  color: string
  href: string
}

const CATEGORIES: QuestionCategory[] = [
  {
    id: 'react',
    name: 'React',
    description: '100 React interview questions covering fundamentals to advanced topics including hooks, state management, and performance optimization.',
    count: 100,
    icon: <Code className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    href: '/questions/react',
  },
  // Future categories can be added here:
  // {
  //   id: 'javascript',
  //   name: 'JavaScript',
  //   description: 'Core JavaScript concepts, ES6+ features, and advanced patterns.',
  //   count: 0,
  //   icon: <Braces className="w-6 h-6" />,
  //   color: 'from-yellow-500 to-orange-500',
  //   href: '/questions/javascript',
  // },
]

function QuestionCategoryCard({ category }: { category: QuestionCategory }) {
  return (
    <Link
      to={category.href}
      className="block group"
    >
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/50 group-hover:border-primary/50">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} text-white`}>
              {category.icon}
            </div>
            <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">
              {category.count} questions
            </span>
          </div>
          <CardTitle className="mt-4 text-xl group-hover:text-primary transition-colors">
            {category.name}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed">
            {category.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            View questions
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function QuestionsHub() {
  return (
    <div className="flex flex-col flex-1 p-6 max-w-6xl mx-auto w-full gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Interview Questions</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Practice interview questions and master your frontend engineering skills
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CATEGORIES.map((category) => (
          <QuestionCategoryCard key={category.id} category={category} />
        ))}
      </div>

      {/* Coming Soon */}
      <div className="rounded-xl border border-border bg-muted/40 p-5">
        <h2 className="font-semibold mb-2 text-sm">More categories coming soon</h2>
        <p className="text-sm text-muted-foreground">
          We're constantly adding new question categories. Stay tuned for JavaScript, TypeScript, CSS, and more!
        </p>
      </div>
    </div>
  )
}