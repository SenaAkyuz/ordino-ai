import Link from 'next/link'

export function PricingTeaser() {
  return (
    <section id="pricing" className="section">
      <div className="container-page">
        <div className="mx-auto max-w-[640px]">
          <div className="relative card p-8 md:p-12 text-center overflow-hidden">
            {/* Top accent stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" aria-hidden="true" />

            {/* Subtle background gradient */}
            <div className="absolute inset-0 -z-10 gradient-mint opacity-30" aria-hidden="true" />

            <p className="text-eyebrow uppercase text-ink-50 mb-4">Pricing</p>

            <h2 className="text-display-md text-ink text-balance mb-5">
              Pricing built for outcomes.
            </h2>

            <p className="text-body-lg text-ink-50 text-pretty max-w-[480px] mx-auto mb-8">
              Ordino is priced as a monthly platform fee. Plans scale with your ad spend and lead volume. Most clients see payback in under 60 days.
            </p>

            <Link href="/contact" className="btn-primary">
              Talk to our team
              <ArrowRight />
            </Link>

            {/* Fine print */}
            <p className="mt-5 text-caption text-ink-30">
              No public pricing during early access. Custom proposals only.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}
