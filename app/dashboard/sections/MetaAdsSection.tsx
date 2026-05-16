import { getMetaAdsCampaigns } from '@/lib/api/meta'
import {
  metaAdsKpis,
  sparklines,
  trendData,
  topPerformers,
  type MetaAdsCampaign,
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

export async function MetaAdsSection() {
  const campaigns = await getMetaAdsCampaigns()
  const m = metaAdsKpis()

  return (
    <section id="meta-ads" className="mb-16 scroll-mt-24">
      <SectionHeader platform="meta" title="Meta Ads" />
      <AIInsightsCard platform="meta" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5">
        <MetricCard
          label="Toplam harcama"
          value={`£${m.totalSpend.toLocaleString('en-GB')}`}
          sparkline={sparklines.meta.spend}
          progress={72}
          trend={{ value: '14.8%', positive: true }}
        />
        <MetricCard
          label="Dönüşüm"
          value={m.totalConversions.toLocaleString('en-GB')}
          sparkline={sparklines.meta.conversions}
          progress={88}
          trend={{ value: '21.3%', positive: true }}
        />
        <MetricCard
          label="Ort. ROAS"
          value={`${m.avgRoas.toFixed(1)}x`}
          sparkline={sparklines.meta.roas}
          progress={76}
          trend={{ value: '6.4%', positive: true }}
        />
        <MetricCard
          label="Erişim"
          value={formatLarge(m.totalReach)}
          sparkline={sparklines.meta.reach}
          progress={64}
          trend={{ value: '11.2%', positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-5">
        <div className="lg:col-span-2">
          <TrendChart data={trendData.meta.values} label={trendData.meta.label} />
        </div>
        <TopPerformers title="En iyi kampanyalar" items={topPerformers.meta} />
      </div>

      <CampaignTable<MetaAdsCampaign>
        columns={[
          { key: 'name', label: 'Kampanya' },
          { key: 'spend', label: 'Harcama', align: 'right', format: (v) => `£${(v as number).toLocaleString('en-GB')}` },
          { key: 'roas', label: 'ROAS', align: 'right', format: (v) => `${(v as number).toFixed(1)}x` },
          { key: 'ctr', label: 'CTR', align: 'right', format: (v) => `${(v as number).toFixed(2)}%` },
          { key: 'reach', label: 'Erişim', align: 'right', format: (v) => (v as number).toLocaleString('en-GB') },
          { key: 'conversions', label: 'Dön.', align: 'right', format: (v) => (v as number).toLocaleString('en-GB') },
        ]}
        rows={campaigns}
      />
    </section>
  )
}
