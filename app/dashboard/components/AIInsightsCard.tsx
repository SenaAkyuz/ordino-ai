import { getInsights, type Insight, type Platform } from '@/lib/insights-engine'

const typeStyles: Record<Insight['type'], { bg: string; border: string; text: string }> = {
  recommendation: { bg: 'bg-accent-soft/60', border: 'border-accent/20', text: 'text-accent' },
  warning: { bg: 'bg-warning-bg', border: 'border-warning/40', text: 'text-[#B54708]' },
  opportunity: { bg: 'bg-[#EFF8FF]', border: 'border-[#B2DDFF]', text: 'text-[#175CD3]' },
}

export async function AIInsightsCard({
  platform,
  range = 30,
}: {
  platform: Platform
  range?: 7 | 30 | 60
}) {
  const insights = await getInsights(platform, range)

  return (
    <div className="card p-5 md:p-6 mb-5 bg-gradient-to-br from-accent-soft/40 to-bg-card">
      <div className="flex items-center gap-2 mb-5">
        <SparklesIcon />
        <h3 className="font-display text-h4 font-semibold text-ink">AI Insights</h3>
        <span className="text-caption font-medium text-ink-30 ml-auto">
          Verilerinize göre otomatik öneriler
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {insights.map((insight, i) => {
          const style = typeStyles[insight.type]
          return (
            <div
              key={i}
              className={`rounded-xl border ${style.border} ${style.bg} p-4 transition-all hover:-translate-y-0.5 hover:shadow-card`}
            >
              <div className="flex items-start gap-2 mb-2">
                <span className="text-lg leading-none">{insight.icon}</span>
                <h4 className="text-caption font-semibold text-ink leading-snug flex-1">
                  {insight.title}
                </h4>
              </div>
              <p className="text-caption text-ink-70 leading-relaxed mb-3">
                {insight.description}
              </p>
              <div className={`inline-flex items-center gap-1 text-caption font-semibold ${style.text}`}>
                {insight.action}
                <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SparklesIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z"
        fill="#0D3B2E"
      />
      <path
        d="M19 16L19.6 18L21.5 18.5L19.6 19L19 21L18.4 19L16.5 18.5L18.4 18L19 16Z"
        fill="#0D3B2E"
      />
    </svg>
  )
}
