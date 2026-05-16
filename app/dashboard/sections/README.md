# Dashboard Sections

Her section bağımsız bir component. Silmek = dosyayı sil + page.tsx'ten satırı sil.

## Section'lar

- `GoogleAdsSection.tsx` → Google Ads paneli
- `MetaAdsSection.tsx` → Meta Ads paneli
- `InstagramSection.tsx` → Instagram paneli
- `LinkedInSection.tsx` → LinkedIn paneli

## Yeni section eklemek için

1. Yeni `{Platform}Section.tsx` oluştur (mevcut bir section'ı template al)
2. `app/dashboard/page.tsx`'e import + render ekle
3. `lib/api/{platform}.ts` oluştur (yine template al)
4. `lib/mock-data.ts`'e yeni platform data ekle
5. `app/dashboard/components/Sidebar.tsx`'e nav item ekle

## Section silmek için

Bkz: `lib/api/README.md` → Platform Silme Rehberi
