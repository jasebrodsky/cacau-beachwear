import { copyFileSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const index = join(dist, 'index.html')

copyFileSync(index, join(dist, '404.html'))

const ids = ['ipanema', 'copacabana', 'arpoador', 'leblon', 'mare', 'sol']
for (const id of ids) {
  const dir = join(dist, 'product', id)
  mkdirSync(dir, { recursive: true })
  copyFileSync(index, join(dir, 'index.html'))
}

console.log('Wrote 404.html and product deep-link fallbacks')
