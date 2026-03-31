import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { kevinPowellCssVideos } from '@/data/kevin-powell-css'
import { useState, useMemo } from 'react'
import { Search, SearchX, PlayCircle } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { buildPageMeta } from '@/lib/seo'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/videos/kevin-powell-css',
  head: () => buildPageMeta({
    title: 'Kevin Powell CSS - Video Tutorials',
    description: '15 videos - Responsive CSS tutorials by Kevin Powell - modern layout techniques, Grid, Flexbox, and more.',
    path: '/videos/kevin-powell-css',
  }),
  component: KevinPowellCssVideos,
})

function KevinPowellCssVideos() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return kevinPowellCssVideos.filter((v) => {
      return !query || v.title.toLowerCase().includes(query.toLowerCase())
    })
  }, [query])

  return (
    <div className="flex flex-col flex-1 p-6 max-w-6xl mx-auto w-full gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Kevin Powell CSS</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {kevinPowellCssVideos.length} videos - Responsive CSS tutorials by Kevin Powell - modern layout techniques, Grid, Flexbox, and more
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos..."
          className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon"><SearchX /></EmptyMedia>
            <EmptyTitle>No videos found</EmptyTitle>
            <EmptyDescription>No videos match your search.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-muted overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                  alt={video.title}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
                <span className="absolute top-2 left-2 px-2 py-0.5 text-xs font-medium rounded-full bg-black/60 text-white">
                  Ep {video.episode}
                </span>
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-sm font-medium text-foreground leading-snug line-clamp-2">
                  {video.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}