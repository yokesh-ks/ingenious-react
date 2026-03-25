import { ArrowRight, type LucideIcon } from 'lucide-react'

interface HomeFeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  external?: boolean
}

export function HomeFeatureCard({ icon: Icon, title, description, href, external }: HomeFeatureCardProps) {
  return (
    <a
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
  )
}
