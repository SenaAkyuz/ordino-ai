export function LiveInProduction() {
  return (
    <section className="section bg-bg-soft/40 relative overflow-hidden border-t border-line-light">
      <div className="absolute inset-0 -z-10 gradient-peach opacity-40" aria-hidden="true" />

      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-[720px] text-center mb-14 md:mb-16">
          <p className="text-eyebrow uppercase text-accent">Live in production</p>
          <h2 className="mt-4 text-display-lg text-ink text-balance">
            This isn’t a demo. It’s already running.
          </h2>
          <p className="mt-6 text-body-lg text-ink-50 text-pretty">
            Ordino is live in the UK today — running paid acquisition, CRM automation and lead routing for international education brand GoBritanya.
          </p>
        </div>

        {/* Case card */}
        <div className="max-w-[1000px] mx-auto">
          <div className="card p-7 md:p-10">
            {/* Brand tag */}
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-line">
              <span className="inline-flex h-2 w-2 rounded-full bg-success-bg ring-4 ring-success-bg/40">
                <span className="inline-flex h-2 w-2 rounded-full bg-success animate-pulse" />
              </span>
              <span className="text-caption font-bold uppercase tracking-[0.16em] text-ink">
                GOBRITANYA · UK · INTERNATIONAL EDUCATION
              </span>
            </div>

            {/* Two-column body */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left: What Ordino runs */}
              <div>
                <h3 className="text-h3 text-ink mb-5">
                  What Ordino runs end-to-end:
                </h3>
                <ul className="space-y-3">
                  {[
                    'Multi-country paid acquisition (Google, Meta, TikTok)',
                    'HubSpot CRM with full lead-to-booking attribution',
                    'Automated lead scoring and sales routing',
                    'Cross-channel creative and landing page generation',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-body text-ink-70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Live numbers */}
              <div>
                <h3 className="text-h3 text-ink mb-5">
                  Live numbers:
                </h3>
                <div className="space-y-3">
                  <MetricRow value="£10K+" label="monthly media spend, under active optimisation" />
                  <MetricRow value="£300K+" label="annual managed spend (current run-rate)" />
                  <MetricRow value="Multi-country" label="lead flow into a single CRM" />
                  <MetricRow value="Real-time" label="revenue attribution, not last-click guessing" />
                </div>
              </div>
            </div>
          </div>

          {/* Closing line */}
          <p className="text-center mt-10 text-body-lg text-ink-50 text-pretty max-w-[640px] mx-auto">
            Every dashboard you see on this page is wired to a real funnel running today. Not a Figma render.
          </p>
        </div>
      </div>
    </section>
  )
}

function MetricRow({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-3 rounded-lg bg-bg-soft p-3.5">
      <span className="font-display font-bold text-h3 text-ink tabular whitespace-nowrap">
        {value}
      </span>
      <span className="text-body-sm text-ink-50 leading-snug">
        {label}
      </span>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}
