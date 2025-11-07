# Copilot Instructions - Verification-First Portfolio

## Project Overview
This is a Next.js 16 TypeScript portfolio project following a "verification-first" approach. The project emphasizes rigorous testing, evaluation, and documentation of development decisions through ADRs (Architecture Decision Records).

## Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **React**: React 19.2.0 with React Compiler enabled
- **Package Manager**: pnpm
- **Linting**: ESLint 9 with Next.js config

## Project Structure

```
src/
├── app/
│   ├── (site)/           # Main website routes (route group)
│   │   ├── layout.tsx    # Site-specific layout
│   │   ├── page.tsx      # Homepage
│   │   └── [pages]/      # Other pages
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Base UI components
│   │   └── features/    # Feature-specific components
│   ├── lib/             # Utilities, types, and business logic
│   │   ├── utils/       # Helper functions
│   │   ├── types/       # TypeScript type definitions
│   │   └── hooks/       # Custom React hooks
│   ├── content/         # MDX content and documentation
│   │   ├── case-studies/ # Project case studies (MDX)
│   │   ├── adrs/        # Architecture Decision Records
│   │   └── logs/        # Development logs and notes
│   └── evals/           # Evaluation harness and datasets
│       ├── harness/     # Testing and evaluation framework
│       └── datasets/    # Test data and benchmarks
└── scripts/             # Build and automation scripts
    ├── postexport/      # Post-export processing
    └── hashing/         # Content hashing utilities
```

## Development Guidelines

### File Organization
- Use route groups `(site)` for organizing related routes without affecting URL structure
- Place reusable components in `app/components/` with clear feature-based organization
- Store all utilities and shared logic in `app/lib/`
- Document major decisions in ADRs within `app/content/adrs/`

### Code Style
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use Tailwind CSS for styling with utility-first approach
- Follow Next.js 16 App Router conventions
- Leverage React Compiler optimizations (enabled in next.config.ts)

### Content Strategy
- Write case studies in MDX format for rich documentation
- Maintain ADRs for architectural decisions
- Keep development logs for process documentation
- Use evaluation datasets to validate implementations

### Testing & Evaluation
- Implement evaluation harnesses for critical functionality
- Maintain test datasets in `app/evals/datasets/`
- Document evaluation criteria and results
- Use verification-first approach: define success criteria before implementation

### Build & Deployment
- Use pnpm for package management
- Leverage Next.js build optimizations
- Implement post-export scripts for additional processing
- Use content hashing for cache optimization

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