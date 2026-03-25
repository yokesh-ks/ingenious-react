import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { Plugin } from 'vite'

// Keeps coi-serviceworker.js in sync with node_modules on every build
function coiServiceworkerPlugin(): Plugin {
  return {
    name: 'coi-serviceworker',
    buildStart() {
      const src = path.resolve(__dirname, 'node_modules/coi-serviceworker/coi-serviceworker.min.js')
      const dest = path.resolve(__dirname, 'public/coi-serviceworker.js')
      fs.copyFileSync(src, dest)
    },
  }
}

// Generates dist/sitemap.xml at build time from static + dynamic route IDs
function sitemapPlugin(): Plugin {
  return {
    name: 'sitemap',
    closeBundle() {
      const { challengeIds, problemIds } = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, 'src/data/sitemap-ids.json'), 'utf-8'),
      ) as { challengeIds: string[]; problemIds: string[] }

      const BASE_URL = 'https://react.ingeniousclan.com'
      const today = new Date().toISOString().split('T')[0]

      const staticRoutes = [
        { path: '/', priority: '1.0', changefreq: 'weekly' },
        { path: '/frontend-coding', priority: '0.9', changefreq: 'weekly' },
        { path: '/js-problems', priority: '0.9', changefreq: 'weekly' },
        { path: '/jobs/chennai', priority: '0.7', changefreq: 'monthly' },
        { path: '/about', priority: '0.4', changefreq: 'monthly' },
      ]

      const urls = [
        ...staticRoutes.map((r) => ({ url: `${BASE_URL}${r.path}`, priority: r.priority, changefreq: r.changefreq })),
        ...challengeIds.map((id) => ({ url: `${BASE_URL}/frontend-coding/${id}`, priority: '0.8', changefreq: 'monthly' })),
        ...problemIds.map((id) => ({ url: `${BASE_URL}/js-problems/${id}`, priority: '0.8', changefreq: 'monthly' })),
      ]

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ url, priority, changefreq }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`

      const outDir = path.resolve(__dirname, 'dist')
      if (fs.existsSync(outDir)) {
        fs.writeFileSync(path.resolve(outDir, 'sitemap.xml'), xml, 'utf-8')
        console.log(`[sitemap] Generated ${urls.length} URLs → dist/sitemap.xml`)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), coiServiceworkerPlugin(), sitemapPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
})
