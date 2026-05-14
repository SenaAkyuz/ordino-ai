import type { Metadata } from 'next'
import Link from 'next/link'
import { CapabilityVisual } from '@/components/home/mockups/CapabilityVisual'
import { FinalCTA } from '@/components/home/FinalCTA'

export const metadata: Metadata = {
  title: 'Product',
  description: 'Seven AI specialists. One operating system. Website, ads, creative, SEO, funnel, CRM, and automation — all running together.',
  alternates: { canonical: '/product' },
}

const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Ordino',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Marketing Automation',
  operatingSystem: 'Web',
  description:
    'Seven AI specialists. One operating system. Website builder, autonomous ads, creative engine, SEO & GEO, funnel intelligence, CRM, and automation layer — all running together for high-ticket industries.',
  url: 'https://ordino.ai/product',
  image: 'https://ordino.ai/opengraph-image',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'GBP',
    availability: 'https://schema.org/PreOrder',
    url: 'https://ordino.ai/contact',
  },
  provider: {
    '@type': 'Organization',
    name: 'Ordino',
    url: 'https://ordino.ai',
  },
  featureList: [
    'AI Website Builder',
    'Autonomous Ads Engine',
    'AI Creative Engine',
    'SEO & GEO Engine',
    'Funnel Intelligence',
    'CRM & Revenue Brain',
    'Automation Layer',
  ],
}

const modules = [
  {
    id: 'website',
    eyebrow: '01',
    title: 'AI Website Builder',
    tagline: 'Industry-trained landing pages. Generated, copy-written, and SEO-structured in one pass.',
    subFeatures: [
      'Sector-tuned templates for high-ticket industries',
      'On-brand copy generated from your existing brand voice',
      'SEO-first structure with Core Web Vitals built in',
    ],
  },
  {
    id: 'ads',
    eyebrow: '02',
    title: 'Autonomous Ads Engine',
    tagline: 'Your AI media buyer. Builds campaigns, writes creatives, manages budget, kills losers. Across Google, Meta, LinkedIn, TikTok.',
    subFeatures: [
      'Multi-channel orchestration across Google, Meta, LinkedIn, TikTok',
      'Budget reallocation between channels and creatives',
      'Auto-kill rules for underperforming campaigns',
    ],
  },
  {
    id: 'creative',
    eyebrow: '03',
    title: 'AI Creative Engine',
    tagline: 'Ad copy, banners, video scripts, UGC hooks — generated on brand, every week.',
    subFeatures: [
      'Static, motion, and UGC creative generation',
      'Brand voice trained from your existing assets',
      'Weekly refresh cycle to avoid fatigue',
    ],
  },
  {
    id: 'seo',
    eyebrow: '04',
    title: 'SEO & GEO Engine',
    tagline: 'Keyword research, programmatic pages, internal linking, and AI Search (GEO) optimisation. Indexed and tracked.',
    subFeatures: [
      'Programmatic page generation at sector scale',
      'Internal link graph optimisation',
      'AI Search (GEO) citation tracking across ChatGPT, Perplexity, AI Overviews',
    ],
  },
  {
    id: 'funnel',
    eyebrow: '05',
    title: 'Funnel Intelligence',
    tagline: 'See where money leaks. Per-channel CPA, ROAS, LTV and revenue attribution in one view.',
    subFeatures: [
      'Per-channel CPA, ROAS, LTV, and payback windows',
      'Revenue attribution across the full funnel',
      'Per-keyword and per-creative profitability',
    ],
  },
  {
    id: 'crm',
    eyebrow: '06',
    title: 'CRM & Revenue Brain',
    tagline: 'Lead scoring, deal pipeline, follow-up suggestions. A HubSpot replacement that thinks.',
    subFeatures: [
      'Lead scoring tuned to high-ticket conversion patterns',
      'Deal pipeline with revenue-weighted forecasts',
      'Native two-way sync with HubSpot, Salesforce, Pipedrive',
    ],
  },
  {
    id: 'automation',
    eyebrow: '07',
    title: 'Automation Layer',
    tagline: 'If CPA rises, budget drops. If a keyword converts, spend scales. If creative fatigues, new ones ship. Without you touching it.',
    subFeatures: [
      'Rule engine for budget, bidding, and routing',
      'Triggered actions based on real-time funnel events',
      'Lead routing to sales based on score and intent',
    ],
  },
]

export default function ProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Header */}
      <section className="section pt-24 md:pt-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-mint opacity-50" aria-hidden="true" />

        <div className="container-page">
          <div className="max-w-[820px]">
            <p className="text-eyebrow uppercase text-ink-50">Product</p>
            <h1 className="mt-4 text-display-xl text-ink text-balance">
              Seven specialists. One system.
            </h1>
            <p className="mt-7 text-body-lg text-ink-50 max-w-[620px] text-pretty">
              Every module of Ordino runs as an autonomous specialist — but they all share one brain, one funnel, and one set of customer signals.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-primary">
                Request early access
              </Link>
              <Link href="/industries" className="btn-secondary">
                See industry use-cases
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      {modules.map((mod, i) => (
        <ProductModule key={mod.id} module={mod} index={i} />
      ))}

      {/* Final CTA */}
      <FinalCTA />
    </>
  )
}

function ProductModule({
  module,
  index,
}: {
  module: (typeof modules)[number]
  index: number
}) {
  const isReversed = index % 2 === 1
  const palettes = ['gradient-lavender', 'gradient-peach', 'gradient-mint'] as const
  const gradient =
    index % 2 === 0 ? palettes[Math.floor(index / 2) % palettes.length] : null

  return (
    <section
      className={`section-tight ${index % 2 === 0 ? 'bg-bg' : 'bg-bg-soft/40'} border-t border-line-light relative overflow-hidden`}
    >
      {gradient && (
        <div
          className={`absolute inset-0 -z-10 ${gradient} opacity-25`}
          aria-hidden="true"
        />
      )}
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-[1100px] mx-auto">
          {/* Text */}
          <div className={isReversed ? 'lg:order-2' : ''}>
            <p className="font-mono text-caption text-ink-30 tabular mb-3">
              MODULE {module.eyebrow}
            </p>
            <h2 className="text-display-md text-ink mb-5 text-balance">
              {module.title}
            </h2>
            <p className="text-body-lg text-ink-50 mb-7 text-pretty max-w-[520px]">
              {module.tagline}
            </p>

            {/* Sub-features (brief: "alt başlık altı sub-feature") */}
            <ul className="space-y-2.5 mb-7">
              {module.subFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-body text-ink-70">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Coming soon placeholder for ~300 word body content */}
            <div className="rounded-xl border border-line bg-bg-soft/60 p-4 max-w-[480px] mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-warning animate-pulse" />
                <span className="text-caption font-semibold uppercase tracking-wider text-warning">
                  Full breakdown — coming soon
                </span>
              </div>
              <p className="text-body-sm text-ink-70">
                Detailed walkthroughs, use-cases, and integrations published ahead of public launch. Request early access for a private demo today.
              </p>
            </div>

            <Link href="/contact" className="btn-primary">
              Request early access
              <ArrowRight />
            </Link>
          </div>

          {/* Visual */}
          <div className={isReversed ? 'lg:order-1' : ''}>
            <div className="card p-6 md:p-8 max-w-[480px] mx-auto">
              <CapabilityVisual capability={module.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent flex-shrink-0 mt-0.5" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}
