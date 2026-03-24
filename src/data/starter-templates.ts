import type { FileSystemTree } from '@webcontainer/api'

const packageJson = JSON.stringify({
  name: 'challenge',
  private: true,
  version: '0.0.0',
  type: 'module',
  scripts: {
    dev: 'vite --port 3111 --host',
  },
  dependencies: {
    react: '^18.3.0',
    'react-dom': '^18.3.0',
  },
  devDependencies: {
    '@types/react': '^18.3.0',
    '@types/react-dom': '^18.3.0',
    '@vitejs/plugin-react': '^4.3.0',
    vite: '^5.4.0',
  },
}, null, 2)

const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true,
  },
})
`

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Challenge</title>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { font-family: system-ui, sans-serif; }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

const mainTsx = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`

export function buildFileTree(appCode: string): FileSystemTree {
  return {
    'package.json': { file: { contents: packageJson } },
    'vite.config.ts': { file: { contents: viteConfig } },
    'index.html': { file: { contents: indexHtml } },
    src: {
      directory: {
        'main.tsx': { file: { contents: mainTsx } },
        'App.tsx': { file: { contents: appCode } },
      },
    },
  }
}
