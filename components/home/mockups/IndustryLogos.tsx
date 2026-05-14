export function IndustryLogos() {
  return (
    <>
      {/* Yacht / Charter */}
      <LogoWordmark icon={<WaveIcon />} name="ROYAL MARITIME" />

      {/* Luxury Real Estate */}
      <LogoWordmark icon={<BuildingIcon />} name="PRIME ESTATES" />

      {/* Law Firm */}
      <LogoWordmark icon={<ScalesIcon />} name="BLACKSTONE LEGAL" />

      {/* Premium Clinic */}
      <LogoWordmark icon={<PlusIcon />} name="MERIDIAN CLINIC" />

      {/* Boutique Hotel */}
      <LogoWordmark icon={<DiamondIcon />} name="AURELIA HOTELS" />

      {/* Wealth & Advisory */}
      <LogoWordmark icon={<CrestIcon />} name="WESTBURY WEALTH" />
    </>
  )
}

function LogoWordmark({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-2.5 text-ink-30 hover:text-ink-50 transition-colors duration-300">
      <div className="opacity-80">{icon}</div>
      <span className="font-display font-bold text-[15px] tracking-[0.18em] whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

/* ── Logo Icons (sahte ama gerçekçi) ── */

function WaveIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0 2 0 2 0" />
      <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0 2 0 2 0" opacity="0.5" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M9 13h.01M9 17h.01M14 9h.01M14 13h.01M14 17h.01" />
    </svg>
  )
}

function ScalesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v18M5 21h14M6 8l-3 6c0 1.66 1.34 3 3 3s3-1.34 3-3l-3-6zm12 0l-3 6c0 1.66 1.34 3 3 3s3-1.34 3-3l-3-6z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  )
}

function DiamondIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 3h12l3 6-9 12L3 9l3-6zM9 3l3 6 3-6M3 9h18" />
    </svg>
  )
}

function CrestIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
