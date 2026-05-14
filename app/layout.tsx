import type { Metadata, Viewport } from 'next'
import { inter, interTight, jetbrainsMono } from '@/lib/fonts'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://ordino.ai'),
  title: {
    default: 'Ordino — The AI Growth Operating System',
    template: '%s — Ordino',
  },
  description:
    'Built for industries where one lead is worth millions. AI growth infrastructure for yacht, luxury property, law firms, clinics, hotels, and wealth advisory — across Google, Meta, LinkedIn and TikTok, 24/7.',
  keywords: [
    'AI growth platform',
    'autonomous marketing',
    'high-ticket marketing',
    'AI media buyer',
    'yacht marketing',
    'luxury real estate marketing',
    'law firm marketing',
    'premium clinic marketing',
    'boutique hotel marketing',
    'wealth advisory marketing',
  ],
  authors: [{ name: 'Ordino Technologies Ltd.' }],
  creator: 'Ordino Technologies Ltd.',
  publisher: 'Ordino Technologies Ltd.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://ordino.ai',
    siteName: 'Ordino',
    title: 'Ordino — The AI Growth Operating System',
    description:
      'Built for industries where one lead is worth millions. AI growth infrastructure across Google, Meta, LinkedIn and TikTok — 24/7.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ordino — The AI Growth Operating System',
    description:
      'Built for industries where one lead is worth millions. AI growth infrastructure — 24/7.',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: '#FAFAF7',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bg text-ink antialiased">
        {/* Skip to content (a11y) */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
