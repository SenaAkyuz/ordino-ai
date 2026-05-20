/**
 * Test script: Google Ads API credentials çalışıyor mu kontrol et.
 * Çalıştırma: npm run test:google-ads
 */

// gRPC default c-ares resolver bazı Windows kurulumlarında (çift NIC vb.)
// googleads.googleapis.com'u çözemiyor; Node'un native resolver'ını zorla.
if (!process.env.GRPC_DNS_RESOLVER) {
  process.env.GRPC_DNS_RESOLVER = 'native'
}

import { GoogleAdsApi } from 'google-ads-api'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function main() {
  console.log('\n🔍 Google Ads API credential test başlıyor...\n')

  // Check env vars
  const required = [
    'GOOGLE_ADS_DEVELOPER_TOKEN',
    'GOOGLE_ADS_CLIENT_ID',
    'GOOGLE_ADS_CLIENT_SECRET',
    'GOOGLE_ADS_REFRESH_TOKEN',
    'GOOGLE_ADS_LOGIN_CUSTOMER_ID',
    'GOOGLE_ADS_CUSTOMER_ID',
  ]

  const missing = required.filter((k) => !process.env[k])
  if (missing.length > 0) {
    console.error('❌ Eksik environment variables:')
    missing.forEach((m) => console.error(`   - ${m}`))
    console.error('\n.env.local dosyasını kontrol et.\n')
    process.exit(1)
  }

  console.log('✅ Tüm environment variables mevcut\n')

  // Initialize client
  const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_ADS_CLIENT_ID!,
    client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET!,
    developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN!,
  })

  const customer = client.Customer({
    customer_id: process.env.GOOGLE_ADS_CUSTOMER_ID!.replace(/-/g, ''),
    login_customer_id: process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!.replace(/-/g, ''),
    refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN!,
  })

  console.log('🚀 GoBritanya hesabından kampanya listesi çekiliyor...\n')

  try {
    const campaigns = await customer.query(`
      SELECT
        campaign.id,
        campaign.name,
        campaign.status,
        metrics.cost_micros,
        metrics.impressions,
        metrics.clicks
      FROM campaign
      WHERE segments.date DURING LAST_30_DAYS
      ORDER BY metrics.cost_micros DESC
      LIMIT 5
    `)

    if (campaigns.length === 0) {
      console.log('⚠️  Hiç kampanya bulunamadı (boş hesap olabilir veya tarih aralığında veri yok)')
      console.log('   Yine de bağlantı başarılı — credential\'lar çalışıyor.\n')
    } else {
      console.log(`✅ ${campaigns.length} kampanya bulundu:\n`)
      campaigns.forEach((c, i) => {
        const cost = ((c.metrics?.cost_micros || 0) / 1_000_000).toFixed(2)
        console.log(`   ${i + 1}. ${c.campaign?.name || 'Unknown'}`)
        console.log(`      Status: ${c.campaign?.status} | Cost: £${cost} | Impressions: ${c.metrics?.impressions || 0}`)
      })
    }

    console.log('\n🎉 BAŞARILI! Credential\'lar doğru, API çalışıyor.\n')
  } catch (err: any) {
    console.error('\n❌ HATA:', err.message || err)
    if (err.errors) {
      console.error('\nDetay:')
      console.error(JSON.stringify(err.errors, null, 2))
    }
    console.error('\nYaygın hatalar:')
    console.error('- "Developer Token not approved": Developer Token henüz onaylanmamış olabilir')
    console.error('- "Customer not found": Customer ID yanlış olabilir, tire olmadan yazıldı mı kontrol et')
    console.error('- "Invalid grant": Refresh Token expired olabilir, yeniden üretilmeli')
    console.error('- "User does not have permission": MCC altında client linked değil olabilir\n')
    process.exit(1)
  }
}

main()
