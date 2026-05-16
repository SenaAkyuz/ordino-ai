type Slice = {
  label: string
  value: number
  color: string
}

export function DonutChart({
  slices,
  size = 180,
  thickness = 28,
  centerLabel,
  centerValue,
}: {
  slices: Slice[]
  size?: number
  thickness?: number
  centerLabel?: string
  centerValue?: string
}) {
  const total = slices.reduce((sum, s) => sum + s.value, 0)
  if (total === 0) return null

  const radius = size / 2 - 4
  const innerRadius = radius - thickness
  const cx = size / 2
  const cy = size / 2

  let currentAngle = -90 // Start at top (12 o'clock)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      {slices.map((slice, i) => {
        const sliceAngle = (slice.value / total) * 360
        const startAngle = currentAngle
        const endAngle = currentAngle + sliceAngle
        currentAngle = endAngle

        const startRad = (startAngle * Math.PI) / 180
        const endRad = (endAngle * Math.PI) / 180

        const x1 = cx + radius * Math.cos(startRad)
        const y1 = cy + radius * Math.sin(startRad)
        const x2 = cx + radius * Math.cos(endRad)
        const y2 = cy + radius * Math.sin(endRad)

        const x3 = cx + innerRadius * Math.cos(endRad)
        const y3 = cy + innerRadius * Math.sin(endRad)
        const x4 = cx + innerRadius * Math.cos(startRad)
        const y4 = cy + innerRadius * Math.sin(startRad)

        const largeArc = sliceAngle > 180 ? 1 : 0

        const path = `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`

        return <path key={i} d={path} fill={slice.color} />
      })}

      {/* Center text */}
      {(centerLabel || centerValue) && (
        <g>
          {centerValue && (
            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-display font-bold tabular-nums"
              style={{ fontSize: '20px', fill: '#0A0A0A' }}
            >
              {centerValue}
            </text>
          )}
          {centerLabel && (
            <text
              x={cx}
              y={cy + 14}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: '10px', fill: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}
            >
              {centerLabel}
            </text>
          )}
        </g>
      )}
    </svg>
  )
}
