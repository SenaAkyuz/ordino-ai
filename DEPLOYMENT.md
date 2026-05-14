# Deployment — Ordino.ai

Stack:
- **Hosting:** Vercel (free Hobby tier yeterli, sonra Pro'ya çıkar)
- **DNS:** Cloudflare (ücretsiz tier)
- **Domain:** ordino.ai

Bu dosya: ilk deploy + custom domain + ileride yapılacak güncellemeler.

---

## 1. Pre-Deployment Checklist

Yerelde son kez `npm run build` çalıştır:

```bash
npm run build
```

Hata yoksa devam et. Hata varsa düzeltmeden push etme.

Ayrıca `.env.local`'ın .gitignore'da olduğunu kontrol et:

```bash
git check-ignore .env.local
```

Bu komut `.env.local` döndürmeli (yani ignored). Dönmüyorsa `.gitignore`'a ekle:

```
.env.local
.env*.local
```

---

## 2. Git Setup + GitHub Push

İlk defa push ediyorsan:

```bash
# Repo init (eğer henüz yapılmadıysa)
git init
git add .
git commit -m "Initial Ordino.ai site"

# GitHub'da yeni repo oluştur: ordino-ai (private veya public, fark etmez)
# Sonra:
git branch -M main
git remote add origin https://github.com/USERNAME/ordino-ai.git
git push -u origin main
```

---

## 3. Vercel — İlk Deploy

1. https://vercel.com/new'e git, GitHub ile giriş yap
2. **Import Git Repository** → `ordino-ai` repo'sunu seç
3. Framework Preset: **Next.js** (otomatik tanır)
4. Root Directory: `./` (varsayılan)
5. Build Command: `npm run build` (varsayılan)
6. Output Directory: `.next` (varsayılan)
7. **Deploy** butonuna bas

İlk deploy ~2 dakika. Sonra Vercel sana bir `https://ordino-ai-xxx.vercel.app` URL'si verir. Bu çalışır, ama biz custom domain bağlayacağız.

---

## 4. Custom Domain — ordino.ai

### A. Vercel'de domain ekle

1. Vercel Dashboard → proje → **Settings** → **Domains**
2. **Add** → `ordino.ai` yaz → Add
3. Vercel sana DNS kaydı ister: **A record** veya **CNAME** seçenekleri
4. Ekrandaki DNS değerlerini Cloudflare'a gireceğiz

### B. Cloudflare DNS

1. https://dash.cloudflare.com → `ordino.ai` site'ı (yoksa **Add Site** ile ekle ve domain registrar nameserver'larını Cloudflare'a yönlendir)
2. Soldaki menü → **DNS** → **Records**
3. Şu kayıtları ekle:

**Apex domain (ordino.ai):**

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| A    | @    | 76.76.21.21 | DNS only (gri bulut) |

**www subdomain:**

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | www | cname.vercel-dns.com | DNS only (gri bulut) |

> **NEDEN GRİ BULUT:** İlk deploy'da Vercel SSL sertifikası kuracak. Cloudflare proxy (turuncu bulut) açıksa SSL handshake bozulabilir. Önce gri bırak, SSL aktif olunca turuncuya çevirip Cloudflare CDN avantajlarını alabilirsin.

### C. Vercel'de doğrula

1. Vercel'e geri dön → Domains → **ordino.ai**
2. "Valid Configuration" yeşil işaret görünene kadar bekle (~5-30 dakika)
3. SSL sertifikası otomatik üretilir
4. `https://ordino.ai` artık çalışır

### D. www → apex redirect (opsiyonel ama önerilen)

Vercel default olarak `www.ordino.ai`'yi `ordino.ai`'ye redirect eder. Settings → Domains'te ana domain'in `ordino.ai` (www'siz) olduğundan emin ol.

---

## 5. Environment Variables (Vercel)

Resend ve Turnstile keylerin geldiğinde:

1. Vercel Dashboard → proje → **Settings** → **Environment Variables**
2. Şu 5 env var'ı ekle:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=noreply@ordino.ai
RESEND_TO_EMAIL=info@ordino.ai
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAAxxxxxxxxxxxxxx
TURNSTILE_SECRET_KEY=0x4AAAAAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

3. Her birinde **Environments**: Production + Preview + Development hepsini işaretle
4. Save sonrası **Redeploy** (Deployments → son deployment → ⋯ → Redeploy)

Env vars Vercel'de set olmadan Production'da contact form simulated mode'da çalışır (success döner ama email gitmez). Set olunca otomatik gerçek email gönderir.

---

## 6. Post-Deploy Doğrulama

### Site testleri

- [ ] `https://ordino.ai` açılıyor mu? (homepage)
- [ ] `https://ordino.ai/product` açılıyor mu?
- [ ] `https://ordino.ai/industries` açılıyor mu?
- [ ] `https://ordino.ai/about` açılıyor mu?
- [ ] `https://ordino.ai/contact` açılıyor mu?
- [ ] `https://ordino.ai/sitemap.xml` 5 sayfayı listeliyor mu?
- [ ] `https://ordino.ai/robots.txt` dönüyor mu?
- [ ] `https://ordino.ai/opengraph-image` görsel dönüyor mu?
- [ ] `https://ordino.ai/this-doesnt-exist` 404 sayfasını gösteriyor mu?

### SSL doğrulama

- [ ] Adres çubuğunda kilit ikonu var
- [ ] Tarayıcı "Connection is secure" diyor
- [ ] http://ordino.ai otomatik https'e yönleniyor

### Social preview testleri

- WhatsApp'ta `https://ordino.ai` link'ini at, OG image görünüyor mu
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/

### SEO doğrulama

1. Google Search Console (https://search.google.com/search-console)
   - Property ekle: `https://ordino.ai`
   - DNS verification ile (Cloudflare'da TXT record)
   - Sitemap submit: `https://ordino.ai/sitemap.xml`
2. Google Rich Results Test: https://search.google.com/test/rich-results
   - URL: `https://ordino.ai/` → Organization schema görünmeli
   - URL: `https://ordino.ai/product` → SoftwareApplication schema görünmeli

### Lighthouse

1. Chrome DevTools → Lighthouse
2. Mobile mode, "Performance" + "Accessibility" + "Best Practices" + "SEO" hepsini işaretle
3. Run

Hedef:
- **Performance: ≥ 90** (mobile, brief Bölüm 14 hedefi ≥ 95)
- **Accessibility: ≥ 95**
- **Best Practices: 100**
- **SEO: 100**

---

## 7. İleride yapacaklarımız (Faz 5 dışı)

Faz 5'ten sonra zaman zaman dokunulacaklar:

- **Cookie banner:** Şu an site cookie kullanmıyor (analytics yok). Plausible/PostHog eklersek Cookiebot ücretsiz tier'ı eklenmeli.
- **Analytics:** Vercel Analytics (1 satır kod, ücretsiz) veya Plausible (privacy-first)
- **Color token cleanup:** Mevcut `bg-[#FEE4E2]` vb. arbitrary değerleri `globals.css`'in `@theme` bloğuna `--color-danger`, `--color-danger-bg` olarak ekleyip components'leri refactor et. UX değişmez, DX iyileşir.
- **Status page:** İleride uptime monitoring (UptimeRobot, ücretsiz)
- **Branded email signature:** Resend templates ile ileride email replies'a da brand katabilirsin.

---

## Troubleshooting

**"Domain not configured" hatası:**
DNS propagation 24-48 saat sürebilir ama genelde 5-30 dakikada olur. Test için:
```bash
dig ordino.ai +short
# 76.76.21.21 dönmeli
```

**SSL Pending:**
Cloudflare proxy turuncu mu? Gri yap. Yine sorun varsa Vercel → Domains → Refresh.

**Build failed on Vercel:**
Vercel build logs'a bak. Genelde TypeScript error veya missing dependency. Yerelde `npm run build` çalıştır, aynı hatayı yakalarsan düzelt, push et.

**Contact form çalışmıyor (env set ettikten sonra):**
- Resend domain verification eksik (`ordino.ai` DNS'i Resend'e SPF/DKIM eklenmedi)
- Turnstile site key'de `ordino.ai` hostname'i yok
- Vercel Function logs: Dashboard → Deployment → Functions → `/api/contact`

---

## Kostlar (aylık)

| Service | Plan | Maliyet |
|---------|------|---------|
| Vercel | Hobby | $0 (yeterli, MVP için) |
| Cloudflare | Free | $0 |
| Resend | Free | $0 (3,000 email/ay'a kadar) |
| Cloudflare Turnstile | Free | $0 (sınırsız) |
| Domain ordino.ai | Yıllık | ~£12-25/yıl |

İlk yıl: domain dışında **sıfır altyapı maliyeti**.
