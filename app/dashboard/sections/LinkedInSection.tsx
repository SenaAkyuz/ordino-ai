import { getLinkedInPosts } from '@/lib/api/linkedin'
import {
  linkedinKpis,
  sparklines,
  trendData,
  topPerformers,
  type LinkedInPost,
} from '@/lib/mock-data'
import { MetricCard } from '@/app/dashboard/components/MetricCard'
import { CampaignTable } from '@/app/dashboard/components/CampaignTable'
import { SectionHeader } from '@/app/dashboard/components/SectionHeader'
import { TrendChart } from '@/app/dashboard/components/TrendChart'
import { TopPerformers } from '@/app/dashboard/components/TopPerformers'
import { AIInsightsCard } from '@/app/dashboard/components/AIInsightsCard'

function formatLarge(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toLocaleString('en-GB')
}

export async function LinkedInSection() {
  const posts = await getLinkedInPosts()

  return (
    <section id="linkedin" className="scroll-mt-24">
      <SectionHeader platform="linkedin" title="LinkedIn" />
      <AIInsightsCard platform="linkedin" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5">
        <MetricCard
          label="Takipçi"
          value={linkedinKpis.totalFollowers.toLocaleString('en-GB')}
          sparkline={sparklines.linkedin.followers}
          progress={38}
          trend={{ value: `+${linkedinKpis.followersThisMonth}`, positive: true }}
        />
        <MetricCard
          label="Gösterim (30g)"
          value={formatLarge(linkedinKpis.totalImpressions)}
          sparkline={sparklines.linkedin.impressions}
          progress={62}
          trend={{ value: '28.5%', positive: true }}
        />
        <MetricCard
          label="Tıklama"
          value={linkedinKpis.totalClicks.toLocaleString('en-GB')}
          sparkline={sparklines.linkedin.clicks}
          progress={74}
          trend={{ value: '15.7%', positive: true }}
        />
        <MetricCard
          label="Etkileşim"
          value={`${linkedinKpis.engagementRate.toFixed(1)}%`}
          sparkline={sparklines.linkedin.engagement}
          progress={89}
          trend={{ value: '0.6pt', positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-5">
        <div className="lg:col-span-2">
          <TrendChart data={trendData.linkedin.values} label={trendData.linkedin.label} />
        </div>
        <TopPerformers title="En iyi gönderiler" items={topPerformers.linkedin} />
      </div>

      <CampaignTable<LinkedInPost>
        columns={[
          { key: 'title', label: 'Gönderi' },
          { key: 'date', label: 'Tarih', align: 'right' },
          { key: 'impressions', label: 'Gösterim', align: 'right', format: (v) => (v as number).toLocaleString('en-GB') },
          { key: 'clicks', label: 'Tıklama', align: 'right', format: (v) => (v as number).toLocaleString('en-GB') },
          { key: 'reactions', label: 'Tepki', align: 'right', format: (v) => (v as number).toLocaleString('en-GB') },
          { key: 'comments', label: 'Yorum', align: 'right', format: (v) => (v as number).toLocaleString('en-GB') },
        ]}
        rows={posts}
      />
    </section>
  )
}
