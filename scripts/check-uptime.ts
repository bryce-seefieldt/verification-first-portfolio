#!/usr/bin/env node
/**
 * Uptime Monitoring Script - Site Health Tracker
 *
 * Fetches /api/ping endpoint to verify site availability and records response
 * time and status to public/uptime.json. Designed for hourly execution via
 * GitHub Actions cron workflow.
 *
 * **Workflow:**
 * 1. Fetch ${SITE_URL}/api/ping with timeout
 * 2. Record timestamp, status (ok/error), and response time
 * 3. Append to existing checks array in public/uptime.json
 * 4. Keep only last 1000 checks (~7 days at hourly intervals)
 * 5. Update lastUpdated timestamp
 *
 * **Environment Variables:**
 * - SITE_URL: Target site URL (default: verification-first-portfolio.vercel.app)
 *
 * **CI Integration:**
 * - Runs in .github/workflows/uptime.yml (hourly cron)
 * - Commits updated uptime.json with [skip ci] to avoid loops
 *
 * **Data Format:**
 * ```json
 * {
 *   "checks": [
 *     {"timestamp": "2025-11-07T19:00:00.000Z", "status": "ok", "responseTime": 145}
 *   ],
 *   "lastUpdated": "2025-11-07T19:00:00.000Z"
 * }
 * ```
 *
 * @see {@link /src/app/components/UptimeSparkline.tsx} for visualization
 * @see {@link /.github/workflows/uptime.yml} for automation
 */
import fs from 'node:fs'
import path from 'node:path'

const SITE_URL = process.env.SITE_URL || 'https://verification-first-portfolio.vercel.app'
const UPTIME_FILE = path.join(process.cwd(), 'public', 'uptime.json')

interface UptimeRecord {
  timestamp: string
  status: 'ok' | 'error'
  responseTime?: number
}

interface UptimeData {
  checks: UptimeRecord[]
  lastUpdated: string
}

async function checkUptime(): Promise<void> {
  const startTime = Date.now()

  try {
    // Fetch health endpoint with user agent
    const response = await fetch(`${SITE_URL}/api/ping`, {
      method: 'GET',
      headers: { 'User-Agent': 'Uptime-Monitor/1.0' },
    })

    const responseTime = Date.now() - startTime
    // Consider non-2xx responses as errors
    const status = response.ok ? 'ok' : 'error'

    const record: UptimeRecord = {
      timestamp: new Date().toISOString(),
      status,
      responseTime,
    }

    // Read existing data
    let data: UptimeData = { checks: [], lastUpdated: '' }
    if (fs.existsSync(UPTIME_FILE)) {
      const raw = fs.readFileSync(UPTIME_FILE, 'utf-8')
      data = JSON.parse(raw)
    }

    // Append new check
    data.checks.push(record)
    // Sliding window: keep only last 1000 checks (about 42 days at hourly)

    // Keep only last 1000 checks (about 7 days at hourly intervals)
    if (data.checks.length > 1000) {
      data.checks = data.checks.slice(-1000)
    }

    data.lastUpdated = record.timestamp

    // Write updated data
    fs.mkdirSync(path.dirname(UPTIME_FILE), { recursive: true })
    fs.writeFileSync(UPTIME_FILE, JSON.stringify(data, null, 2))
    // Use console.warn for visibility in CI logs (not suppressed by Next.js)

    console.warn(`✓ Uptime check: ${status} (${responseTime}ms)`)
  } catch (error) {
    // Network errors, timeouts, DNS failures all recorded as 'error'
    const record: UptimeRecord = {
      timestamp: new Date().toISOString(),
      status: 'error',
    }

    let data: UptimeData = { checks: [], lastUpdated: '' }
    if (fs.existsSync(UPTIME_FILE)) {
      const raw = fs.readFileSync(UPTIME_FILE, 'utf-8')
      data = JSON.parse(raw)
    }

    data.checks.push(record)
    if (data.checks.length > 1000) {
      data.checks = data.checks.slice(-1000)
    }
    data.lastUpdated = record.timestamp

    fs.mkdirSync(path.dirname(UPTIME_FILE), { recursive: true })
    fs.writeFileSync(UPTIME_FILE, JSON.stringify(data, null, 2))

    console.error(
      `✗ Uptime check failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    )
  }
}

checkUptime()
