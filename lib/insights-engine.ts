import {
  googleAdsCampaigns,
  metaAdsCampaigns,
  instagramPosts,
  linkedinPosts,
  instagramKpis,
  linkedinKpis,
} from './mock-data'
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
function getGoogleAdsInsights(): Insight[] {
  const sortedByRoas = [...googleAdsCampaigns].sort((a, b) => b.roas - a.roas)
  const topRoas = sortedByRoas[0]
  const lowestCtr = [...googleAdsCampaigns].sort((a, b) => a.ctr - b.ctr)[0]
  const lowestRoas = sortedByRoas[sortedByRoas.length - 1]

  return [
    {
      type: 'recommendation',
      icon: '📈',
      title: 'Bütçe artırılması öneriliyor',
      description: `"${topRoas.name}" kampanyanız ${topRoas.roas.toFixed(1)}x ROAS ile en yüksek performans gösteriyor. Sadece £${topRoas.cost.toLocaleString('en-GB')} harcamayla ${topRoas.conversions} dönüşüm alındı.`,
      action: 'Bütçeyi %20 artır',
    },
    {
      type: 'warning',
      icon: '⚠️',
      title: 'Düşük performans',
      description: `"${lowestRoas.name}" ${lowestRoas.roas.toFixed(1)}x ROAS ve %${lowestCtr.ctr.toFixed(2)} CTR ile beklenti altında. Targeting veya creative iyileştirmesi gerekli.`,
      action: 'Creative yenile',
    },
    {
      type: 'opportunity',
      icon: '✨',
      title: 'Büyüme fırsatı',
      description: `Top 3 kampanyanız toplam dönüşümün %58'ini sağlıyor. Bu kampanyaları ölçeklendirebilirsiniz.`,
      action: 'Lookalike ekle',
    },
  ]
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

export async function getInsights(platform: Platform): Promise<Insight[]> {
  // Try AI first (no-op + null until ANTHROPIC_API_KEY is set)
  const data = getRawDataForPlatform(platform)
  const aiInsights = await generateAIInsights(platform, data)

  if (aiInsights && aiInsights.length > 0) {
    return aiInsights
  }

  // Fallback to rule-based
  switch (platform) {
    case 'google':
      return getGoogleAdsInsights()
    case 'meta':
      return getMetaAdsInsights()
    case 'instagram':
      return getInstagramInsights()
    case 'linkedin':
      return getLinkedInInsights()
  }
}
