export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Challenge {
  id: string
  title: string
  difficulty: Difficulty
  tags: string[]
  description: string
  starterCode: string
}

const defaultStarter = `import { useState } from 'react'

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      {/* Start coding here */}
    </div>
  )
}
`

const counterStarter = `import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Counter: {count}</h1>
      {/* Add increment, decrement, and reset buttons */}
    </div>
  )
}
`

const calculatorStarter = `import { useState } from 'react'

export default function App() {
  const [display, setDisplay] = useState('0')

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', textAlign: 'right', fontSize: '1.5rem' }}>
        {display}
      </div>
      {/* Add calculator buttons: digits 0-9, +, -, *, /, =, C */}
    </div>
  )
}
`

const todoStarter = `import { useState } from 'react'

export default function App() {
  const [todos, setTodos] = useState<string[]>([])
  const [input, setInput] = useState('')

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Todo List</h1>
      {/* Add input + button to add todos, list todos with delete */}
    </div>
  )
}
`

const timerStarter = `import { useState, useEffect } from 'react'

export default function App() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem' }}>{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</h1>
      {/* Add Start/Stop/Reset buttons and useEffect for interval */}
    </div>
  )
}
`

export const challenges: Challenge[] = [
  {
    id: 'build-a-birth-year-histogram',
    title: 'Build a Birth Year Histogram',
    difficulty: 'medium',
    tags: ['useMemo', 'data visualization', 'CSS'],
    description: 'Visualize a dataset of birth years as a bar chart histogram rendered purely with React and CSS (no charting libraries). Group years into decade buckets, render vertical bars with proportional heights, and label each bar with the decade and count.',
    starterCode: `import { useMemo } from 'react'

const birthYears = [1990, 1985, 1992, 1978, 2001, 1995, 1983, 1999, 1970, 2005,
  1988, 1975, 2003, 1996, 1982, 1991, 1968, 2000, 1987, 1979]

export default function App() {
  const buckets = useMemo(() => {
    // Group birthYears into decade buckets (e.g. 1970s, 1980s, ...)
    return {}
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Birth Year Histogram</h1>
      {/* Render vertical bars proportional to count */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-calculator',
    title: 'Build a Calculator',
    difficulty: 'easy',
    tags: ['useState', 'events'],
    description: 'Implement a functional calculator supporting addition, subtraction, multiplication, and division. Handle division by zero, decimal points, and chaining operations.',
    starterCode: calculatorStarter,
  },
  {
    id: 'build-a-contact-form',
    title: 'Build a Contact Us Form',
    difficulty: 'easy',
    tags: ['HTML', 'forms'],
    description: 'Build a basic "Contact Us" form with Name, Email, and Message fields plus a Submit button. Focus on proper HTML form structure.',
    starterCode: `export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h1>Contact Us</h1>
      <form>
        {/* Add Name (text), Email (email), Message (textarea), Submit button */}
      </form>
    </div>
  )
}
`,
  },
  {
    id: 'build-a-countdown-timer',
    title: 'Build a Countdown Timer',
    difficulty: 'easy',
    tags: ['useState', 'useEffect', 'setInterval'],
    description: 'Implement a countdown timer that counts down from a user-specified duration and triggers an alert on completion. Show Start, Pause, and Reset buttons.',
    starterCode: `import { useState, useEffect } from 'react'

export default function App() {
  const [duration, setDuration] = useState(60)
  const [remaining, setRemaining] = useState(60)
  const [running, setRunning] = useState(false)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Countdown Timer</h1>
      {/* Show time in MM:SS, Start/Pause/Reset buttons, duration input */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-counter',
    title: 'Build a Counter App',
    difficulty: 'easy',
    tags: ['useState', 'hooks'],
    description: 'Implement a simple counter with increment, decrement, and reset functionality using React useState hook. Counter should not go below 0.',
    starterCode: counterStarter,
  },
  {
    id: 'build-a-data-table',
    title: 'Build a Data Table',
    difficulty: 'hard',
    tags: ['useState', 'useMemo', 'sorting', 'filtering', 'advanced'],
    description: 'Create a feature-rich data table with client-side sorting, column filtering, row selection with checkboxes, and pagination.',
    starterCode: `import { useState, useMemo } from 'react'

const data = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: \`User \${i + 1}\`,
  age: 20 + Math.floor(Math.random() * 40),
  city: ['Chennai', 'Mumbai', 'Delhi', 'Bangalore'][i % 4],
}))

export default function App() {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Data Table</h1>
      {/* Search, sortable table, pagination */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-debounced-search',
    title: 'Build a Debounced Search',
    difficulty: 'medium',
    tags: ['useEffect', 'custom hooks', 'performance'],
    description: 'Implement a search input that debounces API calls using useEffect and a custom useDebounce hook. Show a loading spinner and handle race conditions.',
    starterCode: `import { useState, useEffect } from 'react'

function useDebounce<T>(value: T, delay: number): T {
  // Implement debounce hook
  return value
}

export default function App() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const debouncedQuery = useDebounce(query, 500)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Debounced Search</h1>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." />
      {/* Show results or loading spinner */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-dice-roller',
    title: 'Build a Dice Roller',
    difficulty: 'easy',
    tags: ['useState', 'CSS animation', 'Math.random'],
    description: 'Create a dice roller that animates a dice face, supports multiple dice, displays the sum, and maintains a scrollable roll history with a Clear History button.',
    starterCode: defaultStarter,
  },
  {
    id: 'build-a-digital-clock',
    title: 'Build a Digital Clock',
    difficulty: 'easy',
    tags: ['useState', 'useEffect', 'Date'],
    description: 'Create a live digital clock displaying current time in HH:MM:SS format with AM/PM toggle, current date, and blinking colon separator.',
    starterCode: `import { useState, useEffect } from 'react'

export default function App() {
  const [time, setTime] = useState(new Date())
  const [is24Hour, setIs24Hour] = useState(false)

  useEffect(() => {
    // Update time every second
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem' }}>00:00:00</h1>
      {/* Show date, 12/24hr toggle */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-drag-and-drop-list',
    title: 'Build a Drag and Drop List',
    difficulty: 'medium',
    tags: ['useState', 'drag-and-drop'],
    description: 'Create a reorderable list where items can be dragged and dropped into new positions using the HTML5 Drag and Drop API. Provide visual feedback during drag.',
    starterCode: `import { useState } from 'react'

const initialItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

export default function App() {
  const [items, setItems] = useState(initialItems)
  const [dragIndex, setDragIndex] = useState<number | null>(null)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px' }}>
      <h1>Drag and Drop List</h1>
      {/* Render draggable list items */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-dropdown',
    title: 'Build a Dropdown Component',
    difficulty: 'medium',
    tags: ['useState', 'useRef', 'useEffect', 'accessibility'],
    description: 'Implement a custom accessible dropdown menu that opens on click, supports keyboard navigation (ArrowUp/Down, Enter, Escape), and closes on outside click.',
    starterCode: `import { useState, useRef, useEffect } from 'react'

const options = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry']

export default function App() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [focused, setFocused] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Custom Dropdown</h1>
      <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
        {/* Trigger button + dropdown list with keyboard nav */}
      </div>
    </div>
  )
}
`,
  },
  {
    id: 'build-a-file-explorer',
    title: 'Build a File Explorer Tree',
    difficulty: 'hard',
    tags: ['recursion', 'useState', 'tree'],
    description: 'Create a recursive file explorer component that expands and collapses nested folder structures. Support adding new files/folders and show icons for files vs folders.',
    starterCode: `import { useState } from 'react'

type FileNode = { name: string; type: 'file' } | { name: string; type: 'folder'; children: FileNode[] }

const tree: FileNode = {
  name: 'root', type: 'folder', children: [
    { name: 'src', type: 'folder', children: [
      { name: 'App.tsx', type: 'file' },
      { name: 'main.tsx', type: 'file' },
    ]},
    { name: 'package.json', type: 'file' },
  ]
}

function TreeNode({ node }: { node: FileNode }) {
  const [open, setOpen] = useState(true)
  // Render recursively
  return <div>{node.name}</div>
}

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
      <h1>File Explorer</h1>
      <TreeNode node={tree} />
    </div>
  )
}
`,
  },
  {
    id: 'build-a-flight-booker',
    title: 'Build a Flight Booker',
    difficulty: 'medium',
    tags: ['useState', 'forms', 'date validation'],
    description: 'Implement a flight booking form with one-way and round-trip modes, date validation (return must not be before departure), and a booking confirmation dialog.',
    starterCode: defaultStarter,
  },
  {
    id: 'build-a-form-with-validation',
    title: 'Build a Form with Validation',
    difficulty: 'medium',
    tags: ['useState', 'controlled inputs', 'validation'],
    description: 'Create a multi-field registration form with real-time client-side validation: Name (min 3 chars), Email (valid pattern), Password (min 8 chars, 1 number), Confirm Password (must match). Disable submit until all valid.',
    starterCode: `import { useState } from 'react'

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px' }}>
      <h1>Registration Form</h1>
      {/* Name, Email, Password, Confirm Password with inline error messages */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-generate-table',
    title: 'Build a Generate Table',
    difficulty: 'easy',
    tags: ['useState', 'dynamic rendering'],
    description: 'Dynamically generate an HTML table of configurable rows and columns (1-10). Each cell shows its (row, col) coordinate. Highlight cells on hover.',
    starterCode: `import { useState } from 'react'

export default function App() {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Generate Table</h1>
      <div>
        Rows: <input type="number" value={rows} min={1} max={10} onChange={e => setRows(Number(e.target.value))} />
        Cols: <input type="number" value={cols} min={1} max={10} onChange={e => setCols(Number(e.target.value))} />
      </div>
      {/* Render table with (row, col) coordinates */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-holy-grail-layout',
    title: 'Build a Holy Grail Layout',
    difficulty: 'easy',
    tags: ['CSS', 'Flexbox', 'Grid', 'layout'],
    description: 'Implement the classic Holy Grail page layout: header, footer, main content, and two fixed-width sidebars using CSS Flexbox or Grid. Make it responsive.',
    starterCode: `export default function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      {/* Main area: left sidebar + content + right sidebar */}
      {/* Footer */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-job-board',
    title: 'Build a Job Board',
    difficulty: 'medium',
    tags: ['useEffect', 'useState', 'API'],
    description: 'Create a job listing board that fetches postings from an API, supports filtering by job type (Full-time, Part-time, Remote), has a Load More button, loading skeleton, and error handling.',
    starterCode: `import { useState, useEffect } from 'react'

export default function App() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    // Fetch from https://remotive.com/api/remote-jobs?limit=10 or similar
  }, [])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Job Board</h1>
      {/* Filter buttons, job cards, Load More */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-kanban-board',
    title: 'Build a Kanban Board',
    difficulty: 'hard',
    tags: ['useState', 'drag-and-drop', 'advanced'],
    description: 'Create a drag-and-drop Kanban board with three columns (To Do, In Progress, Done). Tasks can be dragged between columns. Support adding and deleting tasks.',
    starterCode: `import { useState } from 'react'

type Task = { id: string; text: string }
type Column = { id: string; title: string; tasks: Task[] }

const initialColumns: Column[] = [
  { id: 'todo', title: 'To Do', tasks: [{ id: '1', text: 'Design UI' }] },
  { id: 'in-progress', title: 'In Progress', tasks: [{ id: '2', text: 'Build API' }] },
  { id: 'done', title: 'Done', tasks: [] },
]

export default function App() {
  const [columns, setColumns] = useState(initialColumns)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', display: 'flex', gap: '1rem' }}>
      {/* Render columns with draggable tasks */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-like-button',
    title: 'Build a Like Button',
    difficulty: 'easy',
    tags: ['useState', 'CSS animation', 'events'],
    description: 'Implement an animated Like button that toggles between liked and unliked states with a count. Add a scale-up CSS animation when liked.',
    starterCode: `import { useState } from 'react'

export default function App() {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(42)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <button onClick={() => { setLiked(!liked); setCount(c => liked ? c - 1 : c + 1) }}>
        {liked ? '❤️' : '🤍'} {count}
      </button>
      {/* Add CSS animation on like */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-modal',
    title: 'Build a Modal Dialog',
    difficulty: 'medium',
    tags: ['useEffect', 'Portal', 'accessibility'],
    description: 'Implement a reusable modal dialog using React Portal. Closes on backdrop click and Escape key. Traps focus inside the modal and prevents background scroll.',
    starterCode: `import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  useEffect(() => {
    // Close on Escape, prevent body scroll
  }, [isOpen, onClose])

  if (!isOpen) return null
  return createPortal(
    <div>
      {/* Backdrop + modal content */}
    </div>,
    document.body
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <h2>Modal Title</h2>
        <p>Modal content here</p>
      </Modal>
    </div>
  )
}
`,
  },
  {
    id: 'build-a-mortgage-calculator',
    title: 'Build a Mortgage Calculator',
    difficulty: 'medium',
    tags: ['useState', 'useMemo', 'forms', 'math'],
    description: 'Create a mortgage calculator that computes monthly payment, total payment, and total interest from principal, annual rate %, and loan term inputs. Show an amortization summary.',
    starterCode: `import { useState, useMemo } from 'react'

export default function App() {
  const [principal, setPrincipal] = useState(300000)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(30)

  const { monthly, total, interest } = useMemo(() => {
    // M = P[r(1+r)^n]/[(1+r)^n-1]
    return { monthly: 0, total: 0, interest: 0 }
  }, [principal, rate, years])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h1>Mortgage Calculator</h1>
      {/* Inputs for principal, rate, years; show monthly/total/interest */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-navbar',
    title: 'Build a Responsive Navbar',
    difficulty: 'medium',
    tags: ['useState', 'useRef', 'useEffect', 'responsive'],
    description: 'Create a responsive navigation bar with multi-level dropdown menus that collapses into a hamburger menu on mobile (below 768px). Close dropdowns on outside click.',
    starterCode: defaultStarter,
  },
  {
    id: 'build-a-nested-comments',
    title: 'Build a Nested Comments Section',
    difficulty: 'hard',
    tags: ['recursion', 'useContext', 'tree'],
    description: 'Create a Reddit-style nested comments component that supports adding and deleting replies at any depth using recursion. Show author, timestamp, and body.',
    starterCode: `import { useState } from 'react'

type Comment = {
  id: string
  author: string
  body: string
  timestamp: string
  replies: Comment[]
}

const initialComments: Comment[] = [
  { id: '1', author: 'Alice', body: 'Great post!', timestamp: '2h ago', replies: [
    { id: '2', author: 'Bob', body: 'Agreed!', timestamp: '1h ago', replies: [] }
  ]}
]

function CommentNode({ comment }: { comment: Comment }) {
  const [showReply, setShowReply] = useState(false)
  return (
    <div style={{ marginLeft: '1rem', borderLeft: '2px solid #eee', paddingLeft: '1rem' }}>
      <strong>{comment.author}</strong> · {comment.timestamp}
      <p>{comment.body}</p>
      {/* Reply button, delete, recursive replies */}
    </div>
  )
}

export default function App() {
  const [comments, setComments] = useState(initialComments)
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Comments</h1>
      {comments.map(c => <CommentNode key={c.id} comment={c} />)}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-pagination',
    title: 'Build a Pagination Component',
    difficulty: 'medium',
    tags: ['useState', 'useMemo', 'components'],
    description: 'Create a reusable pagination component that slices data client-side and renders page navigation controls. Use useMemo to avoid unnecessary re-computation.',
    starterCode: `import { useState, useMemo } from 'react'

const allItems = Array.from({ length: 100 }, (_, i) => \`Item \${i + 1}\`)

export default function App() {
  const [page, setPage] = useState(1)
  const pageSize = 10

  const pageItems = useMemo(() => {
    return allItems.slice((page - 1) * pageSize, page * pageSize)
  }, [page])

  const totalPages = Math.ceil(allItems.length / pageSize)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Pagination</h1>
      {/* Render current page items */}
      {/* Previous/Next buttons + page numbers */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-password-generator',
    title: 'Build a Password Generator',
    difficulty: 'medium',
    tags: ['useState', 'useMemo', 'crypto'],
    description: 'Create a configurable password generator with length slider (8-32), character set options (uppercase/lowercase/numbers/symbols), strength indicator, and clipboard copy.',
    starterCode: `import { useState, useMemo } from 'react'

export default function App() {
  const [length, setLength] = useState(16)
  const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, symbols: false })
  const [password, setPassword] = useState('')

  const generate = () => {
    // Use crypto.getRandomValues for secure generation
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px' }}>
      <h1>Password Generator</h1>
      {/* Password display, length slider, checkboxes, generate & copy buttons */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-popover',
    title: 'Build a Popover',
    difficulty: 'medium',
    tags: ['useRef', 'useEffect', 'positioning'],
    description: 'Implement a reusable Popover component that positions floating content relative to a trigger element. Support placement prop (top/bottom/left/right) and auto-adjust on overflow.',
    starterCode: defaultStarter,
  },
  {
    id: 'build-a-progress-bar',
    title: 'Build a Progress Bar',
    difficulty: 'easy',
    tags: ['useState', 'CSS transitions', 'accessibility'],
    description: 'Create an animated progress bar that accepts a value (0-100) and fills proportionally with CSS transitions. Show percentage label and ARIA attributes.',
    starterCode: `import { useState } from 'react'

function ProgressBar({ value }: { value: number }) {
  return (
    <div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}
      style={{ border: '1px solid #ccc', borderRadius: '4px', height: '24px', overflow: 'hidden' }}>
      <div style={{ width: \`\${value}%\`, height: '100%', background: '#4CAF50', transition: 'width 0.3s ease' }} />
    </div>
  )
}

export default function App() {
  const [value, setValue] = useState(40)
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px' }}>
      <h1>Progress Bar: {value}%</h1>
      <ProgressBar value={value} />
      <input type="range" min={0} max={100} value={value} onChange={e => setValue(Number(e.target.value))} />
    </div>
  )
}
`,
  },
  {
    id: 'build-a-quiz-app',
    title: 'Build a Quiz App',
    difficulty: 'medium',
    tags: ['useState', 'useReducer', 'components'],
    description: 'Implement a multi-question quiz with four options per question, color-coded answer feedback (green/red), score tracking, and a results summary screen with restart.',
    starterCode: `import { useState } from 'react'

const questions = [
  { question: 'What hook manages local state in React?', options: ['useEffect', 'useState', 'useRef', 'useMemo'], answer: 1 },
  { question: 'Which method renders React to the DOM?', options: ['React.render', 'ReactDOM.render', 'createRoot', 'ReactDOM.createRoot'], answer: 3 },
  { question: 'What does JSX stand for?', options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'], answer: 0 },
]

export default function App() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      {finished ? <div><h1>Score: {score}/{questions.length}</h1></div> : (
        <div>
          <h2>{questions[current].question}</h2>
          {/* Options, Next button, score tracking */}
        </div>
      )}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-search-filter',
    title: 'Build a Search Filter',
    difficulty: 'medium',
    tags: ['useState', 'useMemo', 'performance'],
    description: 'Implement a real-time search filter over a list of items using controlled inputs and useMemo. Show "No results found" when empty.',
    starterCode: `import { useState, useMemo } from 'react'

const items = ['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Remix', 'Vite', 'TypeScript', 'JavaScript', 'Node.js']

export default function App() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() =>
    items.filter(item => item.toLowerCase().includes(query.toLowerCase())),
    [query]
  )

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Search Filter</h1>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search..." />
      {filtered.length === 0 ? <p>No results found</p> : <ul>{filtered.map(i => <li key={i}>{i}</li>)}</ul>}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-snake-and-ladder',
    title: 'Build a Snake and Ladder Board',
    difficulty: 'hard',
    tags: ['useState', 'useReducer', 'game'],
    description: 'Implement the classic Snake and Ladder board game for two players with dice roll, snake/ladder teleportation, alternating turns, and win detection at square 100.',
    starterCode: defaultStarter,
  },
  {
    id: 'build-a-star-rating',
    title: 'Build a Star Rating Component',
    difficulty: 'easy',
    tags: ['useState', 'events', 'components'],
    description: 'Create an interactive star rating component with hover preview and selected state. Support configurable number of stars and an onChange callback prop.',
    starterCode: `import { useState } from 'react'

function StarRating({ max = 5, onChange }: { max?: number; onChange?: (rating: number) => void }) {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  return (
    <div style={{ display: 'flex', gap: '4px', fontSize: '2rem' }}>
      {Array.from({ length: max }, (_, i) => (
        <span key={i}
          style={{ cursor: 'pointer', color: i < (hover || rating) ? 'gold' : '#ccc' }}
          onMouseEnter={() => setHover(i + 1)}
          onMouseLeave={() => setHover(0)}
          onClick={() => { setRating(i + 1); onChange?.(i + 1) }}>
          ★
        </span>
      ))}
    </div>
  )
}

export default function App() {
  const [selected, setSelected] = useState(0)
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Star Rating</h1>
      <StarRating onChange={setSelected} />
      <p>Selected: {selected} stars</p>
    </div>
  )
}
`,
  },
  {
    id: 'build-a-stopwatch',
    title: 'Build a Stopwatch',
    difficulty: 'easy',
    tags: ['useState', 'useEffect', 'setInterval'],
    description: 'Implement a stopwatch with Start, Stop, and Reset. Display time in MM:SS format and clean up the interval on unmount.',
    starterCode: timerStarter,
  },
  {
    id: 'build-a-temperature-converter',
    title: 'Build a Temperature Converter',
    difficulty: 'easy',
    tags: ['useState', 'controlled inputs', 'math'],
    description: 'Implement a real-time temperature converter between Celsius, Fahrenheit, and Kelvin. Validate that values do not go below absolute zero.',
    starterCode: `import { useState } from 'react'

export default function App() {
  const [celsius, setCelsius] = useState('')
  const [fahrenheit, setFahrenheit] = useState('')
  const [kelvin, setKelvin] = useState('')

  const fromCelsius = (c: number) => ({
    celsius: c,
    fahrenheit: (c * 9/5) + 32,
    kelvin: c + 273.15,
  })

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px' }}>
      <h1>Temperature Converter</h1>
      <label>°C <input value={celsius} onChange={e => { /* convert and set all */ }} /></label>
      <label>°F <input value={fahrenheit} onChange={e => { /* convert and set all */ }} /></label>
      <label>K  <input value={kelvin} onChange={e => { /* convert and set all */ }} /></label>
    </div>
  )
}
`,
  },
  {
    id: 'build-a-theme-toggle',
    title: 'Build a Dark/Light Theme Toggle',
    difficulty: 'easy',
    tags: ['useState', 'useEffect', 'localStorage', 'CSS variables'],
    description: 'Implement a dark/light mode toggle that persists to localStorage and applies theme via CSS custom properties. Read OS preference as fallback.',
    starterCode: `import { useState, useEffect } from 'react'

export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', background: dark ? '#1a1a1a' : '#fff', color: dark ? '#fff' : '#000', minHeight: '100vh' }}>
      <h1>Theme Toggle</h1>
      <button onClick={() => setDark(!dark)}>{dark ? '☀️ Light Mode' : '🌙 Dark Mode'}</button>
    </div>
  )
}
`,
  },
  {
    id: 'build-a-tic-tac-toe',
    title: 'Build Tic-Tac-Toe',
    difficulty: 'medium',
    tags: ['useState', 'useReducer', 'game'],
    description: 'Create a two-player Tic-Tac-Toe game with win detection, draw detection, highlighted winning combination, move history, and time-travel to previous moves.',
    starterCode: `import { useState } from 'react'

function calculateWinner(squares: (string | null)[]): string | null {
  const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
  for (const [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]
  }
  return null
}

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [step, setStep] = useState(0)
  const current = history[step]
  const winner = calculateWinner(current)
  const xIsNext = step % 2 === 0

  const handleClick = (i: number) => {
    if (current[i] || winner) return
    const next = current.slice()
    next[i] = xIsNext ? 'X' : 'O'
    setHistory(history.slice(0, step + 1).concat([next]))
    setStep(s => s + 1)
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Tic-Tac-Toe</h1>
      {/* 3x3 grid + status + move history */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-todo-list',
    title: 'Build a Todo List',
    difficulty: 'medium',
    tags: ['useState', 'CRUD'],
    description: 'Create a fully functional todo list with add, toggle complete/incomplete, and delete features. Show count of remaining todos.',
    starterCode: todoStarter,
  },
  {
    id: 'build-a-traffic-light',
    title: 'Build a Traffic Light',
    difficulty: 'easy',
    tags: ['useState', 'useEffect', 'setInterval'],
    description: 'Implement a traffic light that cycles through red, yellow, and green on a timer. Provide Start/Stop buttons and allow manual click to override the light.',
    starterCode: `import { useState, useEffect } from 'react'

const lights = ['red', 'yellow', 'green'] as const
type Light = typeof lights[number]
const durations: Record<Light, number> = { red: 3000, yellow: 1000, green: 3000 }

export default function App() {
  const [current, setCurrent] = useState<Light>('red')
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const id = setTimeout(() => {
      setCurrent(l => lights[(lights.indexOf(l) + 1) % 3])
    }, durations[current])
    return () => clearTimeout(id)
  }, [current, running])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Traffic Light</h1>
      {/* Render 3 circles, highlight active one */}
      <button onClick={() => setRunning(r => !r)}>{running ? 'Stop' : 'Start'}</button>
    </div>
  )
}
`,
  },
  {
    id: 'build-a-transfer-list',
    title: 'Build a Transfer List',
    difficulty: 'medium',
    tags: ['useState', 'list management'],
    description: 'Create a dual-list transfer component. Move items between Available and Selected lists using checkboxes and transfer buttons (Move all / Move checked).',
    starterCode: `import { useState } from 'react'

const initialLeft = ['React', 'Vue', 'Angular', 'Svelte', 'Next.js']
const initialRight: string[] = []

export default function App() {
  const [left, setLeft] = useState(initialLeft)
  const [right, setRight] = useState(initialRight)
  const [leftChecked, setLeftChecked] = useState<string[]>([])
  const [rightChecked, setRightChecked] = useState<string[]>([])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', display: 'flex', gap: '1rem', alignItems: 'center' }}>
      {/* Left list with checkboxes */}
      {/* Transfer buttons: → >> ← << */}
      {/* Right list with checkboxes */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-tweet',
    title: 'Build a Tweet Component',
    difficulty: 'easy',
    tags: ['components', 'props', 'JSX'],
    description: 'Create a static Tweet UI card with author info, content, optional image, and action buttons (Like/Retweet/Reply). Highlight @mentions and #hashtags in blue. Toggle like state.',
    starterCode: `import { useState } from 'react'

const tweet = {
  author: 'Yokesh',
  handle: '@yokesh_ks',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Yokesh',
  timestamp: '2h ago',
  text: 'Just built a #React component with #WebContainers! @StackBlitz makes it so easy to run Node.js in the browser.',
  likes: 42,
  retweets: 12,
}

export default function App() {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(tweet.likes)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      {/* Tweet card with avatar, author, text, actions */}
    </div>
  )
}
`,
  },
  {
    id: 'build-a-weather-app',
    title: 'Build a Weather App',
    difficulty: 'medium',
    tags: ['useEffect', 'useState', 'API', 'fetch'],
    description: 'Create a weather app that fetches current conditions and a 5-day forecast by city. Store last searched city in localStorage. Support C/F toggle.',
    starterCode: `import { useState, useEffect } from 'react'

// Note: Use https://wttr.in/{city}?format=j1 for a free weather API (no key needed)

export default function App() {
  const [city, setCity] = useState(() => localStorage.getItem('lastCity') || 'Chennai')
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [celsius, setCelsius] = useState(true)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h1>Weather App</h1>
      {/* City search, current conditions, forecast */}
    </div>
  )
}
`,
  },
  {
    id: 'build-an-accordion',
    title: 'Build an Accordion',
    difficulty: 'medium',
    tags: ['useState', 'components', 'UI'],
    description: 'Create a collapsible accordion component where each section can be independently expanded or collapsed. All sections are collapsed by default.',
    starterCode: `import { useState } from 'react'

const sections = [
  { title: 'What is React?', content: 'React is a JavaScript library for building user interfaces.' },
  { title: 'What is JSX?', content: 'JSX is a syntax extension that allows writing HTML-like code in JavaScript.' },
  { title: 'What are hooks?', content: 'Hooks let you use state and other React features in function components.' },
]

export default function App() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h1>Accordion</h1>
      {sections.map((s, i) => (
        <div key={i} style={{ border: '1px solid #ccc', marginBottom: '4px' }}>
          <button style={{ width: '100%', textAlign: 'left', padding: '1rem' }} onClick={() => setOpen(open === i ? null : i)}>
            {s.title}
          </button>
          {open === i && <div style={{ padding: '1rem' }}>{s.content}</div>}
        </div>
      ))}
    </div>
  )
}
`,
  },
  {
    id: 'build-an-analog-clock',
    title: 'Build an Analog Clock',
    difficulty: 'medium',
    tags: ['useState', 'useEffect', 'SVG', 'Math'],
    description: 'Implement an SVG-based analog clock with hour, minute, and second hands that update in real-time using trigonometry. Show 12 hour markers and 60 minute marks.',
    starterCode: `import { useState, useEffect } from 'react'

export default function App() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const size = 200
  const cx = size / 2
  const toRad = (deg: number) => (deg - 90) * (Math.PI / 180)
  const hand = (angle: number, length: number) => ({
    x: cx + length * Math.cos(toRad(angle)),
    y: cx + length * Math.sin(toRad(angle)),
  })

  const s = time.getSeconds()
  const m = time.getMinutes() + s / 60
  const h = (time.getHours() % 12) + m / 60

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Analog Clock</h1>
      <svg width={size} height={size}>
        <circle cx={cx} cy={cx} r={cx - 5} fill="white" stroke="#333" strokeWidth="3" />
        {/* Hour markers, minute markers, hands */}
        <line x1={cx} y1={cx} x2={hand(h * 30, 55).x} y2={hand(h * 30, 55).y} stroke="#333" strokeWidth="4" strokeLinecap="round" />
        <line x1={cx} y1={cx} x2={hand(m * 6, 70).x} y2={hand(m * 6, 70).y} stroke="#333" strokeWidth="2" strokeLinecap="round" />
        <line x1={cx} y1={cx} x2={hand(s * 6, 75).x} y2={hand(s * 6, 75).y} stroke="red" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  )
}
`,
  },
  {
    id: 'build-an-autocomplete',
    title: 'Build an Autocomplete Input',
    difficulty: 'hard',
    tags: ['useRef', 'useEffect', 'keyboard navigation'],
    description: 'Implement an autocomplete input with async suggestions, 300ms debounce, keyboard navigation (ArrowUp/Down, Enter, Escape), and outside click to close.',
    starterCode: `import { useState, useEffect, useRef } from 'react'

const fruits = ['Apple', 'Apricot', 'Avocado', 'Banana', 'Blueberry', 'Cherry', 'Date', 'Fig', 'Grape', 'Guava']

export default function App() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [active, setActive] = useState(-1)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setTimeout(() => {
      if (query) setSuggestions(fruits.filter(f => f.toLowerCase().startsWith(query.toLowerCase())))
      else setSuggestions([])
    }, 300)
    return () => clearTimeout(id)
  }, [query])

  return (
    <div ref={ref} style={{ padding: '2rem', fontFamily: 'sans-serif', position: 'relative' }}>
      <h1>Autocomplete</h1>
      <input value={query} onChange={e => { setQuery(e.target.value); setOpen(true); setActive(-1) }}
        onKeyDown={e => { /* Arrow keys, Enter, Escape */ }} />
      {open && suggestions.length > 0 && (
        <ul style={{ position: 'absolute', border: '1px solid #ccc', background: 'white', listStyle: 'none', padding: 0, margin: 0, width: '100%' }}>
          {/* Suggestion items */}
        </ul>
      )}
    </div>
  )
}
`,
  },
  {
    id: 'build-an-image-carousel',
    title: 'Build an Image Carousel',
    difficulty: 'medium',
    tags: ['useState', 'useEffect', 'useRef'],
    description: 'Create an image carousel with Previous/Next navigation, auto-play every 3 seconds (pause on hover), dot indicators, and wrap-around behavior.',
    starterCode: `import { useState, useEffect, useRef } from 'react'

const images = [
  'https://picsum.photos/seed/1/600/300',
  'https://picsum.photos/seed/2/600/300',
  'https://picsum.photos/seed/3/600/300',
  'https://picsum.photos/seed/4/600/300',
]

export default function App() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setCurrent(c => (c + 1) % images.length), 3000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '640px' }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <h1>Image Carousel</h1>
      <img src={images[current]} alt="" style={{ width: '100%', display: 'block' }} />
      {/* Previous/Next buttons, dot indicators */}
    </div>
  )
}
`,
  },
  {
    id: 'build-an-infinite-scroll',
    title: 'Build an Infinite Scroll List',
    difficulty: 'hard',
    tags: ['useEffect', 'useRef', 'IntersectionObserver'],
    description: 'Implement infinite scroll using the IntersectionObserver API (not scroll event listeners). Append paginated data when the sentinel element is visible. Show loading indicator.',
    starterCode: `import { useState, useEffect, useRef } from 'react'

const PAGE_SIZE = 10

function fetchPage(page: number): Promise<string[]> {
  return new Promise(resolve => setTimeout(() => {
    if (page > 5) resolve([]) // 5 pages total
    else resolve(Array.from({ length: PAGE_SIZE }, (_, i) => \`Item \${(page - 1) * PAGE_SIZE + i + 1}\`))
  }, 800))
}

export default function App() {
  const [items, setItems] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  // Use IntersectionObserver on sentinelRef to load next page

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxHeight: '80vh', overflow: 'auto' }}>
      <h1>Infinite Scroll</h1>
      {items.map(item => <div key={item} style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>{item}</div>)}
      {loading && <p>Loading...</p>}
      <div ref={sentinelRef} />
    </div>
  )
}
`,
  },
  {
    id: 'build-an-otp-input',
    title: 'Build an OTP Input',
    difficulty: 'medium',
    tags: ['useRef', 'useState', 'keyboard events'],
    description: 'Implement a one-time password input with N individual digit boxes (default 6). Auto-focus next on digit entry, backspace moves to previous, handle paste of full OTP.',
    starterCode: `import { useState, useRef } from 'react'

export default function App() {
  const length = 6
  const [otp, setOtp] = useState(Array(length).fill(''))
  const refs = useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (i: number, val: string) => {
    // Update otp[i], focus next
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Backspace: focus previous if empty
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>OTP Input</h1>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {otp.map((val, i) => (
          <input key={i} ref={el => { refs.current[i] = el }} value={val} maxLength={1}
            onChange={e => handleChange(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)}
            style={{ width: '48px', height: '48px', textAlign: 'center', fontSize: '1.5rem', border: '2px solid #ccc', borderRadius: '8px' }} />
        ))}
      </div>
      <p>OTP: {otp.join('')}</p>
    </div>
  )
}
`,
  },
  {
    id: 'build-connect-four',
    title: 'Build Connect Four',
    difficulty: 'hard',
    tags: ['useState', 'useReducer', 'game', 'algorithm'],
    description: 'Implement the Connect Four board game (7×6 grid). Discs fall to the lowest row. Detect horizontal, vertical, and diagonal wins. Show winning discs and a New Game button.',
    starterCode: `import { useState } from 'react'

const ROWS = 6
const COLS = 7

type Player = 'R' | 'Y' | null
type Board = Player[][]

const emptyBoard = (): Board => Array(ROWS).fill(null).map(() => Array(COLS).fill(null))

export default function App() {
  const [board, setBoard] = useState<Board>(emptyBoard())
  const [player, setPlayer] = useState<'R' | 'Y'>('R')
  const [winner, setWinner] = useState<Player>(null)

  const drop = (col: number) => {
    // Find lowest empty row in col, place player disc, check winner
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Connect Four</h1>
      <p>{winner ? \`Player \${winner} wins!\` : \`Player \${player}'s turn\`}</p>
      {/* Render 7x6 grid */}
    </div>
  )
}
`,
  },
  {
    id: 'build-grid-lights',
    title: 'Build Grid Lights',
    difficulty: 'medium',
    tags: ['useState', 'useEffect', 'grid'],
    description: 'Create an interactive N×M grid where cells toggle on/off on click. A Play button triggers sequential light-up animation (300ms each). Reset turns off cells in reverse order.',
    starterCode: `import { useState, useEffect } from 'react'

export default function App() {
  const rows = 3
  const cols = 3
  const [on, setOn] = useState<Set<number>>(new Set())
  const [order, setOrder] = useState<number[]>([])

  const toggle = (i: number) => {
    setOn(prev => {
      const next = new Set(prev)
      if (next.has(i)) { next.delete(i); setOrder(o => o.filter(x => x !== i)) }
      else { next.add(i); setOrder(o => [...o, i]) }
      return next
    })
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Grid Lights</h1>
      <div style={{ display: 'grid', gridTemplateColumns: \`repeat(\${cols}, 60px)\`, gap: '8px', marginBottom: '1rem' }}>
        {Array.from({ length: rows * cols }, (_, i) => (
          <div key={i} onClick={() => toggle(i)}
            style={{ width: 60, height: 60, background: on.has(i) ? 'gold' : '#eee', cursor: 'pointer', borderRadius: '4px' }} />
        ))}
      </div>
      {/* Play and Reset buttons */}
    </div>
  )
}
`,
  },
  {
    id: 'build-nested-checkboxes',
    title: 'Build Nested Checkboxes',
    difficulty: 'hard',
    tags: ['useState', 'recursion', 'tree', 'indeterminate'],
    description: 'Create a tree of nested checkboxes. Parent reflects children state (checked/unchecked/indeterminate). Checking a parent updates all descendants. Use ref.indeterminate for visual state.',
    starterCode: `import { useState, useRef, useEffect } from 'react'

type Node = { id: string; label: string; children?: Node[] }

const tree: Node[] = [
  { id: '1', label: 'Frontend', children: [
    { id: '1a', label: 'React', children: [
      { id: '1a1', label: 'Hooks' },
      { id: '1a2', label: 'Context' },
    ]},
    { id: '1b', label: 'CSS' },
  ]},
  { id: '2', label: 'Backend', children: [
    { id: '2a', label: 'Node.js' },
    { id: '2b', label: 'Express' },
  ]},
]

export default function App() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Nested Checkboxes</h1>
      {/* Recursive checkbox tree */}
    </div>
  )
}
`,
  },
  {
    id: 'build-selectable-cells',
    title: 'Build Selectable Cells',
    difficulty: 'hard',
    tags: ['useState', 'useRef', 'mouse events', 'keyboard modifiers'],
    description: 'Create a grid with single click, Ctrl+click (multi-select toggle), and Shift+click (rectangular range select) support. Show selection count.',
    starterCode: `import { useState, useRef } from 'react'

const ROWS = 5
const COLS = 6

export default function App() {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const lastSelected = useRef<string | null>(null)

  const cellKey = (r: number, c: number) => \`\${r}-\${c}\`

  const handleClick = (r: number, c: number, e: React.MouseEvent) => {
    const key = cellKey(r, c)
    // Single click: select only this
    // Ctrl/Cmd+click: toggle without affecting others
    // Shift+click: rectangular range from lastSelected to this
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Selectable Cells ({selected.size} selected)</h1>
      <div style={{ display: 'grid', gridTemplateColumns: \`repeat(\${COLS}, 60px)\`, gap: '4px' }}>
        {Array.from({ length: ROWS }, (_, r) =>
          Array.from({ length: COLS }, (_, c) => {
            const key = cellKey(r, c)
            return (
              <div key={key} onClick={e => handleClick(r, c, e)}
                style={{ width: 60, height: 60, background: selected.has(key) ? '#4CAF50' : '#eee', cursor: 'pointer', borderRadius: '4px', userSelect: 'none' }} />
            )
          })
        )}
      </div>
    </div>
  )
}
`,
  },
  {
    id: 'build-a-tabs',
    title: 'Build a Tabs Component',
    difficulty: 'medium',
    tags: ['useState', 'components', 'accessibility'],
    description: 'Create a reusable Tabs component with a horizontal tab bar. Clicking a tab shows its content. Support defaultTab prop and keyboard accessibility (Tab/Enter/Space).',
    starterCode: `import { useState } from 'react'

const tabs = [
  { label: 'Overview', content: 'This is the overview tab content.' },
  { label: 'Features', content: 'This is the features tab content.' },
  { label: 'Pricing', content: 'This is the pricing tab content.' },
]

export default function App() {
  const [active, setActive] = useState(0)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h1>Tabs Component</h1>
      <div role="tablist" style={{ display: 'flex', borderBottom: '2px solid #ccc' }}>
        {tabs.map((tab, i) => (
          <button key={i} role="tab" aria-selected={active === i}
            onClick={() => setActive(i)}
            style={{ padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer',
              borderBottom: active === i ? '2px solid #333' : 'none', fontWeight: active === i ? 'bold' : 'normal' }}>
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" style={{ padding: '1rem' }}>
        {tabs[active].content}
      </div>
    </div>
  )
}
`,
  },
  {
    id: 'build-use-throttle-hook',
    title: 'Build a useThrottle Hook',
    difficulty: 'medium',
    tags: ['custom hooks', 'useRef', 'useEffect', 'performance'],
    description: 'Implement a custom useThrottle hook that limits how frequently a value is updated. Use leading-edge strategy. Include a scroll position tracker demo.',
    starterCode: `import { useState, useEffect, useRef } from 'react'

function useThrottle<T>(value: T, delay: number): T {
  const [throttled, setThrottled] = useState(value)
  const lastUpdated = useRef<number>(0)

  useEffect(() => {
    const now = Date.now()
    const elapsed = now - lastUpdated.current
    if (elapsed >= delay) {
      setThrottled(value)
      lastUpdated.current = now
    } else {
      const id = setTimeout(() => {
        setThrottled(value)
        lastUpdated.current = Date.now()
      }, delay - elapsed)
      return () => clearTimeout(id)
    }
  }, [value, delay])

  return throttled
}

export default function App() {
  const [input, setInput] = useState('')
  const throttled = useThrottle(input, 1000)

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>useThrottle Hook</h1>
      <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type fast..." />
      <p>Raw: {input}</p>
      <p>Throttled (1s): {throttled}</p>
    </div>
  )
}
`,
  },
  {
    id: 'build-wordle',
    title: 'Build Wordle',
    difficulty: 'hard',
    tags: ['useState', 'useEffect', 'keyboard events', 'game'],
    description: 'Implement the Wordle word-guessing game: 6 attempts to guess a 5-letter word. Color-code tiles (green=correct position, yellow=wrong position, grey=not in word). Update on-screen keyboard.',
    starterCode: `import { useState, useEffect } from 'react'

const WORDS = ['REACT', 'HOOKS', 'STATE', 'PROPS', 'REDUX', 'FIBER', 'QUERY', 'VITE']
const TARGET = WORDS[Math.floor(Math.random() * WORDS.length)]
const MAX_GUESSES = 6

type TileState = 'correct' | 'present' | 'absent' | 'empty' | 'active'

const colors: Record<TileState, string> = {
  correct: '#538d4e', present: '#b59f3b', absent: '#3a3a3c', empty: '#121213', active: '#818384'
}

export default function App() {
  const [guesses, setGuesses] = useState<string[]>([])
  const [current, setCurrent] = useState('')
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Handle letter keys, Backspace, Enter
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [current, guesses, gameOver])

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Wordle</h1>
      {/* 6x5 grid of tiles */}
      {/* On-screen keyboard */}
    </div>
  )
}
`,
  },
]
