import { useEffect, useRef, useState } from 'react'
import { WebContainer } from '@webcontainer/api'
import { buildFileTree } from '@/data/starter-templates'

export type WCStatus = 'booting' | 'installing' | 'running' | 'error'

const STATUS_MESSAGES: Record<WCStatus, string> = {
  booting: 'Starting environment...',
  installing: 'Installing packages...',
  running: 'Running',
  error: 'Something went wrong',
}

// Singleton — WebContainer allows only one instance per page
let sharedInstance: WebContainer | null = null
let bootPromise: Promise<WebContainer> | null = null

async function getWebContainer(): Promise<WebContainer> {
  if (sharedInstance) return sharedInstance
  if (bootPromise) return bootPromise
  bootPromise = WebContainer.boot().then((wc) => {
    sharedInstance = wc
    return wc
  })
  return bootPromise
}

export function useWebContainer(initialCode: string) {
  const [status, setStatus] = useState<WCStatus>('booting')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const containerRef = useRef<WebContainer | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    mountedRef.current = true

    async function start() {
      try {
        setStatus('booting')
        setPreviewUrl(null)

        const wc = await getWebContainer()
        if (!mountedRef.current) return
        containerRef.current = wc

        await wc.mount(buildFileTree(initialCode))
        if (!mountedRef.current) return

        setStatus('installing')
        const install = await wc.spawn('npm', ['install'])
        const exitCode = await install.exit
        if (!mountedRef.current) return
        if (exitCode !== 0) {
          setStatus('error')
          return
        }

        const dev = await wc.spawn('npm', ['run', 'dev'])
        if (!mountedRef.current) {
          dev.kill()
          return
        }

        wc.on('server-ready', (_port, url) => {
          if (!mountedRef.current) return
          setPreviewUrl(url)
          setStatus('running')
        })
      } catch {
        if (mountedRef.current) setStatus('error')
      }
    }

    start()

    return () => {
      mountedRef.current = false
    }
  }, [])

  const updateCode = async (code: string) => {
    const wc = containerRef.current
    if (!wc) return
    await wc.fs.writeFile('/src/App.tsx', code)
  }

  return {
    status,
    statusMessage: STATUS_MESSAGES[status],
    previewUrl,
    updateCode,
  }
}
