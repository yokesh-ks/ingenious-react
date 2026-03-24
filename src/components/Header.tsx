import { Menu, Moon, Sun, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useTheme } from '@/hooks/useTheme'

const NAV_LINKS = [
  { label: 'Frontend Coding', href: '/frontend-coding' },
  { label: 'JS Problems', href: '/js-problems' },
  { label: 'Jobs - Chennai', href: '/jobs/chennai' },
  { label: 'Learn React', href: 'https://react.learn.ingeniousclan.com/', target: '_blank' },
]

export function Header() {
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2 font-semibold text-foreground">
          <Zap className="size-5 text-primary" />
          <span>Ingenious React</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.target}
              rel={link.target === '_blank' ? 'noreferrer' : undefined}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          <Button asChild size="sm" className="hidden md:inline-flex">
            <a
              href="https://www.linkedin.com/company/ingenious-react-jobs-chennai/"
              target="_blank"
              rel="noreferrer"
            >
              Follow
            </a>
          </Button>

          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Zap className="size-4 text-primary" />
                  Ingenious React
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 px-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.target}
                    rel={link.target === '_blank' ? 'noreferrer' : undefined}
                    className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 px-2">
                <Button asChild size="sm" className="w-full">
                  <a
                    href="https://www.linkedin.com/company/ingenious-react-jobs-chennai/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Follow on LinkedIn
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}
