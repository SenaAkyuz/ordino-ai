import Link from 'next/link'

export function FinalCTA() {
  return (
    <section className="relative section overflow-hidden">
      {/* Layered gradient background */}
      <div className="absolute inset-0 -z-10 gradient-hero opacity-90" aria-hidden="true" />

      {/* Subtle dark vignette at edges for premium feel */}
      <div
        className="absolute inset-0 -z-10 opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 0%, rgb(250 250 247 / 0.4) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="container-page text-center">
        <div className="mx-auto max-w-[720px]">
          {/* Eyebrow with pulsing dot */}
          <div className="inline-flex items-center gap-2 mb-7">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-eyebrow uppercase text-ink-70">Ready when you are</span>
          </div>

          <h2 className="text-display-xl text-ink text-balance mb-6">
            Stop managing growth.
            <br />
            Start owning it.
          </h2>

          <p className="text-body-lg text-ink-50 text-pretty max-w-[520px] mx-auto mb-10">
            Book a 20-minute walkthrough. We’ll show Ordino running on a brand like yours.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/contact" className="btn-primary text-[16px] px-7 py-3.5">
              Book a Demo
              <ArrowRight />
            </Link>
            <Link href="/product" className="btn-ghost">
              See the product first
            </Link>
          </div>

          {/* Sub-line */}
          <p className="mt-8 text-caption text-ink-50">
            20 minutes · No slides · No commitment
          </p>
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
