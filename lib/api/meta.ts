/**
 * Meta Marketing API Client (Facebook + Instagram Ads)
 *
 * AKTIVASYON:
 * 1. Facebook Business Manager → System User Token al (~1-3 gün)
 * 2. .env.local'a ekle:
 *    META_ACCESS_TOKEN=xxx
 *    META_AD_ACCOUNT_ID=act_yyy
 * 3. fetchFromAPI() fonksiyonunun içini doldur
 *
 * SİLME:
 * - Bu dosyayı sil
 * - lib/mock-data.ts'ten metaAdsCampaigns kaldır
 * - app/dashboard/sections/MetaAdsSection.tsx sil
 * - app/dashboard/page.tsx'ten <MetaAdsSection /> kaldır
 * - components/Sidebar.tsx'ten Meta icon kaldır
 * - lib/insights-engine.ts'ten getMetaAdsInsights() kaldır
 */

import {
  metaAdsCampaigns as mockCampaigns,
  type MetaAdsCampaign,
} from '@/lib/mock-data'

const isLive = !!process.env.META_ACCESS_TOKEN

export async function getMetaAdsCampaigns(): Promise<MetaAdsCampaign[]> {
  if (isLive) {
    try {
      return await fetchFromAPI()
    } catch (err) {
      console.error('Meta API failed, falling back to mock:', err)
      return mockCampaigns
    }
  }
  return mockCampaigns
}

async function fetchFromAPI(): Promise<MetaAdsCampaign[]> {
  // TODO: Token geldiğinde burayı doldur
  //
  // Örnek implementation (fetch ile):
  //
  // const accountId = process.env.META_AD_ACCOUNT_ID!
  // const token = process.env.META_ACCESS_TOKEN!
  // const fields = 'name,spend,actions,reach,clicks,impressions'
  //
  // const response = await fetch(
  //   `https://graph.facebook.com/v18.0/${accountId}/campaigns?fields=${fields}&access_token=${token}&date_preset=last_30d`
  // )
  // const data = await response.json()
  // return data.data.map(transformToOurFormat)

  throw new Error(
    'Meta API not yet implemented. Add credentials and implement fetchFromAPI().'
  )
}
