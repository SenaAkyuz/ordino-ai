interface StepVisualProps {
  step: number
}

export function StepVisual({ step }: StepVisualProps) {
  return (
    <div className="relative">
      <div className="card p-6 md:p-8 transition-all duration-700">
        {step === 0 && <ConnectVisual />}
        {step === 1 && <DiagnoseVisual />}
        {step === 2 && <OperateVisual />}
        {step === 3 && <CompoundVisual />}
      </div>
    </div>
  )
}

/* ── Step 1: Connect ── */

function ConnectVisual() {
  const sources = ['Website', 'Google Ads', 'Meta Ads', 'LinkedIn', 'HubSpot', 'GA4']
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-h4 text-ink">Connecting sources</span>
        <span className="status-dot text-success text-caption font-medium">Live</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {sources.map((src, i) => (
          <div
            key={src}
            className="flex items-center gap-2.5 rounded-lg border border-line bg-bg-card p-3"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="h-7 w-7 rounded-md bg-accent-soft flex items-center justify-center">
              <div className="h-3 w-3 rounded-sm bg-accent" />
            </div>
            <div className="flex-1">
              <div className="text-body-sm font-medium text-ink">{src}</div>
              <div className="text-caption text-ink-50">Connected</div>
            </div>
            <CheckIcon />
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-accent-soft border border-accent/20 px-4 py-3 flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
        <span className="text-body-sm text-ink-70">
          Reading your funnel · <span className="font-mono text-accent">94%</span>
        </span>
      </div>
    </div>
  )
}

/* ── Step 2: Diagnose ── */

function DiagnoseVisual() {
  const findings = [
    { label: 'Landing page LCP', value: '4.2s', severity: 'high', delta: 'too slow' },
    { label: 'Google Ads CPA', value: '£847', severity: 'high', delta: '+62% vs benchmark' },
    { label: 'Lead routing delay', value: '3.4h', severity: 'med', delta: '92% lost interest' },
    { label: 'Meta creative fatigue', value: '12d', severity: 'med', delta: 'CTR dropping' },
  ]
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-h4 text-ink">Diagnostic report</span>
        <span className="text-caption text-ink-50">4 issues found</span>
      </div>

      <div className="space-y-2">
        {findings.map((f) => (
          <div key={f.label} className="rounded-lg border border-line bg-bg-card p-3 flex items-center gap-3">
            <div
              className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                f.severity === 'high' ? 'bg-[#B42318]' : 'bg-warning'
              }`}
            />
            <div className="flex-1 min-w-0">
              <div className="text-body-sm font-medium text-ink truncate">{f.label}</div>
              <div className="text-caption text-ink-50 truncate">{f.delta}</div>
            </div>
            <span className="font-display font-bold text-h4 text-ink tabular">{f.value}</span>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-[#FEF3F2] border border-[#FECDCA] px-4 py-3">
        <div className="text-body-sm font-medium text-ink mb-1">Estimated revenue leak</div>
        <div className="font-display font-bold text-display-md text-[#B42318] tabular">£18,400/mo</div>
      </div>
    </div>
  )
}

/* ── Step 3: Operate ── */

function OperateVisual() {
  const actions = [
    { time: '09:14', action: 'Generated', target: 'yacht-charter-q1 landing page', status: 'live' },
    { time: '09:22', action: 'Killed', target: '3 underperforming ad sets', status: 'done' },
    { time: '09:31', action: 'Wrote', target: '8 new ad creatives · Meta', status: 'live' },
    { time: '09:47', action: 'Routed', target: 'lead to sales · James W.', status: 'done' },
  ]
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-h4 text-ink">Running autonomously</span>
        <span className="status-dot text-success text-caption font-medium">Live</span>
      </div>

      <div className="space-y-2.5">
        {actions.map((a, i) => (
          <div key={i} className="flex items-start gap-3 rounded-lg border border-line bg-bg-card p-3">
            <span className="text-caption font-mono text-ink-30 mt-0.5 flex-shrink-0">{a.time}</span>
            <div className="flex-1 min-w-0">
              <div className="text-body-sm text-ink">
                <span className="font-semibold text-accent">{a.action}</span>{' '}
                <span className="text-ink-70">{a.target}</span>
              </div>
            </div>
            <span
              className={`text-caption font-medium uppercase tracking-wider flex-shrink-0 ${
                a.status === 'live' ? 'text-success' : 'text-ink-30'
              }`}
            >
              {a.status}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 pt-1">
        <MiniStat label="Active" value="14" />
        <MiniStat label="Today" value="47" />
        <MiniStat label="This week" value="312" />
      </div>
    </div>
  )
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-bg-soft p-2.5">
      <div className="text-caption text-ink-50 mb-0.5">{label}</div>
      <div className="font-display font-bold text-h3 text-ink tabular">{value}</div>
    </div>
  )
}

/* ── Step 4: Compound ── */

function CompoundVisual() {
  // 12 hafta için CPA azalan, win rate artan veri
  const cpaPoints = [847, 720, 612, 540, 489, 432, 401, 376, 354, 332, 318, 312]
  const winPoints = [4, 6, 9, 12, 14, 17, 19, 22, 25, 27, 29, 31]

  const maxCpa = Math.max(...cpaPoints)
  const minCpa = Math.min(...cpaPoints)
  const cpaPath = cpaPoints
    .map((v, i) => {
      const x = (i / (cpaPoints.length - 1)) * 100
      const y = 100 - ((v - minCpa) / (maxCpa - minCpa)) * 80 - 10
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`
    })
    .join(' ')

  const maxWin = Math.max(...winPoints)
  const winPath = winPoints
    .map((v, i) => {
      const x = (i / (winPoints.length - 1)) * 100
      const y = 100 - (v / maxWin) * 80 - 10
      return `${i === 0 ? 'M' : 'L'} ${x},${y}`
    })
    .join(' ')

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-h4 text-ink">12-week trend</span>
        <span className="text-caption text-ink-50">Week 12 of 12</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-bg-soft p-3">
          <div className="text-caption text-ink-50 mb-1">CPA</div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-h3 text-ink tabular">£312</span>
            <span className="text-caption font-semibold text-success tabular">↓ 63%</span>
          </div>
        </div>
        <div className="rounded-lg bg-bg-soft p-3">
          <div className="text-caption text-ink-50 mb-1">Win rate</div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-bold text-h3 text-ink tabular">31%</span>
            <span className="text-caption font-semibold text-success tabular">↑ 7.8x</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-line bg-bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 text-caption">
            <span className="flex items-center gap-1.5 text-ink-70">
              <span className="h-0.5 w-3 bg-[#B42318]" /> CPA
            </span>
            <span className="flex items-center gap-1.5 text-ink-70">
              <span className="h-0.5 w-3 bg-accent" /> Win rate
            </span>
          </div>
        </div>

        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-32">
          <path d={cpaPath} stroke="#B42318" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
          <path d={winPath} stroke="#0D3B2E" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <div className="flex justify-between text-caption text-ink-30 mt-2 font-mono">
          <span>W1</span>
          <span>W4</span>
          <span>W8</span>
          <span>W12</span>
        </div>
      </div>
    </div>
  )
}

/* ── Helper ── */

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-success flex-shrink-0" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
