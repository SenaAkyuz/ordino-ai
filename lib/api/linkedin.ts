/**
 * LinkedIn Marketing API Client
 *
 * AKTIVASYON:
 * 1. LinkedIn Developer Application başvurusu (~2-4 hafta)
 * 2. Company Page Admin yetkisi al
 * 3. .env.local'a ekle:
 *    LINKEDIN_ACCESS_TOKEN=xxx
 *    LINKEDIN_ORGANIZATION_ID=yyy
 * 4. fetchPosts() ve fetchAccountStats() fonksiyonlarını doldur
 *
 * SİLME:
 * - Bu dosyayı sil
 * - lib/mock-data.ts'ten linkedinPosts, linkedinKpis kaldır
 * - app/dashboard/sections/LinkedInSection.tsx sil
 * - app/dashboard/page.tsx'ten <LinkedInSection /> kaldır
 * - components/Sidebar.tsx'ten LinkedIn icon kaldır
 * - lib/insights-engine.ts'ten getLinkedInInsights() kaldır
 */

import {
  linkedinPosts as mockPosts,
  linkedinKpis as mockKpis,
  type LinkedInPost,
} from '@/lib/mock-data'

const isLive = !!process.env.LINKEDIN_ACCESS_TOKEN

export async function getLinkedInPosts(): Promise<LinkedInPost[]> {
  if (isLive) {
    try {
      return await fetchPostsFromAPI()
    } catch (err) {
      console.error('LinkedIn API failed, falling back to mock:', err)
      return mockPosts
    }
  }
  return mockPosts
}

export async function getLinkedInKpis(): Promise<typeof mockKpis> {
  if (isLive) {
    try {
      return await fetchKpisFromAPI()
    } catch (err) {
      console.error('LinkedIn KPIs failed, falling back to mock:', err)
      return mockKpis
    }
  }
  return mockKpis
}

async function fetchPostsFromAPI(): Promise<LinkedInPost[]> {
  // TODO: Token geldiğinde burayı doldur
  //
  // LinkedIn Marketing API endpoint:
  // GET /rest/posts?author=urn:li:organization:{ORG_ID}&q=author
  //
  // const orgId = process.env.LINKEDIN_ORGANIZATION_ID!
  // const token = process.env.LINKEDIN_ACCESS_TOKEN!
  // const response = await fetch(`https://api.linkedin.com/rest/posts?...`, {
  //   headers: { Authorization: `Bearer ${token}`, 'LinkedIn-Version': '202401' }
  // })
  // return data.elements.map(transformToOurFormat)

  throw new Error('LinkedIn API not yet implemented.')
}

async function fetchKpisFromAPI(): Promise<typeof mockKpis> {
  throw new Error('LinkedIn KPIs API not yet implemented.')
}
