import { createRoute } from '@tanstack/react-router'
import { Route as RootRoute } from './__root'
import { buildPageMeta } from '@/lib/seo'
import { namasteJSVideos } from '@/data/namaste-js-videos'
import { ArrowRight, ListVideo } from 'lucide-react'

export const Route = createRoute({
  getParentRoute: () => RootRoute,
  path: '/videos',
  head: () => buildPageMeta({
    title: 'Video Tutorials',
    description: 'Curated JavaScript and React video tutorial series.',
    path: '/videos',
  }),
  component: Videos,
})

const VIDEO_SERIES = [
  {
    href: '/videos/namaste-js',
    thumbnail: `https://img.youtube.com/vi/pN6jk0uUrD8/mqdefault.jpg`,
    thumbnailVideoId: 'pN6jk0uUrD8',
    title: 'Namaste JavaScript',
    author: 'Akshay Saini',
    description: 'Deep dive into JavaScript internals — execution context, closures, promises, async/await, and more.',
    count: namasteJSVideos.length,
    seasons: 2,
  },
]

function Videos() {
  return (
    <div className="flex flex-col flex-1 p-6 max-w-6xl mx-auto w-full gap-6">
      <div>
        <h1 className="text-2xl font-semibold">Videos</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Curated video series to level up your JavaScript and React skills
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {VIDEO_SERIES.map((series) => (
          <a
            key={series.href}
            href={series.href}
            className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:border-primary/40 hover:shadow-md hover:shadow-primary/5 transition-all"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video bg-muted overflow-hidden">
              <img
                src={series.thumbnail}
                alt={series.title}
                crossOrigin="anonymous"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 text-white text-xs font-medium">
                <ListVideo className="w-3 h-3" />
                {series.count} videos · {series.seasons} seasons
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 p-4 gap-1">
              <p className="font-semibold text-foreground">{series.title}</p>
              <p className="text-xs text-primary font-medium">{series.author}</p>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{series.description}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                View all episodes
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
