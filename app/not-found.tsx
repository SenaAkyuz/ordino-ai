import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you’re looking for doesn’t exist.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="min-h-[calc(100vh-200px)] flex items-center justify-center section relative overflow-hidden">
      <div className="absolute inset-0 -z-10 gradient-mint opacity-40" aria-hidden="true" />

      <div className="container-page">
        <div className="mx-auto max-w-[640px] text-center">
          {/* Big 404 */}
          <div className="font-display font-bold text-[120px] md:text-[160px] leading-none tabular text-ink mb-4">
            404
          </div>

          <h1 className="text-display-md text-ink mb-5 text-balance">
            This page doesn’t exist.
          </h1>

          <p className="text-body-lg text-ink-50 mb-10 text-pretty max-w-[440px] mx-auto">
            The link you followed may be broken, or the page may have been removed. Let’s get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn-primary">
              Back to home
              <ArrowRight />
            </Link>
            <Link href="/product" className="btn-secondary">
              See the product
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-line">
            <p className="text-caption text-ink-50 mb-3">Or jump to:</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 justify-center text-body-sm">
              <Link href="/industries" className="text-ink-70 hover:text-accent transition-colors">
                Industries
              </Link>
              <Link href="/about" className="text-ink-70 hover:text-accent transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-ink-70 hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
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
