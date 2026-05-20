import { createClient } from '@/utils/supabase/server'
import { PageHeader } from './components/PageHeader'
import { OverviewSection } from './components/OverviewSection'
import { GoogleAdsSection } from './sections/GoogleAdsSection'
import { MetaAdsSection } from './sections/MetaAdsSection'
import { InstagramSection } from './sections/InstagramSection'
import { LinkedInSection } from './sections/LinkedInSection'

type DashboardRange = 7 | 30 | 60

function parseRange(value: string | undefined): DashboardRange {
  if (value === '7') return 7
  if (value === '60') return 60
  return 30
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const params = await searchParams
  const range = parseRange(params.range)

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="px-4 md:px-6 lg:px-8 py-8 md:py-10 max-w-[1400px] mx-auto">
      <PageHeader userName={user?.email || 'admin'} currentRange={range} />

      <OverviewSection />

      <GoogleAdsSection range={range} />
      <MetaAdsSection />
      <InstagramSection />
      <LinkedInSection />
    </div>
  )
}
