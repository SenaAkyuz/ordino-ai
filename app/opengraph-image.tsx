import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Ordino — The AI Growth Operating System'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #FAFAF7 0%, #E8F2EC 45%, #F4E4BC 100%)',
          padding: '72px 80px',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        {/* Top row: wordmark */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              fontSize: 38,
              fontWeight: 800,
              color: '#0A0A0A',
              letterSpacing: '-0.02em',
            }}
          >
            Ordino
          </div>
          <div
            style={{
              marginLeft: 16,
              padding: '6px 14px',
              borderRadius: 999,
              border: '1px solid rgba(13, 59, 46, 0.2)',
              backgroundColor: 'rgba(13, 59, 46, 0.06)',
              fontSize: 16,
              fontWeight: 500,
              color: '#0D3B2E',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Now live in London
          </div>
        </div>

        {/* Middle: main copy */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: '#0D3B2E',
              fontWeight: 600,
              marginBottom: 28,
              textTransform: 'uppercase',
              letterSpacing: '0.14em',
            }}
          >
            The AI Growth Operating System
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#0A0A0A',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: 980,
            }}
          >
            Built for industries where one lead is worth millions.
          </div>
        </div>

        {/* Bottom row: domain */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: '#6B7280',
              fontWeight: 500,
            }}
          >
            ordino.ai
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#6B7280',
              fontWeight: 500,
              display: 'flex',
              gap: 18,
            }}
          >
            <span>Yacht</span>
            <span>·</span>
            <span>Real Estate</span>
            <span>·</span>
            <span>Law</span>
            <span>·</span>
            <span>Clinics</span>
            <span>·</span>
            <span>Hotels</span>
            <span>·</span>
            <span>Wealth</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
