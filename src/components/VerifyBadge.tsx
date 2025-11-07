import Link from 'next/link'

export default function VerifyBadge() {
  return (
    <Link
      href="/provenance"
      className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-sm transition-colors hover:opacity-80 dark:border-zinc-700 dark:bg-zinc-900"
    >
      <span className="font-medium">Verify</span>
      <span className="text-xs opacity-70">β</span>
    </Link>
  )
}
