#!/usr/bin/env node

/**
 * Content hashing utilities for cache optimization
 * Generates content-based hashes for static assets
 */

const crypto = require('crypto')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const readdir = promisify(fs.readdir)
const stat = promisify(fs.stat)

class ContentHasher {
  constructor(options = {}) {
    this.algorithm = options.algorithm || 'sha256'
    this.encoding = options.encoding || 'hex'
    this.hashMap = new Map()
  }

  /**
   * Generate hash for a single file
   */
  async hashFile(filePath) {
    try {
      const content = await readFile(filePath)
      const hash = crypto.createHash(this.algorithm)
      hash.update(content)
      return hash.digest(this.encoding)
    } catch (error) {
      throw new Error(`Failed to hash file ${filePath}: ${error.message}`)
    }
  }

  /**
   * Generate hashes for all files in a directory
   */
  async hashDirectory(dirPath, options = {}) {
    const { 
      recursive = true, 
      extensions = ['.js', '.css', '.html', '.json'],
      exclude = ['node_modules', '.git', '.next']
    } = options

    console.log(`🔍 Scanning directory: ${dirPath}`)
    
    await this._processDirectory(dirPath, recursive, extensions, exclude)
    
    console.log(`✅ Generated hashes for ${this.hashMap.size} files`)
    return this.hashMap
  }

  async _processDirectory(dirPath, recursive, extensions, exclude) {
    const entries = await readdir(dirPath)
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry)
      const stats = await stat(fullPath)
      
      if (stats.isDirectory()) {
        // Skip excluded directories
        if (exclude.includes(entry)) {
          continue
        }
        
        if (recursive) {
          await this._processDirectory(fullPath, recursive, extensions, exclude)
        }
      } else if (stats.isFile()) {
        // Check if file extension is included
        const ext = path.extname(entry).toLowerCase()
        if (extensions.length === 0 || extensions.includes(ext)) {
          const hash = await this.hashFile(fullPath)
          const relativePath = path.relative(process.cwd(), fullPath)
          this.hashMap.set(relativePath, {
            hash,
            size: stats.size,
            modified: stats.mtime.toISOString()
          })
        }
      }
    }
  }

  /**
   * Save hash map to file
   */
  async saveHashMap(filePath) {
    const hashData = {
      generated: new Date().toISOString(),
      algorithm: this.algorithm,
      encoding: this.encoding,
      files: Object.fromEntries(this.hashMap)
    }
    
    await writeFile(filePath, JSON.stringify(hashData, null, 2))
    console.log(`💾 Hash map saved to: ${filePath}`)
  }

  /**
   * Load hash map from file
   */
  async loadHashMap(filePath) {
    try {
      const content = await readFile(filePath, 'utf8')
      const hashData = JSON.parse(content)
      
      this.algorithm = hashData.algorithm || this.algorithm
      this.encoding = hashData.encoding || this.encoding
      this.hashMap = new Map(Object.entries(hashData.files || {}))
      
      console.log(`📂 Loaded hash map with ${this.hashMap.size} entries`)
      return this.hashMap
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.log(`📄 Hash map file not found: ${filePath}`)
        return new Map()
      }
      throw error
    }
  }

  /**
   * Compare current files with saved hashes to detect changes
   */
  async detectChanges(dirPath, savedHashMapPath) {
    console.log('🔍 Detecting file changes...')
    
    // Load existing hash map
    await this.loadHashMap(savedHashMapPath)
    const oldHashes = new Map(this.hashMap)
    
    // Generate new hashes
    this.hashMap.clear()
    await this.hashDirectory(dirPath)
    const newHashes = this.hashMap
    
    const changes = {
      added: [],
      modified: [],
      deleted: [],
      unchanged: []
    }
    
    // Find added and modified files
    for (const [filePath, fileData] of newHashes) {
      if (!oldHashes.has(filePath)) {
        changes.added.push(filePath)
      } else if (oldHashes.get(filePath).hash !== fileData.hash) {
        changes.modified.push(filePath)
      } else {
        changes.unchanged.push(filePath)
      }
    }
    
    // Find deleted files
    for (const filePath of oldHashes.keys()) {
      if (!newHashes.has(filePath)) {
        changes.deleted.push(filePath)
      }
    }
    
    return changes
  }

  /**
   * Generate cache-busting filenames
   */
  generateCacheBustedNames() {
    const cacheBusted = new Map()
    
    for (const [filePath, fileData] of this.hashMap) {
      const dir = path.dirname(filePath)
      const ext = path.extname(filePath)
      const name = path.basename(filePath, ext)
      const shortHash = fileData.hash.substring(0, 8)
      const newName = `${name}-${shortHash}${ext}`
      const newPath = path.join(dir, newName)
      
      cacheBusted.set(filePath, newPath)
    }
    
    return cacheBusted
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2)
  const command = args[0]
  
  const hasher = new ContentHasher()
  
  switch (command) {
    case 'hash':
      const dirPath = args[1] || './out'
      hasher.hashDirectory(dirPath)
        .then(() => hasher.saveHashMap('./content-hashes.json'))
        .catch(console.error)
      break
      
    case 'changes':
      const targetDir = args[1] || './out'
      const hashMapPath = args[2] || './content-hashes.json'
      hasher.detectChanges(targetDir, hashMapPath)
        .then(changes => {
          console.log('\n📊 Change Detection Results:')
          console.log(`   Added: ${changes.added.length}`)
          console.log(`   Modified: ${changes.modified.length}`)
          console.log(`   Deleted: ${changes.deleted.length}`)
          console.log(`   Unchanged: ${changes.unchanged.length}`)
          
          if (changes.added.length > 0) {
            console.log('\n➕ Added files:')
            changes.added.forEach(file => console.log(`   - ${file}`))
          }
          
          if (changes.modified.length > 0) {
            console.log('\n📝 Modified files:')
            changes.modified.forEach(file => console.log(`   - ${file}`))
          }
          
          if (changes.deleted.length > 0) {
            console.log('\n🗑️  Deleted files:')
            changes.deleted.forEach(file => console.log(`   - ${file}`))
          }
        })
        .catch(console.error)
      break
      
    default:
      console.log('Usage:')
      console.log('  node hashing.js hash [directory] - Generate hashes for directory')
      console.log('  node hashing.js changes [directory] [hash-map-file] - Detect changes')
  }
}

module.exports = { ContentHasher }