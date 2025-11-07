import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  const timestamp = new Date().toISOString()
  const status = 'ok'

  return NextResponse.json(
    {
      status,
      timestamp,
      uptime: process.uptime ? process.uptime() : null,
    },
    { status: 200 }
  )
}
