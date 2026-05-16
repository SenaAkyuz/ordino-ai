import {
  googleAdsCampaigns,
  metaAdsCampaigns,
  instagramPosts,
  linkedinPosts,
  googleAdsKpis,
  metaAdsKpis,
  instagramKpis,
  linkedinKpis,
} from './mock-data'
import { generateAISummary } from '@/lib/ai/claude'

export type ReportData = {
  period: string
  generatedAt: string
  client: string
  summary: string
  keyMetrics: { label: string; value: string; change: string; positive: boolean }[]
  topPerformers: { label: string; name: string; metric: string }[]
  recommendations: { priority: 'high' | 'medium' | 'low'; title: string; description: string }[]
  platformBreakdown: {
    platform: string
    color: string
    metrics: { label: string; value: string }[]
    highlight: string
  }[]
}

export async function generateReport(): Promise<ReportData> {
  const g = googleAdsKpis()
  const m = metaAdsKpis()
  const totalSpend = g.totalCost + m.totalSpend
  const totalConversions = g.totalConversions + m.totalConversions
  const avgRoas = (g.avgRoas + m.avgRoas) / 2

  const now = new Date()
  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık',
  ]
  const period = `${monthNames[now.getMonth()]} ${now.getFullYear()}`

  const topGoogle = [...googleAdsCampaigns].sort((a, b) => b.roas - a.roas)[0]
  const topMeta = [...metaAdsCampaigns].sort((a, b) => b.roas - a.roas)[0]
  const topInsta = [...instagramPosts].sort((a, b) => b.reach - a.reach)[0]
  const topLinked = [...linkedinPosts].sort((a, b) => b.impressions - a.impressions)[0]

  const aiSummary = await generateAISummary({
    period,
    totalSpend,
    totalConversions,
    avgRoas,
    topGoogle,
    topMeta,
  })

  const summary =
    aiSummary ||
    `GoBritanya'nın ${period} döneminde performansı güçlü. ` +
      `Toplam £${totalSpend.toLocaleString('en-GB')} reklam harcaması ile ` +
      `${totalConversions} dönüşüm elde edildi. Ortalama ROAS ${avgRoas.toFixed(1)}x ` +
      `seviyesinde. Brand kampanyaları (${topGoogle.roas.toFixed(1)}x ROAS) en yüksek verimi sağlıyor. ` +
      `Sosyal medya tarafında LinkedIn (%${linkedinKpis.engagementRate.toFixed(1)} etkileşim) ` +
      `Instagram'dan (%${instagramKpis.engagementRate.toFixed(1)}) daha yüksek performans üretiyor. ` +
      `Organik takipçi büyümesi her iki platformda da pozitif.`

  return {
    period,
    generatedAt: now.toISOString().split('T')[0],
    client: 'GoBritanya',
    summary,
    keyMetrics: [
      { label: 'Toplam Spend', value: `£${totalSpend.toLocaleString('en-GB')}`, change: '+13.6%', positive: true },
      { label: 'Dönüşüm', value: totalConversions.toString(), change: '+14.7%', positive: true },
      { label: 'Ort. ROAS', value: `${avgRoas.toFixed(1)}x`, change: '+4.8%', positive: true },
      { label: 'Sosyal Takipçi', value: (instagramKpis.totalFollowers + linkedinKpis.totalFollowers).toLocaleString('en-GB'), change: `+${instagramKpis.followersThisMonth + linkedinKpis.followersThisMonth}`, positive: true },
    ],
    topPerformers: [
      { label: 'Google Ads', name: topGoogle.name, metric: `${topGoogle.roas.toFixed(1)}x ROAS` },
      { label: 'Meta Ads', name: topMeta.name, metric: `${topMeta.roas.toFixed(1)}x ROAS` },
      { label: 'Instagram', name: topInsta.caption.substring(0, 60) + '...', metric: `${topInsta.reach.toLocaleString('en-GB')} erişim` },
      { label: 'LinkedIn', name: topLinked.title.substring(0, 60) + '...', metric: `${topLinked.impressions.toLocaleString('en-GB')} gösterim` },
    ],
    recommendations: [
      { priority: 'high', title: 'Brand kampanyalarına ek bütçe', description: `"${topGoogle.name}" en yüksek ROAS'ı sunuyor. %20 bütçe artışı ile dönüşüm sayısı önümüzdeki ay 15-20% artabilir.` },
      { priority: 'high', title: 'Retargeting ölçeklendirme', description: 'Meta Retargeting kampanyası 8.1x ROAS sunuyor. Lookalike audience eklenmesi yeni kişilerle bu performansı yakalayabilir.' },
      { priority: 'medium', title: 'LinkedIn\'e ağırlık', description: 'LinkedIn etkileşim oranı Instagram\'dan yüksek. B2B karar vericiler için LinkedIn içerik sıklığını artırın.' },
      { priority: 'low', title: 'Düşük CTR kampanyaları', description: 'YouTube ve Demand Gen kampanyalarının CTR\'si %1\'in altında. Creative testleri ile iyileştirme fırsatı var.' },
      { priority: 'low', title: 'Instagram post sıklığı', description: 'Son 30 günde 5 post paylaşılmış. Haftada 3-4 post hedefiyle erişim 2x artabilir.' },
    ],
    platformBreakdown: [
      { platform: 'Google Ads', color: '#4285F4', metrics: [
        { label: 'Spend', value: `£${g.totalCost.toLocaleString('en-GB')}` },
        { label: 'Dön.', value: g.totalConversions.toString() },
        { label: 'ROAS', value: `${g.avgRoas.toFixed(1)}x` },
      ], highlight: `En iyi: ${topGoogle.name}` },
      { platform: 'Meta Ads', color: '#0866FF', metrics: [
        { label: 'Spend', value: `£${m.totalSpend.toLocaleString('en-GB')}` },
        { label: 'Dön.', value: m.totalConversions.toString() },
        { label: 'ROAS', value: `${m.avgRoas.toFixed(1)}x` },
      ], highlight: `En iyi: ${topMeta.name}` },
      { platform: 'Instagram', color: '#E1306C', metrics: [
        { label: 'Takipçi', value: instagramKpis.totalFollowers.toLocaleString('en-GB') },
        { label: 'Erişim', value: `${(instagramKpis.totalReach / 1000).toFixed(0)}K` },
        { label: 'Etk.', value: `%${instagramKpis.engagementRate.toFixed(1)}` },
      ], highlight: `En iyi: ${topInsta.caption.substring(0, 30)}...` },
      { platform: 'LinkedIn', color: '#0A66C2', metrics: [
        { label: 'Takipçi', value: linkedinKpis.totalFollowers.toLocaleString('en-GB') },
        { label: 'Gösterim', value: `${(linkedinKpis.totalImpressions / 1000).toFixed(0)}K` },
        { label: 'Etk.', value: `%${linkedinKpis.engagementRate.toFixed(1)}` },
      ], highlight: `En iyi: ${topLinked.title.substring(0, 30)}...` },
    ],
  }
}

export const pastReports = [
  { id: 'apr-2026', period: 'Nisan 2026', generatedAt: '2026-05-01', client: 'GoBritanya', spend: 19840, conversions: 408 },
  { id: 'mar-2026', period: 'Mart 2026', generatedAt: '2026-04-01', client: 'GoBritanya', spend: 17320, conversions: 376 },
  { id: 'feb-2026', period: 'Şubat 2026', generatedAt: '2026-03-01', client: 'GoBritanya', spend: 15890, conversions: 342 },
]
