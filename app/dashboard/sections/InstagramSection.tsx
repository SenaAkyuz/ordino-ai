import { getInstagramPosts } from '@/lib/api/instagram'
import {
  instagramKpis,
  sparklines,
  trendData,
  topPerformers,
  type InstagramPost,
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

export async function InstagramSection() {
  const posts = await getInstagramPosts()

  return (
    <section id="instagram" className="mb-16 scroll-mt-24">
      <SectionHeader platform="instagram" title="Instagram" />
      <AIInsightsCard platform="instagram" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5">
        <MetricCard
          label="Takipçi"
          value={instagramKpis.totalFollowers.toLocaleString('en-GB')}
          sparkline={sparklines.instagram.followers}
          progress={45}
          trend={{ value: `+${instagramKpis.followersThisMonth}`, positive: true }}
        />
        <MetricCard
          label="Erişim (30g)"
          value={formatLarge(instagramKpis.totalReach)}
          sparkline={sparklines.instagram.reach}
          progress={78}
          trend={{ value: '18.4%', positive: true }}
        />
        <MetricCard
          label="Beğeni"
          value={instagramKpis.totalLikes.toLocaleString('en-GB')}
          sparkline={sparklines.instagram.likes}
          progress={66}
          trend={{ value: '24.1%', positive: true }}
        />
        <MetricCard
          label="Etkileşim"
          value={`${instagramKpis.engagementRate.toFixed(1)}%`}
          sparkline={sparklines.instagram.engagement}
          progress={84}
          trend={{ value: '0.4pt', positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-5">
        <div className="lg:col-span-2">
          <TrendChart data={trendData.instagram.values} label={trendData.instagram.label} />
        </div>
        <TopPerformers title="En iyi gönderiler" items={topPerformers.instagram} />
      </div>

      <CampaignTable<InstagramPost>
        columns={[
          { key: 'caption', label: 'Gönderi' },
          { key: 'date', label: 'Tarih', align: 'right' },
          { key: 'likes', label: 'Beğeni', align: 'right', format: (v) => (v as number).toLocaleString('en-GB') },
          { key: 'comments', label: 'Yorum', align: 'right', format: (v) => (v as number).toLocaleString('en-GB') },
          { key: 'reach', label: 'Erişim', align: 'right', format: (v) => (v as number).toLocaleString('en-GB') },
        ]}
        rows={posts}
      />
    </section>
  )
}
