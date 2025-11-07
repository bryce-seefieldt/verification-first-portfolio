import { NextResponse } from 'next/server'

export const runtime = 'edge'

// Edge runtime lacks process APIs; provide synthetic uptime since first invocation.
// Augment globalThis with an optional __edgeStartTime property for uptime tracking
// Declare a minimal shape for our global augmentation without polluting ambient types
type EdgeGlobal = typeof globalThis & { __edgeStartTime?: number }
const g = globalThis as EdgeGlobal
let start = g.__edgeStartTime
if (!start) {
  start = performance.now()
  g.__edgeStartTime = start
}

export async function GET() {
  const timestamp = new Date().toISOString()
  const status = 'ok'
  const msSinceStart = performance.now() - (start || performance.now())

  return NextResponse.json(
    {
      status,
      timestamp,
      uptimeMs: Math.round(msSinceStart),
    },
    { status: 200 }
  )
}
