import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a 20-minute walkthrough or talk to our team. Ordino — The AI Growth Operating System.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <section className="section pt-24 md:pt-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-hero opacity-40" aria-hidden="true" />

      <div className="container-page">
        {/* Header */}
        <div className="max-w-[760px] mb-14 md:mb-16">
          <p className="text-eyebrow uppercase text-ink-50">Contact</p>
          <h1 className="mt-4 text-display-xl text-ink text-balance">
            Talk to our team.
          </h1>
          <p className="mt-6 text-body-lg text-ink-50 max-w-[560px] text-pretty">
            Book a 20-minute walkthrough or send us a note. We respond to every enquiry within one working day.
          </p>
        </div>

        {/* Form + Sidebar */}
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 max-w-[1100px]">
          {/* Form */}
          <ContactForm />

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Calendly placeholder */}
            <div className="card p-6">
              <p className="text-eyebrow uppercase text-ink-50 mb-3">Or book directly</p>
              <h3 className="text-h3 text-ink mb-2">20-minute walkthrough</h3>
              <p className="text-body-sm text-ink-50 mb-5">
                See Ordino running on a brand like yours. No slides.
              </p>

              {/* Calendly iframe placeholder — replace with real URL when ready */}
              <div className="aspect-[3/4] rounded-lg bg-bg-soft border border-line flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 gradient-mint opacity-50" aria-hidden="true" />
                <div className="relative z-10 text-center p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-bg-card border border-line mb-3">
                    <CalendarIcon />
                  </div>
                  <p className="text-body-sm font-semibold text-ink mb-1">Calendly embed</p>
                  <p className="text-caption text-ink-50 mb-4">
                    Replace this placeholder with your Calendly URL.
                  </p>
                  <a
                    href="mailto:sales@ordino.ai?subject=Demo%20request"
                    className="btn-secondary btn-sm"
                  >
                    Email to book
                  </a>
                </div>
              </div>
              {/* When ready, replace placeholder above with:
              <iframe
                src="https://calendly.com/your-account/intro"
                width="100%"
                height="500"
                frameBorder="0"
              />
              */}
            </div>

            {/* Email + address — brief: e-mail (sales@ordino.ai) */}
            <div className="card p-6 space-y-5">
              <div>
                <p className="text-eyebrow uppercase text-ink-50 mb-2">Email</p>
                <a
                  href="mailto:sales@ordino.ai"
                  className="text-body font-medium text-ink hover:text-accent transition-colors"
                >
                  sales@ordino.ai
                </a>
              </div>

              <div className="pt-5 border-t border-line">
                <p className="text-eyebrow uppercase text-ink-50 mb-2">Office</p>
                <address className="not-italic text-body-sm text-ink-70 leading-relaxed">
                  Ordino Technologies Ltd.<br />
                  20–22 Wenlock Road<br />
                  London N1 7GU<br />
                  United Kingdom
                </address>
              </div>

              <div className="pt-5 border-t border-line">
                <p className="text-eyebrow uppercase text-ink-50 mb-2">Response time</p>
                <p className="text-body-sm text-ink-70">
                  We respond to every enquiry within one working day. Demo requests get priority.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}
