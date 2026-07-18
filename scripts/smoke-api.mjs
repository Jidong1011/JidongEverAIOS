const baseUrl = process.env.EVER_AIOS_API_URL
  ?? 'https://funnyaicloud.com/fuint-application/clientApi'

const headers = {
  merchantNo: process.env.EVER_AIOS_MERCHANT_NO ?? '10001',
  isWechat: '1',
  platform: 'miniProgram',
  storeId: process.env.EVER_AIOS_STORE_ID ?? '2',
}

const checks = [
  ['article-count', '/article/count'],
  ['member-count', '/store/userCount'],
  ['service-count', '/goodsApi/count?type=service'],
]

const failures = []

for (const [name, endpoint] of checks) {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers,
      signal: AbortSignal.timeout(15_000),
    })
    const payload = await response.json()
    const ok = response.ok && (payload.code === 200 || payload.code === 0)
    if (!ok) {
      failures.push(`${name}: HTTP ${response.status}, code ${payload.code ?? 'unknown'}`)
      continue
    }
    console.log(`${name}: ok`)
  } catch (error) {
    failures.push(`${name}: ${error.message}`)
  }
}

if (failures.length > 0) {
  console.error('Read-only API smoke test failed:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('All read-only API checks passed.')
