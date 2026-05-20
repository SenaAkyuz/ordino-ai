import { Sparkline } from './Sparkline'

export function MetricCard({
  label,
  value,
  sparkline,
  progress,
  trend,
}: {
  label: string
  value: string
  sparkline?: number[]
  progress?: number // 0-100
  trend?: { value: string; positive: boolean }
}) {
  return (
    <div className="card card-hover p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="text-eyebrow text-ink-50 uppercase">
          {label}
        </div>
        {sparkline && (
          <Sparkline data={sparkline} color="#0D3B2E" width={64} height={24} />
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2 mb-3">
        <div className="font-display font-bold text-[26px] text-ink leading-none tabular-nums tracking-tight">
          {value}
        </div>
        {trend ? (
          <div
            className={`text-caption font-semibold tabular-nums ${
              trend.positive ? 'text-success' : 'text-[#B42318]'
            }`}
          >
            {trend.positive ? '↗' : '↘'} {trend.value}
          </div>
        ) : (
          <div className="text-caption font-semibold tabular-nums text-ink-30">
            —
          </div>
        )}
      </div>

      {typeof progress === 'number' && (
        <div className="h-1 bg-bg-soft rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>
      )}
    </div>
  )
}
