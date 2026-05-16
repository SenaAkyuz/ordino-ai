import {
  googleAdsKpis,
  metaAdsKpis,
  instagramKpis,
  linkedinKpis,
  googleAdsCampaigns,
  metaAdsCampaigns,
  instagramPosts,
  linkedinPosts,
} from '@/lib/mock-data'
import { MetricCard } from './MetricCard'
import { DonutChart } from './DonutChart'

export function OverviewSection() {
  const g = googleAdsKpis()
  const m = metaAdsKpis()

  // Cross-platform totals
  const totalAdSpend = g.totalCost + m.totalSpend
  const totalConversions = g.totalConversions + m.totalConversions
  const totalSocialFollowers = instagramKpis.totalFollowers + linkedinKpis.totalFollowers
  const avgRoas = (g.avgRoas + m.avgRoas) / 2

  // Best performers across platforms
  const bestRoas = Math.max(
    ...googleAdsCampaigns.map((c) => c.roas),
    ...metaAdsCampaigns.map((c) => c.roas)
  )
  const bestRoasCampaign = [...googleAdsCampaigns, ...metaAdsCampaigns].find(
    (c) => c.roas === bestRoas
  )

  const bestReach = Math.max(
    ...metaAdsCampaigns.map((c) => c.reach),
    ...instagramPosts.map((p) => p.reach)
  )

  const bestEngagement = Math.max(
    instagramKpis.engagementRate,
    linkedinKpis.engagementRate
  )

  // Donut slices — moneygreen + warm peach
  const budgetSlices = [
    { label: 'Google Ads', value: g.totalCost, color: '#0D3B2E' },
    { label: 'Meta Ads', value: m.totalSpend, color: '#F0B27A' },
  ]

  const googlePercent = ((g.totalCost / totalAdSpend) * 100).toFixed(0)
  const metaPercent = ((m.totalSpend / totalAdSpend) * 100).toFixed(0)

  return (
    <section id="overview" className="mb-14 md:mb-16 scroll-mt-24">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h2 className="font-display font-bold text-h3 md:text-2xl text-ink tracking-tight">
          Genel Bakış
        </h2>
        <div className="text-caption text-ink-50 font-medium">
          Tüm platformlar · Son 30 gün
        </div>
      </div>

      {/* 4 cross-platform KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-5">
        <MetricCard
          label="Toplam reklam harcaması"
          value={`£${totalAdSpend.toLocaleString('en-GB')}`}
          trend={{ value: '13.6%', positive: true }}
          progress={71}
        />
        <MetricCard
          label="Toplam dönüşüm"
          value={totalConversions.toLocaleString('en-GB')}
          trend={{ value: '14.7%', positive: true }}
          progress={85}
        />
        <MetricCard
          label="Sosyal takipçi"
          value={totalSocialFollowers.toLocaleString('en-GB')}
          trend={{ value: '+522', positive: true }}
          progress={42}
        />
        <MetricCard
          label="Ort. ROAS"
          value={`${avgRoas.toFixed(1)}x`}
          trend={{ value: '4.8%', positive: true }}
          progress={76}
        />
      </div>

      {/* Donut + Best performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
        {/* Budget allocation donut */}
        <div className="card p-5 md:p-6 bg-gradient-to-br from-accent-soft/40 to-bg-card">
          <h3 className="font-display text-h4 font-semibold text-ink mb-1">
            Bütçe dağılımı
          </h3>
          <p className="text-caption text-ink-50 mb-5">
            Reklam harcamanızın platform dağılımı
          </p>

          <div className="flex items-center gap-6 flex-wrap">
            <DonutChart
              slices={budgetSlices}
              size={160}
              thickness={26}
              centerLabel="Toplam"
              centerValue={`£${formatK(totalAdSpend)}`}
            />

            <div className="flex-1 min-w-[160px] space-y-3">
              <BudgetRow
                color="#0D3B2E"
                label="Google Ads"
                amount={`£${g.totalCost.toLocaleString('en-GB')}`}
                percent={`${googlePercent}%`}
              />
              <BudgetRow
                color="#F0B27A"
                label="Meta Ads"
                amount={`£${m.totalSpend.toLocaleString('en-GB')}`}
                percent={`${metaPercent}%`}
              />
            </div>
          </div>
        </div>

        {/* Best performers card */}
        <div className="card p-5 md:p-6">
          <h3 className="font-display text-h4 font-semibold text-ink mb-1">
            En iyi performans
          </h3>
          <p className="text-caption text-ink-50 mb-5">
            Tüm platformlardaki öne çıkanlar
          </p>

          <div className="space-y-4">
            <BestRow
              icon="🏆"
              label="En iyi ROAS"
              value={`${bestRoas.toFixed(1)}x`}
              secondary={bestRoasCampaign?.name || ''}
            />
            <BestRow
              icon="📈"
              label="En geniş erişim"
              value={formatLarge(bestReach)}
              secondary="Meta Ads kampanyası"
            />
            <BestRow
              icon="✨"
              label="En yüksek etkileşim"
              value={`${bestEngagement.toFixed(1)}%`}
              secondary={
                instagramKpis.engagementRate > linkedinKpis.engagementRate
                  ? 'LinkedIn organic'
                  : 'Instagram organic'
              }
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function BudgetRow({
  color,
  label,
  amount,
  percent,
}: {
  color: string
  label: string
  amount: string
  percent: string
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="flex-none w-3 h-3 rounded-sm"
        style={{ backgroundColor: color }}
      />
      <div className="flex-1 min-w-0">
        <div className="text-body-sm font-medium text-ink">{label}</div>
        <div className="text-caption text-ink-50 tabular-nums">{amount}</div>
      </div>
      <div className="text-body-sm font-bold text-ink tabular-nums">{percent}</div>
    </div>
  )
}

function BestRow({
  icon,
  label,
  value,
  secondary,
}: {
  icon: string
  label: string
  value: string
  secondary: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-none w-9 h-9 rounded-xl bg-accent-soft flex items-center justify-center text-lg">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-eyebrow text-ink-50 uppercase mb-0.5">
          {label}
        </div>
        <div className="text-body-sm text-ink truncate font-medium leading-tight">
          {secondary}
        </div>
      </div>
      <div className="font-display font-bold text-body-lg text-ink tabular-nums">
        {value}
      </div>
    </div>
  )
}

function formatLarge(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toLocaleString('en-GB')
}

function formatK(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return n.toLocaleString('en-GB')
}
