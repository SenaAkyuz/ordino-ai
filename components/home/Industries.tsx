import Link from 'next/link'

const industries = [
  {
    icon: <YachtIcon />,
    title: 'Yacht Sales & Charter',
    promise: 'Sell million-pound boats with sub-£500 lead cost.',
  },
  {
    icon: <BuildingIcon />,
    title: 'Luxury Real Estate',
    promise: 'Off-plan, second-home, prime central — leads that close.',
  },
  {
    icon: <ScalesIcon />,
    title: 'Law Firms',
    promise: 'Immigration, family, property. Cases, not clicks.',
  },
  {
    icon: <ClinicIcon />,
    title: 'Premium Clinics',
    promise: 'Dental, aesthetic, fertility. High-intent patients only.',
  },
  {
    icon: <HotelIcon />,
    title: 'Boutique Hotels & Villas',
    promise: 'Direct bookings, not OTA commissions.',
  },
  {
    icon: <WealthIcon />,
    title: 'Wealth & Advisory',
    promise: 'Compliant funnels for regulated industries.',
  },
]

export function Industries() {
  return (
    <section className="section">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-[680px] text-center mb-14 md:mb-16">
          <p className="text-eyebrow uppercase text-ink-50">Built for</p>
          <h2 className="mt-4 text-display-lg text-ink text-balance">
            One lead is worth millions. We build for those leads.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-[1100px] mx-auto">
          {industries.map((ind, i) => (
            <Link
              key={i}
              href="/industries"
              className="card card-hover p-7 group flex flex-col gap-4 cursor-pointer"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent group-hover:bg-accent group-hover:text-accent-ink transition-colors">
                {ind.icon}
              </span>
              <div>
                <h3 className="text-h3 text-ink mb-2">
                  {ind.title}
                </h3>
                <p className="text-body text-ink-50 text-pretty">
                  {ind.promise}
                </p>
              </div>
              <div className="mt-auto pt-3 flex items-center gap-1.5 text-caption font-medium text-ink-50 group-hover:text-accent transition-colors">
                <span>View playbook</span>
                <ArrowRight />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link href="/industries" className="btn-secondary">
            See your industry playbook
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Icons ── */

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}
function YachtIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 18l1.5-5h15L21 18M5 13l1-9h4l1 4h7M12 4v9M3 21h18" />
    </svg>
  )
}
function BuildingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01M14 9h.01M14 13h.01M14 17h.01" />
    </svg>
  )
}
function ScalesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v18M5 21h14M6 8l-3 6c0 1.66 1.34 3 3 3s3-1.34 3-3l-3-6zm12 0l-3 6c0 1.66 1.34 3 3 3s3-1.34 3-3l-3-6z" />
    </svg>
  )
}
function ClinicIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M12 8v8M8 12h8" />
    </svg>
  )
}
function HotelIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8M2 20h20M6 10V6a2 2 0 012-2h8a2 2 0 012 2v4M9 10v-3M15 10v-3" />
    </svg>
  )
}
function WealthIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M3 10h18M12 2L2 9h20L12 2zM5 10v11M9 10v11M15 10v11M19 10v11" />
    </svg>
  )
}
