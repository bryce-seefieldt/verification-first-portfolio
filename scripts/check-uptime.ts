#!/usr/bin/env node
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
    const response = await fetch(`${SITE_URL}/api/ping`, {
      method: 'GET',
      headers: { 'User-Agent': 'Uptime-Monitor/1.0' },
    })

    const responseTime = Date.now() - startTime
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

    // Keep only last 1000 checks (about 7 days at hourly intervals)
    if (data.checks.length > 1000) {
      data.checks = data.checks.slice(-1000)
    }

    data.lastUpdated = record.timestamp

    // Write updated data
    fs.mkdirSync(path.dirname(UPTIME_FILE), { recursive: true })
    fs.writeFileSync(UPTIME_FILE, JSON.stringify(data, null, 2))

    console.warn(`✓ Uptime check: ${status} (${responseTime}ms)`)
  } catch (error) {
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
