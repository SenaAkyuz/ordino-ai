import { cn } from '@/lib/utils'

interface PillProps {
  children: React.ReactNode
  className?: string
  showDot?: boolean
}

export function Pill({ children, className, showDot = true }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-pill border border-line bg-bg-card px-3 py-1.5 text-[13px] font-medium text-ink-70 shadow-soft',
        className
      )}
    >
      {showDot && (
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      )}
      {children}
    </span>
  )
}
