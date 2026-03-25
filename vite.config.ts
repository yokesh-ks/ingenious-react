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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), coiServiceworkerPlugin()],
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
