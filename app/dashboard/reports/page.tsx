import Link from 'next/link'
import { generateReport, pastReports } from '@/lib/report-generator'
import { DownloadPDFButton } from './components/DownloadPDFButton'

export const metadata = {
  title: 'Reports',
  description: 'Ordino AI-generated performance reports',
  robots: { index: false, follow: false },
}

export default async function ReportsPage() {
  const report = await generateReport()

  return (
    <div className="px-4 md:px-6 lg:px-8 py-8 md:py-10 max-w-[1000px] mx-auto">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-caption text-ink-50 hover:text-accent font-medium mb-6 transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M10 13L5 8l5-5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Dashboard'a dön
      </Link>

      {/* Page header */}
      <div className="mb-10">
        <p className="text-eyebrow text-accent uppercase mb-2">GoBritanya</p>
        <h1 className="font-display font-bold text-display-md text-ink tracking-tight leading-tight mb-2">
          Reports
        </h1>
        <p className="text-body-sm text-ink-50">
          AI-generated performance reports · Aylık otomatik özet
        </p>
      </div>

      {/* Current Report */}
      <div id="report-content" className="card overflow-hidden mb-8">
        {/* Report header */}
        <div className="px-6 md:px-8 py-6 border-b border-line bg-accent-soft/50">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-eyebrow text-accent bg-accent-soft px-2.5 py-1 rounded-pill uppercase mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Latest
              </div>
              <h2 className="font-display font-bold text-h3 md:text-2xl text-ink tracking-tight mb-1">
                {report.period} Performance Report
              </h2>
              <p className="text-caption text-ink-50">
                {report.client} · Generated {report.generatedAt}
              </p>
            </div>
            <DownloadPDFButton
              filename={`ordino-${report.client.toLowerCase()}-${report.period.toLowerCase().replace(/\s+/g, '-')}.pdf`}
            />
          </div>
        </div>

        {/* Executive Summary */}
        <div className="px-6 md:px-8 py-6 border-b border-line">
          <h3 className="text-eyebrow text-ink-50 uppercase mb-3">
            Executive Summary
          </h3>
          <p className="text-body-sm text-ink-70 leading-relaxed">
            {report.summary}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="px-6 md:px-8 py-6 border-b border-line">
          <h3 className="text-eyebrow text-ink-50 uppercase mb-4">
            Key Metrics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {report.keyMetrics.map((m, i) => (
              <div key={i}>
                <div className="text-eyebrow text-ink-50 uppercase mb-1">
                  {m.label}
                </div>
                <div className="font-display font-bold text-h3 text-ink tabular-nums leading-none mb-1">
                  {m.value}
                </div>
                <div className={`text-caption font-medium tabular-nums ${m.positive ? 'text-success' : 'text-[#B42318]'}`}>
                  {m.positive ? '↗' : '↘'} {m.change}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="px-6 md:px-8 py-6 border-b border-line">
          <h3 className="text-eyebrow text-ink-50 uppercase mb-4">
            Platform Breakdown
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {report.platformBreakdown.map((p, i) => (
              <div key={i} className="rounded-xl border border-line bg-bg-soft/40 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                  <h4 className="font-display font-semibold text-h4 text-ink">{p.platform}</h4>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {p.metrics.map((mt, j) => (
                    <div key={j}>
                      <div className="text-eyebrow text-ink-50 uppercase mb-0.5">
                        {mt.label}
                      </div>
                      <div className="text-body-sm font-bold text-ink tabular-nums">
                        {mt.value}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-caption text-ink-50 italic truncate">
                  {p.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="px-6 md:px-8 py-6 border-b border-line">
          <h3 className="text-eyebrow text-ink-50 uppercase mb-4">
            Top Performers
          </h3>
          <ol className="space-y-3">
            {report.topPerformers.map((t, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="flex-none w-7 h-7 rounded-md bg-accent-soft border border-accent/20 flex items-center justify-center text-caption font-bold text-accent">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-eyebrow text-ink-50 uppercase mb-0.5">
                    {t.label}
                  </div>
                  <div className="text-body-sm font-medium text-ink truncate leading-tight">
                    {t.name}
                  </div>
                </div>
                <div className="text-body-sm font-bold text-ink tabular-nums whitespace-nowrap">
                  {t.metric}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Recommendations */}
        <div className="px-6 md:px-8 py-6">
          <h3 className="text-eyebrow text-ink-50 uppercase mb-4">
            Recommendations
          </h3>
          <div className="space-y-3">
            {report.recommendations.map((r, i) => (
              <div
                key={i}
                className={`rounded-xl border p-4 ${
                  r.priority === 'high'
                    ? 'border-[#FECDCA] bg-[#FEF3F2]'
                    : r.priority === 'medium'
                    ? 'border-warning/40 bg-warning-bg'
                    : 'border-line bg-bg-soft/50'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-eyebrow font-bold uppercase px-2 py-0.5 rounded-md ${
                      r.priority === 'high'
                        ? 'bg-[#B42318] text-white'
                        : r.priority === 'medium'
                        ? 'bg-warning text-white'
                        : 'bg-ink/60 text-white'
                    }`}
                  >
                    {r.priority === 'high' ? 'Yüksek' : r.priority === 'medium' ? 'Orta' : 'Düşük'} öncelik
                  </span>
                  <h4 className="font-display text-h4 font-semibold text-ink">{r.title}</h4>
                </div>
                <p className="text-caption text-ink-70 leading-relaxed ml-0">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Past Reports */}
      <div className="card p-6 md:p-8">
        <h3 className="font-display text-h4 font-semibold text-ink mb-1">Previous Reports</h3>
        <p className="text-caption text-ink-50 mb-5">
          Geçmiş raporlar (mock data — gerçek API bağlantısı sonrası her ay otomatik oluşturulacak)
        </p>

        <div className="space-y-2">
          {pastReports.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between gap-3 p-3 rounded-lg border border-line hover:border-accent/30 hover:bg-accent-soft/30 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex-none w-10 h-10 rounded-lg bg-bg-soft flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" className="text-ink" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2v6h6" stroke="currentColor" className="text-ink" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-body-sm font-medium text-ink">{r.period} Report</div>
                  <div className="text-caption text-ink-50 tabular-nums">
                    {r.client} · {r.generatedAt} · £{r.spend.toLocaleString('en-GB')} spend
                  </div>
                </div>
              </div>
              <div className="flex-none text-caption text-accent font-medium">View →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
