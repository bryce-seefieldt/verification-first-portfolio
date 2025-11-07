# ADR-001: Use Next.js App Router with Route Groups

## Status

Accepted

## Date

2025-11-07

## Deciders

- Development Team

## Context

The portfolio needs a clear structure that separates content organization from URL structure while leveraging the latest Next.js features for optimal performance and developer experience.

## Decision

We will use Next.js 16 App Router with route groups `(site)` to organize our main website routes.

## Rationale

### Why Next.js App Router?

- **Performance**: Built-in optimizations for React Server Components
- **Developer Experience**: Simplified routing with file-system based approach
- **Future-proof**: Latest Next.js paradigm with ongoing feature development
- **React 19 Compatibility**: Full support for React 19 features including React Compiler

### Why Route Groups?

- **Clean URLs**: Route groups don't affect URL structure
- **Organization**: Logical grouping of related routes
- **Flexibility**: Easy to add additional route groups (admin, api, etc.)
- **Maintainability**: Clear separation of concerns

## Consequences

### Positive

- ✅ Clean, maintainable folder structure
- ✅ Optimal performance with RSCs
- ✅ TypeScript integration out of the box
- ✅ Built-in SEO optimizations
- ✅ Simplified data fetching patterns

### Negative

- ⚠️ Learning curve for App Router (vs Pages Router)
- ⚠️ Some third-party libraries may not be fully compatible yet
- ⚠️ Breaking changes possible as App Router stabilizes

### Mitigation Strategies

- Comprehensive documentation of patterns and conventions
- Regular updates to stay current with Next.js releases
- Evaluation framework to catch breaking changes early

## Alternatives Considered

### 1. Pages Router

- **Pros**: More mature, extensive ecosystem support
- **Cons**: Legacy approach, missing modern React features

### 2. Other Frameworks (Remix, Astro)

- **Pros**: Different architectural approaches
- **Cons**: Smaller ecosystems, different trade-offs

### 3. Flat App Directory Structure

- **Pros**: Simpler initial setup
- **Cons**: Poor scalability, harder to maintain as project grows

## Implementation Notes

- Use `(site)` route group for main website content
- Keep global layout at `app/layout.tsx`
- Site-specific layout at `app/(site)/layout.tsx`
- Components organized separately from routes
