export function HeroDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
      {/* Kart 1 — Google Ads optimized */}
      <div className="card card-hover p-5 md:-rotate-1 md:translate-y-2 transition-transform">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-bg-soft">
              <GoogleAdsIcon />
            </div>
            <span className="text-h4 text-ink">Google Ads</span>
          </div>
          <StatusBadge variant="success">Optimised</StatusBadge>
        </div>

        <p className="text-body-sm text-ink-50 mb-4">Yacht Charter · Q1 Campaign</p>

        <div className="grid grid-cols-2 gap-2.5">
          <Metric label="CPA" value="£312" trend="down" trendValue="24%" />
          <Metric label="ROAS" value="4.8x" trend="up" trendValue="38%" />
        </div>

        <div className="mt-4 pt-3 border-t border-line text-caption text-ink-30">
          2 minutes ago
        </div>
      </div>

      {/* Kart 2 — Landing page generated (merkez, daha öne çıkan) */}
      <div className="card card-hover p-5 md:scale-[1.04] md:z-10 relative shadow-lift">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-bg-soft">
              <PageIcon />
            </div>
            <span className="text-h4 text-ink">New landing page</span>
          </div>
          <StatusBadge variant="success">Live</StatusBadge>
        </div>

        <p className="text-body-sm font-mono text-ink-50 mb-4 truncate">
          ordino.ai/yacht/charter-q1
        </p>

        {/* Mini page preview — yacht charter themed */}
        <div className="aspect-[16/10] rounded-lg bg-bg-soft border border-line overflow-hidden">
          {/* Hero with yacht imagery */}
          <div className="relative h-[55%] bg-gradient-to-br from-[#7DB8D9] via-[#A8D5E5] to-[#F4E4BC] overflow-hidden">
            {/* Yacht silhouette — sleek motor superyacht */}
            <div className="absolute inset-0 flex items-end justify-center pb-1.5">
              <svg width="60" height="16" viewBox="0 0 60 16" fill="none" className="drop-shadow-sm">
                {/* Hull */}
                <path d="M4 11 L7 8 L50 8 L55 11 L53 12.5 L6 12.5 Z" fill="white" fillOpacity="0.95"/>
                {/* Main cabin */}
                <path d="M12 8 L13 5 L42 5 L44 8 Z" fill="white" fillOpacity="0.92"/>
                {/* Upper deck */}
                <path d="M20 5 L21 2.7 L35 2.7 L37 5 Z" fill="white" fillOpacity="0.88"/>
                {/* Radar mast */}
                <rect x="27.6" y="0.6" width="0.7" height="2.1" fill="white" fillOpacity="0.75"/>
                {/* Main-deck window line */}
                <rect x="14" y="6.6" width="26" height="0.4" fill="#0D3B2E" fillOpacity="0.18"/>
              </svg>
            </div>
            {/* Wave overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-[#7DB8D9]/40 to-transparent" />
            {/* Hero copy */}
            <div className="absolute top-1.5 left-2 right-2">
              <div className="text-white text-[7px] font-display font-bold leading-tight drop-shadow-sm">
                Charter the Mediterranean
              </div>
              <div className="text-white/80 text-[5px] mt-0.5 drop-shadow-sm">
                From £4,200/day
              </div>
            </div>
          </div>
          {/* Feature pills */}
          <div className="p-1.5 grid grid-cols-3 gap-1">
            <div className="rounded-sm bg-bg flex items-center justify-center py-1">
              <div className="h-1 w-1 rounded-full bg-accent" />
            </div>
            <div className="rounded-sm bg-bg flex items-center justify-center py-1">
              <div className="h-1 w-1 rounded-full bg-accent" />
            </div>
            <div className="rounded-sm bg-bg flex items-center justify-center py-1">
              <div className="h-1 w-1 rounded-full bg-accent" />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-line text-caption text-ink-30">
          Generated · just now
        </div>
      </div>

      {/* Kart 3 — Lead scored */}
      <div className="card card-hover p-5 md:rotate-1 md:translate-y-2 transition-transform">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-bg-soft">
              <TargetIcon />
            </div>
            <span className="text-h4 text-ink">Lead scored</span>
          </div>
          <StatusBadge variant="hot">Hot</StatusBadge>
        </div>

        <p className="text-body-sm text-ink-50 mb-4">
          James W. · £2.4M enquiry
        </p>

        {/* Score gauge */}
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 flex-shrink-0">
            <svg viewBox="0 0 64 64" className="absolute inset-0 -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="currentColor" strokeWidth="5" fill="none" className="text-line" />
              <circle
                cx="32" cy="32" r="26"
                stroke="currentColor"
                strokeWidth="5"
                fill="none"
                strokeDasharray="163"
                strokeDashoffset="13"
                strokeLinecap="round"
                className="text-accent"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display font-bold text-[20px] text-ink tabular">92</span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-caption font-medium text-ink">Hot lead</span>
            <span className="text-caption text-ink-50">Yacht enquiry</span>
            <span className="text-caption text-ink-50">London, UK</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-line text-caption text-ink-30">
          Routed · just now
        </div>
      </div>
    </div>
  )
}

/* ── Helpers ── */

function StatusBadge({ variant, children }: { variant: 'success' | 'hot'; children: React.ReactNode }) {
  const styles = {
    success: 'bg-success-bg text-success',
    hot: 'bg-[#FEE4E2] text-[#B42318]',
  }
  return (
    <span className={`inline-flex items-center gap-1 rounded-pill px-2 py-0.5 text-[11px] font-semibold ${styles[variant]}`}>
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-current opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {children}
    </span>
  )
}

function Metric({ label, value, trend, trendValue }: {
  label: string
  value: string
  trend: 'up' | 'down'
  trendValue: string
}) {
  const isPositive = (label === 'CPA' && trend === 'down') || (label !== 'CPA' && trend === 'up')
  return (
    <div className="rounded-lg bg-bg-soft p-2.5">
      <div className="text-caption text-ink-50 mb-0.5">{label}</div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display font-bold text-[17px] text-ink tabular">{value}</span>
        <span className={`text-caption font-semibold tabular ${isPositive ? 'text-success' : 'text-warning'}`}>
          {trend === 'up' ? '↑' : '↓'} {trendValue}
        </span>
      </div>
    </div>
  )
}

function GoogleAdsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7.5 4L1.5 14.5L7.5 25L13.5 14.5L7.5 4Z" fill="#FBBC04" transform="translate(0 -2.5)"/>
      <circle cx="17" cy="17" r="4.5" fill="#34A853"/>
      <path d="M10 4L16 14.5L22 4H10Z" fill="#4285F4"/>
    </svg>
  )
}

function PageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18M9 21V9" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}
