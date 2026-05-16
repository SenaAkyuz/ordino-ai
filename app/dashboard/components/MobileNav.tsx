'use client'

import Link from 'next/link'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import {
  navItems,
  useSectionNav,
  ReportsIcon,
  SettingsIcon,
} from './nav-config'

// Hydration-safe client check (no setState-in-effect). The drawer is
// portaled to <body> so it escapes the dashboard header's backdrop-filter,
// which would otherwise be the containing block for its `position: fixed`.
const emptySubscribe = () => () => {}

export function MobileNav() {
  const { pathname, handleNav } = useSectionNav()
  const [open, setOpen] = useState(false)

  // Close the drawer on route change (e.g. browser back/forward while open).
  // Reset during render rather than in an effect — the React-recommended
  // pattern for resetting state when a value changes.
  const [prevPath, setPrevPath] = useState(pathname)
  if (pathname !== prevPath) {
    setPrevPath(pathname)
    setOpen(false)
  }

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  const close = () => setOpen(false)

  const onReportsActive = pathname?.startsWith('/dashboard/reports')

  return (
    <>
      {/* Hamburger trigger — mobile/tablet only, lives in the dashboard header */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="-ml-1 mr-1 inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-70 hover:bg-bg-soft lg:hidden"
        aria-label="Menüyü aç"
        aria-expanded={open}
        aria-controls="dashboard-mobile-drawer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
        </svg>
      </button>

      {/* Drawer — portaled to <body> so the header's backdrop-filter
          doesn't become its containing block and clip it. */}
      {isClient &&
        createPortal(
          <div
            className={`fixed inset-0 z-[60] lg:hidden ${
              open ? '' : 'pointer-events-none'
            }`}
            aria-hidden={!open}
          >
        {/* Scrim */}
        <div
          onClick={close}
          className={`absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Panel */}
        <aside
          id="dashboard-mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Dashboard navigasyonu"
          className={`absolute left-0 top-0 bottom-0 w-[270px] max-w-[80vw] bg-accent flex flex-col py-5 transition-transform duration-300 ease-out ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Header: logo + close */}
          <div className="flex items-center justify-between px-5 mb-7">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-display font-bold text-white text-base tracking-tight">
                O
              </div>
              <span className="font-display font-bold text-white text-lg tracking-tight">
                Ordino
              </span>
            </div>
            <button
              type="button"
              onClick={close}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-white/60 hover:text-white hover:bg-white/10"
              aria-label="Menüyü kapat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-3 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.scrollTo ? `/dashboard#${item.scrollTo}` : '/dashboard'}
                onClick={(e) => {
                  handleNav(e, item.scrollTo)
                  close()
                }}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <span className="flex-none w-5 flex items-center justify-center">
                  <item.icon />
                </span>
                {item.label}
              </Link>
            ))}

            <div className="h-px bg-white/10 my-3 mx-3" />

            <Link
              href="/dashboard/reports"
              onClick={close}
              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium transition-colors ${
                onReportsActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="flex-none w-5 flex items-center justify-center">
                <ReportsIcon />
              </span>
              Reports
            </Link>
          </nav>

          {/* Settings (placeholder) */}
          <div className="px-3 mt-2">
            <button
              type="button"
              onClick={() => {
                alert('Ayarlar Phase 2\'de aktif olacak.')
                close()
              }}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-white/45 hover:text-white/70 hover:bg-white/10 transition-colors"
            >
              <span className="flex-none w-5 flex items-center justify-center">
                <SettingsIcon />
              </span>
              Settings · Yakında
            </button>
          </div>
        </aside>
          </div>,
          document.body,
        )}
    </>
  )
}
