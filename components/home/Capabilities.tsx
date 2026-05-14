'use client'

import { useState } from 'react'
import { CapabilityVisual } from './mockups/CapabilityVisual'

const capabilities = [
  {
    id: 'website',
    label: 'AI Website Builder',
    description: 'Industry-trained landing pages. Generated, copy-written, and SEO-structured in one pass.',
    icon: <WebsiteIcon />,
  },
  {
    id: 'ads',
    label: 'Autonomous Ads Engine',
    description: 'Your AI media buyer. Builds campaigns, writes creatives, manages budget, kills losers. Across Google, Meta, LinkedIn, TikTok.',
    icon: <AdsIcon />,
  },
  {
    id: 'creative',
    label: 'AI Creative Engine',
    description: 'Ad copy, banners, video scripts, UGC hooks — generated on brand, every week.',
    icon: <CreativeIcon />,
  },
  {
    id: 'seo',
    label: 'SEO & GEO Engine',
    description: 'Keyword research, programmatic pages, internal linking, and AI Search (GEO) optimisation. Indexed and tracked.',
    icon: <SeoIcon />,
  },
  {
    id: 'funnel',
    label: 'Funnel Intelligence',
    description: 'See where money leaks. Per-channel CPA, ROAS, LTV and revenue attribution in one view.',
    icon: <FunnelIcon />,
  },
  {
    id: 'crm',
    label: 'CRM & Revenue Brain',
    description: 'Lead scoring, deal pipeline, follow-up suggestions. A HubSpot replacement that thinks.',
    icon: <CrmIcon />,
  },
  {
    id: 'automation',
    label: 'Automation Layer',
    description: 'If CPA rises, budget drops. If a keyword converts, spend scales. If creative fatigues, new ones ship. Without you touching it.',
    icon: <AutomationIcon />,
  },
]

export function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = capabilities[activeIndex]

  return (
    <section id="capabilities" className="section bg-bg-soft/40 relative overflow-hidden">
      {/* Soft gradient accent */}
      <div className="absolute inset-0 -z-10 gradient-mint opacity-50" aria-hidden="true" />

      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-[680px] text-center mb-14 md:mb-16">
          <p className="text-eyebrow uppercase text-ink-50">Capabilities</p>
          <h2 className="mt-4 text-display-lg text-ink text-balance">
            One system. Seven specialists.
          </h2>
          <p className="mt-5 text-body-lg text-ink-50 text-pretty">
            Seven modules. One brain. Each tuned to a part of your growth engine.
          </p>
        </div>

        {/* Tab layout */}
        <div className="grid lg:grid-cols-[340px_1fr] gap-6 lg:gap-10 max-w-[1100px] mx-auto">
          {/* Desktop: Sol vertical tabs */}
          <div className="hidden lg:flex flex-col gap-1.5" role="tablist" aria-label="Capabilities">
            {capabilities.map((cap, i) => (
              <button
                key={cap.id}
                role="tab"
                aria-selected={activeIndex === i}
                aria-controls={`capability-panel-${cap.id}`}
                onClick={() => setActiveIndex(i)}
                className={`group flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-300 ${
                  activeIndex === i
                    ? 'bg-bg-card border-line-strong shadow-soft'
                    : 'bg-transparent border-transparent hover:bg-bg-card/60 hover:border-line'
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-lg flex-shrink-0 transition-colors ${
                    activeIndex === i
                      ? 'bg-accent text-accent-ink'
                      : 'bg-bg-soft text-ink-50 group-hover:text-ink-70'
                  }`}
                >
                  {cap.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-h4 font-semibold transition-colors ${
                      activeIndex === i ? 'text-ink' : 'text-ink-70 group-hover:text-ink'
                    }`}
                  >
                    {cap.label}
                  </div>
                </div>
                <ChevronRight
                  className={`flex-shrink-0 transition-all ${
                    activeIndex === i ? 'text-accent translate-x-0' : 'text-ink-30 -translate-x-1 opacity-0'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Mobile: Horizontal scroll tabs */}
          <div className="lg:hidden -mx-6 px-6 overflow-x-auto scrollbar-hide" role="tablist">
            <div className="flex gap-2 w-max pb-2">
              {capabilities.map((cap, i) => (
                <button
                  key={cap.id}
                  role="tab"
                  aria-selected={activeIndex === i}
                  onClick={() => setActiveIndex(i)}
                  className={`flex items-center gap-2 rounded-full border px-4 py-2 text-body-sm font-medium whitespace-nowrap transition-all ${
                    activeIndex === i
                      ? 'bg-accent text-accent-ink border-accent'
                      : 'bg-bg-card text-ink-70 border-line'
                  }`}
                >
                  <span className="h-4 w-4">{cap.icon}</span>
                  {cap.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Content panel */}
          <div
            id={`capability-panel-${active.id}`}
            role="tabpanel"
            aria-label={active.label}
            className="card p-6 md:p-8 lg:p-10 min-h-[480px] flex flex-col"
          >
            <div className="mb-6">
              <CapabilityVisual capability={active.id} />
            </div>

            <div className="mt-auto">
              <p className="text-eyebrow uppercase text-accent mb-3">
                {active.label}
              </p>
              <h3 className="text-display-md text-ink mb-4 text-balance">
                {active.label}
              </h3>
              <p className="text-body-lg text-ink-50 text-pretty max-w-[520px]">
                {active.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Icons (kapsül içinde küçük tab icon'ları) ── */

function ChevronRight({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

function WebsiteIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
    </svg>
  )
}
function AdsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11l18-8v18l-18-8" /><path d="M11 7v10" />
    </svg>
  )
}
function CreativeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l2 4 4 .5-3 3 .8 4.5L12 12l-3.8 2 .8-4.5-3-3 4-.5L12 2z" />
    </svg>
  )
}
function SeoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.5-4.5" />
    </svg>
  )
}
function FunnelIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4h18l-7 9v6l-4 2v-8L3 4z" />
    </svg>
  )
}
function CrmIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}
function AutomationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h.01a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.01a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  )
}
