'use client'

import { useState } from 'react'

const ranges = ['Today', 'Last 24h', 'Last 7 days', 'Last 30 days', 'Last 60 days']

export function DateRangePills() {
  const [active, setActive] = useState('Last 30 days')

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {ranges.map((r) => (
        <button
          key={r}
          onClick={() => setActive(r)}
          className={`text-caption font-medium px-3 py-1.5 rounded-lg transition-all ${
            active === r
              ? 'bg-accent text-accent-ink shadow-soft'
              : 'text-ink-50 hover:text-ink hover:bg-bg-card/70 border border-transparent hover:border-line'
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  )
}
