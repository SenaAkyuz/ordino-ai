import Link from 'next/link'

export function GenerateReportButton() {
  return (
    <Link
      href="/dashboard/reports"
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-accent text-accent-ink text-caption font-medium hover:bg-accent-hover transition-all shadow-soft hover:shadow-card hover:-translate-y-[1px]"
    >
      <DocumentIcon />
      Reports
    </Link>
  )
}

function DocumentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
