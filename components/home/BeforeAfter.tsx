const beforeItems = [
  'Fragmented data across 7+ tools',
  'Manual optimisation by overloaded teams',
  'CRM disconnected from ads and creative',
  'Slow reporting, last-click attribution',
  'Rising CAC, falling win rate',
]

const withItems = [
  'One brain across ads, CRM, site and creative',
  'Autonomous optimisation, 24/7',
  'Revenue-aware decisions, not click-aware',
  'Real-time attribution, full funnel visibility',
  'CAC compounds down, win rate compounds up',
]

export function BeforeAfter() {
  return (
    <section className="section relative">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-[720px] text-center mb-14 md:mb-16">
          <p className="text-eyebrow uppercase text-ink-50">Before / After</p>
          <h2 className="mt-4 text-display-lg text-ink text-balance">
            Before Ordino. With Ordino.
          </h2>
        </div>

        {/* Two-column comparison */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-[1100px] mx-auto">
          {/* BEFORE */}
          <div className="card p-7 md:p-9">
            <div className="flex items-center gap-2.5 mb-7 pb-5 border-b border-line">
              <span className="inline-flex h-2 w-2 rounded-full bg-ink-30" />
              <span className="text-caption font-bold uppercase tracking-[0.16em] text-ink-50">
                Before Ordino
              </span>
            </div>
            <ul className="space-y-4">
              {beforeItems.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CrossIcon />
                  <span className="text-body-lg text-ink-50">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WITH */}
          <div className="card p-7 md:p-9 border-line-strong shadow-soft">
            <div className="flex items-center gap-2.5 mb-7 pb-5 border-b border-line">
              <span className="inline-flex h-2 w-2 rounded-full bg-success-bg ring-4 ring-success-bg/40">
                <span className="inline-flex h-2 w-2 rounded-full bg-success animate-pulse" />
              </span>
              <span className="text-caption font-bold uppercase tracking-[0.16em] text-ink">
                With Ordino
              </span>
            </div>
            <ul className="space-y-4">
              {withItems.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-body-lg text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function CrossIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-30 flex-shrink-0 mt-1" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent flex-shrink-0 mt-1" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
