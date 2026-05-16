'use client'

import { useState } from 'react'

export function TrendChart({
  data,
  label,
  color = '#0D3B2E',
  height = 220,
}: {
  data: number[]
  label: string
  color?: string
  height?: number
}) {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  if (!data || data.length < 2) return null

  const width = 100 // viewBox scale
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const padding = { top: 12, right: 4, bottom: 24, left: 4 }
  const chartH = height - padding.top - padding.bottom

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = padding.top + chartH - ((v - min) / range) * chartH
    return { x, y, value: v, index: i }
  })

  const path = points
    .map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`))
    .join(' ')

  const areaPath = `${path} L ${width},${height - padding.bottom} L 0,${height - padding.bottom} Z`

  const hover = hoverIdx !== null ? points[hoverIdx] : null

  return (
    <div className="card p-5 md:p-6">
      <div className="flex items-baseline justify-between mb-5">
        <h3 className="font-display text-h4 font-semibold text-ink">{label}</h3>
        <div className="text-caption text-ink-50 tabular-nums">
          Son 30 gün
        </div>
      </div>

      <div className="relative" style={{ height }}>
        <svg
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          className="overflow-visible"
        >
          <path d={areaPath} fill={color} fillOpacity="0.1" />
          <path
            d={path}
            stroke={color}
            strokeWidth="0.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          {hover && (
            <line
              x1={hover.x}
              x2={hover.x}
              y1={padding.top}
              y2={height - padding.bottom}
              stroke="#0A0A0A"
              strokeWidth="0.3"
              strokeDasharray="2,2"
              vectorEffect="non-scaling-stroke"
            />
          )}
          {points.map((p) => (
            <rect
              key={p.index}
              x={p.x - width / data.length / 2}
              y={0}
              width={width / data.length}
              height={height}
              fill="transparent"
              onMouseEnter={() => setHoverIdx(p.index)}
              onMouseLeave={() => setHoverIdx(null)}
              style={{ cursor: 'crosshair' }}
            />
          ))}
        </svg>

        {hover && (
          <div
            className="absolute pointer-events-none bg-ink text-ink-inverse text-caption font-medium px-2.5 py-1.5 rounded-md tabular-nums shadow-lift"
            style={{
              left: `${hover.x}%`,
              top: `${(hover.y / height) * 100 - 18}%`,
              transform: 'translate(-50%, -100%)',
            }}
          >
            {hover.value.toLocaleString('en-GB')}
          </div>
        )}
      </div>
    </div>
  )
}
