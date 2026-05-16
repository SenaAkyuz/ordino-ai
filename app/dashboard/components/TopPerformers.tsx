export function TopPerformers({
  title,
  items,
}: {
  title: string
  items: { id: string; name: string; value: string; secondary: string }[]
}) {
  return (
    <div className="card p-5 md:p-6 h-full">
      <h3 className="font-display text-h4 font-semibold text-ink mb-5">{title}</h3>
      <ol className="space-y-4">
        {items.map((item, i) => (
          <li key={item.id} className="flex items-start gap-3">
            <div
              className={`flex-none w-6 h-6 rounded-md flex items-center justify-center text-caption font-bold ${
                i === 0
                  ? 'bg-accent text-accent-ink'
                  : i === 1
                  ? 'bg-accent-soft text-accent'
                  : 'bg-bg-soft text-ink-50'
              }`}
            >
              {i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-body-sm font-medium text-ink truncate leading-tight">
                {item.name}
              </div>
              <div className="text-eyebrow text-ink-50 mt-0.5 uppercase">
                {item.secondary}
              </div>
            </div>
            <div className="font-display font-bold text-body-sm text-ink tabular-nums">
              {item.value}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
