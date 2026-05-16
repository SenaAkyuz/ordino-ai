'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { id: 'overview', label: 'Overview', icon: HomeIcon, scrollTo: null as string | null },
  { id: 'google-ads', label: 'Google Ads', icon: GoogleIcon, scrollTo: 'google-ads' },
  { id: 'meta-ads', label: 'Meta Ads', icon: MetaIcon, scrollTo: 'meta-ads' },
  { id: 'instagram', label: 'Instagram', icon: InstagramIcon, scrollTo: 'instagram' },
  { id: 'linkedin', label: 'LinkedIn', icon: LinkedInIcon, scrollTo: 'linkedin' },
]

export function Sidebar() {
  const pathname = usePathname()

  // Section anchors only exist on the main /dashboard page. When already
  // there, smooth-scroll in place; otherwise let the <Link> navigate to
  // /dashboard[#section] (Next handles the anchor jump + scroll-mt offset).
  const onDashboard = pathname === '/dashboard'

  const handleNav = (e: React.MouseEvent, scrollTo: string | null) => {
    if (!onDashboard) return // let the Link navigate

    e.preventDefault()
    if (!scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.getElementById(scrollTo)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const handleSettingsClick = () => {
    alert('Ayarlar Phase 2\'de aktif olacak.')
  }

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[72px] bg-accent flex-col items-center py-5 z-50">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-display font-bold text-white text-lg tracking-tight">
          O
        </div>
      </div>

      {/* Nav icons */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.scrollTo ? `/dashboard#${item.scrollTo}` : '/dashboard'}
            onClick={(e) => handleNav(e, item.scrollTo)}
            className="group relative w-11 h-11 rounded-xl flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
            title={item.label}
          >
            <item.icon />
            <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-ink text-white text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
              {item.label}
            </span>
          </Link>
        ))}

        {/* Separator */}
        <div className="w-8 h-px bg-white/10 my-2 mx-auto" />

        {/* Reports */}
        <Link
          href="/dashboard/reports"
          className={`group relative w-11 h-11 rounded-xl flex items-center justify-center transition-all ${
            pathname?.startsWith('/dashboard/reports')
              ? 'bg-white/20 text-white'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
          title="Reports"
        >
          <ReportsIcon />
          <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-ink text-white text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
            Reports
          </span>
        </Link>
      </nav>

      {/* Settings (placeholder) */}
      <button
        onClick={handleSettingsClick}
        className="group relative w-11 h-11 rounded-xl flex items-center justify-center text-white/40 hover:text-white/60 hover:bg-white/10 transition-colors"
        title="Settings"
      >
        <SettingsIcon />
        <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-ink text-white text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap transition-opacity z-50">
          Settings · Yakında
        </span>
      </button>
    </aside>
  )
}

function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 12L12 4l9 8M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC04" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function MetaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7c4.6-.8 8.4-4.8 8.4-9.9z"
        fill="#0866FF"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="#E1306C" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="#E1306C" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
        fill="#0A66C2"
      />
    </svg>
  )
}

function ReportsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6M8 13h4M8 17h6M8 9h2"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  )
}
