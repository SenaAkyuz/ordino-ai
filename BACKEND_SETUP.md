# Backend Setup — Ordino.ai

The contact form (`/contact` → `/api/contact`) needs two third-party services to work in production:

1. **Resend** — Sends form submissions to `info@ordino.ai`
2. **Cloudflare Turnstile** — Invisible spam protection on the form

Both have generous free tiers. The form works in dev mode without either (it logs to console instead of emailing).

---

## 1. Resend — Email Forwarding

### A. Create account

1. Go to https://resend.com and sign up (free tier: 100 emails/day, 3,000/month)
2. Verify your sign-up email

### B. Add `ordino.ai` domain

1. Dashboard → **Domains** → **Add Domain**
2. Enter `ordino.ai`
3. Resend gives you DNS records (SPF, DKIM, DMARC) — add them to Cloudflare DNS
4. Wait ~5-30 min for DNS to propagate
5. Resend shows "Verified" → ready

### C. Generate API key

1. Dashboard → **API Keys** → **Create API Key**
2. Name: `ordino-prod` (or similar)
3. Permission: **Sending access** (full access not needed)
4. Copy the key (`re_...`) — you won't see it again

### D. Add to `.env.local`

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@ordino.ai
RESEND_TO_EMAIL=info@ordino.ai
```

### E. Quick test (without domain setup)

If you want to test without verifying `ordino.ai` first, use Resend's sandbox sender:

```env
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=your-personal-email@gmail.com
```

This only sends to your own Resend account email — fine for testing the flow.

---

## 2. Cloudflare Turnstile — Invisible Spam Protection

### A. Create site

1. Go to https://dash.cloudflare.com and log in
2. Sidebar → **Turnstile** → **Add Site**
3. Site name: `Ordino` (or similar)
4. Hostnames: add `ordino.ai`, `www.ordino.ai`, and `localhost` (for dev)
5. Widget mode: **Invisible**
6. Save

### B. Copy keys

After creating the site, Cloudflare shows:

- **Site Key** (public, starts with `0x...`) → goes into `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- **Secret Key** (private, starts with `0x...`) → goes into `TURNSTILE_SECRET_KEY`

### C. Add to `.env.local`

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxxxxxxxxxxx
TURNSTILE_SECRET_KEY=0x4AAAAAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

The `NEXT_PUBLIC_` prefix is important — Next.js exposes this env var to the browser (needed because Turnstile widget runs client-side).

---

## 3. Test the full flow

### Local dev

```bash
npm run dev
```

Visit `http://localhost:3000/contact`, fill the form, submit.

**With env vars set:**
- Server console: `[Resend] Email sent successfully. ID: ...`
- Email arrives at `info@ordino.ai` within seconds

**Without env vars set:**
- Server console: `[Email] Form submission (would have been sent to info@ordino.ai): { ... }`
- Form still shows success state — UX intact

### Production (Vercel)

1. Vercel dashboard → Project → **Settings** → **Environment Variables**
2. Add the same 5 variables there
3. Redeploy (or push commit) — env vars take effect on next deploy

---

## Troubleshooting

**Turnstile widget never appears / verification always fails:**
- Check `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set in `.env.local` AND on Vercel
- Verify hostname `localhost` is added to Turnstile site config
- Check browser console for Turnstile errors

**Resend returns 422 / "domain not verified":**
- Domain DNS not propagated yet — wait 30 min, re-check
- Or use `onboarding@resend.dev` for testing

**Form submit hangs forever:**
- Check `/api/contact` route is reachable (Vercel function logs)
- Check Next.js server console for errors

**Emails go to spam:**
- Resend domain verification incomplete (DKIM/SPF missing)
- `info@ordino.ai` mailbox needs to add `noreply@ordino.ai` as safe sender

---

## Cost summary

| Service | Free tier | Paid tier (if you exceed) |
|---------|-----------|----------------------------|
| Resend | 100/day, 3,000/month | $20/mo for 50,000 emails |
| Turnstile | Unlimited | Always free |

For an MVP contact form, you'll likely never exceed free tier.
