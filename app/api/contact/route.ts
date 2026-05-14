import { NextResponse } from 'next/server'

interface ContactPayload {
  name: string
  email: string
  company: string
  industry: string
  adSpend: string
  message?: string
  turnstileToken?: string
}

// Form value → human-readable label mapping (so info@ordino.ai gets clean email)
const industryLabels: Record<string, string> = {
  'yacht': 'Yacht Sales & Charter',
  'real-estate': 'Luxury Real Estate',
  'law': 'Law Firms',
  'clinics': 'Premium Clinics',
  'hotels': 'Boutique Hotels & Villas',
  'wealth': 'Wealth & Advisory',
  'other': 'Other',
}

const adSpendLabels: Record<string, string> = {
  '<10k': 'Under £10,000',
  '10k-50k': '£10,000 – £50,000',
  '50k-100k': '£50,000 – £100,000',
  '100k-500k': '£100,000 – £500,000',
  '500k+': 'Over £500,000',
}

// ─── Turnstile verification ─────────────────────────────────

async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  // Graceful degradation: if secret not configured, skip verification
  if (!secret) {
    console.warn('[Turnstile] TURNSTILE_SECRET_KEY not set — skipping verification')
    return true
  }

  if (!token) {
    console.warn('[Turnstile] No token provided')
    return false
  }

  try {
    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
      }
    )
    const data = (await res.json()) as { success: boolean; 'error-codes'?: string[] }

    if (!data.success) {
      console.warn('[Turnstile] Verification failed:', data['error-codes'])
    }
    return data.success === true
  } catch (err) {
    console.error('[Turnstile] Network error:', err)
    return false
  }
}

// ─── Resend email sending ───────────────────────────────────

async function sendEmail(payload: ContactPayload): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.RESEND_FROM_EMAIL
  const toEmail = process.env.RESEND_TO_EMAIL || 'info@ordino.ai'

  // Graceful degradation: if Resend not configured, log to console + return success
  if (!apiKey || !fromEmail) {
    console.warn('[Email] Resend not configured (RESEND_API_KEY or RESEND_FROM_EMAIL missing)')
    console.log('[Email] Form submission (would have been sent to', toEmail, '):', payload)
    return { ok: true }
  }

  const industryLabel = industryLabels[payload.industry] || payload.industry
  const adSpendLabel = adSpendLabels[payload.adSpend] || payload.adSpend

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; color: #0A0A0A;">
      <h2 style="font-size: 22px; margin: 0 0 24px;">New contact enquiry</h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
        <tr>
          <td style="padding: 10px 0; color: #6B7280; width: 140px; border-bottom: 1px solid #EAEAE5;">Name</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #EAEAE5;"><strong>${escapeHtml(payload.name)}</strong></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #6B7280; border-bottom: 1px solid #EAEAE5;">Email</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #EAEAE5;"><a href="mailto:${escapeHtml(payload.email)}" style="color: #0D3B2E; text-decoration: none;">${escapeHtml(payload.email)}</a></td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #6B7280; border-bottom: 1px solid #EAEAE5;">Company</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #EAEAE5;">${escapeHtml(payload.company)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #6B7280; border-bottom: 1px solid #EAEAE5;">Industry</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #EAEAE5;">${escapeHtml(industryLabel)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #6B7280;">Monthly ad spend</td>
          <td style="padding: 10px 0;">${escapeHtml(adSpendLabel)}</td>
        </tr>
      </table>
      ${
        payload.message
          ? `<div style="margin-top: 24px; padding: 16px; background: #FAFAF7; border-radius: 8px; border: 1px solid #EAEAE5;">
              <p style="margin: 0 0 8px; color: #6B7280; font-size: 13px;">Message</p>
              <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(payload.message)}</p>
            </div>`
          : ''
      }
      <p style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #EAEAE5; color: #9CA3AF; font-size: 13px;">
        Submitted via ordino.ai contact form
      </p>
    </div>
  `

  const text = [
    'New contact enquiry from ordino.ai',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company}`,
    `Industry: ${industryLabel}`,
    `Monthly ad spend: ${adSpendLabel}`,
    payload.message ? `\nMessage:\n${payload.message}` : '',
  ].join('\n')

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: payload.email,
        subject: `[Ordino] New enquiry from ${payload.company}`,
        html,
        text,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('[Resend] API error:', res.status, errText)
      return { ok: false, error: `Resend returned ${res.status}` }
    }

    const data = (await res.json()) as { id?: string }
    console.log('[Resend] Email sent successfully. ID:', data.id)
    return { ok: true }
  } catch (err) {
    console.error('[Resend] Network error:', err)
    return { ok: false, error: 'Network error' }
  }
}

// ─── HTML escape helper ─────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// ─── POST handler ───────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>

    // Validation: required fields
    const requiredFields: Array<keyof ContactPayload> = ['name', 'email', 'company', 'industry', 'adSpend']
    for (const field of requiredFields) {
      if (!body[field] || typeof body[field] !== 'string' || (body[field] as string).trim() === '') {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Email regex validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email!)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Length limits (basic abuse protection)
    if (body.name!.length > 100) return NextResponse.json({ error: 'Name too long' }, { status: 400 })
    if (body.company!.length > 200) return NextResponse.json({ error: 'Company too long' }, { status: 400 })
    if (body.message && body.message.length > 5000) return NextResponse.json({ error: 'Message too long' }, { status: 400 })

    // Turnstile verification (skipped gracefully if not configured)
    const turnstileValid = await verifyTurnstile(body.turnstileToken)
    if (!turnstileValid) {
      return NextResponse.json(
        { error: 'Verification failed. Please refresh and try again.' },
        { status: 403 }
      )
    }

    // Send email (logs to console if Resend not configured)
    const result = await sendEmail(body as ContactPayload)

    if (!result.ok) {
      return NextResponse.json(
        { error: 'Failed to send. Please email sales@ordino.ai directly.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[Contact API] Unexpected error:', err)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
