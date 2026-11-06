// Fails when a component bypasses the design tokens:
//  - Tailwind arbitrary values such as w-[300px] or text-[13px]
//  - raw colours (hex, rgb, hsl) outside src/styles/tokens.css
//  - static inline styles (dynamic :style bindings are allowed)
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../src', import.meta.url))
const TOKEN_FILE = 'styles/tokens.css'

const RULES = [
  { name: 'Tailwind arbitrary value', re: /(?<![\w-])[a-z][\w:-]*-\[[^\]]+\]/g, in: /\.(vue|ts)$/ },
  { name: 'raw colour', re: /#[0-9a-f]{3,8}\b|\b(rgb|hsl)a?\(/gi, in: /\.(vue|ts|css)$/ },
  { name: 'static inline style', re: /(?<!:)\bstyle="/g, in: /\.vue$/ },
]

/**
 * Every file under dir, depth first
 * @param {string} dir
 * @returns {string[]}
 */
const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)

    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const problems = []

for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file)

  if (rel === TOKEN_FILE || rel.endsWith('.test.ts')) {
    continue
  }

  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      for (const rule of RULES) {
        if (!rule.in.test(file)) {
          continue
        }

        for (const m of line.matchAll(rule.re)) {
          problems.push(`src/${rel}:${i + 1}  ${rule.name}: ${m[0]}`)
        }
      }
    })
}

if (problems.length) {
  console.error(problems.join('\n'))
  console.error(
    `\n${problems.length} value(s) bypass the design tokens. Add a token to ${TOKEN_FILE} or a constant to src/constants.`,
  )
  process.exit(1)
}

console.log('Design tokens: OK')
