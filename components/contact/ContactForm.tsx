'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import Script from 'next/script'

const industries = [
  { value: '', label: 'Select industry' },
  { value: 'yacht', label: 'Yacht Sales & Charter' },
  { value: 'real-estate', label: 'Luxury Real Estate' },
  { value: 'law', label: 'Law Firms' },
  { value: 'clinics', label: 'Premium Clinics' },
  { value: 'hotels', label: 'Boutique Hotels & Villas' },
  { value: 'wealth', label: 'Wealth & Advisory' },
  { value: 'other', label: 'Other' },
]

const adSpends = [
  { value: '', label: 'Select monthly ad spend' },
  { value: '<10k', label: 'Under £10,000' },
  { value: '10k-50k', label: '£10,000 – £50,000' },
  { value: '50k-100k', label: '£50,000 – £100,000' },
  { value: '100k-500k', label: '£100,000 – £500,000' },
  { value: '500k+', label: 'Over £500,000' },
]

type Status = 'idle' | 'loading' | 'success' | 'error'

// Turnstile global API type
declare global {
  interface Window {
    turnstile?: {
      render: (selector: string | HTMLElement, options: TurnstileOptions) => string
      execute: (widgetId: string, options?: { action?: string }) => Promise<string>
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
      getResponse: (widgetId: string) => string | undefined
    }
    onTurnstileLoad?: () => void
  }
}

interface TurnstileOptions {
  sitekey: string
  size?: 'normal' | 'compact' | 'invisible' | 'flexible'
  callback?: (token: string) => void
  'error-callback'?: () => void
  'expired-callback'?: () => void
  action?: string
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const turnstileContainerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const [turnstileReady, setTurnstileReady] = useState(false)

  // Initialize Turnstile widget once the script + DOM are ready
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return // Graceful: no widget if key not set

    let cancelled = false
    const tryRender = () => {
      if (cancelled) return
      if (window.turnstile && turnstileContainerRef.current && !widgetIdRef.current) {
        try {
          widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            size: 'invisible',
          })
          setTurnstileReady(true)
        } catch (err) {
          console.error('[Turnstile] Render failed:', err)
        }
      } else if (!window.turnstile) {
        // Script not loaded yet, retry
        setTimeout(tryRender, 200)
      }
    }
    tryRender()

    return () => {
      cancelled = true
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current)
        } catch {
          /* noop */
        }
        widgetIdRef.current = null
      }
    }
  }, [])

  async function getTurnstileToken(): Promise<string> {
    if (!TURNSTILE_SITE_KEY || !widgetIdRef.current || !window.turnstile) {
      return '' // No Turnstile configured — server will skip verification
    }
    try {
      const token = await window.turnstile.execute(widgetIdRef.current, { action: 'contact-form' })
      return token
    } catch (err) {
      console.warn('[Turnstile] Execute failed:', err)
      return ''
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)
    const turnstileToken = await getTurnstileToken()

    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      company: String(formData.get('company') || ''),
      industry: String(formData.get('industry') || ''),
      adSpend: String(formData.get('adSpend') || ''),
      message: String(formData.get('message') || ''),
      turnstileToken,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string }
        throw new Error(data.error || 'Submit failed')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please email sales@ordino.ai directly.'
      )

      // Reset Turnstile so user can retry
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetIdRef.current)
        } catch {
          /* noop */
        }
      }
    }
  }

  if (status === 'success') {
    return <SuccessState />
  }

  return (
    <>
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
        />
      )}

      <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Name" htmlFor="name" required>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength={100}
              placeholder="James Whitfield"
              className="form-input"
            />
          </FormField>

          <FormField label="Work email" htmlFor="email" required>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={200}
              placeholder="james@brokerage.com"
              className="form-input"
            />
          </FormField>
        </div>

        <FormField label="Company" htmlFor="company" required>
          <input
            id="company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            maxLength={200}
            placeholder="Royal Maritime Brokers"
            className="form-input"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField label="Industry" htmlFor="industry" required>
            <select id="industry" name="industry" required className="form-input" defaultValue="">
              {industries.map(opt => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                  {opt.label}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Monthly ad spend" htmlFor="adSpend" required>
            <select id="adSpend" name="adSpend" required className="form-input" defaultValue="">
              {adSpends.map(opt => (
                <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                  {opt.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label="Message" htmlFor="message" optional>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={5000}
            placeholder="Tell us about your current setup, channels, and what you'd like to improve."
            className="form-input resize-none"
          />
        </FormField>

        {/* Turnstile invisible widget (renders nothing visible) */}
        <div ref={turnstileContainerRef} aria-hidden="true" />

        {status === 'error' && (
          <div className="rounded-lg bg-[#FEF3F2] border border-[#FECDCA] px-4 py-3 text-body-sm text-[#B42318]">
            {errorMsg}
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary w-full sm:w-auto"
          >
            {status === 'loading' ? (
              <>
                <Spinner />
                Sending…
              </>
            ) : (
              <>
                Send message
                <ArrowRight />
              </>
            )}
          </button>

          <p className="mt-4 text-caption text-ink-50">
            By submitting, you agree we may contact you about Ordino. We respond within one working day.
            {TURNSTILE_SITE_KEY && ' Protected by Cloudflare Turnstile.'}
          </p>
        </div>
      </form>
    </>
  )
}

function FormField({
  label,
  htmlFor,
  required,
  optional,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-caption font-semibold text-ink-70 mb-1.5"
      >
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
        {optional && <span className="text-ink-30 font-normal ml-1.5">(optional)</span>}
      </label>
      {children}
    </div>
  )
}

function SuccessState() {
  return (
    <div className="card p-10 md:p-14 text-center">
      <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-success-bg mb-6">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-success" aria-hidden="true">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <h3 className="text-display-md text-ink mb-3 text-balance">
        Got it. Talk soon.
      </h3>
      <p className="text-body-lg text-ink-50 max-w-[420px] mx-auto">
        We received your message and will respond within one working day. Demo requests are prioritised.
      </p>
    </div>
  )
}

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="animate-spin" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
      <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
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
