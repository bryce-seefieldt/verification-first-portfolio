# Verification-First Portfolio

A Next.js 16 + TypeScript portfolio built with a verification-first mindset: clear success criteria, evaluation harnesses, ADRs, and automation baked in.

## Stack

- Next.js 16 (App Router)
- React 19.2 with React Compiler
- TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- pnpm (package manager)

## Project Structure

```
src/
	app/
		(site)/               # Main website routes (route group)
			layout.tsx          # Site layout (header, footer, dark mode toggle)
			page.tsx            # Homepage with case studies grid
			api/health/route.ts # Health check endpoint (200 OK)
		components/
			ui/                 # Base UI (Button, Card, ThemeToggle)
			features/           # Feature components (CaseStudyCard)
		lib/
			utils/              # Helpers (cn, formatDate, debounce)
			types/              # TS types (CaseStudy, ADR, etc.)
			hooks/              # Hooks (useLocalStorage, useDarkMode)
		content/
			case-studies/       # Documentation (MD/MDX-ready)
			adrs/               # Architecture Decision Records
			logs/               # Dev logs
		evals/
			harness/            # Evaluation harness (TypeScript)
			datasets/           # Example test suites
scripts/
	postexport/             # Post-export processing
	hashing/                # Content hashing utilities
	health-check.js         # Automated 200-OK health verification
```

Key files:

- `src/app/globals.css`: Tailwind v4 theme tokens and utilities (@theme and @utility)
- `src/app/(site)/layout.tsx`: Minimal layout + dark mode toggle
- `src/app/(site)/page.tsx`: Responsive case-studies grid
- `src/app/(site)/api/health/route.ts`: Health endpoint
- `.github/workflows/ci.yml`: CI for build + health check

## Tailwind Design Tokens

Tokens are defined inline with Tailwind v4’s `@theme` at-rule (brand color scale, semantic colors, radii) and custom utilities via `@utility` (container, container-lg, prose). Some editors may flag these at-rules as unknown; the Next.js build compiles them correctly.

## Getting Started

Prereqs: Node 20+, pnpm.

```bash
# enable corepack if needed
corepack enable

pnpm install
pnpm dev

# open http://localhost:3000
```

## Build & Verify

```bash
# Build production bundle
pnpm build

# Automated health check (builds, starts on 3001, checks / and /api/health)
pnpm run health

# Optional: full export + post-processing + hashing
pnpm run build:full
```

## Scripts

- `dev`: Next dev server
- `build`: Production build
- `start`: Start production server
- `lint`: ESLint
- `health`: Build, run on port 3001, verify 200 OK on `/` and `/api/health`, then shut down
- `export`: `next build && next export`
- `postexport`: Post-export validation + manifest
- `hash` / `hash:changes`: Content hashing & change detection
- `build:full`: Build → postexport → hash

## CI

GitHub Actions runs install, lint (non-blocking), build, and `pnpm run health` on push/PR to `main`.

## Troubleshooting

- Moved routes or refactors causing stale type references? Remove the `.next` directory and rebuild:

```bash
rm -rf .next
pnpm build
```

- Editor complaining about `@theme`/`@utility`? These are Tailwind v4 at-rules; ensure `@tailwindcss/postcss` is configured (see `postcss.config.mjs`).

## License

MIT
