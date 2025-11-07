# Copilot Instructions - Verification-First Portfolio

## Project Overview

This is a **verification-first** Next.js 16 TypeScript portfolio showcasing production-ready development practices including cryptographic provenance, real-time evaluations, automated quality gates, and disaster recovery readiness.

### Core Philosophy

**Verification-First Development**: Define success criteria and evaluation harnesses BEFORE implementation. Every feature must be measurable, every claim must be provable, every decision must be documented.

### Key Differentiators

1. **Live Evaluations**: Test results published as JSON artifacts (`/evals-results.json`), viewable at `/evals/live`
2. **Cryptographic Provenance**: SHA-256 hashing of all MDX content with future blockchain anchoring capability
3. **DR/BCP Ready**: Automated backups, infrastructure-as-code, documented runbooks, uptime monitoring
4. **Pre-commit Quality Gates**: Husky + lint-staged (Prettier + ESLint) on every commit
5. **Observability**: Hourly uptime checks with sparkline visualization

## Current State (as of November 2025)

### Completed Features

#### ✅ Core Infrastructure

- Next.js 16 with App Router and React 19.2 (React Compiler enabled)
- TypeScript strict mode throughout
- Tailwind CSS v4 with custom design tokens (`@theme` in globals.css)
- pnpm package manager with Corepack
- ESLint 9 (flat config) + Prettier 3
- Husky + lint-staged pre-commit hooks

#### ✅ Routes & Pages

- `/` - Homepage with hero, features, featured case studies
- `/case-studies` - Filterable case study grid with stats
- `/case-studies/[slug]` - Dynamic MDX rendering with VerifyBadge
- `/work-trials` - Fork-ready project templates with downloadable proposal
- `/evals` - Evaluation overview
- `/evals/live` - Real-time evaluation dashboard (reads `/evals-results.json`)
- `/provenance` - Hashed artifacts table with copy buttons
- `/about` - Profile, DR/BCP signals, uptime sparkline
- `/changelog` - Development timeline
- `/api/ping` - Health check endpoint (Edge runtime)
- `/api/health` - Legacy health endpoint

#### ✅ Components

**Feature Components:**

- `VerifyBadge` - Links to provenance page, shows "Verify β"
- `CopyButton` - Clipboard copy with visual feedback
- `UptimeSparkline` - SVG sparkline for uptime visualization
- `FeaturedCaseStudyCard` - Homepage case study cards
- `CaseStudyCard` - Full case study card with tags/metrics

**UI Primitives:**

- `Button`, `Card`, `Badge`, `Separator`, `Tabs` (Radix-based)
- `ThemeToggle` - Light/dark mode with system preference

**Shared:**

- `PageHeader`, `Section`, `Navbar`, `Footer`

#### ✅ Automation & Scripts

- `scripts/hash-content.ts` - SHA-256 hash MDX files → `public/provenance/index.json`
- `scripts/check-uptime.ts` - Fetch `/api/ping` → append to `public/uptime.json`
- `evals/run.ts` - Run eval suites → `public/evals-results.json`
- `.github/workflows/ci.yml` - Lint → Evals → Provenance → Build → Health Check
- `.github/workflows/uptime.yml` - Hourly cron calling `/api/ping`

#### ✅ Content

- 2 MDX case studies: `incident-copilot.mdx`, `eval-first-rag.mdx`
- Templates: `content/casestudies/_template.mdx`, `content/work-trials/_proposal-template.mdx`
- 1 JSONL eval dataset: `evals/datasets/rag-basics.jsonl` (10 test cases, 100% pass rate)

#### ✅ Configuration

- `src/site.config.ts` - Centralized site metadata, author, social links, nav, features
- `.devcontainer/devcontainer.json` - One-click dev environment (Node 22, pnpm, Prettier, ESLint)

### In Progress / Planned

- [ ] On-chain anchoring smart contract (Sepolia testnet)
- [ ] Additional case studies (2-3 more flagships)
- [ ] ADR documentation in `content/adrs/`
- [ ] Development logs in `content/logs/`
- [ ] PDF generation for work trial proposals
- [ ] Enhanced evaluation datasets (multi-suite testing)

## Tech Stack

- **Framework**: Next.js 16.0.1 with App Router
- **React**: 19.2.0 with React Compiler enabled (`babel-plugin-react-compiler`)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Package Manager**: pnpm (via Corepack)
- **Linting**: ESLint 9 (flat config) with `@typescript-eslint`, `eslint-config-next`
- **Formatting**: Prettier 3 with `prettier-plugin-tailwindcss`
- **Pre-commit**: Husky + lint-staged
- **Content**: MDX (`next-mdx-remote`), `gray-matter` frontmatter parsing, `reading-time`
- **Validation**: Zod 4 for schema validation
- **UI Components**: Radix UI primitives (`@radix-ui/*`), `lucide-react` icons, `class-variance-authority`
- **CI/CD**: GitHub Actions (Node 20, pnpm cache)

## Project Architecture

### File Organization

```
src/
├── app/
│   ├── (site)/              # Route group (doesn't affect URL structure)
│   │   ├── layout.tsx       # Site layout with Navbar + Footer
│   │   ├── page.tsx         # Homepage
│   │   ├── about/page.tsx
│   │   ├── case-studies/
│   │   │   ├── page.tsx     # Index with filters/stats
│   │   │   └── [slug]/page.tsx  # Dynamic MDX rendering
│   │   ├── changelog/page.tsx
│   │   ├── evals/
│   │   │   ├── page.tsx     # Overview
│   │   │   └── live/page.tsx    # Dashboard (reads evals-results.json)
│   │   ├── provenance/page.tsx  # Hashed artifacts (reads provenance/index.json)
│   │   └── work-trials/page.tsx # Templates + proposal download
│   ├── api/
│   │   ├── health/route.ts  # Legacy health check
│   │   └── ping/route.ts    # Modern health/uptime endpoint (Edge)
│   ├── components/
│   │   ├── features/        # Domain-specific components
│   │   ├── ui/              # Radix-based primitives
│   │   ├── CopyButton.tsx   # Client component for clipboard
│   │   ├── UptimeSparkline.tsx  # Client SVG sparkline
│   │   └── VerifyBadge.tsx  # Client link to /provenance
│   ├── evals/
│   │   └── harness/EvaluationHarness.ts
│   ├── lib/
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/index.ts   # cn, formatDate, debounce
│   ├── globals.css          # Tailwind v4 @theme + @utility
│   └── layout.tsx           # Root layout
├── components/              # Shared layout components
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   ├── PageHeader.tsx
│   └── Section.tsx
├── lib/
│   └── mdx.tsx              # MDX parsing, reading, component overrides
└── site.config.ts           # Centralized configuration

content/
├── casestudies/             # MDX case studies
│   ├── _template.mdx        # Template (ignored by MDX reader due to _ prefix)
│   ├── incident-copilot.mdx
│   └── eval-first-rag.mdx
└── work-trials/
    └── _proposal-template.mdx

evals/
├── datasets/
│   └── rag-basics.jsonl     # JSONL test cases (id, input, expected)
├── run.ts                   # Eval runner (writes public/evals-results.json)
├── schema.ts                # Zod schemas (EvalCase, EvalResult, EvalSuiteResults)
└── README.md

scripts/
├── hash-content.ts          # SHA-256 hashing (writes public/provenance/index.json)
├── check-uptime.ts          # Uptime monitor (appends public/uptime.json)
└── health-check.js          # Build health verification

public/
├── evals-results.json       # Generated by CI
├── uptime.json              # Generated by uptime cron
└── provenance/
    └── index.json           # Generated by CI
```

### Data Flow

1. **CI Workflow** (`.github/workflows/ci.yml`):
   - Install → Lint → Run Evals → Hash Content → Build → Health Check
   - Evals write to `public/evals-results.json`
   - Hashing writes to `public/provenance/index.json`

2. **Uptime Workflow** (`.github/workflows/uptime.yml`):
   - Hourly cron calls `/api/ping`
   - Appends status to `public/uptime.json`
   - Commits with `[skip ci]` to avoid circular builds

3. **Build Time**:
   - MDX files in `content/casestudies/` read by `src/lib/mdx.tsx`
   - Static pages generated for all routes
   - JSON artifacts served as static files

4. **Runtime**:
   - `/evals/live` reads `public/evals-results.json` server-side
   - `/provenance` reads `public/provenance/index.json` server-side
   - `UptimeSparkline` fetches `/uptime.json` client-side

## Development Guidelines

### Code Style & Patterns

- **TypeScript**: Strict mode enabled; avoid `any`, use `unknown` for generic constraints
- **Components**: Functional components with hooks; use `'use client'` directive for client components
- **Styling**: Tailwind utility-first; custom tokens via `@theme` in globals.css
- **Imports**: Use `@/` path alias for src directory
- **Formatting**: Prettier runs on save; pre-commit hook auto-fixes
- **Linting**: ESLint flat config; no console.log (use console.warn/console.error)

### Component Conventions

```tsx
// Server Component (default)
export default function ServerPage() {
  const data = await fetchData() // Can use async/await
  return <div>{data}</div>
}

// Client Component (interactivity)
;('use client')
export function ClientButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>
}

// Metadata export for pages
export const metadata = {
  title: 'Page Title',
  description: 'Page description for SEO',
}
```

### MDX Content

**Frontmatter Structure** (case studies):

```yaml
---
title: "Case Study Title"
date: 2025-11-07
summary: "Brief description"
tags: ["ai", "reliability"]
status: "MVP" | "Production" | "Beta"
repo: "owner/repo"
metrics:
  - label: "Latency p95"
    value: "123ms"
---
```

**Template Files**: Prefix with `_` (e.g., `_template.mdx`) to exclude from rendering

### Evaluation Datasets

**JSONL Format** (`evals/datasets/*.jsonl`):

```json
{"id": "test-1", "input": "Prompt text", "expected": "keyword to check"}
{"id": "test-2", "input": "Another prompt", "expected": "expected substring"}
```

**Running**:

```bash
pnpm tsx evals/run.ts dataset-name
pnpm tsx evals/run.ts --verbose  # Show individual results
```

### Provenance Hashing

**Generating Hashes**:

```bash
pnpm tsx scripts/hash-content.ts
```

**Output**: `public/provenance/index.json`

```json
{
  "generatedAt": "2025-11-07T18:53:13.748Z",
  "entries": [{ "path": "content/casestudies/incident-copilot.mdx", "sha256": "92ed797d..." }]
}
```

### Uptime Monitoring

**Manual Check**:

```bash
SITE_URL=https://your-site.vercel.app pnpm tsx scripts/check-uptime.ts
```

**Output**: Appends to `public/uptime.json`

```json
{
  "checks": [
    {"timestamp": "2025-11-07T19:00:00.000Z", "status": "ok", "responseTime": 145}
  ],
  "lastUpdated": "2025-11-07T19:00:00.000Z"

## Key Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm tsx evals/run.ts <dataset>` - Run evaluation suite
- `pnpm tsx scripts/hash-content.ts` - Generate provenance hashes
- `pnpm tsx scripts/check-uptime.ts` - Manual uptime check

## Continuation Points

### Immediate Next Steps

1. **On-Chain Anchoring** (High Priority)
  - Deploy smart contract to Sepolia testnet
  - Implement hash submission from CI workflow
  - Add blockchain verification UI to /provenance page
  - Update VerifyBadge with on-chain status indicator

2. **Additional Case Studies** (High Priority)
  - Create 2-3 more flagship case studies in content/casestudies/
  - Each should follow _template.mdx structure with metrics, tags, status
  - Generate hashes and update provenance index
  - Add to featured projects if appropriate

3. **ADR Documentation** (Medium Priority)
  - Create content/adrs/ directory
  - Document key decisions: verification-first approach, Tailwind v4 choice, React Compiler rationale, MDX for content, provenance design
  - Template: Title, Status, Context, Decision, Consequences

4. **Development Logs** (Medium Priority)
  - Create content/logs/ directory for process documentation
  - Document build sessions, debugging sessions, design iterations
  - Useful for demonstrating process-oriented thinking

5. **PDF Generation for Work Trials** (Low Priority)
  - Implement server-side PDF generation for proposal one-pagers
  - Consider using @vercel/og or puppeteer
  - Add download button to /work-trials page

### Feature Enhancements

- **Evaluation System**:
  - Add more diverse datasets (beyond rag-basics.jsonl)
  - Implement LLM-as-judge evaluations (replace keyword mock with real model)
  - Add latency benchmarks and cost tracking
  - Create comparative eval dashboards

- **Observability**:
  - Enhance uptime sparkline with tooltips showing exact timestamps
  - Add error rate tracking (not just ok/error)
  - Implement alerting (webhook on consecutive failures)
  - Add performance metrics (TTFB, FCP, LCP)

- **UI/UX**:
  - Add search functionality to case studies page
  - Implement tag-based filtering on /case-studies
  - Add RSS feed for changelog
  - Create print-friendly case study layouts

### Technical Debt

- None identified (all lint warnings resolved, build passing, CI green)

## Architecture Decisions

### Verification-First Philosophy

**Decision**: Every feature must have measurable success criteria and evaluation harnesses defined BEFORE implementation.

**Rationale**: Shifts focus from "does it work?" to "can we prove it works?" Enables automated quality gates, continuous validation, and objective claims about system behavior.

**Implementation**: Evaluation harness (`evals/`), cryptographic provenance (`scripts/hash-content.ts`), CI integration (lint→evals→provenance→build pipeline).

### Tailwind CSS v4

**Decision**: Adopt Tailwind CSS v4 (beta) with PostCSS integration instead of v3.

**Rationale**: Native CSS custom properties via `@theme`, better performance with Just-in-Time compilation, future-proof architecture aligned with CSS standards.

**Trade-offs**: Beta software risk (mitigated by stable API surface), some class name changes (e.g., `bg-gradient-to-br` → `bg-linear-to-br`).

### React Compiler

**Decision**: Enable React Compiler via `babel-plugin-react-compiler` in Next.js config.

**Rationale**: Automatic memoization and optimization without manual useMemo/useCallback. Reduces cognitive load and eliminates common performance pitfalls.

**Implementation**: `next.config.ts` with experimental.reactCompiler = true.

### MDX for Content

**Decision**: Use MDX with `next-mdx-remote` for case studies and documentation instead of CMS or database.

**Rationale**: Git-based version control, typesafe frontmatter with Zod, developer-friendly editing, cryptographic provenance via file hashing, no runtime dependencies.

**Trade-offs**: No WYSIWYG editor for non-technical users (acceptable for developer portfolio), requires build step for changes.

### Provenance Design

**Decision**: SHA-256 hash all content artifacts, publish to public JSON index, prepare for blockchain anchoring.

**Rationale**: Establishes immutable audit trail, enables tamper detection, demonstrates security-first thinking, future-proof for on-chain verification.

**Implementation**: `scripts/hash-content.ts` runs in CI, outputs to `public/provenance/index.json`, UI displays hashes with copy buttons, smart contract ready for Sepolia deployment.

### Edge Runtime for Health Checks

**Decision**: Use Edge Runtime for `/api/ping` instead of Node.js runtime.

**Rationale**: Lower latency (deployed globally), lower cost, faster cold starts, sufficient for simple JSON responses.

**Trade-offs**: Limited to Web APIs (no fs, crypto from Node), acceptable for health check use case.

### Evaluation Mock Strategy

**Decision**: Start with deterministic keyword-based mock instead of real LLM for evaluation harness.

**Rationale**: Zero cost, instant feedback, reproducible results, useful for CI validation, easy to reason about failures.

**Future**: Replace with real model (OpenAI, Anthropic) for production evals, keep mock for sanity checks.

### Monorepo Structure (Decided Against)

**Decision**: Use single Next.js app instead of monorepo with separate packages.

**Rationale**: Portfolio project with single deployment target, premature optimization for current scope, simpler CI/CD.

**Reconsider If**: Adding backend services, shared component library, multiple frontends.

## Notes

- React Compiler is enabled for automatic optimizations
- Using Tailwind CSS v4 with PostCSS integration
- Project follows App Router conventions exclusively
- Emphasizes documentation-driven development
}
```

## Key Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Notes

- React Compiler is enabled for automatic optimizations
- Using Tailwind CSS v4 with PostCSS integration
- Project follows App Router conventions exclusively
- Emphasizes documentation-driven development
