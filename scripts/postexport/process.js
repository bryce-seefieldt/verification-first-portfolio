#!/usr/bin/env node

/**
 * Post-export processing script
 * Handles optimization and validation after Next.js build/export
 */

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

class PostExportProcessor {
  constructor(outputDir = './out') {
    this.outputDir = outputDir
    this.processedFiles = 0
    this.errors = []
  }

  async process() {
    console.log('🚀 Starting post-export processing...')
    
    try {
      await this.validateOutput()
      await this.optimizeAssets()
      await this.generateManifest()
      
      console.log(`✅ Post-export processing complete!`)
      console.log(`📁 Processed ${this.processedFiles} files`)
      
      if (this.errors.length > 0) {
        console.warn(`⚠️  ${this.errors.length} warnings:`)
        this.errors.forEach(error => console.warn(`   - ${error}`))
      }
    } catch (error) {
      console.error('❌ Post-export processing failed:', error)
      process.exit(1)
    }
  }

  async validateOutput() {
    console.log('📋 Validating output directory...')
    
    if (!fs.existsSync(this.outputDir)) {
      throw new Error(`Output directory ${this.outputDir} does not exist`)
    }

    const requiredFiles = ['index.html', '_next']
    for (const file of requiredFiles) {
      const filePath = path.join(this.outputDir, file)
      if (!fs.existsSync(filePath)) {
        this.errors.push(`Missing required file/directory: ${file}`)
      }
    }
  }

  async optimizeAssets() {
    console.log('⚡ Optimizing assets...')
    
    await this.processDirectory(this.outputDir)
  }

  async processDirectory(dir) {
    const entries = await readdir(dir)
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry)
      const stats = await stat(fullPath)
      
      if (stats.isDirectory()) {
        await this.processDirectory(fullPath)
      } else if (stats.isFile()) {
        await this.processFile(fullPath)
      }
    }
  }

  async processFile(filePath) {
    const ext = path.extname(filePath).toLowerCase()
    
    switch (ext) {
      case '.html':
        await this.processHtmlFile(filePath)
        break
      case '.css':
        await this.processCssFile(filePath)
        break
      case '.js':
        await this.processJsFile(filePath)
        break
    }
    
    this.processedFiles++
  }

  async processHtmlFile(filePath) {
    // Add security headers, meta tags, etc.
    const content = await readFile(filePath, 'utf8')
    
    // Simple validation - check for required meta tags
    if (!content.includes('<meta name="viewport"')) {
      this.errors.push(`Missing viewport meta tag in ${filePath}`)
    }
    
    if (!content.includes('<meta name="description"')) {
      this.errors.push(`Missing description meta tag in ${filePath}`)
    }
  }

  async processCssFile(filePath) {
    // CSS optimization could go here
    // For now, just validate the file is readable
    try {
      await readFile(filePath, 'utf8')
    } catch (error) {
      this.errors.push(`Cannot read CSS file ${filePath}: ${error.message}`)
    }
  }

  async processJsFile(filePath) {
    // JS optimization could go here
    // For now, just validate the file is readable
    try {
      await readFile(filePath, 'utf8')
    } catch (error) {
      this.errors.push(`Cannot read JS file ${filePath}: ${error.message}`)
    }
  }

  async generateManifest() {
    console.log('📄 Generating build manifest...')
    
    const manifest = {
      buildTime: new Date().toISOString(),
      processedFiles: this.processedFiles,
      errors: this.errors.length,
      version: process.env.npm_package_version || '0.1.0'
    }
    
    const manifestPath = path.join(this.outputDir, 'build-manifest.json')
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2))
  }
}

// Run if called directly
if (require.main === module) {
  const processor = new PostExportProcessor()
  processor.process().catch(console.error)
}

module.exports = { PostExportProcessor }