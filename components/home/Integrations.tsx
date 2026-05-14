import Image from 'next/image'

const integrations = [
  { name: 'Google Ads', src: '/brand-logos/WebP/google_Ads.webp' },
  { name: 'Meta', src: '/brand-logos/WebP/Meta.webp' },
  { name: 'TikTok Ads', src: '/brand-logos/WebP/tiktokBusinessPartner.webp' },
  { name: 'LinkedIn Ads', src: '/brand-logos/WebP/LI-Logo.webp' },
  { name: 'HubSpot', src: '/brand-logos/WebP/HubSpot.webp' },
  { name: 'Salesforce', src: '/brand-logos/WebP/salesforce-with-type-logo.webp' },
  { name: 'Pipedrive', src: '/brand-logos/WebP/pipedrive.webp' },
  { name: 'Shopify', src: '/brand-logos/WebP/Shopify.webp' },
  { name: 'WordPress', src: '/brand-logos/WebP/WordPress.webp' },
  { name: 'Webflow', src: '/brand-logos/WebP/Webflow.webp' },
  { name: 'Stripe', src: '/brand-logos/WebP/Stripe.webp' },
  { name: 'GA4', src: '/brand-logos/WebP/googleAnalyticsPartner.webp' },
  { name: 'Search Console', src: '/brand-logos/WebP/googleSearch.webp' },
  { name: 'Calendly', src: '/brand-logos/WebP/Calendly.webp' },
]

export function Integrations() {
  return (
    <section className="section-tight border-y border-line-light">
      <div className="container-page">
        <h2 className="text-center text-h3 font-display text-ink mb-3">
          Connects to everything you already use.
        </h2>
        <p className="text-center text-body text-ink-50 mb-12 max-w-[480px] mx-auto">
          14 native integrations. Two-way sync. No middleware required.
        </p>

        <div className="relative overflow-hidden mask-fade-x">
          <div className="flex items-center gap-14 md:gap-20 w-max animate-marquee">
            {[...integrations, ...integrations].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0"
                title={logo.name}
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={120}
                  height={32}
                  className="h-7 md:h-8 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
