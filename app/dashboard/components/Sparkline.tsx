export function Sparkline({
  data,
  color = '#0D3B2E',
  width = 72,
  height = 28,
  filled = true,
}: {
  data: number[]
  color?: string
  width?: number
  height?: number
  filled?: boolean
}) {
  if (!data || data.length < 2) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / range) * (height - 4) - 2
    return { x, y }
  })

  const path = points.map((p, i) => (i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ')
  const areaPath = filled ? `${path} L ${width},${height} L 0,${height} Z` : ''

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      className="overflow-visible"
    >
      {filled && <path d={areaPath} fill={color} fillOpacity="0.1" />}
      <path
        d={path}
        stroke={color}
        strokeWidth="1.75"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
