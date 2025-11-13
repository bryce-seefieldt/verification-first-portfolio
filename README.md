# Verification-First Portfolio

A Next.js 16 + TypeScript portfolio showcasing verification-first development practices with cryptographic provenance, real-time evaluations, and disaster recovery mindset. Every feature includes success criteria, evaluation harnesses, and immutable audit trails.

[GitHub | Verification First Portfolio](https://github.com/bryce-seefieldt/verification-first-portfolio)

## 🎯 Core Philosophy

**Verification-First Development**: Define success criteria and evaluation harnesses _before_ implementation. Measure everything. Document decisions. Prove outcomes.

This portfolio demonstrates:

- 📊 **Live Evaluations**: Real-time test results published as JSON artifacts
- 🔐 **Cryptographic Provenance**: SHA-256 hashing of all artifacts with on-chain anchoring capability
- 🛡️ **DR/BCP Ready**: Automated backups, infrastructure-as-code, documented runbooks
- ✅ **Pre-commit Quality Gates**: Lint, format, and type-check before every commit
- 📈 **Observability**: Uptime monitoring with sparkline visualization

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19.2, React Compiler enabled)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Package Manager**: pnpm with Corepack
- **Linting/Formatting**: ESLint 9 (flat config) + Prettier 3 + Husky pre-commit hooks
- **Content**: MDX with gray-matter frontmatter parsing
- **Validation**: Zod schemas for evaluation datasets
- **CI/CD**: GitHub Actions (lint, build, evals, provenance, uptime)

## 🏗️ Architecture & Features

### Routes & Pages

| Route                  | Purpose                  | Key Features                                                                                           |
| ---------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `/`                    | Homepage                 | Hero section, feature cards, featured case studies grid, CTA                                           |
| `/case-studies`        | Case study index         | Filterable grid, stats, tags, status badges                                                            |
| `/case-studies/[slug]` | Individual case study    | MDX rendering, metrics sidebar, VerifyBadge, repository link                                           |
| `/work-trials`         | Project proposals        | Fork-ready templates with deliverables, success criteria, GitHub links, downloadable proposal template |
| `/evals`               | Evaluation overview      | Introduction to evaluation-first approach, links to live results                                       |
| `/evals/live`          | Live evaluation results  | Real-time test suites, pass/fail rates, latency metrics, downloadable JSON                             |
| `/provenance`          | Cryptographic provenance | Hashed artifact table with copy buttons, on-chain anchoring explainer, verification instructions       |
| `/about`               | Profile & credentials    | Bio, skills, DR/BCP signals, uptime sparkline, social links                                            |
| `/changelog`           | Development log          | Build history, commits, metrics, timeline                                                              |
| `/api/ping`            | Health check endpoint    | Returns status, timestamp, uptime (Edge runtime)                                                       |
| `/api/health`          | Health check (legacy)    | Simple 200 OK response                                                                                 |

### Components

#### UI Components (`src/app/components/ui/`)

- `Button`: Radix-based button with variants (default, outline, ghost, etc.)
- `Card`: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- `Badge`: Inline badge with variant support
- `Separator`: Horizontal/vertical divider
- `Tabs`: Radix tabs for content switching
- `ThemeToggle`: Light/dark mode toggle with system preference detection

#### Feature Components (`src/app/components/`)

- `VerifyBadge`: Client component linking to provenance page (shows "Verify β")
- `CopyButton`: Clipboard copy with visual feedback (used for hashes)
- `UptimeSparkline`: SVG sparkline visualizing uptime data from `/uptime.json`
- `FeaturedCaseStudyCard`: Simplified card for homepage featured projects
- `CaseStudyCard`: Full case study card with tags, metrics, status

#### Shared Components (`src/components/`)

- `PageHeader`: Consistent page title and description layout
- `Section`: Container with max-width and padding
- `Navbar`: Site navigation with mobile menu
- `Footer`: Site footer with links

### Scripts & Automation

| Script                    | Purpose                                                                  | Trigger                      |
| ------------------------- | ------------------------------------------------------------------------ | ---------------------------- |
| `scripts/hash-content.ts` | Hash MDX case studies with SHA-256, write `public/provenance/index.json` | CI (before build)            |
| `scripts/check-uptime.ts` | Fetch `/api/ping`, append status to `public/uptime.json`                 | Hourly cron (GitHub Actions) |
| `evals/run.ts`            | Run evaluation suites, write `public/evals-results.json`                 | CI (before build), manual    |

### CI/CD Workflows

#### `.github/workflows/ci.yml`

1. **Lint**: Run ESLint on all TS/TSX files
2. **Eval**: Execute evaluation harness (`pnpm tsx evals/run.ts`)
3. **Provenance**: Generate content hashes (`pnpm tsx scripts/hash-content.ts`)
4. **Build**: Next.js production build
5. **Health Check**: Start server, verify `/` and `/api/health` return 200

#### `.github/workflows/uptime.yml`

- Runs hourly via cron schedule
- Calls `/api/ping` endpoint
- Appends status to `public/uptime.json`
- Commits and pushes updated file (with `[skip ci]`)

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    CI/CD Pipeline (GitHub Actions)          │
├─────────────────────────────────────────────────────────────┤
│ 1. Lint → 2. Run Evals → 3. Hash Content → 4. Build        │
│    ↓           ↓                ↓                            │
│ ESLint    public/          public/                          │
│ check     evals-results    provenance/                      │
│           .json            index.json                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
                     Next.js Build
                            ↓
               Static pages + API routes
                            ↓
                ┌───────────────────────┐
                │   Deployed Site       │
                ├───────────────────────┤
                │ /evals/live           │ ← Reads evals-results.json
                │ /provenance           │ ← Reads provenance/index.json
                │ /about                │ ← Renders UptimeSparkline
                │ /api/ping             │ ← Health check endpoint
                └───────────────────────┘
                            ↑
                    Hourly Uptime Cron
                  (appends to uptime.json)
```

## Tailwind Design Tokens

Tokens are defined inline with Tailwind v4’s `@theme` at-rule (brand color scale, semantic colors, radii) and custom utilities via `@utility` (container, container-lg, prose). Some editors may flag these at-rules as unknown; the Next.js build compiles them correctly.

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (Node 22 recommended for Corepack built-in)
- pnpm (enabled via Corepack)

### Installation

```bash
# Enable Corepack (if not already enabled)
corepack enable

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### Development Workflow

```bash
# Format code (Prettier)
pnpm format

# Check formatting
pnpm format:check

# Lint code (ESLint)
pnpm lint

# Run evaluation harness
pnpm evals

# Run evals with verbose output
pnpm evals:verbose

# Generate provenance hashes
pnpm tsx scripts/hash-content.ts

# Check uptime (requires deployed site)
SITE_URL=https://your-site.vercel.app pnpm tsx scripts/check-uptime.ts
```

## 📦 Build & Deploy

### Production Build

```bash
# Standard Next.js build
pnpm build

# Start production server locally
pnpm start
```

### Full Build with Artifacts

```bash
# Build + postexport + hashing
pnpm run build:full
```

### Deploy to Vercel

#### Prerequisites

1. Install [Vercel CLI](https://vercel.com/docs/cli):

   ```bash
   pnpm add -g vercel
   ```

2. Set up GitHub Secrets (required for CI/CD):
   - `VERCEL_TOKEN` - Personal Access Token from Vercel dashboard
   - `VERCEL_ORG_ID` - Team/Organization ID from Vercel project settings
   - `VERCEL_PROJECT_ID` - Project ID from Vercel project settings

3. (Optional) Configure environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SITE_URL` - Your production URL
   - `SEPOLIA_RPC_URL` - For on-chain anchoring (when implemented)
   - `PROVENANCE_CONTRACT_ADDRESS` - Smart contract address (when deployed)
   - `UPTIME_WEBHOOK_URL` - For alerting integration (optional)

#### Manual Deployment

```bash
# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

#### Automated Deployment (GitHub Actions)

Pushes to `main` branch automatically trigger deployment via `.github/workflows/vercel-deploy.yml`:

1. **Quality Gates**: Lint → Evals → Provenance → Build → Health Check
2. **Vercel Build**: Pull environment → Build artifacts → Deploy
3. **PR Comments**: Preview URLs posted automatically on pull requests

**Deployment Flow:**

- Push to `main` → Production deployment
- Open PR → Preview deployment with comment containing URL
- Merge PR → Production deployment updates

#### Vercel Configuration

The `vercel.json` includes:

- **Security Headers**: `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`
- **Caching**: API routes with `max-age=0, must-revalidate`
- **Rewrites**: `/health` → `/api/health` for convenience
- **Auto-deployment**: Enabled for `main` and `feat/*` branches
- **Region**: `iad1` (US East) - modify as needed

#### Verifying Deployment

After deployment:

```bash
# Check health endpoint
curl https://your-site.vercel.app/api/ping

# Verify uptime tracking (after hourly cron runs)
curl https://your-site.vercel.app/uptime.json

# Check provenance index
curl https://your-site.vercel.app/provenance/index.json

# View live evaluations
open https://your-site.vercel.app/evals/live
```

### Health Check

```bash
# Build, start on port 3001, verify /  and /api/health
pnpm run health
```

## 🔧 Configuration

### Site Config (`src/site.config.ts`)

Centralized configuration for:

- Site metadata (name, description, URL)
- Author profile (name, title, bio, location)
- Social links (GitHub, LinkedIn, email)
- Repository details (owner, name, URL)
- Blockchain network (Sepolia testnet for provenance anchoring)
- Navigation menu items
- Feature highlights

### Environment Variables

```bash
# Optional: Custom site URL for uptime checks
SITE_URL=https://your-site.vercel.app
```

### Devcontainer

`.devcontainer/devcontainer.json` provides one-click dev environment:

- TypeScript/Node 22 base image
- Git feature
- Auto-installs dependencies via `pnpm install`
- Pre-configured VS Code extensions (Prettier, ESLint)

## 📋 Project Structure

```
verification-first-portfolio/
├── .devcontainer/              # VS Code devcontainer config
├── .github/
│   ├── workflows/
│   │   ├── ci.yml              # Main CI pipeline
│   │   └── uptime.yml          # Hourly uptime monitoring
│   └── copilot-instructions.md # GitHub Copilot context
├── .husky/                     # Git hooks (pre-commit)
├── content/
│   ├── casestudies/            # MDX case studies
│   │   ├── _template.mdx       # Case study template
│   │   ├── incident-copilot.mdx
│   │   └── eval-first-rag.mdx
│   └── work-trials/
│       └── _proposal-template.mdx  # Work trial proposal template
├── evals/
│   ├── datasets/
│   │   └── rag-basics.jsonl    # Evaluation test cases (JSONL)
│   ├── run.ts                  # Evaluation runner
│   ├── schema.ts               # Zod schemas for eval data
│   └── README.md               # Eval harness documentation
├── public/
│   ├── evals-results.json      # Generated by CI
│   ├── uptime.json             # Generated by uptime cron
│   └── provenance/
│       └── index.json          # Content hashes (generated by CI)
├── scripts/
│   ├── check-uptime.ts         # Uptime monitoring script
│   ├── hash-content.ts         # Provenance hash generator
│   └── health-check.js         # Build health verification
├── src/
│   ├── app/
│   │   ├── (site)/             # Route group (doesn't affect URLs)
│   │   │   ├── layout.tsx      # Site layout with navbar/footer
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── about/page.tsx
│   │   │   ├── case-studies/
│   │   │   │   ├── page.tsx    # Case studies index
│   │   │   │   └── [slug]/page.tsx  # Dynamic case study pages
│   │   │   ├── changelog/page.tsx
│   │   │   ├── evals/
│   │   │   │   ├── page.tsx    # Evals overview
│   │   │   │   └── live/page.tsx    # Live eval results
│   │   │   ├── provenance/page.tsx
│   │   │   └── work-trials/page.tsx
│   │   ├── api/
│   │   │   ├── health/route.ts # Legacy health endpoint
│   │   │   └── ping/route.ts   # Modern health/uptime endpoint
│   │   ├── components/
│   │   │   ├── features/       # Domain components
│   │   │   │   ├── CaseStudyCard.tsx
│   │   │   │   └── FeaturedCaseStudyCard.tsx
│   │   │   ├── ui/             # Base UI primitives
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   └── ...
│   │   │   ├── CopyButton.tsx
│   │   │   ├── UptimeSparkline.tsx
│   │   │   └── VerifyBadge.tsx
│   │   ├── evals/
│   │   │   └── harness/
│   │   │       └── EvaluationHarness.ts
│   │   ├── lib/
│   │   │   ├── types/          # TypeScript types
│   │   │   └── utils/
│   │   │       └── index.ts    # Utility functions (cn, formatDate, debounce)
│   │   ├── globals.css         # Tailwind v4 config + custom tokens
│   │   └── layout.tsx          # Root layout
│   ├── components/             # Shared components
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── PageHeader.tsx
│   │   └── Section.tsx
│   ├── lib/
│   │   └── mdx.tsx             # MDX utilities (reading, parsing, components)
│   └── site.config.ts          # Site configuration
├── .eslintrc.mjs               # ESLint config (flat format)
├── .prettierrc                 # Prettier config
├── next.config.ts              # Next.js config (React Compiler enabled)
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs          # PostCSS with Tailwind v4
├── tsconfig.json               # TypeScript config (strict mode)
└── README.md                   # This file
```

## 🧪 Evaluation System

### Overview

The evaluation harness validates functionality against predefined success criteria. All test results are published as JSON artifacts for transparency.

### Running Evaluations

```bash
# Run all evaluation suites
pnpm evals

# Run with verbose output (shows individual test results)
pnpm evals:verbose

# Run specific dataset
pnpm tsx evals/run.ts rag-basics
```

### Creating New Eval Datasets

1. Create a JSONL file in `evals/datasets/`
2. Each line is a JSON object with:
   ```json
   { "id": "test-1", "input": "What is provenance?", "expected": "cryptographic" }
   ```
3. Run the eval suite to generate results

### Viewing Results

- **Live Dashboard**: Visit `/evals/live` on the deployed site
- **Raw JSON**: Download from `/evals-results.json`
- **CI Logs**: Check GitHub Actions workflow output

## 🔐 Provenance & Verification

### Content Hashing

All case study MDX files are hashed with SHA-256 during CI builds:

```bash
# Generate hashes manually
pnpm tsx scripts/hash-content.ts
```

Output: `public/provenance/index.json`

### Viewing Provenance

- **Web UI**: Visit `/provenance` to see hashed artifacts table
- **Copy Hashes**: Use copy buttons to verify locally
- **Manual Verification**:
  ```bash
  sha256sum content/casestudies/incident-copilot.mdx
  # Compare with hash in public/provenance/index.json
  ```

### Future: On-Chain Anchoring

The provenance system is designed to support blockchain anchoring:

- Smart contract address (Sepolia testnet): TBD
- Hashes can be anchored on-chain for immutable proof
- Gas cost target: < $0.50 per anchor

## 📊 Observability

### Uptime Monitoring

GitHub Actions cron job runs hourly to check site health:

1. Calls `/api/ping` endpoint
2. Records response time and status
3. Appends to `public/uptime.json`
4. Commits changes with `[skip ci]` flag

### Viewing Uptime

- **Sparkline**: Visit `/about` page (Infrastructure Resilience card)
- **Raw Data**: Download `/uptime.json`
- **Manual Check**:
  ```bash
  curl https://your-site.vercel.app/api/ping
  ```

## 🎨 Design System

### Tailwind v4 Tokens

Custom design tokens defined in `src/app/globals.css`:

```css
@theme {
  --color-brand-50: oklch(0.98 0.02 240);
  --color-brand-600: oklch(0.55 0.18 240);
  /* ... full color scale */
}
```

### Component Variants

Most UI components support variants via `class-variance-authority`:

```tsx
<Button variant="default" size="lg">Primary Action</Button>
<Button variant="outline" size="sm">Secondary</Button>
<Badge variant="secondary">Status</Badge>
```

## 🔄 Pre-commit Hooks

Husky + lint-staged runs checks before every commit:

1. **Prettier**: Auto-format TS/TSX/MD/JSON/YAML files
2. **ESLint**: Lint and auto-fix TypeScript files

Configured in `package.json`:

```json
"lint-staged": {
  "*.{ts,tsx,md,mdx,json,yml,yaml}": ["prettier --write"],
  "*.{ts,tsx}": ["eslint --fix"]
}
```

## 🐛 Troubleshooting

### Build Issues

**Problem**: Stale type references or route errors

**Solution**: Clear Next.js cache

```bash
rm -rf .next
pnpm build
```

### Tailwind Warnings

**Problem**: Editor flagging `@theme` or `@utility` as unknown

**Solution**: These are Tailwind v4 at-rules. Ensure `@tailwindcss/postcss` is in `postcss.config.mjs`

### Missing Artifacts

**Problem**: `/evals-results.json` or `/provenance/index.json` not found

**Solution**: Run generation scripts locally

```bash
pnpm tsx evals/run.ts
pnpm tsx scripts/hash-content.ts
```

### Uptime Data Not Showing

**Problem**: UptimeSparkline shows "No data available"

**Solution**:

1. Check if `public/uptime.json` exists
2. Manually trigger uptime workflow in GitHub Actions
3. Wait for hourly cron to run

## 📚 Additional Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [React Compiler](https://react.dev/learn/react-compiler)
- [MDX Documentation](https://mdxjs.com/)
- [Zod Validation](https://zod.dev/)

## 🤝 Contributing

This is a personal portfolio project, but feedback and suggestions are welcome via GitHub issues.

## 📄 License

MIT

---

**Built with verification-first principles**: Every claim is backed by code, every feature includes tests, every decision is documented.
