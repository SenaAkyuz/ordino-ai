'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { StepVisual } from './mockups/StepVisual'

const steps = [
  {
    number: '01',
    title: 'Connect',
    description: 'Plug in your website, ad accounts, and CRM. Ordino reads your funnel in minutes.',
  },
  {
    number: '02',
    title: 'Diagnose',
    description: 'Ordino audits your site, your campaigns, and your pipeline. You see exactly what’s leaking revenue.',
  },
  {
    number: '03',
    title: 'Operate',
    description: 'Ordino runs ads, writes copy, builds landing pages, and routes leads — across every channel — autonomously.',
  },
  {
    number: '04',
    title: 'Compound',
    description: 'Every result feeds the system. Each week, your CPA goes down and your win rate goes up.',
  },
]

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) setActiveStep(index)
          }
        })
      },
      {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
      }
    )

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="how-it-works" className="section relative">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-[680px] text-center mb-16 md:mb-20">
          <p className="text-eyebrow uppercase text-ink-50">How it works</p>
          <h2 className="mt-4 text-display-lg text-ink text-balance">
            From your stack to scaled growth, in four steps.
          </h2>
        </div>

        {/* Sticky scroll layout */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20">
          {/* Sol: Step cards */}
          <div className="space-y-32 lg:space-y-56">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => {
                  stepRefs.current[i] = el
                }}
                className="min-h-[40vh] flex flex-col justify-center"
              >
                <div
                  className={`transition-all duration-500 ease-out ${
                    activeStep === i ? 'opacity-100' : 'lg:opacity-35'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-lg font-display font-bold text-[14px] tabular transition-all duration-500 ${
                        activeStep === i
                          ? 'bg-accent text-accent-ink'
                          : 'bg-bg-soft text-ink-50'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span className="text-caption font-semibold tracking-[0.12em] uppercase text-ink-50">
                      Step {i + 1}
                    </span>
                  </div>

                  <h3 className="text-display-md text-ink mb-4">
                    {step.title}
                  </h3>

                  <p className="text-body-lg text-ink-50 max-w-[480px] text-pretty">
                    {step.description}
                  </p>
                </div>

                {/* Mobile visual — her step kartının altında */}
                <div className="lg:hidden mt-8">
                  <StepVisual step={i} />
                </div>
              </div>
            ))}
          </div>

          {/* Sağ: Sticky visual (desktop only) */}
          <div className="hidden lg:block relative">
            <div className="sticky top-32 h-[60vh] flex items-center justify-center">
              <div className="w-full">
                <StepVisual step={activeStep} />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-24 md:mt-32">
          <Link href="/contact" className="btn-primary">
            See it on your business
            <ArrowRightIcon />
          </Link>
          <p className="mt-4 text-caption text-ink-50">
            Book a Demo · 20 minutes · No commitment
          </p>
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
