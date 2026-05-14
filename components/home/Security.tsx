const securityItems = [
  {
    kind: 'badge' as const,
    title: 'SOC 2 Type II',
    status: 'In progress',
    statusVariant: 'pending' as const,
    description: 'Independent audit underway. Type II report targeted for 2026. Documentation available under NDA.',
    badge: 'SOC2',
  },
  {
    kind: 'badge' as const,
    title: 'GDPR Compliant',
    status: 'Active',
    statusVariant: 'success' as const,
    description: 'Full Article 28 DPA, data subject rights, breach notifications, and DPO contact on request.',
    badge: 'GDPR',
  },
  {
    kind: 'badge' as const,
    title: 'ICO Registered (UK)',
    status: 'Active',
    statusVariant: 'success' as const,
    description: 'Registered with the UK Information Commissioner’s Office. Registration number on request.',
    badge: 'ICO',
  },
  {
    kind: 'feature' as const,
    title: 'Data residency: EU/UK',
    description: 'Your customer data stays within UK and EU jurisdictions. No cross-border transfers without explicit consent.',
    icon: <ShieldIcon />,
  },
  {
    kind: 'feature' as const,
    title: 'No third-party model training',
    description: 'Your data is never used to train external AI models. Zero data retention agreements with every model provider.',
    icon: <NoTrainingIcon />,
  },
  {
    kind: 'feature' as const,
    title: 'Role-based access',
    description: 'Granular permissions, scoped credentials, full audit trails. SSO and SCIM available on Enterprise.',
    icon: <AccessIcon />,
  },
]

type SecurityItem = (typeof securityItems)[number]

export function Security() {
  return (
    <section id="security" className="section">
      <div className="container-page">
        {/* Header */}
        <div className="mx-auto max-w-[720px] text-center mb-14 md:mb-16">
          <p className="text-eyebrow uppercase text-ink-50">Security &amp; trust</p>
          <h2 className="mt-4 text-display-lg text-ink text-balance">
            Enterprise-grade infrastructure, built in.
          </h2>
          <p className="mt-5 text-body-lg text-ink-50 text-pretty">
            We sell to industries where one customer record is worth millions. Security is not a tier.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 max-w-[1100px] mx-auto">
          {securityItems.map((item, i) => (
            <SecurityCard key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Card ── */

function SecurityCard({ item }: { item: SecurityItem }) {
  return (
    <div className="card card-hover p-7 flex flex-col gap-5">
      <div className="flex items-start justify-between">
        {item.kind === 'badge' ? (
          <CertBadge label={item.badge} />
        ) : (
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
            {item.icon}
          </span>
        )}

        {item.kind === 'badge' && (
          <StatusPill variant={item.statusVariant}>{item.status}</StatusPill>
        )}
      </div>

      <div>
        <h3 className="text-h3 text-ink mb-2">{item.title}</h3>
        <p className="text-body text-ink-50 text-pretty">{item.description}</p>
      </div>
    </div>
  )
}

/* ── Certification badge ── */

function CertBadge({ label }: { label: string }) {
  const colors: Record<string, { bg: string; ring: string; text: string }> = {
    SOC2: { bg: 'bg-accent-soft', ring: 'ring-accent/30', text: 'text-accent' },
    GDPR: { bg: 'bg-[#EEF2FF]', ring: 'ring-[#4F46E5]/30', text: 'text-[#3730A3]' },
    ICO: { bg: 'bg-bg-soft', ring: 'ring-ink/15', text: 'text-ink-70' },
  }
  const c = colors[label] ?? colors.SOC2

  return (
    <div className={`relative flex h-14 w-14 items-center justify-center rounded-full ${c.bg} ring-2 ${c.ring} ring-offset-2 ring-offset-bg-card`}>
      <span className={`font-display font-bold text-[13px] tracking-tight ${c.text}`}>
        {label}
      </span>
    </div>
  )
}

/* ── Status pill ── */

function StatusPill({
  variant,
  children,
}: {
  variant: 'success' | 'pending'
  children: React.ReactNode
}) {
  const styles = {
    success: 'bg-success-bg text-success',
    pending: 'bg-warning-bg text-warning',
  }
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[11px] font-semibold ${styles[variant]}`}>
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-current opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {children}
    </span>
  )
}

/* ── Icons ── */

function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
function NoTrainingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <path d="M5 5l14 14" />
    </svg>
  )
}
function AccessIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}
