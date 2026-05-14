import { IndustryLogos } from './mockups/IndustryLogos'

export function TrustBar() {
  return (
    <section className="border-y border-line-light bg-bg py-14 md:py-16">
      <div className="container-page">
        <p className="text-center text-caption font-medium text-ink-50 uppercase tracking-[0.12em] mb-10">
          Built by operators trusted by:
        </p>

        <div className="relative overflow-hidden mask-fade-x">
          <div className="flex items-center gap-16 md:gap-24 w-max animate-marquee">
            <IndustryLogos />
            <IndustryLogos />
          </div>
        </div>
      </div>
    </section>
  )
}
