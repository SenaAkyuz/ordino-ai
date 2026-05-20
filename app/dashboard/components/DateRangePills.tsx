import Link from 'next/link'

type Props = {
  currentRange: 7 | 30 | 60
}

const OPTIONS = [
  { days: 7, label: 'Last 7 days' },
  { days: 30, label: 'Last 30 days' },
  { days: 60, label: 'Last 60 days' },
] as const

export function DateRangePills({ currentRange }: Props) {
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/60 border border-[#EAEAE5] backdrop-blur-sm">
      {OPTIONS.map(({ days, label }) => {
        const isActive = currentRange === days
        return (
          <Link
            key={days}
            href={`/dashboard?range=${days}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isActive
                ? 'bg-[#0D3B2E] text-white shadow-sm'
                : 'text-[#0A0A0A]/60 hover:text-[#0A0A0A] hover:bg-white/80'
            }`}
            scroll={false}
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
