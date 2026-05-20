type Platform = 'google' | 'meta' | 'instagram' | 'linkedin'

const platformLinks: Record<Platform, { name: string; url: string }> = {
  google: { name: 'Google Ads', url: 'https://ads.google.com' },
  meta: { name: 'Meta Ads Manager', url: 'https://business.facebook.com/adsmanager' },
  instagram: { name: 'Instagram', url: 'https://instagram.com' },
  linkedin: { name: 'LinkedIn', url: 'https://linkedin.com/company' },
}

export function SectionHeader({
  platform,
  title,
}: {
  platform: Platform
  title: string
}) {
  const link = platformLinks[platform]

  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
      <div className="flex items-center gap-3">
        <PlatformIcon platform={platform} />
        <h2 className="font-display font-bold text-h3 md:text-2xl text-ink tracking-tight">
          {title}
        </h2>
      </div>
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-caption font-medium text-ink-50 hover:text-accent transition-colors inline-flex items-center gap-1.5"
      >
        Open in {link.name}
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M6 3.5h6.5V10M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </a>
    </div>
  )
}

function PlatformIcon({ platform }: { platform: Platform }) {
  return (
    <div className="w-10 h-10 rounded-xl bg-bg-card border border-line flex items-center justify-center shadow-soft">
      {platform === 'google' && (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC04" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
      )}
      {platform === 'meta' && (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7c4.6-.8 8.4-4.8 8.4-9.9z" fill="#0866FF" />
        </svg>
      )}
      {platform === 'instagram' && (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" stroke="#E1306C" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="#E1306C" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="#E1306C" />
        </svg>
      )}
      {platform === 'linkedin' && (
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" fill="#0A66C2" />
        </svg>
      )}
    </div>
  )
}
