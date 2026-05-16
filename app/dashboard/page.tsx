import { createClient } from '@/utils/supabase/server'
import { PageHeader } from './components/PageHeader'
import { OverviewSection } from './components/OverviewSection'
import { GoogleAdsSection } from './sections/GoogleAdsSection'
import { MetaAdsSection } from './sections/MetaAdsSection'
import { InstagramSection } from './sections/InstagramSection'
import { LinkedInSection } from './sections/LinkedInSection'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="px-4 md:px-6 lg:px-8 py-8 md:py-10 max-w-[1400px] mx-auto">
      <PageHeader userName={user?.email || 'admin'} />

      <OverviewSection />

      <GoogleAdsSection />
      <MetaAdsSection />
      <InstagramSection />
      <LinkedInSection />
    </div>
  )
}
