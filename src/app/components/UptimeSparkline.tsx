'use client'
import { useEffect, useState } from 'react'

interface UptimeRecord {
  timestamp: string
  status: 'ok' | 'error'
  responseTime?: number
}

interface UptimeData {
  checks: UptimeRecord[]
  lastUpdated: string
}

interface UptimeSparklineProps {
  limit?: number
  height?: number
}

export function UptimeSparkline({ limit = 168, height = 40 }: UptimeSparklineProps) {
  const [data, setData] = useState<UptimeData | null>(null)

  useEffect(() => {
    fetch('/uptime.json')
      .then((res) => (res.ok ? res.json() : null))
      .then(setData)
      .catch(() => setData(null))
  }, [])

  if (!data || data.checks.length === 0) {
    return (
      <div className="text-sm text-zinc-500 dark:text-zinc-400">No uptime data available yet.</div>
    )
  }

  const recentChecks = data.checks.slice(-limit)
  const uptimeCount = recentChecks.filter((c) => c.status === 'ok').length
  const uptimePercent = ((uptimeCount / recentChecks.length) * 100).toFixed(2)

  const barWidth = 3
  const gap = 1
  const totalWidth = recentChecks.length * (barWidth + gap)

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Uptime:{' '}
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{uptimePercent}%</span>
        </div>
        <div className="text-xs text-zinc-500">Last {recentChecks.length} checks</div>
      </div>

      <div className="overflow-x-auto">
        <svg
          width={totalWidth}
          height={height}
          className="rounded border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
        >
          {recentChecks.map((check, i) => {
            const x = i * (barWidth + gap) + gap
            const isOk = check.status === 'ok'
            const color = isOk ? '#10b981' : '#ef4444' // green-500 : red-500

            return (
              <rect
                key={i}
                x={x}
                y={2}
                width={barWidth}
                height={height - 4}
                fill={color}
                opacity={0.8}
                rx={1}
              >
                <title>
                  {new Date(check.timestamp).toLocaleString()}
                  {'\n'}
                  Status: {check.status}
                  {check.responseTime && `\nResponse: ${check.responseTime}ms`}
                </title>
              </rect>
            )
          })}
        </svg>
      </div>

      {data.lastUpdated && (
        <div className="text-xs text-zinc-500">
          Last updated: {new Date(data.lastUpdated).toLocaleString()}
        </div>
      )}
    </div>
  )
}
