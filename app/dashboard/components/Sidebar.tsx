'use client'

import Link from 'next/link'
import {
  navItems,
  useSectionNav,
  ReportsIcon,
  SettingsIcon,
} from './nav-config'

export function Sidebar() {
  const { pathname, handleNav } = useSectionNav()

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
