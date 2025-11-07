// Allow importing plain CSS files (global styles) without TS errors.
// Next.js normally handles this via next-env.d.ts; this is a safety net for
// editors or tooling complaining about side-effect CSS imports.
declare module '*.css'
