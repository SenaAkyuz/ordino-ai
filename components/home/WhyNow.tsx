const points = [
  {
    number: '01',
    title: 'Fragmentation is the default',
    description:
      'The average growth team operates across 7+ disconnected tools — Google, Meta, LinkedIn, TikTok, HubSpot, GA4, SEO suites. None of them talk to each other.',
  },
  {
    number: '02',
    title: 'CAC is rising, attribution is broken',
    description:
      'Post-iOS 14.5 and post-cookie, the manual media buyer is flying blind. Spend keeps going up, signal keeps going down.',
  },
  {
    number: '03',
    title: 'Marketing teams are overloaded',
    description:
      'Optimisation is still mostly manual — bid changes, audience swaps, creative rotations. Humans cannot keep up with the surface area.',
  },
  {
    number: '04',
    title: 'AI is replacing the manual media buyer',
    description:
      'Generative AI and reinforcement learning have made autonomous media buying finally viable. The question is no longer if — it’s who builds the operating system.',
  },
  {
    number: '05',
    title: 'AI-native growth infrastructure is the next category',
    description:
      'Not another dashboard. Not another agency. A single brain that connects ads, CRM, attribution and creative.',
  },
]

export function WhyNow() {
  return (
    <section className="section relative">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-[760px] text-center mb-14 md:mb-16">
          <p className="text-eyebrow uppercase text-ink-50">Why now</p>
          <h2 className="mt-4 text-display-lg text-ink text-balance">
            Marketing teams are running on duct tape. We built the operating system.
          </h2>
        </div>

        {/* 5 items — Why Ordino numbered card style (vertical divider, no box) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-6 lg:gap-x-10 max-w-[1100px] mx-auto">
          {points.map(point => (
            <div
              key={point.number}
              className="relative flex flex-col gap-5 md:border-l md:border-line md:pl-8 [&:nth-child(3n+1)]:md:border-l-0 [&:nth-child(3n+1)]:md:pl-0"
            >
              <span className="font-mono text-caption text-ink-30 tabular">
                {point.number}
              </span>
              <h3 className="text-display-md text-ink text-balance">
                {point.title}
              </h3>
              <p className="text-body-lg text-ink-50 text-pretty">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Closing line */}
        <p className="text-center mt-14 md:mt-16 text-body-lg text-ink-70 text-pretty max-w-[640px] mx-auto font-medium">
          Ordino is building the AI Growth Operating System for that moment.
        </p>
      </div>
    </section>
  )
}
