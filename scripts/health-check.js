#!/usr/bin/env node
/**
 * Simple health check script:
 * 1. Builds the Next.js app (if not already built)
 * 2. Starts a production server on port 3001
 * 3. Requests / and /api/health
 * 4. Reports success/failure then exits and kills server
 */

const { spawn } = require('child_process')
const http = require('http')

function request(path) {
  return new Promise((resolve, reject) => {
    const req = http.request({ hostname: 'localhost', port: 3001, path, method: 'GET' }, res => {
      let data = ''
      res.on('data', chunk => (data += chunk))
      res.on('end', () => resolve({ status: res.statusCode, body: data }))
    })
    req.on('error', reject)
    req.end()
  })
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)) }

async function run() {
  console.log('⏳ Starting health check...')

  await new Promise((resolve, reject) => {
    const build = spawn('pnpm', ['build'], { stdio: 'inherit' })
    build.on('exit', code => code === 0 ? resolve() : reject(new Error('Build failed'))) 
  })

  console.log('✅ Build complete, starting server...')
  const server = spawn('pnpm', ['start', '-p', '3001'], { stdio: 'inherit' })

  // Give server time to boot
  let attempts = 0
  const maxAttempts = 15
  let healthy = true

  // Poll health endpoint
  while (attempts < maxAttempts) {
    attempts++
    try {
      const root = await request('/')
      const api = await request('/api/health')

      if (root.status === 200 && api.status === 200) {
        healthy = true
        console.log('🌐 Root status:', root.status)
        console.log('🩺 API health status:', api.status)
        console.log('✅ Health check passed')
        break
      } else {
        healthy = false
        console.log(`Attempt ${attempts}: waiting for 200 responses (root=${root.status}, api=${api.status})`)
      }
    } catch (err) {
      healthy = false
      console.log(`Attempt ${attempts}: server not ready yet`)    
    }
    await delay(750)
  }

  if (!healthy) {
    console.error('❌ Health check failed: endpoints did not return 200 in time')
    server.kill('SIGINT')
    process.exit(1)
  }

  // Kill server and exit
  server.kill('SIGINT')
  console.log('🛑 Server stopped')
  process.exit(0)
}

run().catch(err => {
  console.error('Health check error:', err)
  process.exit(1)
})
