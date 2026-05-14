'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const navItems = [
  { label: 'Product', href: '/product' },
  { label: 'Industries', href: '/industries' },
  { label: 'Pricing', href: '/contact' },
  { label: 'About', href: '/about' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'border-b border-line bg-bg/80 backdrop-blur-md'
          : 'border-b border-transparent bg-bg'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Ordino home">
          <Image
            src="/ordino-logo-black.webp"
            alt="Ordino"
            width={110}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-[14px] font-medium text-ink-70 transition-colors hover:bg-bg-soft hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2">
          <a
            href="https://app.ordino.ai"
            className="hidden text-[14px] font-medium text-ink-70 transition-colors hover:text-ink md:block px-3 py-1.5"
          >
            Sign in
          </a>
          <Link href="/contact" className="btn-primary btn-sm">
            Book a Demo
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-70 hover:bg-bg-soft md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-line bg-bg md:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-md px-3 py-2.5 text-[15px] font-medium text-ink-70 hover:bg-bg-soft hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://app.ordino.ai"
              className="rounded-md px-3 py-2.5 text-[15px] font-medium text-ink-70 hover:bg-bg-soft hover:text-ink"
            >
              Sign in
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
