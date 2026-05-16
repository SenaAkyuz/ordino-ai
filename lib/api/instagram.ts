/**
 * Instagram Graph API Client (organik post metrikleri)
 *
 * AKTIVASYON:
 * 1. Facebook Business → Instagram Business Account bağla (~1 gün)
 * 2. .env.local'a ekle:
 *    INSTAGRAM_ACCESS_TOKEN=xxx
 *    INSTAGRAM_BUSINESS_ID=yyy
 * 3. fetchPosts() ve fetchAccountStats() fonksiyonlarını doldur
 *
 * SİLME:
 * - Bu dosyayı sil
 * - lib/mock-data.ts'ten instagramPosts, instagramKpis kaldır
 * - app/dashboard/sections/InstagramSection.tsx sil
 * - app/dashboard/page.tsx'ten <InstagramSection /> kaldır
 * - components/Sidebar.tsx'ten Instagram icon kaldır
 * - lib/insights-engine.ts'ten getInstagramInsights() kaldır
 */

import {
  instagramPosts as mockPosts,
  instagramKpis as mockKpis,
  type InstagramPost,
} from '@/lib/mock-data'

const isLive = !!process.env.INSTAGRAM_ACCESS_TOKEN

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  if (isLive) {
    try {
      return await fetchPostsFromAPI()
    } catch (err) {
      console.error('Instagram API failed, falling back to mock:', err)
      return mockPosts
    }
  }
  return mockPosts
}

export async function getInstagramKpis(): Promise<typeof mockKpis> {
  if (isLive) {
    try {
      return await fetchKpisFromAPI()
    } catch (err) {
      console.error('Instagram KPIs failed, falling back to mock:', err)
      return mockKpis
    }
  }
  return mockKpis
}

async function fetchPostsFromAPI(): Promise<InstagramPost[]> {
  // TODO: Token geldiğinde burayı doldur
  //
  // Örnek:
  // const businessId = process.env.INSTAGRAM_BUSINESS_ID!
  // const token = process.env.INSTAGRAM_ACCESS_TOKEN!
  // const response = await fetch(
  //   `https://graph.facebook.com/v18.0/${businessId}/media?fields=caption,like_count,comments_count,insights.metric(reach)&access_token=${token}&limit=5`
  // )
  // const data = await response.json()
  // return data.data.map(transformToOurFormat)

  throw new Error('Instagram API not yet implemented.')
}

async function fetchKpisFromAPI(): Promise<typeof mockKpis> {
  throw new Error('Instagram KPIs API not yet implemented.')
}
