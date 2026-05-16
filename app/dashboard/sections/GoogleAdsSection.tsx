import { getGoogleAdsCampaigns } from '@/lib/api/google-ads'
import {
  googleAdsKpis,
  sparklines,
  trendData,
  topPerformers,
  type GoogleAdsCampaign,
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

export async function GoogleAdsSection() {
  const campaigns = await getGoogleAdsCampaigns()
  const g = googleAdsKpis()

  return (
    <section id="google-ads" className="mb-16 scroll-mt-24">
      <SectionHeader platform="google" title="Google Ads" />
      <AIInsightsCard platform="google" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5">
        <MetricCard
          label="Toplam maliyet"
          value={`£${g.totalCost.toLocaleString('en-GB')}`}
          sparkline={sparklines.google.cost}
          progress={68}
          trend={{ value: '12.4%', positive: true }}
        />
        <MetricCard
          label="Dönüşüm"
          value={g.totalConversions.toLocaleString('en-GB')}
          sparkline={sparklines.google.conversions}
          progress={82}
          trend={{ value: '8.2%', positive: true }}
        />
        <MetricCard
          label="Ort. ROAS"
          value={`${g.avgRoas.toFixed(1)}x`}
          sparkline={sparklines.google.roas}
          progress={71}
          trend={{ value: '3.1%', positive: true }}
        />
        <MetricCard
          label="Gösterim"
          value={formatLarge(g.totalImpressions)}
          sparkline={sparklines.google.impressions}
          progress={54}
          trend={{ value: '5.8%', positive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-5">
        <div className="lg:col-span-2">
          <TrendChart data={trendData.google.values} label={trendData.google.label} />
        </div>
        <TopPerformers title="En iyi kampanyalar" items={topPerformers.google} />
      </div>

      <CampaignTable<GoogleAdsCampaign>
        columns={[
          { key: 'name', label: 'Kampanya' },
          { key: 'cost', label: 'Maliyet', align: 'right', format: (v) => `£${(v as number).toLocaleString('en-GB')}` },
          { key: 'roas', label: 'ROAS', align: 'right', format: (v) => `${(v as number).toFixed(1)}x` },
          { key: 'ctr', label: 'CTR', align: 'right', format: (v) => `${(v as number).toFixed(2)}%` },
          { key: 'conversions', label: 'Dön.', align: 'right', format: (v) => (v as number).toLocaleString('en-GB') },
          { key: 'impressions', label: 'Gösterim', align: 'right', format: (v) => (v as number).toLocaleString('en-GB') },
        ]}
        rows={campaigns}
      />
    </section>
  )
}
