export function IndustryLogos() {
  return (
    <>
      <LogoWordmark name="TURKISH TECHNIC" />
      <LogoWordmark name="ANADOLU HOLDING" />
      <LogoWordmark name="AIATA" />
      <LogoWordmark name="GSSTORE" />
      <LogoWordmark name="KOÇ GROUP" />
      <LogoWordmark name="ARÇELİK" />
      <LogoWordmark name="BEKO" />
      <LogoWordmark name="PHILIPS" />
      <LogoWordmark name="GENERALI" />
      <LogoWordmark name="MARIE CLAIRE" />
      <LogoWordmark name="FORTUNE" />
    </>
  )
}

function LogoWordmark({ name }: { name: string }) {
  return (
    <div className="flex-shrink-0 text-ink-30 hover:text-ink-50 transition-colors duration-300">
      <span className="font-display font-bold text-[15px] tracking-[0.18em] whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}
