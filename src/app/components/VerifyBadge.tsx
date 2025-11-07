'use client'
import Link from 'next/link'

export function VerifyBadge() {
  return (
    <Link
      href="/provenance"
      className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
    >
      <span className="font-semibold tracking-wide">Verify</span>
      <span className="opacity-70">β</span>
    </Link>
  )
}
