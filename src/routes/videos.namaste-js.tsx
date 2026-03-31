import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { namasteJSVideos, type SeasonFilter } from '@/data/namaste-js-videos'
import { useState, useMemo } from 'react'
import { Search, SearchX, PlayCircle } from 'lucide-react'
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from '@/components/ui/empty'
import { buildPageMeta } from '@/lib/seo'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/videos/namaste-js',
  head: () => buildPageMeta({
    title: 'Namaste JavaScript – Video Tutorials',
    description: 'Watch all 26 Namaste JavaScript episodes by Akshay Saini covering execution context, closures, promises, async/await, and more.',
    path: '/videos/namaste-js',
  }),
  component: NamasteJSVideos,
})

const SEASON_COUNT: Record<1 | 2, number> = {
  1: namasteJSVideos.filter((v) => v.season === 1).length,
  2: namasteJSVideos.filter((v) => v.season === 2).length,
}

function NamasteJSVideos() {
  const [seasonFilter, setSeasonFilter] = useState<SeasonFilter>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return namasteJSVideos.filter((v) => {
      const matchesSeason = seasonFilter === 'all' || v.season === seasonFilter
      const matchesQuery = !query || v.title.toLowerCase().includes(query.toLowerCase())
      return matchesSeason && matchesQuery
    })
  }, [seasonFilter, query])

  return (
    <div className="flex flex-col flex-1 p-6 max-w-6xl mx-auto w-full gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Namaste JavaScript</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {namasteJSVideos.length} videos · JS tutorials by Akshay Saini — from execution context to async/await
        </p>
      </div>

      {/* Season filter + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1 bg-muted rounded-lg p-1">
          {(['all', 1, 2] as SeasonFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setSeasonFilter(s)}
              className={`px-3 py-1.5 text-sm rounded-md font-medium transition-colors ${
                seasonFilter === s
                  ? 'bg-background shadow text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {s === 'all'
                ? `All (${namasteJSVideos.length})`
                : `Season ${s} (${SEASON_COUNT[s]})`}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos..."
            className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
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
                  S{video.season} · Ep {video.episode}
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
