import { readdir, readFile, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const miniRoot = path.join(repoRoot, 'longpalace_miniprogram')
const failures = []
let checkedFiles = 0

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  }))
  return nested.flat()
}

function relative(file) {
  return path.relative(repoRoot, file)
}

async function exists(file) {
  try {
    await access(file, constants.F_OK)
    return true
  } catch {
    return false
  }
}

const files = await walk(miniRoot)

for (const file of files.filter((item) => item.endsWith('.json'))) {
  checkedFiles += 1
  try {
    JSON.parse(await readFile(file, 'utf8'))
  } catch (error) {
    failures.push(`${relative(file)}: invalid JSON (${error.message})`)
  }
}

for (const file of files.filter((item) => item.endsWith('.js'))) {
  checkedFiles += 1
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' })
  if (result.status !== 0) {
    failures.push(`${relative(file)}: invalid JavaScript (${result.stderr.trim()})`)
  }
}

const appJsonPath = path.join(miniRoot, 'app.json')
const appJson = JSON.parse(await readFile(appJsonPath, 'utf8'))

for (const page of appJson.pages ?? []) {
  for (const extension of ['.js', '.json', '.wxml', '.wxss']) {
    const expected = path.join(miniRoot, `${page}${extension}`)
    if (!(await exists(expected))) {
      failures.push(`app.json: ${page} is missing ${extension}`)
    }
  }
}

const declaredPages = new Set(appJson.pages ?? [])
for (const file of files.filter((item) => /\/pages\/[^/]+\/[^/]+\.js$/.test(item))) {
  const page = path.relative(miniRoot, file).replace(/\.js$/, '')
  if (!declaredPages.has(page)) {
    failures.push(`${relative(file)}: page is not declared in app.json`)
  }
}

for (const wxml of files.filter((item) => item.endsWith('.wxml'))) {
  const js = wxml.replace(/\.wxml$/, '.js')
  if (!(await exists(js))) continue

  const markup = await readFile(wxml, 'utf8')
  const code = await readFile(js, 'utf8')
  const handlers = new Set(
    [...markup.matchAll(/(?:bind|catch)[a-zA-Z]+="([A-Za-z_$][\w$]*)"/g)].map((match) => match[1]),
  )

  for (const handler of handlers) {
    const escaped = handler.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const methodPattern = new RegExp(`(?:async\\s+)?${escaped}\\s*\\(`)
    if (!methodPattern.test(code)) {
      failures.push(`${relative(wxml)}: handler ${handler} is missing from ${relative(js)}`)
    }
  }
}

const privateConfig = path.join(miniRoot, 'project.private.config.json')
if (await exists(privateConfig)) {
  failures.push(`${relative(privateConfig)} must remain local and untracked`)
}

if (failures.length > 0) {
  console.error(`Validation failed with ${failures.length} issue(s):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Validated ${checkedFiles} JavaScript/JSON files and ${appJson.pages.length} Mini Program pages.`)
