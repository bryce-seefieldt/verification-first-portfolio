'use client'
import Link from 'next/link'
/**
 * VerifyBadge - Cryptographic provenance indicator
 *
 * Displays a clickable badge linking to the /provenance page where users can
 * view SHA-256 hashes of all content artifacts. Part of the verification-first
 * approach to ensure content integrity and enable future on-chain anchoring.
 *
 * @example
 * ```tsx
 * <article>
 *   <h1>Case Study Title</h1>
 *   <VerifyBadge />
 * </article>
 * ```
 *
 * @remarks
 * - Client component for hover interactivity
 * - Beta indicator (β) signals upcoming on-chain verification
 * - Styled with Tailwind for light/dark mode support
 */

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
