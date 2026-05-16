'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const APP_ROUTES = ['/login', '/dashboard']

export function ConditionalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isAppRoute = APP_ROUTES.some((route) => pathname?.startsWith(route))

  if (isAppRoute) {
    return (
      <main id="main" className="flex-1">
        {children}
      </main>
    )
  }

  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  )
}
