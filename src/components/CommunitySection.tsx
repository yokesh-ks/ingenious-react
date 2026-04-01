import { Button } from '@/components/ui/button'
import { ArrowRight, Users } from 'lucide-react'

export function CommunitySection() {
  return (
    <section className="w-full py-10 md:py-12 px-4 bg-muted/50">
      <div className="mx-auto max-w-4xl flex flex-col items-center justify-center text-center">
        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Users className="h-6 w-6 text-primary" />
        </div>

        {/* Heading */}
        <h2 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
          Join Our Community
        </h2>

        {/* Description */}
        <p className="mb-6 max-w-xl text-base md:text-lg text-muted-foreground">
          Connect with developers, share knowledge, and accelerate your learning journey.
        </p>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-5 text-base md:px-8 md:py-6 md:text-lg"
        >
          <a
            href="https://www.linkedin.com/company/ingenious-react-jobs-chennai/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Follow on LinkedIn
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </section>
  )
}
