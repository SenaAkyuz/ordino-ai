import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      <div className="container-page py-16 md:py-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-12">
          {/* SOL — Marka */}
          <div className="col-span-2 md:col-span-4">
            <Link href="/" aria-label="Ordino home">
              <Image
                src="/ordino-logo-black.webp"
                alt="Ordino"
                width={120}
                height={28}
                className="h-7 w-auto"
              />
            </Link>
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-ink-50">
              The AI Growth Operating System.
              <br />
              Built in London.
            </p>
            <address className="mt-5 not-italic text-[13px] leading-relaxed text-ink-50">
              20–22 Wenlock Road
              <br />
              London N1 7GU
            </address>
          </div>

          {/* ORTA — Link kolonları */}
          <FooterCol
            title="Product"
            links={[
              { label: 'Overview', href: '/product' },
              { label: 'Pricing', href: '/contact' },
              { label: 'Book a Demo', href: '/contact' },
            ]}
            className="md:col-span-2"
          />

          <FooterCol
            title="Industries"
            links={[
              { label: 'Yacht & Charter', href: '/industries#yacht' },
              { label: 'Real Estate', href: '/industries#real-estate' },
              { label: 'Law Firms', href: '/industries#law' },
              { label: 'Clinics', href: '/industries#clinics' },
              { label: 'Hotels & Villas', href: '/industries#hotels' },
            ]}
            className="md:col-span-2"
          />

          <FooterCol
            title="Company"
            links={[
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ]}
            className="md:col-span-2"
          />

          <FooterCol
            title="Legal"
            links={[
              { label: 'Privacy', href: '/legal/privacy' },
              { label: 'Terms', href: '/legal/terms' },
              { label: 'DPA', href: '/legal/dpa' },
            ]}
            className="md:col-span-2"
          />
        </div>

        {/* Alt şerit */}
        <div className="mt-16 flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-[13px] text-ink-50">
              © 2026 Ordino Technologies Ltd. Registered in England &amp; Wales.
            </p>
            <p className="text-[12px] text-ink-30">
              ICO Registered (UK) · GDPR Compliant
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sosyal */}
            <SocialLink href="https://x.com/ordino_ai" label="Ordino on X">
              <XIcon />
            </SocialLink>
            <SocialLink href="https://linkedin.com/company/ordino" label="Ordino on LinkedIn">
              <LinkedInIcon />
            </SocialLink>

            {/* Dil seçici */}
            <button
              type="button"
              className="ml-2 inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-[12px] font-medium text-ink-70 hover:border-line-strong"
              aria-label="Change language"
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
  className = '',
}: {
  title: string
  links: { label: string; href: string }[]
  className?: string
}) {
  return (
    <div className={className}>
      <h4 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-70">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[14px] text-ink-50 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-70 transition-colors hover:border-line-strong hover:text-ink"
    >
      {children}
    </a>
  )
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  )
}
