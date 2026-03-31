import type * as React from 'react'
import { footerLinks } from '@/config/site'
import { cn } from '@/lib/utils'

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn('bg-neutral-900 text-white', className)}>
      <div className="mx-auto w-full max-w-7xl px-4 relative grid grid-cols-1 gap-4 py-14 sm:grid-cols-2 md:grid-cols-5">
        <div>
          <img
            src="/ingeniousclan.png"
            alt="IngeniousClan"
            className="h-12 w-auto"
          />
          <p className="mt-4 text-sm text-gray-400">
            Empowering development with IngeniousClan visionary tools.
          </p>
        </div>
        {footerLinks.map((section) => (
          <div key={section.title}>
            <span className="text-sm font-medium text-[#E5B768]">{section.title}</span>
            <ul className="mt-4 list-inside space-y-3">
              {section.items?.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener' : undefined}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-800 py-4">
        <div className="mx-auto w-full max-w-7xl px-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row">
            <span className="text-sm text-gray-400">
              Copyright &copy; 2024 by{' '}
              <a
                href="https://www.ingeniousclan.com/"
                target="_blank"
                className="hover:text-white transition-colors duration-300"
                rel="noopener"
              >
                IngeniousClan
              </a>
              .
            </span>
            <span className="hidden text-sm text-gray-400 md:block">|</span>
            <span className="text-sm text-gray-400">
              Made with <span className="text-[#FF0000]">&hearts;</span> by{' '}
              <a
                href="https://www.yokesh.in/"
                target="_blank"
                className="hover:text-white transition-colors duration-300"
                rel="noopener"
              >
                Yokesh
              </a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <a
                href="https://www.ingeniousclan.com/privacy"
                target="_blank"
                rel="noopener"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="https://www.ingeniousclan.com/terms"
                target="_blank"
                rel="noopener"
                className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
