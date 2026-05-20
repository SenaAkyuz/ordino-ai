import {
  getGoogleAdsCampaigns,
  getGoogleAdsKpis,
  getGoogleAdsSparklines,
  getGoogleAdsTrend,
  getGoogleAdsTopPerformers,
  getGoogleAdsTrendComparison,
  getGoogleAdsApiStatus,
  type DateRange,
} from '@/lib/api/google-ads'
import type { GoogleAdsCampaign } from '@/lib/mock-data'
import { MetricCard } from '@/app/dashboard/components/MetricCard'
import { CampaignTable } from '@/app/dashboard/components/CampaignTable'
import { SectionHeader } from '@/app/dashboard/components/SectionHeader'
import { TrendChart } from '@/app/dashboard/components/TrendChart'
import { TopPerformers } from '@/app/dashboard/components/TopPerformers'
import { AIInsightsCard } from '@/app/dashboard/components/AIInsightsCard'
import { ApiErrorBanner } from '@/app/dashboard/components/ApiErrorBanner'

function formatLarge(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toLocaleString('en-GB')
}

type Props = {
  range?: DateRange
}

export async function GoogleAdsSection({ range = 30 }: Props) {
  const [campaigns, kpis, sparklines, trend, topPerformers, trendComparison] = await Promise.all([
    getGoogleAdsCampaigns(range),
    getGoogleAdsKpis(range),
    getGoogleAdsSparklines(range),
    getGoogleAdsTrend(range),
    getGoogleAdsTopPerformers(range),
    getGoogleAdsTrendComparison(range),
  ])

  // Promise.all sonrası status okunur: fetcher'lar error tracker'ı set/clear etti
  const apiStatus = getGoogleAdsApiStatus()

  // null → undefined, MetricCard'a opsiyonel trend prop'u olarak geçirilebilsin
  const trendProp = (t: typeof trendComparison.cost) =>
    t ? { value: t.value, positive: t.positive } : undefined

  return (
    <section id="google-ads" className="mb-16 scroll-mt-24">
      {!apiStatus.ok && <ApiErrorBanner message={apiStatus.message} />}
      <SectionHeader platform="google" title="Google Ads" />
      <AIInsightsCard platform="google" range={range} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5">
        <MetricCard
          label="Toplam maliyet"
          value={`£${kpis.totalCost.toLocaleString('en-GB')}`}
          sparkline={sparklines.cost}
          progress={68}
          trend={trendProp(trendComparison.cost)}
        />
        <MetricCard
          label="Dönüşüm"
          value={kpis.totalConversions.toLocaleString('en-GB')}
          sparkline={sparklines.conversions}
          progress={82}
          trend={trendProp(trendComparison.conversions)}
        />
        <MetricCard
          label="Ort. ROAS"
          value={`${kpis.avgRoas.toFixed(1)}x`}
          sparkline={sparklines.roas}
          progress={71}
          trend={trendProp(trendComparison.roas)}
        />
        <MetricCard
          label="Gösterim"
          value={formatLarge(kpis.totalImpressions)}
          sparkline={sparklines.impressions}
          progress={54}
          trend={trendProp(trendComparison.impressions)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-5">
        <div className="lg:col-span-2">
          <TrendChart data={trend.values} label={trend.label} />
        </div>
        <TopPerformers title="En iyi kampanyalar" items={topPerformers} />
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
