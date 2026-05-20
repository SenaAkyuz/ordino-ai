import {
  googleAdsCampaigns,
  metaAdsCampaigns,
  instagramPosts,
  linkedinPosts,
  instagramKpis,
  linkedinKpis,
} from './mock-data'
import { getGoogleAdsCampaigns } from '@/lib/api/google-ads'
import { generateAIInsights } from '@/lib/ai/claude'

export type Insight = {
  type: 'recommendation' | 'warning' | 'opportunity'
  icon: string
  title: string
  description: string
  action: string
}

export type Platform = 'google' | 'meta' | 'instagram' | 'linkedin'

// ── Google Ads ──
async function getGoogleAdsInsights(rangeDays: 7 | 30 | 60 = 30): Promise<Insight[]> {
  const campaigns = await getGoogleAdsCampaigns(rangeDays)
  const insights: Insight[] = []

  if (campaigns.length === 0) {
    return [
      {
        type: 'warning',
        icon: '⚠️',
        title: 'Veri yok',
        description: 'Son 30 günde aktif kampanya bulunamadı.',
        action: 'Hesabı kontrol et',
      },
    ]
  }

  // ── 1. En yüksek ROAS — bütçe artırma önerisi ──
  const sortedByRoas = [...campaigns].filter((c) => c.roas > 0).sort((a, b) => b.roas - a.roas)
  const topRoas = sortedByRoas[0]

  if (topRoas && topRoas.roas >= 3) {
    insights.push({
      type: 'recommendation',
      icon: '📈',
      title: 'Bütçe artırılması öneriliyor',
      description: `"${topRoas.name}" kampanyanız ${topRoas.roas.toFixed(1)}x ROAS ile en yüksek performans gösteriyor. £${topRoas.cost.toLocaleString('en-GB')} harcamayla ${topRoas.conversions} dönüşüm alındı.`,
      action: 'Bütçeyi %20 artır',
    })
  }

  // ── 2. Düşük ROAS — uyarı (anlamlı harcaması olanlar) ──
  const sortedByLowRoas = [...campaigns]
    .filter((c) => c.cost > 100)
    .sort((a, b) => a.roas - b.roas)
  const lowRoas = sortedByLowRoas[0]

  if (lowRoas && lowRoas.roas < 1) {
    insights.push({
      type: 'warning',
      icon: '⚠️',
      title: 'Düşük performans',
      description: `"${lowRoas.name}" ${lowRoas.roas.toFixed(1)}x ROAS ve %${lowRoas.ctr.toFixed(2)} CTR ile beklenti altında. Targeting veya creative iyileştirmesi gerekli.`,
      action: 'Creative yenile',
    })
  }

  // ── 3. Top 3 kampanyaların payı — büyüme fırsatı ──
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0)
  const top3Conversions = sortedByRoas.slice(0, 3).reduce((sum, c) => sum + c.conversions, 0)
  const top3Share = totalConversions > 0 ? Math.round((top3Conversions / totalConversions) * 100) : 0

  if (top3Share >= 40) {
    insights.push({
      type: 'opportunity',
      icon: '✨',
      title: 'Büyüme fırsatı',
      description: `Top 3 kampanyanız toplam dönüşümün %${top3Share}'ini sağlıyor. Bu kampanyaları ölçeklendirebilirsiniz.`,
      action: 'Lookalike ekle',
    })
  }

  // ── Dolgu: 3'ten az insight varsa en yüksek harcamayı ekle ──
  if (insights.length < 3) {
    const highestSpend = [...campaigns].sort((a, b) => b.cost - a.cost)[0]
    if (highestSpend) {
      insights.push({
        type: 'opportunity',
        icon: '💡',
        title: 'En büyük harcama',
        description: `"${highestSpend.name}" £${highestSpend.cost.toLocaleString('en-GB')} harcama ile bütçenin büyük kısmını alıyor. ROAS ${highestSpend.roas.toFixed(1)}x.`,
        action: 'Performans incele',
      })
    }
  }

  return insights.slice(0, 3)
}

// ── Meta Ads ──
function getMetaAdsInsights(): Insight[] {
  const sortedByRoas = [...metaAdsCampaigns].sort((a, b) => b.roas - a.roas)
  const topRoas = sortedByRoas[0]
  const lowestRoas = sortedByRoas[sortedByRoas.length - 1]
  const topCtr = [...metaAdsCampaigns].sort((a, b) => b.ctr - a.ctr)[0]

  return [
    {
      type: 'recommendation',
      icon: '🎯',
      title: 'Retargeting güçlü',
      description: `"${topRoas.name}" ${topRoas.roas.toFixed(1)}x ROAS ile en yüksek. Yüksek-niyet izleyicilerden çıkıyor.`,
      action: 'Bütçeyi %15 artır',
    },
    {
      type: 'warning',
      icon: '📢',
      title: 'Brand kampanyası verimsiz',
      description: `"${lowestRoas.name}" geniş erişim sağlıyor ama ${lowestRoas.roas.toFixed(1)}x ROAS ile dönüşüm zayıf. Mid-funnel'a yönlendirme gerekli.`,
      action: 'Hedefleme daralt',
    },
    {
      type: 'opportunity',
      icon: '💡',
      title: 'En yüksek CTR',
      description: `"${topCtr.name}" %${topCtr.ctr.toFixed(2)} CTR ile etkili creative kullanıyor. Bu formatı diğer kampanyalara genelleyin.`,
      action: 'Creative çoğalt',
    },
  ]
}

// ── Instagram ──
function getInstagramInsights(): Insight[] {
  const topPost = [...instagramPosts].sort((a, b) => b.reach - a.reach)[0]
  const avgEngagement = (
    instagramPosts.reduce((s, p) => s + (p.likes + p.comments), 0) /
    instagramPosts.reduce((s, p) => s + p.reach, 0)
  ) * 100

  return [
    {
      type: 'recommendation',
      icon: '📸',
      title: 'En iyi içerik formatı',
      description: `"${topPost.caption.substring(0, 40)}..." ${topPost.reach.toLocaleString('en-GB')} kişiye ulaştı. Bu formatı hafta içi en az 2 kez kullanın.`,
      action: 'Format çoğalt',
    },
    {
      type: 'opportunity',
      icon: '📊',
      title: 'Etkileşim yükseliyor',
      description: `Etkileşim oranı %${instagramKpis.engagementRate.toFixed(1)}, takipçi büyümesi +${instagramKpis.followersThisMonth}. Şu an organik momentüm var.`,
      action: 'Story sıklaştır',
    },
    {
      type: 'warning',
      icon: '⏰',
      title: 'Post sıklığı düşük',
      description: `Son 30 günde sadece ${instagramPosts.length} post paylaşılmış. Haftada 3-4 post hedeflenmeli.`,
      action: 'İçerik takvimi',
    },
  ]
}

// ── LinkedIn ──
function getLinkedInInsights(): Insight[] {
  const topPost = [...linkedinPosts].sort((a, b) => b.impressions - a.impressions)[0]
  const totalClicks = linkedinPosts.reduce((s, p) => s + p.clicks, 0)
  const totalImpressions = linkedinPosts.reduce((s, p) => s + p.impressions, 0)
  const avgCtr = (totalClicks / totalImpressions) * 100

  return [
    {
      type: 'recommendation',
      icon: '💼',
      title: 'Thought leadership güçlü',
      description: `"${topPost.title.substring(0, 50)}..." ${topPost.impressions.toLocaleString('en-GB')} gösterim aldı. B2B karar vericiler bu içeriğe ilgi gösteriyor.`,
      action: 'Seri oluştur',
    },
    {
      type: 'opportunity',
      icon: '📈',
      title: 'Etkileşim Instagram\'dan yüksek',
      description: `LinkedIn etkileşim oranı %${linkedinKpis.engagementRate.toFixed(1)}, Instagram'dan (%${instagramKpis.engagementRate.toFixed(1)}) yüksek. B2B'de LinkedIn'e ağırlık verin.`,
      action: 'Bütçeyi LinkedIn\'e kaydır',
    },
    {
      type: 'warning',
      icon: '🔗',
      title: 'CTR iyileştirilebilir',
      description: `Ortalama CTR %${avgCtr.toFixed(2)}. CTA kullanımı ve ilk cümle iyileştirmesi click rate'i artırabilir.`,
      action: 'CTA testi yap',
    },
  ]
}

function getRawDataForPlatform(platform: Platform) {
  switch (platform) {
    case 'google':
      return googleAdsCampaigns
    case 'meta':
      return metaAdsCampaigns
    case 'instagram':
      return instagramPosts
    case 'linkedin':
      return linkedinPosts
  }
}

export async function getInsights(
  platform: Platform,
  rangeDays: 7 | 30 | 60 = 30,
): Promise<Insight[]> {
  // Try AI first (no-op + null until ANTHROPIC_API_KEY is set)
  const data = getRawDataForPlatform(platform)
  const aiInsights = await generateAIInsights(platform, data)

  if (aiInsights && aiInsights.length > 0) {
    return aiInsights
  }

  // Fallback to rule-based
  switch (platform) {
    case 'google':
      return getGoogleAdsInsights(rangeDays)
    case 'meta':
      return getMetaAdsInsights()
    case 'instagram':
      return getInstagramInsights()
    case 'linkedin':
      return getLinkedInInsights()
  }
}
