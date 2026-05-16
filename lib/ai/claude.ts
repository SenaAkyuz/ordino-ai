/**
 * Claude AI Integration
 *
 * AKTIVASYON:
 * 1. console.anthropic.com'dan API key al (~5 dakika, $5 free credit)
 * 2. npm install @anthropic-ai/sdk
 * 3. .env.local'a ekle:
 *    ANTHROPIC_API_KEY=sk-ant-...
 * 4. Aşağıdaki fonksiyonların import + implementation kısımlarını uncomment et
 *
 * SİLME:
 * - Bu dosyayı sil
 * - lib/insights-engine.ts'ten "useAI" kontrolünü kaldır (rule-based moda dön)
 * - lib/report-generator.ts'ten AI çağrılarını kaldır
 * - .env.local'dan ANTHROPIC_API_KEY sil
 * - npm uninstall @anthropic-ai/sdk
 */

// import Anthropic from '@anthropic-ai/sdk' // ← Token geldikten sonra uncomment

const isLive = !!process.env.ANTHROPIC_API_KEY

// const client = isLive
//   ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
//   : null

export type AIInsight = {
  type: 'recommendation' | 'warning' | 'opportunity'
  icon: string
  title: string
  description: string
  action: string
}

export async function generateAIInsights(
  platform: string,
  data: unknown
): Promise<AIInsight[] | null> {
  if (!isLive) return null // Caller will use rule-based fallback

  // TODO: Token geldiğinde burayı doldur
  //
  // const prompt = buildPromptFor(platform, data)
  // const response = await client!.messages.create({
  //   model: 'claude-sonnet-4-20250514',
  //   max_tokens: 1024,
  //   messages: [{ role: 'user', content: prompt }],
  // })
  // return parseInsights(response.content)

  return null
}

export async function generateAISummary(reportData: unknown): Promise<string | null> {
  if (!isLive) return null

  // TODO: Token geldiğinde burayı doldur
  //
  // const response = await client!.messages.create({
  //   model: 'claude-sonnet-4-20250514',
  //   max_tokens: 512,
  //   messages: [{
  //     role: 'user',
  //     content: `Generate executive summary for: ${JSON.stringify(reportData)}`
  //   }],
  // })
  // return response.content[0].text

  return null
}

// Helper to check status (for UI badge)
export function isAIEnabled(): boolean {
  return isLive
}
