/**
 * Google Ads API Client
 *
 * AKTIVASYON:
 * 1. Google Cloud Console'dan Developer Token al (~4-8 hafta onay)
 * 2. .env.local'a ekle:
 *    GOOGLE_ADS_DEVELOPER_TOKEN=xxx
 *    GOOGLE_ADS_CUSTOMER_ID=yyy
 *    GOOGLE_ADS_REFRESH_TOKEN=zzz
 * 3. fetchFromAPI() fonksiyonunun içini doldur (aşağıda TODO)
 * 4. Otomatik gerçek veriye geçiş yapar
 *
 * SİLME:
 * - Bu dosyayı sil
 * - lib/mock-data.ts'ten googleAdsCampaigns kaldır
 * - app/dashboard/sections/GoogleAdsSection.tsx sil
 * - app/dashboard/page.tsx'ten <GoogleAdsSection /> kaldır
 * - components/Sidebar.tsx'ten Google icon kaldır
 * - lib/insights-engine.ts'ten getGoogleAdsInsights() kaldır
 */

import {
  googleAdsCampaigns as mockCampaigns,
  type GoogleAdsCampaign,
} from '@/lib/mock-data'

const isLive = !!process.env.GOOGLE_ADS_DEVELOPER_TOKEN

export async function getGoogleAdsCampaigns(): Promise<GoogleAdsCampaign[]> {
  if (isLive) {
    try {
      return await fetchFromAPI()
    } catch (err) {
      console.error('Google Ads API failed, falling back to mock:', err)
      return mockCampaigns
    }
  }
  return mockCampaigns
}

async function fetchFromAPI(): Promise<GoogleAdsCampaign[]> {
  // TODO: Token geldiğinde burayı doldur
  //
  // Örnek implementation (google-ads-api paketi ile):
  //
  // import { GoogleAdsApi } from 'google-ads-api'
  //
  // const client = new GoogleAdsApi({
  //   client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
  //   client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
  //   developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  // })
  //
  // const customer = client.Customer({
  //   customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!,
  //   refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  // })
  //
  // const campaigns = await customer.query(`
  //   SELECT campaign.name, metrics.cost_micros, metrics.conversions, ...
  //   FROM campaign
  //   WHERE segments.date DURING LAST_30_DAYS
  // `)
  //
  // return campaigns.map(transformToOurFormat)

  throw new Error(
    'Google Ads API not yet implemented. Add credentials and implement fetchFromAPI().'
  )
}
