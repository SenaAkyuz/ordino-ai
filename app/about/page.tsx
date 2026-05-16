import type { Metadata } from 'next'
import { FinalCTA } from '@/components/home/FinalCTA'

export const metadata: Metadata = {
  title: 'About',
  description: 'AI growth infrastructure for industries where one lead is worth millions. Built in London.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="section pt-24 md:pt-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-lavender opacity-50" aria-hidden="true" />

        <div className="container-page">
          <div className="max-w-[760px]">
            <p className="text-eyebrow uppercase text-ink-50">About</p>
            <h1 className="mt-4 text-display-xl text-ink text-balance">
              Why we built Ordino.
            </h1>
          </div>
        </div>
      </section>

      {/* Manifesto — 1 paragraph covering why Ordino, why now, why London */}
      <section className="section-tight border-t border-line-light relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-peach opacity-20" aria-hidden="true" />
        <div className="container-page">
          <div className="max-w-[760px] mx-auto">
            <p className="text-display-sm text-ink-70 text-pretty leading-relaxed">
              Ordino exists because operators in industries where one lead is worth millions deserve growth infrastructure built for their economics — not generic tools optimised for someone else's business. We're building it now because AI has finally crossed the threshold where one connected system can outperform a fragmented stack of point tools. And we're in London because the industries we serve — yacht, luxury property, law, clinics, hotels, wealth — are concentrated within an hour of our office. Close enough to walk to most of our customers.
            </p>
          </div>
        </div>
      </section>

      {/* Operator Credentials — built by operators */}
      <section className="section-tight border-t border-line-light relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-mint opacity-30" aria-hidden="true" />
        <div className="container-page">
          <div className="max-w-[900px] mx-auto">
            {/* Title */}
            <div className="text-center mb-12">
              <h2 className="text-display-md text-ink mb-6 text-balance">
                Built by operators, not by a pitch deck.
              </h2>
              <p className="text-body-lg text-ink-70 text-pretty max-w-[640px] mx-auto">
                12+ years running millions in media spend taught us one thing: marketing tools are fragmented. So we built the system we always needed.
              </p>
            </div>

            {/* 3 metric cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-12">
              <CredentialMetric
                value="12+"
                unit="years"
                label="running enterprise media operations"
              />
              <CredentialMetric
                value="£30M+"
                label="in paid media managed across global brands"
              />
              <CredentialMetric
                value="50+"
                unit="brands"
                label="and growth teams worked with directly"
              />
            </div>

            {/* Trusted by teams from */}
            <div className="rounded-xl border border-line bg-bg-card p-6 md:p-8">
              <p className="text-eyebrow uppercase text-ink-50 mb-5 text-center">
                Trusted by teams from:
              </p>
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                {[
                  'TURKISH TECHNIC',
                  'ANADOLU HOLDING',
                  'AIATA',
                  'GSSTORE',
                  'KOÇ GROUP',
                  'ARÇELİK',
                  'BEKO',
                  'PHILIPS',
                  'GENERALI',
                  'MARIE CLAIRE',
                  'FORTUNE',
                ].map(name => (
                  <span
                    key={name}
                    className="font-display font-bold text-caption tracking-[0.18em] text-ink-50 whitespace-nowrap"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built in London — real address */}
      <section className="section-tight border-t border-line-light bg-bg-soft/40 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-peach opacity-25" aria-hidden="true" />
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-[1100px] mx-auto">
            {/* Address */}
            <div>
              <p className="text-eyebrow uppercase text-ink-50 mb-4">Headquarters</p>
              <h2 className="text-display-md text-ink mb-5 text-balance">
                Built in London.
              </h2>
              <address className="not-italic text-body-lg text-ink-70 leading-relaxed">
                Ordino Technologies Ltd.<br />
                20–22 Wenlock Road<br />
                London N1 7GU<br />
                United Kingdom
              </address>
              <p className="mt-5 text-caption text-ink-50">
                Registered in England &amp; Wales. ICO Registered (UK).
              </p>
            </div>

            {/* Team photo placeholder */}
            <div className="aspect-[4/3] rounded-xl bg-bg-card border border-line overflow-hidden flex items-center justify-center relative">
              <div className="absolute inset-0 gradient-mint opacity-60" aria-hidden="true" />
              <div className="relative z-10 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-bg-card border border-line mb-4">
                  <CameraIcon />
                </div>
                <p className="text-caption text-ink-50">Team photo</p>
                <p className="text-caption text-ink-30">Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investors / Advisors */}
      <section className="section-tight border-t border-line-light relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-lavender opacity-25" aria-hidden="true" />
        <div className="container-page">
          <div className="max-w-[1100px] mx-auto text-center">
            <p className="text-eyebrow uppercase text-ink-50 mb-3">Backed by</p>
            <h2 className="text-display-md text-ink mb-3 text-balance">
              Independent operators from the industries we serve.
            </h2>
            <p className="text-body text-ink-50 max-w-[520px] mx-auto mb-12">
              Investor and advisor names disclosed at close of funding round.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[800px] mx-auto">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="aspect-[3/1] rounded-lg bg-bg-card border border-line flex items-center justify-center"
                >
                  <span className="font-display font-bold text-caption tracking-[0.18em] text-ink-30">
                    INVESTOR {i}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <FinalCTA />
    </>
  )
}

function CredentialMetric({
  value,
  unit,
  label,
}: {
  value: string
  unit?: string
  label: string
}) {
  return (
    <div className="card p-6 text-center">
      <div className="flex items-baseline justify-center gap-2 mb-3">
        <span className="font-display font-bold text-display-lg text-ink tabular leading-none">
          {value}
        </span>
        {unit && (
          <span className="font-display font-semibold text-body-lg text-ink-50">
            {unit}
          </span>
        )}
      </div>
      <p className="text-body-sm text-ink-50 text-pretty">
        {label}
      </p>
    </div>
  )
}

function CameraIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-50" aria-hidden="true">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}
