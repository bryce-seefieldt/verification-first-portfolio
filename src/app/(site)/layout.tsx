import type { Metadata } from 'next'
import Link from 'next/link'
import { ThemeToggle } from '@/app/components/ui/ThemeToggle'

export const metadata: Metadata = {
  title: 'Verification-First Portfolio',
  description: 'A portfolio showcasing verification-first development practices',
}

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="container-lg flex h-16 items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2 font-semibold">
            <span className="bg-brand-500 h-2 w-2 rounded-full" />
            Bryce Seefieldt | Development Portfolio
          </Link>
          <nav className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
            <Link href="/" className="hover:text-brand-600 dark:hover:text-brand-400">
              Home
            </Link>
            <Link href="#" className="hover:text-brand-600 dark:hover:text-brand-400">
              Case Studies
            </Link>
            <Link href="#" className="hover:text-brand-600 dark:hover:text-brand-400">
              ADRs
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="container-lg py-10">{children}</main>

      <footer className="mt-16 border-t border-zinc-200 py-8 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
        <div className="container-lg flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p>© {new Date().getFullYear()} Verification-First Portfolio</p>
          <p>
            Built with <span className="text-brand-600 dark:text-brand-400">Next.js</span> &
            Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  )
}
