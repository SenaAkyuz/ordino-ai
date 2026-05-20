/**
 * Google Ads API Client
 *
 * AKTIVASYON:
 * 1. Google Cloud Console'dan Developer Token al (~4-8 hafta onay)
 * 2. .env.local'a 6 değişken ekle:
 *    GOOGLE_ADS_DEVELOPER_TOKEN=xxx
 *    GOOGLE_ADS_CLIENT_ID=xxx
 *    GOOGLE_ADS_CLIENT_SECRET=xxx
 *    GOOGLE_ADS_REFRESH_TOKEN=xxx
 *    GOOGLE_ADS_LOGIN_CUSTOMER_ID=xxx   (MCC ID, tire olmadan)
 *    GOOGLE_ADS_CUSTOMER_ID=xxx          (client ID, tire olmadan)
 * 3. Sunucu yeniden başladığında otomatik gerçek veriye geçer.
 *    Eksik var olursa veya API hata verirse mock'a fallback eder.
 *
 * SİLME:
 * - Bu dosyayı sil
 * - lib/mock-data.ts'ten googleAdsCampaigns kaldır
 * - app/dashboard/sections/GoogleAdsSection.tsx sil
 * - app/dashboard/page.tsx'ten <GoogleAdsSection /> kaldır
 * - components/Sidebar.tsx'ten Google icon kaldır
 * - lib/insights-engine.ts'ten getGoogleAdsInsights() kaldır
 */

// gRPC default c-ares resolver bazı Windows kurulumlarında (çift NIC vb.)
// googleads.googleapis.com'u çözemiyor; Node'un native resolver'ını zorla.
// Channel kurulmadan önce set edilmeli — bu yüzden importlardan önce.
if (!process.env.GRPC_DNS_RESOLVER) {
  process.env.GRPC_DNS_RESOLVER = 'native'
}

import { GoogleAdsApi, type Customer } from 'google-ads-api'
import {
  googleAdsCampaigns as mockCampaigns,
  type GoogleAdsCampaign,
} from '@/lib/mock-data'

const isLive = !!(
  process.env.GOOGLE_ADS_DEVELOPER_TOKEN &&
  process.env.GOOGLE_ADS_CLIENT_ID &&
  process.env.GOOGLE_ADS_CLIENT_SECRET &&
  process.env.GOOGLE_ADS_REFRESH_TOKEN &&
  process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID &&
  process.env.GOOGLE_ADS_CUSTOMER_ID
)

let customerClient: Customer | null = null

function getCustomer(): Customer | null {
  if (!isLive) return null
  if (customerClient) return customerClient

  const api = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  })

  customerClient = api.Customer({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, ''),
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!.replace(/-/g, ''),
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  })

  return customerClient
}

const CACHE_TTL = 60 * 60 * 1000
type CacheEntry<T> = { data: T; expires: number }
const cache = new Map<string, CacheEntry<unknown>>()

// API hata durumu (module-level, serverless instance başına).
// Cache miss + API hatası → ilgili alan set edilir, mock döner.
// Cache miss + API başarılı → null'a sıfırlanır.
// UI getGoogleAdsApiStatus() ile okur, banner render eder.
const apiErrors: { campaigns: string | null; daily: string | null } = {
  campaigns: null,
  daily: null,
}

const FALLBACK_MESSAGE = 'Canlı veri çekilemedi — mock veri gösteriliyor'

export type GoogleAdsApiStatus =
  | { ok: true }
  | { ok: false; message: string }

export function getGoogleAdsApiStatus(): GoogleAdsApiStatus {
  if (apiErrors.campaigns || apiErrors.daily) {
    return { ok: false, message: apiErrors.campaigns || apiErrors.daily! }
  }
  return { ok: true }
}

async function cached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now()
  const entry = cache.get(key) as CacheEntry<T> | undefined
  if (entry && entry.expires > now) return entry.data

  const data = await fetcher()
  cache.set(key, { data, expires: now + CACHE_TTL })
  return data
}

const microsToUnits = (micros: number | null | undefined) =>
  ((micros || 0) / 1_000_000)

// ═══════════════════════════════════════════
// Range support
// ═══════════════════════════════════════════

export type DateRange = 7 | 30 | 60

// Trend value: null → veri yok (— göster), {value, positive} → render edilir
export type TrendValue = {
  value: string // "12.4%" format
  positive: boolean
} | null

export type GoogleAdsTrendComparison = {
  cost: TrendValue
  conversions: TrendValue
  roas: TrendValue
  impressions: TrendValue
}

// GAQL'de LAST_60_DAYS sabit YOK (sadece 7/14/30/90 destekleniyor).
// Range-agnostic olmak için BETWEEN 'YYYY-MM-DD' AND 'YYYY-MM-DD' kullanıyoruz.
// LAST_X_DAYS davranışına denk: today dahil, geriye doğru rangeDays-1 gün.
function rangeDates(rangeDays: number): { start: string; end: string } {
  const now = new Date()
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const start = new Date(end)
  start.setUTCDate(start.getUTCDate() - (rangeDays - 1))
  return {
    start: start.toISOString().split('T')[0],
    end: end.toISOString().split('T')[0],
  }
}

// 60 günlük data'dan son N günü slice et
function sliceDailyForRange(
  daily: GoogleAdsDailyPoint[],
  rangeDays: DateRange,
): GoogleAdsDailyPoint[] {
  return daily.slice(-rangeDays)
}

// 60 günlük data'dan ÖNCEKİ N günü slice et (current periyodun öncesi)
function slicePreviousPeriod(
  daily: GoogleAdsDailyPoint[],
  rangeDays: DateRange,
): GoogleAdsDailyPoint[] {
  const total = daily.length
  if (total < rangeDays * 2) return [] // Önceki periyot için yeterli veri yok
  return daily.slice(total - rangeDays * 2, total - rangeDays)
}

// % değişim hesapla — previous=0 ise null döner (UI '—' gösterir)
function calculatePercentChange(current: number, previous: number): TrendValue {
  if (previous === 0) return null
  const change = ((current - previous) / previous) * 100
  return {
    value: `${Math.abs(change).toFixed(1)}%`,
    positive: change >= 0,
  }
}

// ═══════════════════════════════════════════
// Types
// ═══════════════════════════════════════════

export type GoogleAdsKpisData = {
  totalCost: number
  totalConversions: number
  avgRoas: number
  totalImpressions: number
}

export type GoogleAdsDailyPoint = {
  date: string
  cost: number
  conversions: number
  roas: number
  impressions: number
}

// TopPerformers component'in beklediği {id, name, value, secondary} shape
export type GoogleAdsTopPerformer = {
  id: string
  name: string
  value: string
  secondary: string
}

// ═══════════════════════════════════════════
// Public exports (range-aware)
// ═══════════════════════════════════════════

// CAMPAIGNS — range'e göre kampanyaları çek (her range ayrı cache)
export async function getGoogleAdsCampaigns(
  rangeDays: DateRange = 30,
): Promise<GoogleAdsCampaign[]> {
  const customer = getCustomer()
  if (!customer) return mockCampaigns

  return cached(`campaigns-${rangeDays}`, async () => {
    try {
      const { start, end } = rangeDates(rangeDays)
      const result = await customer.query(`
        SELECT
          campaign.id,
          campaign.name,
          metrics.cost_micros,
          metrics.conversions,
          metrics.conversions_value,
          metrics.ctr,
          metrics.impressions
        FROM campaign
        WHERE segments.date BETWEEN '${start}' AND '${end}'
          AND campaign.status = 'ENABLED'
        ORDER BY metrics.cost_micros DESC
        LIMIT 10
      `)

      apiErrors.campaigns = null
      return result.map((row): GoogleAdsCampaign => {
        const cost = microsToUnits(row.metrics?.cost_micros)
        const conversions = row.metrics?.conversions || 0
        const conversionsValue = row.metrics?.conversions_value || 0
        const roas = cost > 0 ? conversionsValue / cost : 0

        return {
          id: String(row.campaign?.id ?? ''),
          name: row.campaign?.name || 'Unknown',
          cost: Math.round(cost),
          conversions: Math.round(conversions),
          roas: Number(roas.toFixed(1)),
          ctr: Number(((row.metrics?.ctr || 0) * 100).toFixed(2)),
          impressions: Number(row.metrics?.impressions || 0),
        }
      })
    } catch (err) {
      apiErrors.campaigns = FALLBACK_MESSAGE
      console.error('[GoogleAds] Campaigns fetch failed, falling back to mock:', err)
      return mockCampaigns
    }
  })
}

// DAILY — her zaman 60 gün çek, slice ile tüm aralıklar türetilir (tek API çağrısı)
export async function getGoogleAdsDaily(): Promise<GoogleAdsDailyPoint[]> {
  const customer = getCustomer()
  if (!customer) {
    const mockData = await import('@/lib/mock-data')
    const sparks = mockData.sparklines.google
    return sparks.cost.map((cost, i) => ({
      date: new Date(Date.now() - (sparks.cost.length - 1 - i) * 86400_000)
        .toISOString()
        .split('T')[0],
      cost,
      conversions: sparks.conversions[i] || 0,
      roas: sparks.roas[i] || 0,
      impressions: sparks.impressions[i] || 0,
    }))
  }

  return cached('daily-60', async () => {
    try {
      const { start, end } = rangeDates(60)
      const result = await customer.query(`
        SELECT
          segments.date,
          metrics.cost_micros,
          metrics.conversions,
          metrics.conversions_value,
          metrics.impressions
        FROM customer
        WHERE segments.date BETWEEN '${start}' AND '${end}'
        ORDER BY segments.date ASC
      `)

      apiErrors.daily = null
      return result.map((row): GoogleAdsDailyPoint => {
        const cost = microsToUnits(row.metrics?.cost_micros)
        const conversionsValue = row.metrics?.conversions_value || 0
        return {
          date: row.segments?.date || '',
          cost: Math.round(cost),
          conversions: Math.round(row.metrics?.conversions || 0),
          roas: cost > 0 ? Number((conversionsValue / cost).toFixed(1)) : 0,
          impressions: Number(row.metrics?.impressions || 0),
        }
      })
    } catch (err) {
      apiErrors.daily = FALLBACK_MESSAGE
      console.error('[GoogleAds] Daily fetch failed, falling back to mock:', err)
      const mockData = await import('@/lib/mock-data')
      const sparks = mockData.sparklines.google
      return sparks.cost.map((cost, i) => ({
        date: new Date(Date.now() - (sparks.cost.length - 1 - i) * 86400_000)
          .toISOString()
          .split('T')[0],
        cost,
        conversions: sparks.conversions[i] || 0,
        roas: sparks.roas[i] || 0,
        impressions: sparks.impressions[i] || 0,
      }))
    }
  })
}

// KPIs — daily'den seçili aralığı slice et + topla
export async function getGoogleAdsKpis(
  rangeDays: DateRange = 30,
): Promise<GoogleAdsKpisData> {
  const daily = await getGoogleAdsDaily()
  const sliced = sliceDailyForRange(daily, rangeDays)

  if (sliced.length === 0) {
    const mockData = await import('@/lib/mock-data')
    return mockData.googleAdsKpis()
  }

  const totalCost = sliced.reduce((sum, d) => sum + d.cost, 0)
  const totalConversions = sliced.reduce((sum, d) => sum + d.conversions, 0)
  const totalImpressions = sliced.reduce((sum, d) => sum + d.impressions, 0)
  // ROAS weighted average: each day's roas*cost = conversion value, sum/sum
  const totalConvValue = sliced.reduce((sum, d) => sum + d.roas * d.cost, 0)
  const avgRoas = totalCost > 0 ? Number((totalConvValue / totalCost).toFixed(1)) : 0

  return {
    totalCost: Math.round(totalCost),
    totalConversions: Math.round(totalConversions),
    avgRoas,
    totalImpressions,
  }
}

// SPARKLINES — daily'den range slice
export async function getGoogleAdsSparklines(rangeDays: DateRange = 30) {
  const daily = await getGoogleAdsDaily()
  const sliced = sliceDailyForRange(daily, rangeDays)
  return {
    cost: sliced.map((d) => d.cost),
    conversions: sliced.map((d) => d.conversions),
    roas: sliced.map((d) => d.roas),
    impressions: sliced.map((d) => d.impressions),
  }
}

// TREND CHART — daily'den range slice + dinamik label
export async function getGoogleAdsTrend(rangeDays: DateRange = 30) {
  const daily = await getGoogleAdsDaily()
  const sliced = sliceDailyForRange(daily, rangeDays)
  return {
    label: `Son ${rangeDays} gün — günlük maliyet`,
    values: sliced.map((d) => d.cost),
  }
}

// TOP PERFORMERS — campaigns'tan ROAS sıralı top 3
export async function getGoogleAdsTopPerformers(
  rangeDays: DateRange = 30,
): Promise<GoogleAdsTopPerformer[]> {
  const campaigns = await getGoogleAdsCampaigns(rangeDays)
  return [...campaigns]
    .filter((c) => c.roas > 0)
    .sort((a, b) => b.roas - a.roas)
    .slice(0, 3)
    .map((c) => ({
      id: c.id,
      name: c.name,
      value: `${c.roas.toFixed(1)}x`,
      secondary: 'ROAS',
    }))
}

// TREND COMPARISON — current vs previous period yüzde değişimleri
export async function getGoogleAdsTrendComparison(
  rangeDays: DateRange = 30,
): Promise<GoogleAdsTrendComparison> {
  const daily = await getGoogleAdsDaily()
  const current = sliceDailyForRange(daily, rangeDays)
  const previous = slicePreviousPeriod(daily, rangeDays)

  if (current.length === 0 || previous.length === 0) {
    return { cost: null, conversions: null, roas: null, impressions: null }
  }

  const sumNumeric = (arr: GoogleAdsDailyPoint[], key: 'cost' | 'conversions' | 'impressions') =>
    arr.reduce((s, d) => s + d[key], 0)

  const avgRoas = (arr: GoogleAdsDailyPoint[]) => {
    const totalCost = sumNumeric(arr, 'cost')
    const totalConvValue = arr.reduce((s, d) => s + d.roas * d.cost, 0)
    return totalCost > 0 ? totalConvValue / totalCost : 0
  }

  return {
    cost: calculatePercentChange(sumNumeric(current, 'cost'), sumNumeric(previous, 'cost')),
    conversions: calculatePercentChange(
      sumNumeric(current, 'conversions'),
      sumNumeric(previous, 'conversions'),
    ),
    roas: calculatePercentChange(avgRoas(current), avgRoas(previous)),
    impressions: calculatePercentChange(
      sumNumeric(current, 'impressions'),
      sumNumeric(previous, 'impressions'),
    ),
  }
}
