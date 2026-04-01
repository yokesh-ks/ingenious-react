import { Link } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ReactQuestion } from '@/data/react-questions'
import { DIFFICULTY_STYLES, DIFFICULTY_LABELS } from '@/data/react-questions'

const CATEGORY_STYLES = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'

export function ReactQuestionCard({ question }: { question: ReactQuestion }) {
  return (
    <Link to="/questions/react/$questionId" params={{ questionId: question.id }} className="block group">
      <Card className="h-full transition-shadow hover:shadow-md group-hover:border-primary/50">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
              <span className="text-muted-foreground mr-1.5 font-normal">Q{question.number}.</span>
              {question.title}
            </CardTitle>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${DIFFICULTY_STYLES[question.difficulty]}`}
            >
              {DIFFICULTY_LABELS[question.difficulty]}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1">
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${CATEGORY_STYLES}`}>
              {question.category}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}