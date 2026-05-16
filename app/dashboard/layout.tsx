import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { LogoutButton } from './components/LogoutButton'
import { Sidebar } from './components/Sidebar'
import { MobileNav } from './components/MobileNav'

export const metadata = {
  title: 'Dashboard',
  description: 'Ordino operator dashboard',
  robots: { index: false, follow: false },
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const displayName = user?.email || 'Account'
  const initial = displayName.charAt(0).toUpperCase()

  return (
    <div className="relative min-h-screen bg-bg">
      {/* Soft brand backdrop — peach / lavender / mint, fading into bg */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] gradient-hero"
        aria-hidden="true"
      />

      <Sidebar />

      <div className="relative lg:pl-[72px]">
        <header className="border-b border-line/70 bg-bg/60 backdrop-blur-md sticky top-0 z-40">
          <div className="px-4 md:px-6 lg:px-8 h-14 flex items-center justify-between max-w-[1400px] mx-auto">
            <div className="flex items-center lg:hidden">
              <MobileNav />
              <Link href="/dashboard" className="flex items-center gap-2.5">
                <span className="font-display font-bold text-lg text-ink tracking-tight">
                  Ordino
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-4 ml-auto">
              <div className="hidden md:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-accent text-accent-ink flex items-center justify-center text-xs font-semibold shadow-soft">
                  {initial}
                </div>
                <span className="text-caption text-ink-50 truncate max-w-[200px] font-medium">
                  {displayName}
                </span>
              </div>
              <LogoutButton />
            </div>
          </div>
        </header>

        <main className="relative">{children}</main>
      </div>
    </div>
  )
}
