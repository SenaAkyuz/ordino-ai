type Column<T> = {
  key: keyof T & string
  label: string
  align?: 'left' | 'right'
  format?: (value: T[keyof T]) => string
}

export function CampaignTable<T extends Record<string, unknown>>({
  columns,
  rows,
}: {
  columns: Column<T>[]
  rows: T[]
}) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-line bg-bg-soft/60">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-5 py-3.5 text-eyebrow font-semibold text-ink-50 uppercase ${
                    col.align === 'right' ? 'text-right' : 'text-left'
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-line last:border-b-0 transition-colors hover:bg-accent-soft/40"
              >
                {columns.map((col) => {
                  const raw = row[col.key]
                  const display = col.format
                    ? col.format(raw as T[keyof T])
                    : String(raw)
                  const isPrimary =
                    col.key === 'name' || col.key === 'caption' || col.key === 'title'
                  return (
                    <td
                      key={col.key}
                      className={`px-5 py-4 text-body-sm ${
                        col.align === 'right'
                          ? 'text-right tabular-nums text-ink'
                          : 'text-ink-70'
                      } ${isPrimary ? 'font-medium text-ink max-w-[300px] truncate' : ''}`}
                    >
                      {display}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
