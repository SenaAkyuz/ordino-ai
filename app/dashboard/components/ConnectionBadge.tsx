export function ConnectionBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-pill bg-warning-bg border border-warning/40 px-2.5 py-1">
      <span className="relative inline-flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-warning opacity-60 animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-warning" />
      </span>
      <span className="text-eyebrow font-medium text-[#B54708] uppercase">
        Hesap bağlanacak
      </span>
    </div>
  )
}
