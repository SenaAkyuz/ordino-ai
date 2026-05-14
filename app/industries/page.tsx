import type { Metadata } from 'next'
import Link from 'next/link'
import { FinalCTA } from '@/components/home/FinalCTA'

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Built for industries where one lead is worth millions. Yacht, luxury real estate, law firms, premium clinics, boutique hotels, and wealth advisory.',
  alternates: { canonical: '/industries' },
}

const industries = [
  {
    id: 'yacht',
    eyebrow: '01',
    title: 'Yacht Sales & Charter',
    promise: 'Sell million-pound boats with sub-£500 lead cost.',
    kpis: [
      { label: 'Avg. lead cost', value: '£487' },
      { label: 'Avg. close rate', value: '11%' },
      { label: 'Avg. payback', value: '52 days' },
    ],
    profile: 'Brokerages and charter operators selling vessels and experiences from £500k to £40M+. Buyers are high-net-worth individuals making one of the most considered purchases of their lives — research cycles span months, with multiple advisors involved.',
  },
  {
    id: 'real-estate',
    eyebrow: '02',
    title: 'Luxury Real Estate',
    promise: 'Off-plan, second-home, prime central — leads that close.',
    kpis: [
      { label: 'Avg. lead cost', value: '£368' },
      { label: 'Avg. close rate', value: '14%' },
      { label: 'Avg. payback', value: '41 days' },
    ],
    profile: 'Developers and agencies handling off-plan launches, second homes, and prime central inventory above £1M. Leads convert over weeks or months, often involving family decision-makers and financial advisors, with multiple touchpoints across devices and sessions.',
  },
  {
    id: 'law',
    eyebrow: '03',
    title: 'Law Firms',
    promise: 'Immigration, family, property. Cases, not clicks.',
    kpis: [
      { label: 'Avg. lead cost', value: '£214' },
      { label: 'Avg. close rate', value: '22%' },
      { label: 'Avg. payback', value: '36 days' },
    ],
    profile: 'Boutique practices in immigration, family law, and property. Average case fees in the tens of thousands, with clients searching with real urgency and high intent — typically converting within days, not months.',
  },
  {
    id: 'clinics',
    eyebrow: '04',
    title: 'Premium Clinics',
    promise: 'Dental, aesthetic, fertility. High-intent patients only.',
    kpis: [
      { label: 'Avg. lead cost', value: '£179' },
      { label: 'Avg. close rate', value: '29%' },
      { label: 'Avg. payback', value: '24 days' },
    ],
    profile: 'Dental, aesthetic, and fertility clinics where treatment value exceeds £10k. Patients actively researching and comparing providers across reviews, credentials, and outcomes — high intent but high standards.',
  },
  {
    id: 'hotels',
    eyebrow: '05',
    title: 'Boutique Hotels & Villas',
    promise: 'Direct bookings, not OTA commissions.',
    kpis: [
      { label: 'Avg. lead cost', value: '£142' },
      { label: 'Avg. close rate', value: '31%' },
      { label: 'Avg. payback', value: '28 days' },
    ],
    profile: 'Independent boutique properties and villas losing 18–30% margin to OTA commissions on every booking. Direct booking optimisation is the highest-leverage revenue lever — every direct booking is pure margin recovery.',
  },
  {
    id: 'wealth',
    eyebrow: '06',
    title: 'Wealth & Advisory',
    promise: 'Compliant funnels for regulated industries.',
    kpis: [
      { label: 'Avg. lead cost', value: '£531' },
      { label: 'Avg. close rate', value: '12%' },
      { label: 'Avg. payback', value: '47 days' },
    ],
    profile: 'Wealth managers, family offices, and regulated advisory firms. Compliance requirements (FCA and equivalent EU) shape every funnel decision. Trust signals matter more than urgency — credentials, reviews, and clear regulatory positioning lead the journey.',
  },
]

export default function IndustriesPage() {
  return (
    <>
      {/* Header */}
      <section className="section pt-24 md:pt-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-peach opacity-50" aria-hidden="true" />

        <div className="container-page">
          <div className="max-w-[820px]">
            <p className="text-eyebrow uppercase text-ink-50">Industries</p>
            <h1 className="mt-4 text-display-xl text-ink text-balance">
              Built for industries where one lead is worth millions.
            </h1>
            <p className="mt-7 text-body-lg text-ink-50 max-w-[620px] text-pretty">
              Generic AI tools optimise clicks. Ordino optimises revenue per lead — because in your sector, leads are worth more than most companies' annual revenue.
            </p>
          </div>
        </div>
      </section>

      {/* Industries */}
      {industries.map((ind, i) => (
        <IndustrySection key={ind.id} industry={ind} index={i} />
      ))}

      {/* Final CTA */}
      <FinalCTA />
    </>
  )
}

function IndustrySection({
  industry,
  index,
}: {
  industry: (typeof industries)[number]
  index: number
}) {
  const palettes = ['gradient-mint', 'gradient-lavender', 'gradient-peach'] as const
  const gradient =
    index % 2 === 0 ? palettes[Math.floor(index / 2) % palettes.length] : null

  return (
    <section
      id={industry.id}
      className={`section-tight ${index % 2 === 0 ? 'bg-bg' : 'bg-bg-soft/40'} border-t border-line-light scroll-mt-24 relative overflow-hidden`}
    >
      {gradient && (
        <div
          className={`absolute inset-0 -z-10 ${gradient} opacity-25`}
          aria-hidden="true"
        />
      )}
      <div className="container-page">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 max-w-[1100px] mx-auto">
          {/* Left: title + KPIs */}
          <div>
            <p className="font-mono text-caption text-ink-30 tabular mb-3">
              {industry.eyebrow}
            </p>
            <h2 className="text-display-md text-ink mb-4 text-balance">
              {industry.title}
            </h2>
            <p className="text-body-lg text-ink mb-8 text-pretty">
              {industry.promise}
            </p>

            {/* KPI Grid — brief: tahmini rakam, "indicative" küçük */}
            <div className="grid grid-cols-3 gap-3 mb-2">
              {industry.kpis.map((kpi, i) => (
                <div key={i} className="rounded-lg bg-bg-card border border-line p-4">
                  <div className="text-caption text-ink-50 mb-1.5">{kpi.label}</div>
                  <div className="font-display font-bold text-h3 text-ink tabular">
                    {kpi.value}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-caption text-ink-30 italic">
              Indicative — actuals vary by client and channel mix.
            </p>
          </div>

          {/* Right: customer profile + CTA */}
          <div className="lg:border-l lg:border-line lg:pl-12">
            <p className="text-eyebrow uppercase text-ink-50 mb-4">
              Typical customer
            </p>
            <p className="text-body-lg text-ink-70 text-pretty mb-8">
              {industry.profile}
            </p>

            <Link href="/contact" className="btn-primary">
              Get my industry playbook
              <ArrowRight />
            </Link>
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
