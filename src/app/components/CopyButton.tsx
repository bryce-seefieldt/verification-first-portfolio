'use client'
import { useState } from 'react'
import { Clipboard, Check } from 'lucide-react'

interface CopyButtonProps {
  value: string
  label?: string
  className?: string
}

export function CopyButton({ value, label = 'Copy', className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (e) {
      console.error('Copy failed', e)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={
        'inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-medium transition-colors ' +
        (copied
          ? 'border-green-500 bg-green-50 text-green-700 dark:border-green-600 dark:bg-green-900/40 dark:text-green-300 '
          : 'border-zinc-300 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 ') +
        className
      }
      aria-label={copied ? 'Copied!' : label}
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  )
}
