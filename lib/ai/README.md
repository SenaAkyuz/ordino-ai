# Claude AI Integration

## Mimari

`lib/ai/claude.ts` — Claude API client (fallback to rule-based)

## Aktivasyon

1. console.anthropic.com → API key al
2. npm install @anthropic-ai/sdk
3. .env.local'a ekle: ANTHROPIC_API_KEY=sk-ant-...
4. lib/ai/claude.ts'teki commented import + implementation kısımlarını uncomment et
5. Otomatik AI moduna geçer

## AI Silme Rehberi

1. `lib/ai/claude.ts` sil
2. `lib/insights-engine.ts`'ten import + AI fallback kontrolünü kaldır (sadece rule-based kalsın)
3. `lib/report-generator.ts`'ten import + AI summary çağrısını kaldır
4. .env.local'dan ANTHROPIC_API_KEY sil
5. npm uninstall @anthropic-ai/sdk
6. AI Insights kartları otomatik rule-based moda döner

Toplam: ~5 dakika.
