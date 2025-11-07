import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import React from 'react'

export type MdxFrontmatter = {
  title: string
  date: string
  summary?: string
  tags?: string[]
  status?: string
  repo?: string
  metrics?: Record<string, number | string>
}

export type MdxFile = {
  slug: string
  frontmatter: MdxFrontmatter
  content: string
  readingTime: ReturnType<typeof readingTime>
}

const CONTENT_DIR = path.join(process.cwd(), 'content')
const CASE_STUDIES_DIR = path.join(CONTENT_DIR, 'casestudies')
const LOGS_DIR = path.join(CONTENT_DIR, 'logs')
const ADR_DIR = path.join(CONTENT_DIR, 'adr')

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

export function getCaseStudySlugs(): string[] {
  ensureDir(CASE_STUDIES_DIR)
  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getLogSlugs(): string[] {
  ensureDir(LOGS_DIR)
  return fs
    .readdirSync(LOGS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

export function getAdrSlugs(): string[] {
  ensureDir(ADR_DIR)
  return fs
    .readdirSync(ADR_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

function readMdxFile(dir: string, slug: string): MdxFile {
  const fullPath = path.join(dir, `${slug}.mdx`)
  const raw = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as MdxFrontmatter
  return {
    slug,
    frontmatter: fm,
    content,
    readingTime: readingTime(content),
  }
}

export function getCaseStudyBySlug(slug: string): MdxFile {
  return readMdxFile(CASE_STUDIES_DIR, slug)
}

export function getLogBySlug(slug: string): MdxFile {
  return readMdxFile(LOGS_DIR, slug)
}

export function getAdrBySlug(slug: string): MdxFile {
  return readMdxFile(ADR_DIR, slug)
}

export function listCaseStudies(): MdxFile[] {
  return getCaseStudySlugs()
    .map(getCaseStudyBySlug)
    .sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1))
}

export const mdxComponents: Record<string, React.ComponentType<any>> = {
  h1: (props) => <h1 className="mt-8 mb-4 text-3xl font-bold tracking-tight" {...props} />,
  h2: (props) => <h2 className="mt-8 mb-3 text-2xl font-semibold" {...props} />,
  h3: (props) => <h3 className="mt-6 mb-2 text-xl font-semibold" {...props} />,
  p: (props) => <p className="my-4 leading-7 text-zinc-700 dark:text-zinc-300" {...props} />,
  a: (props) => <a className="text-brand-600 underline" {...props} />,
  ul: (props) => <ul className="my-4 list-disc pl-6" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal pl-6" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-4 border-l-4 pl-4 text-zinc-600 italic dark:text-zinc-400"
      {...props}
    />
  ),
  code: (props) => (
    <code className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800" {...props} />
  ),
  pre: (props) => (
    <pre className="overflow-x-auto rounded-md bg-zinc-100 p-4 dark:bg-zinc-900" {...props} />
  ),
}
