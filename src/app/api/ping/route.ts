import { NextResponse } from 'next/server'

export const runtime = 'edge'

// Edge runtime lacks process APIs; provide synthetic uptime since first invocation.
// Use a stable global to approximate uptime within the same edge isolate
let start = (globalThis as any).__edgeStartTime as number | undefined
if (!start) {
  start = performance.now()
  ;(globalThis as any).__edgeStartTime = start
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
