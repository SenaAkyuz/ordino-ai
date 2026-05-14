import { Hero } from '@/components/home/Hero'
import { TrustBar } from '@/components/home/TrustBar'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Capabilities } from '@/components/home/Capabilities'
import { Industries } from '@/components/home/Industries'
import { WhyOrdino } from '@/components/home/WhyOrdino'
import { Integrations } from '@/components/home/Integrations'
import { Security } from '@/components/home/Security'
import { PricingTeaser } from '@/components/home/PricingTeaser'
import { FinalCTA } from '@/components/home/FinalCTA'
import { LiveInProduction } from '@/components/home/LiveInProduction'
import { WhyNow } from '@/components/home/WhyNow'
import { BeforeAfter } from '@/components/home/BeforeAfter'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ordino',
  alternateName: 'Ordino Technologies Ltd.',
  url: 'https://ordino.ai',
  logo: 'https://ordino.ai/icon-512.png',
  description:
    'The AI Growth Operating System for industries where one lead is worth millions.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '20–22 Wenlock Road',
    addressLocality: 'London',
    postalCode: 'N1 7GU',
    addressCountry: 'GB',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'sales@ordino.ai',
    areaServed: ['GB', 'EU'],
    availableLanguage: 'English',
  },
  foundingLocation: {
    '@type': 'Place',
    name: 'London, United Kingdom',
  },
  knowsAbout: [
    'AI marketing automation',
    'Growth infrastructure',
    'High-ticket sales',
    'Multi-channel advertising',
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <LiveInProduction />
      <Capabilities />
      <BeforeAfter />
      <Industries />
      <WhyNow />
      <WhyOrdino />
      <Integrations />
      <Security />
      <PricingTeaser />
      <FinalCTA />
    </>
  )
}
