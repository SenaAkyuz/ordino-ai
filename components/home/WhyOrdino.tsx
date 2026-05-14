const reasons = [
  {
    eyebrow: '01',
    title: 'Built for high-ticket',
    description: 'Generic AI tools optimise clicks. Ordino optimises revenue per lead — because in your sector, leads are worth more than most companies’ annual revenue.',
    icon: <TargetIcon />,
  },
  {
    eyebrow: '02',
    title: 'One brain, every channel',
    description: 'Most tools own one slice. Ordino connects website, ads, SEO, CRM and creative — so every decision is made with full context.',
    icon: <BrainIcon />,
  },
  {
    eyebrow: '03',
    title: 'Compounds weekly',
    description: 'Every campaign result, every form fill, every conversion teaches the system. Your CAC drops while your competitors keep guessing.',
    icon: <CompoundIcon />,
  },
]

export function WhyOrdino() {
  return (
    <section className="section bg-bg-soft/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-lavender opacity-40" aria-hidden="true" />

      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-[680px] text-center mb-14 md:mb-16">
          <p className="text-eyebrow uppercase text-ink-50">Why Ordino</p>
          <h2 className="mt-4 text-display-lg text-ink text-balance">
            Why Ordino is different.
          </h2>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-[1100px] mx-auto">
          {reasons.map((reason, i) => (
            <div
              key={i}
              className="relative flex flex-col gap-5 md:border-l md:border-line md:pl-8 first:md:border-l-0 first:md:pl-0"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-ink">
                  {reason.icon}
                </span>
                <span className="font-mono text-caption text-ink-30 tabular">
                  {reason.eyebrow}
                </span>
              </div>

              <h3 className="text-display-md text-ink text-balance">
                {reason.title}
              </h3>

              <p className="text-body-lg text-ink-50 text-pretty">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Icons ── */

function TargetIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  )
}
function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2a4 4 0 00-4 4v0a4 4 0 00-4 4v0a4 4 0 002 3.5V18a4 4 0 008 0v-4.5A4 4 0 0016 10v0a4 4 0 00-4-4v0z" />
      <path d="M9 11h6M9 14h6" />
    </svg>
  )
}
function CompoundIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 17l6-6 4 4 8-8M17 7h4v4" />
    </svg>
  )
}
