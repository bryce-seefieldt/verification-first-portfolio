'use client'

import { useDarkMode } from '@/app/lib/hooks'

export function ThemeToggle() {
  const [isDark, setIsDark] = useDarkMode()

  return (
    <button
      type="button"
      onClick={() => setIsDark(!isDark)}
      className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      aria-label="Toggle dark mode"
    >
      <span className={`h-2 w-2 rounded-full ${isDark ? 'bg-yellow-300' : 'bg-zinc-800'}`} />
      <span>{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}
