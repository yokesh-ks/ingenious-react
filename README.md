# Ingenious React

A React + TypeScript + Vite project with Tailwind CSS v4 and Shadcn UI components.

## Tech Stack

- **React 19** — UI library
- **TypeScript** — Type safety
- **Vite 8** — Build tool with HMR
- **Tailwind CSS v4** — Utility-first styling via `@tailwindcss/vite`
- **Shadcn UI** — Accessible component library (radix-nova style)
- **Lucide React** — Icon library

## Project Structure

```
src/
├── components/
│   ├── ui/             # Shadcn components (button, card, ...)
│   └── Header.tsx      # App header with nav, theme toggle, LinkedIn follow
├── hooks/
│   └── useTheme.ts     # Dark/light mode toggle with localStorage persistence
├── lib/
│   └── utils.ts        # cn() helper (clsx + tailwind-merge)
├── styles/
│   └── globals.css     # Tailwind imports + CSS variable theme tokens
└── App.tsx
```

## Getting Started

```bash
pnpm install
pnpm dev
```

## Features

- **Header** — Logo, navigation (Machine Round, JS Problems, Jobs - Chennai, Learn React), theme switch, LinkedIn follow button
- **Dark / Light mode** — Persisted via `localStorage`, respects `prefers-color-scheme` on first load
- **Shadcn components** — Button (all variants), Card (with header, content, footer)

## Adding Shadcn Components

```bash
pnpm dlx shadcn add <component-name>
```

Components are added to `src/components/ui/`.
