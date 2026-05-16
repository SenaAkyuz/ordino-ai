import { DateRangePills } from './DateRangePills'
import { GenerateReportButton } from './GenerateReportButton'

export function PageHeader({ userName }: { userName: string }) {
  const firstName = userName.split('@')[0].split('.')[0]
  const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1)

  return (
    <div className="mb-10 md:mb-12">
      <div className="flex items-start justify-between flex-wrap gap-6 mb-6">
        <div>
          <p className="text-eyebrow text-accent uppercase mb-2">
            Welcome back, {displayName}
          </p>
          <h1 className="font-display font-bold text-display-md text-ink tracking-tight leading-tight">
            Performans paneli
          </h1>
          <p className="text-body-sm text-ink-50 mt-2">
            Mock data · Gerçek API bağlantısı bekleniyor
          </p>
        </div>
        <div className="flex items-center gap-2 text-caption text-ink-50 font-medium tabular-nums">
          <span className="status-dot text-success" />
          Last updated: just now
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <DateRangePills />
        <GenerateReportButton />
      </div>
    </div>
  )
}
