# Ordino API Integration Layer

## Mimari

Her platform için ayrı API client (`google-ads.ts`, `meta.ts`, vb.). Fallback pattern: token yoksa mock data döndürür.

## Token Aktivasyonu

Her dosyanın üstündeki AKTIVASYON yorumunu takip et. Genelde:
1. Platform'dan token al
2. .env.local'a ekle
3. fetchFromAPI() içini doldur
4. Otomatik gerçek API'ye geçer

## Platform Silme Rehberi

### Google Ads silmek için
1. `lib/api/google-ads.ts` sil
2. `app/dashboard/sections/GoogleAdsSection.tsx` sil
3. `lib/mock-data.ts`'ten kaldır: googleAdsCampaigns, googleAdsKpis, sparklines.google, trendData.google, topPerformers.google
4. `lib/insights-engine.ts`'ten kaldır: getGoogleAdsInsights, Platform type'tan 'google' string'i
5. `lib/report-generator.ts`'ten kaldır: Google platformBreakdown entry, Google topPerformer
6. `app/dashboard/page.tsx`'ten kaldır: <GoogleAdsSection /> satırı + import
7. `app/dashboard/components/Sidebar.tsx`'ten kaldır: Google nav item + GoogleIcon function
8. `app/dashboard/components/OverviewSection.tsx`'i düzenle: donut chart Meta-only olur veya başka düzenleme

### Meta Ads silmek için
Aynı pattern, "meta" ile değiştir.

### Instagram silmek için
Aynı pattern, "instagram" ile.

### LinkedIn silmek için
Aynı pattern, "linkedin" ile.

Her platform silme işlemi ~10-15 dakika sürer.
