import Link from 'next/link'
import { Pill } from '@/components/ui/Pill'
import { HeroDashboard } from './mockups/HeroDashboard'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft gradient background — brief: peach / lavender, white on top */}
      <div className="absolute inset-0 -z-10 gradient-hero" aria-hidden="true" />

      <div className="container-page pt-16 md:pt-24 lg:pt-28 pb-20 md:pb-28">
        {/* Hero text — centered */}
        <div className="mx-auto max-w-[760px] text-center">
          <Pill className="mb-8">
            Live in London · £300K+ in annual media spend already running through Ordino
          </Pill>

          <h1 className="text-display-xl text-ink text-balance">
            The AI Growth Operating System.
          </h1>

          <p className="mx-auto mt-7 max-w-[560px] text-body-lg text-ink-50 text-pretty">
            Connect your site, ads, and CRM. Ordino runs growth on its own — across Google, Meta, LinkedIn and TikTok — 24/7.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/contact" className="btn-primary">
              Book a Demo
              <ArrowRightIcon />
            </Link>
            <Link href="#how-it-works" className="btn-secondary">
              See how it works
            </Link>
          </div>
        </div>

        {/* Dashboard mockup — Gumloop tarzı katmanlı pencereler */}
        <div className="mt-16 md:mt-24 mx-auto max-w-[1100px]">
          <HeroDashboard />
        </div>
      </div>
    </section>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}
