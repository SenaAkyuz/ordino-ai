'use client'

import { useState } from 'react'

// Tailwind v4 emits oklch()/oklab()/color-mix() colors. The classic html2canvas
// (bundled in html2pdf.js) cannot parse those, so we use html2canvas-pro (which
// supports modern CSS color) + jsPDF directly.

export function DownloadPDFButton({ filename }: { filename: string }) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    try {
      const element = document.getElementById('report-content')
      if (!element) {
        console.error('Report content element not found')
        alert('PDF oluşturulamadı: rapor içeriği bulunamadı.')
        return
      }

      // Libraries load only on click — keeps the initial bundle small.
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import('html2canvas-pro'),
        import('jspdf'),
      ])

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#FFFFFF',
        ignoreElements: (el: Element) => el.classList.contains('no-print'),
      })

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
      const margin = 10
      const pageW = pdf.internal.pageSize.getWidth()
      const pageH = pdf.internal.pageSize.getHeight()
      const usableW = pageW - margin * 2
      const usableH = pageH - margin * 2

      // Scale the captured canvas to the usable page width (in mm).
      const imgW = usableW
      const imgH = (canvas.height * imgW) / canvas.width
      const imgData = canvas.toDataURL('image/jpeg', 0.98)

      let heightLeft = imgH
      let position = margin

      pdf.addImage(imgData, 'JPEG', margin, position, imgW, imgH)
      heightLeft -= usableH

      // Add subsequent pages by shifting the same tall image upward.
      while (heightLeft > 0) {
        position = margin - (imgH - heightLeft)
        pdf.addPage()
        pdf.addImage(imgData, 'JPEG', margin, position, imgW, imgH)
        heightLeft -= usableH
      }

      pdf.save(filename)
    } catch (err) {
      console.error('PDF generation failed', err)
      alert('PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDownload}
      disabled={loading}
      className="no-print inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-bg-card border border-line text-caption font-medium text-ink hover:bg-bg-soft hover:border-line-strong disabled:opacity-60 disabled:cursor-wait transition-all shadow-soft"
    >
      {loading ? (
        <>
          <Spinner />
          Oluşturuluyor…
        </>
      ) : (
        <>
          <DownloadIcon />
          Download PDF
        </>
      )}
    </button>
  )
}

function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 2v8m0 0l3-3m-3 3L5 7M2 12v2h12v-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.25"
      />
      <path
        d="M12 2a10 10 0 0110 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
