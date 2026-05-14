interface CapabilityVisualProps {
  capability: string
}

export function CapabilityVisual({ capability }: CapabilityVisualProps) {
  switch (capability) {
    case 'website': return <WebsiteVisual />
    case 'ads': return <AdsVisual />
    case 'creative': return <CreativeVisual />
    case 'seo': return <SeoVisual />
    case 'funnel': return <FunnelVisual />
    case 'crm': return <CrmVisual />
    case 'automation': return <AutomationVisual />
    default: return null
  }
}

/* ── 1. AI Website Builder ── */

function WebsiteVisual() {
  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-line bg-bg overflow-hidden">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-line bg-bg-soft">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-ink-15" />
            <div className="h-2.5 w-2.5 rounded-full bg-ink-15" />
            <div className="h-2.5 w-2.5 rounded-full bg-ink-15" />
          </div>
          <div className="ml-2 flex-1 rounded-md bg-bg px-2.5 py-1 text-[10px] font-mono text-ink-50 truncate">
            ordino.ai/yacht/charter-q1
          </div>
        </div>
        {/* Page preview */}
        <div className="p-3 space-y-2.5">
          {/* Top nav */}
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-display font-bold text-ink tracking-tight">Royal Maritime</div>
            <div className="flex items-center gap-2.5">
              <span className="text-[8px] text-ink-50 font-medium">Yachts</span>
              <span className="text-[8px] text-ink-50 font-medium">Destinations</span>
              <span className="text-[8px] text-ink-50 font-medium">Charter</span>
              <span className="text-[8px] font-semibold bg-accent text-accent-ink px-2 py-0.5 rounded">Book</span>
            </div>
          </div>

          {/* Hero with yacht imagery */}
          <div className="aspect-[16/8] rounded-lg overflow-hidden relative bg-gradient-to-br from-[#7DB8D9] via-[#A8D5E5] to-[#F4E4BC]">
            {/* Yacht silhouette — sleek motor superyacht */}
            <div className="absolute inset-0 flex items-end justify-center pb-3">
              <svg width="130" height="36" viewBox="0 0 130 36" fill="none" className="drop-shadow-md">
                {/* Reflection / water shimmer */}
                <ellipse cx="65" cy="30" rx="48" ry="1.6" fill="white" fillOpacity="0.18"/>
                <ellipse cx="65" cy="32.5" rx="34" ry="0.9" fill="white" fillOpacity="0.12"/>
                {/* Hull */}
                <path d="M10 23 L16 17 L106 17 L116 23 L112 26 L14 26 Z" fill="white" fillOpacity="0.95"/>
                {/* Main cabin (deck 1) */}
                <path d="M26 17 L28 11 L92 11 L96 17 Z" fill="white" fillOpacity="0.92"/>
                {/* Upper deck (bridge) */}
                <path d="M42 11 L44 5.5 L76 5.5 L80 11 Z" fill="white" fillOpacity="0.88"/>
                {/* Radar mast */}
                <rect x="59.5" y="1.5" width="1" height="4" fill="white" fillOpacity="0.75"/>
                <rect x="58" y="2.5" width="4" height="0.7" fill="white" fillOpacity="0.65"/>
                {/* Window strip — main deck */}
                <rect x="32" y="14" width="58" height="0.9" fill="#0D3B2E" fillOpacity="0.16"/>
                {/* Window strip — upper deck */}
                <rect x="48" y="8" width="24" height="0.7" fill="#0D3B2E" fillOpacity="0.14"/>
              </svg>
            </div>
            {/* Wave gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#7DB8D9]/50 to-transparent" />
            {/* Hero copy overlay */}
            <div className="absolute top-3 left-4 right-4">
              <div className="text-white font-display font-bold text-[13px] leading-tight drop-shadow-md">
                Charter the Mediterranean&apos;s finest
              </div>
              <div className="text-white/85 text-[9px] mt-1 drop-shadow-sm">
                Crewed yachts from £4,200/day
              </div>
            </div>
          </div>

          {/* Feature row */}
          <div className="grid grid-cols-3 gap-2">
            <FeatureBlock icon={<CrewIcon />} label="All-inclusive crew" />
            <FeatureBlock icon={<CompassIcon />} label="Custom routes" />
            <FeatureBlock icon={<StarIcon />} label="5-star catering" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Stat label="Lighthouse" value="98" />
        <Stat label="SEO score" value="A+" />
        <Stat label="Time" value="3m 12s" />
      </div>
    </div>
  )
}

/* ── 2. Autonomous Ads Engine ── */

function AdsVisual() {
  const platforms = [
    { name: 'Google Ads', spend: '£4.2k', roas: '5.1x', color: 'bg-[#4285F4]' },
    { name: 'Meta Ads', spend: '£3.8k', roas: '4.6x', color: 'bg-[#0866FF]' },
    { name: 'LinkedIn', spend: '£2.1k', roas: '3.9x', color: 'bg-[#0A66C2]' },
    { name: 'TikTok Ads', spend: '£1.4k', roas: '4.2x', color: 'bg-ink' },
  ]
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-body-sm">
        <span className="font-semibold text-ink">Active campaigns</span>
        <span className="status-dot text-success text-caption font-medium">4 running</span>
      </div>
      <div className="space-y-2">
        {platforms.map(p => (
          <div key={p.name} className="flex items-center gap-3 rounded-lg border border-line bg-bg-card p-2.5">
            <div className={`h-7 w-7 rounded-md ${p.color}`} />
            <div className="flex-1">
              <div className="text-body-sm font-medium text-ink">{p.name}</div>
              <div className="text-caption text-ink-50 font-mono">{p.spend} / day</div>
            </div>
            <span className="font-display font-bold text-h4 text-ink tabular">{p.roas}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 3. AI Creative Engine ── */

function CreativeVisual() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-body-sm">
        <span className="font-semibold text-ink">Generated this week</span>
        <span className="text-caption text-ink-50">24 assets</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          'from-amber-100 to-orange-200',
          'from-purple-100 to-pink-200',
          'from-emerald-100 to-teal-200',
          'from-blue-100 to-indigo-200',
          'from-rose-100 to-red-200',
          'from-yellow-100 to-amber-200',
        ].map((grad, i) => (
          <div key={i} className={`aspect-square rounded-lg bg-gradient-to-br ${grad} border border-line relative overflow-hidden`}>
            <div className="absolute bottom-1.5 left-1.5 right-1.5">
              <div className="h-1.5 w-3/4 rounded-sm bg-white/80 mb-1" />
              <div className="h-1 w-1/2 rounded-sm bg-white/60" />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-bg-soft p-3 text-caption text-ink-70">
        <span className="font-semibold text-ink">Headline variants:</span> Sail Like Royalty · Your Boat. Your Ocean · Charter in 60s
      </div>
    </div>
  )
}

/* ── 4. SEO & GEO Engine ── */

function SeoVisual() {
  const keywords = [
    { kw: 'luxury yacht charter mediterranean', vol: '8.1k', rank: 2 },
    { kw: 'private boat hire monaco', vol: '4.4k', rank: 1 },
    { kw: 'superyacht booking', vol: '12k', rank: 4 },
    { kw: 'yacht broker london', vol: '2.9k', rank: 1 },
  ]
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-body-sm">
        <span className="font-semibold text-ink">Top keywords</span>
        <span className="text-caption text-ink-50">+18 ranking</span>
      </div>
      <div className="space-y-1.5">
        {keywords.map(k => (
          <div key={k.kw} className="flex items-center gap-3 rounded-lg border border-line bg-bg-card p-2.5">
            <span className={`flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-bold tabular ${
              k.rank <= 2 ? 'bg-accent text-accent-ink' : 'bg-bg-soft text-ink-70'
            }`}>
              #{k.rank}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-body-sm text-ink truncate">{k.kw}</div>
            </div>
            <span className="text-caption text-ink-50 font-mono">{k.vol}</span>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-accent-soft border border-accent/20 px-3 py-2 text-caption text-ink-70 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        <span><span className="font-semibold text-ink">AI Search (GEO)</span> · Cited 14 times this week</span>
      </div>
    </div>
  )
}

/* ── 5. Funnel Intelligence ── */

function FunnelVisual() {
  const channels = [
    { name: 'Google Ads', cpa: '£312', roas: '4.8x', leak: false },
    { name: 'Meta', cpa: '£428', roas: '3.6x', leak: false },
    { name: 'LinkedIn', cpa: '£891', roas: '1.4x', leak: true },
    { name: 'Organic', cpa: '£47', roas: '12.3x', leak: false },
  ]
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-body-sm">
        <span className="font-semibold text-ink">Per-channel attribution</span>
        <span className="text-caption text-ink-50">Last 30 days</span>
      </div>
      <div className="rounded-lg border border-line bg-bg-card overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto] gap-3 px-3 py-2 border-b border-line bg-bg-soft text-caption font-semibold text-ink-70">
          <span>Channel</span>
          <span className="text-right w-16">CPA</span>
          <span className="text-right w-16">ROAS</span>
        </div>
        {channels.map(c => (
          <div key={c.name} className={`grid grid-cols-[1fr_auto_auto] gap-3 px-3 py-2.5 text-body-sm border-b border-line last:border-b-0 ${c.leak ? 'bg-[#FEF3F2]' : ''}`}>
            <span className={`font-medium ${c.leak ? 'text-[#B42318]' : 'text-ink'}`}>{c.name}</span>
            <span className={`text-right w-16 tabular font-mono ${c.leak ? 'text-[#B42318]' : 'text-ink-70'}`}>{c.cpa}</span>
            <span className={`text-right w-16 tabular font-mono ${c.leak ? 'text-[#B42318]' : 'text-ink'}`}>{c.roas}</span>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-[#FEF3F2] border border-[#FECDCA] px-3 py-2 text-caption text-[#B42318] flex items-center gap-2">
        <span className="font-semibold">Money leak:</span> LinkedIn ROAS &lt; 2x · suggested action: pause
      </div>
    </div>
  )
}

/* ── 6. CRM & Revenue Brain ── */

function CrmVisual() {
  const leads = [
    { name: 'James W.', amount: '£2.4M', stage: 'Qualified', score: 92 },
    { name: 'Sarah K.', amount: '£890k', stage: 'Proposal', score: 78 },
    { name: 'Marco L.', amount: '£1.2M', stage: 'Qualified', score: 71 },
    { name: 'Anna P.', amount: '£560k', stage: 'Discovery', score: 54 },
  ]
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-body-sm">
        <span className="font-semibold text-ink">Pipeline · scored</span>
        <span className="text-caption text-ink-50">£5.1M weighted</span>
      </div>
      <div className="space-y-1.5">
        {leads.map(l => (
          <div key={l.name} className="flex items-center gap-3 rounded-lg border border-line bg-bg-card p-2.5">
            <div className="flex-1 min-w-0">
              <div className="text-body-sm font-medium text-ink">{l.name}</div>
              <div className="text-caption text-ink-50">{l.stage} · {l.amount}</div>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`h-1.5 w-12 rounded-full overflow-hidden bg-line`}>
                <div
                  className={`h-full ${l.score >= 80 ? 'bg-accent' : l.score >= 60 ? 'bg-warning' : 'bg-ink-30'}`}
                  style={{ width: `${l.score}%` }}
                />
              </div>
              <span className="text-caption font-semibold text-ink tabular w-6 text-right">{l.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── 7. Automation Layer ── */

function AutomationVisual() {
  const rules = [
    { if: 'CPA rises > 20%', then: 'Drop budget 30%' },
    { if: 'Keyword converts', then: 'Scale spend 2x' },
    { if: 'Creative CTR < 1%', then: 'Generate new variants' },
    { if: 'Lead score > 80', then: 'Route to sales · alert' },
  ]
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-body-sm">
        <span className="font-semibold text-ink">Active rules</span>
        <span className="status-dot text-success text-caption font-medium">All running</span>
      </div>
      <div className="space-y-2">
        {rules.map((r, i) => (
          <div key={i} className="rounded-lg border border-line bg-bg-card p-3">
            <div className="flex items-center gap-2 text-body-sm">
              <span className="text-caption font-mono uppercase text-ink-30 tracking-wider">IF</span>
              <span className="text-ink">{r.if}</span>
            </div>
            <div className="flex items-center gap-2 text-body-sm mt-1.5">
              <span className="text-caption font-mono uppercase text-accent tracking-wider">THEN</span>
              <span className="text-ink-70">{r.then}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Helper ── */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-bg-soft p-2.5 text-center">
      <div className="text-caption text-ink-50 mb-0.5">{label}</div>
      <div className="font-display font-bold text-h4 text-ink tabular">{value}</div>
    </div>
  )
}

function FeatureBlock({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="rounded bg-bg-soft border border-line p-2 flex flex-col items-center gap-1">
      <span className="text-accent">{icon}</span>
      <span className="text-[8px] text-ink-70 leading-tight text-center font-medium">{label}</span>
    </div>
  )
}

function CrewIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

function CompassIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
