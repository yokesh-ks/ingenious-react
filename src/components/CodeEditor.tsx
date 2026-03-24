import { useCallback, useEffect, useRef } from 'react'
import MonacoEditor from '@monaco-editor/react'

interface CodeEditorProps {
  value: string
  onChange: (code: string) => void
  theme?: 'vs-dark' | 'light'
}

export function CodeEditor({ value, onChange, theme = 'vs-dark' }: CodeEditorProps) {
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = useCallback(
    (val: string | undefined) => {
      if (val === undefined) return
      if (debounceRef.current) clearTimeout(debounceRef.current)
      debounceRef.current = setTimeout(() => {
        onChange(val)
      }, 500)
    },
    [onChange],
  )

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

  return (
    <MonacoEditor
      height="100%"
      defaultLanguage="javascript"
      value={value}
      theme={theme}
      onChange={handleChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: 'on',
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        tabSize: 2,
        automaticLayout: true,
      }}
    />
  )
}
