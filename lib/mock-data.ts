// ── Google Ads ──
export type GoogleAdsCampaign = {
  id: string
  name: string
  cost: number
  conversions: number
  roas: number
  ctr: number
  impressions: number
}

export const googleAdsCampaigns: GoogleAdsCampaign[] = [
  { id: 'g1', name: 'UK Foundation Year — Search', cost: 3240, conversions: 87, roas: 4.2, ctr: 3.1, impressions: 142000 },
  { id: 'g2', name: 'Master Programs — Search', cost: 4180, conversions: 64, roas: 5.8, ctr: 2.7, impressions: 98500 },
  { id: 'g3', name: 'Brand — Search Defense', cost: 890, conversions: 42, roas: 11.4, ctr: 5.2, impressions: 24800 },
  { id: 'g4', name: 'Performance Max — UK Universities', cost: 2950, conversions: 71, roas: 4.9, ctr: 1.9, impressions: 215000 },
  { id: 'g5', name: 'YouTube — Student Stories', cost: 1820, conversions: 23, roas: 2.1, ctr: 0.8, impressions: 384000 },
  { id: 'g6', name: 'Demand Gen — Aspirational', cost: 1480, conversions: 19, roas: 2.6, ctr: 1.4, impressions: 156000 },
]

export function googleAdsKpis() {
  return {
    totalCost: googleAdsCampaigns.reduce((s, c) => s + c.cost, 0),
    totalConversions: googleAdsCampaigns.reduce((s, c) => s + c.conversions, 0),
    avgRoas: googleAdsCampaigns.reduce((s, c) => s + c.roas, 0) / googleAdsCampaigns.length,
    totalImpressions: googleAdsCampaigns.reduce((s, c) => s + c.impressions, 0),
  }
}

// ── Meta Ads ──
export type MetaAdsCampaign = {
  id: string
  name: string
  spend: number
  conversions: number
  roas: number
  ctr: number
  reach: number
}

export const metaAdsCampaigns: MetaAdsCampaign[] = [
  { id: 'm1', name: 'Lead Gen — Master Programs', spend: 2640, conversions: 94, roas: 4.8, ctr: 2.3, reach: 184000 },
  { id: 'm2', name: 'Lookalike — High Intent', spend: 1980, conversions: 58, roas: 5.2, ctr: 2.8, reach: 96500 },
  { id: 'm3', name: 'Conversion — Application Form', spend: 1450, conversions: 67, roas: 6.4, ctr: 3.5, reach: 54200 },
  { id: 'm4', name: 'Retargeting — Web Visitors', spend: 720, conversions: 38, roas: 8.1, ctr: 4.2, reach: 28400 },
  { id: 'm5', name: 'Brand Awareness — Tier 1', spend: 1120, conversions: 12, roas: 1.4, ctr: 0.9, reach: 412000 },
]

export function metaAdsKpis() {
  return {
    totalSpend: metaAdsCampaigns.reduce((s, c) => s + c.spend, 0),
    totalConversions: metaAdsCampaigns.reduce((s, c) => s + c.conversions, 0),
    avgRoas: metaAdsCampaigns.reduce((s, c) => s + c.roas, 0) / metaAdsCampaigns.length,
    totalReach: metaAdsCampaigns.reduce((s, c) => s + c.reach, 0),
  }
}

// ── Instagram ──
export type InstagramPost = {
  id: string
  caption: string
  date: string
  likes: number
  comments: number
  reach: number
}

export const instagramPosts: InstagramPost[] = [
  { id: 'ig1', caption: 'New cohort starting September — limited spots remaining', date: '2026-05-12', likes: 1240, comments: 87, reach: 18400 },
  { id: 'ig2', caption: 'Student spotlight: Maria from Madrid', date: '2026-05-09', likes: 980, comments: 54, reach: 14200 },
  { id: 'ig3', caption: 'Inside the London campus — a virtual tour', date: '2026-05-06', likes: 1560, comments: 112, reach: 24800 },
  { id: 'ig4', caption: 'Top 5 reasons to study in the UK in 2026', date: '2026-05-03', likes: 720, comments: 38, reach: 11200 },
  { id: 'ig5', caption: 'Application deadline reminder — May 31', date: '2026-04-28', likes: 1080, comments: 67, reach: 16800 },
]

export const instagramKpis = {
  totalFollowers: 24380,
  followersThisMonth: 340,
  totalReach: 142000,
  totalLikes: 8920,
  engagementRate: 4.2,
}

// ── LinkedIn ──
export type LinkedInPost = {
  id: string
  title: string
  date: string
  impressions: number
  clicks: number
  reactions: number
  comments: number
}

export const linkedinPosts: LinkedInPost[] = [
  { id: 'li1', title: 'How we built our international recruitment funnel from 0 to £300K spend', date: '2026-05-11', impressions: 18400, clicks: 420, reactions: 187, comments: 24 },
  { id: 'li2', title: 'Why fragmented marketing tools are killing growth teams', date: '2026-05-07', impressions: 12800, clicks: 280, reactions: 142, comments: 18 },
  { id: 'li3', title: 'Hiring: Senior Performance Marketing Manager (UK)', date: '2026-05-02', impressions: 9600, clicks: 215, reactions: 88, comments: 12 },
  { id: 'li4', title: 'Q1 2026 in review — lessons from running multi-country campaigns', date: '2026-04-25', impressions: 15200, clicks: 380, reactions: 165, comments: 31 },
  { id: 'li5', title: 'The AI-native growth stack: what we use in 2026', date: '2026-04-18', impressions: 22400, clicks: 540, reactions: 248, comments: 42 },
]

export const linkedinKpis = {
  totalFollowers: 8420,
  followersThisMonth: 182,
  totalImpressions: 96000,
  totalClicks: 1840,
  engagementRate: 5.8,
}

// ─────────────────────────────────────────────
// SPARKLINE DATA (7 günlük mini grafikler)
// ─────────────────────────────────────────────

export const sparklines = {
  google: {
    cost: [380, 420, 380, 510, 480, 540, 580],
    conversions: [12, 14, 11, 16, 15, 17, 19],
    roas: [3.8, 4.1, 3.9, 4.5, 4.2, 4.6, 4.8],
    impressions: [42000, 38000, 45000, 41000, 48000, 52000, 49000],
  },
  meta: {
    spend: [220, 280, 240, 310, 290, 340, 320],
    conversions: [38, 42, 35, 48, 45, 52, 58],
    roas: [4.2, 4.5, 4.0, 4.8, 5.0, 5.2, 4.9],
    reach: [28000, 32000, 30000, 36000, 38000, 42000, 40000],
  },
  instagram: {
    followers: [24050, 24080, 24150, 24210, 24280, 24340, 24380],
    likes: [180, 220, 240, 280, 260, 320, 380],
    reach: [4200, 4800, 5100, 5400, 5800, 6200, 6500],
    engagement: [3.8, 4.0, 4.1, 4.2, 4.0, 4.3, 4.2],
  },
  linkedin: {
    followers: [8240, 8260, 8290, 8320, 8360, 8390, 8420],
    impressions: [2800, 3200, 3500, 3800, 4200, 4500, 4800],
    clicks: [85, 92, 110, 125, 140, 160, 175],
    engagement: [5.2, 5.4, 5.6, 5.5, 5.8, 5.9, 5.8],
  },
}

// ─────────────────────────────────────────────
// TREND DATA (30 günlük büyük chart)
// ─────────────────────────────────────────────

function generateTrend(base: number, variance: number, points: number = 30): number[] {
  const result: number[] = []
  let current = base
  for (let i = 0; i < points; i++) {
    current = current + (Math.random() - 0.45) * variance
    if (current < base * 0.5) current = base * 0.7
    result.push(Math.round(current))
  }
  return result
}

export const trendData = {
  google: { label: 'Maliyet (£)', values: generateTrend(380, 80) },
  meta: { label: 'Harcama (£)', values: generateTrend(280, 60) },
  instagram: { label: 'Erişim', values: generateTrend(5200, 800) },
  linkedin: { label: 'Gösterim', values: generateTrend(3500, 600) },
}

// ─────────────────────────────────────────────
// TOP PERFORMERS
// ─────────────────────────────────────────────

export const topPerformers = {
  google: googleAdsCampaigns
    .slice()
    .sort((a, b) => b.roas - a.roas)
    .slice(0, 3)
    .map((c) => ({ id: c.id, name: c.name, value: `${c.roas.toFixed(1)}x`, secondary: 'ROAS' })),

  meta: metaAdsCampaigns
    .slice()
    .sort((a, b) => b.roas - a.roas)
    .slice(0, 3)
    .map((c) => ({ id: c.id, name: c.name, value: `${c.roas.toFixed(1)}x`, secondary: 'ROAS' })),

  instagram: instagramPosts
    .slice()
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      name: p.caption,
      value: p.likes.toLocaleString('en-GB'),
      secondary: 'Beğeni',
    })),

  linkedin: linkedinPosts
    .slice()
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 3)
    .map((p) => ({
      id: p.id,
      name: p.title,
      value: p.impressions.toLocaleString('en-GB'),
      secondary: 'Gösterim',
    })),
}
