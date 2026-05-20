export function ApiErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-[#B42318]/30 bg-[#FEF3F2] px-4 py-3 mb-4 flex items-center gap-3"
    >
      <span className="text-lg leading-none" aria-hidden="true">
        ⚠️
      </span>
      <span className="text-caption font-medium text-[#B42318] leading-snug">
        {message}
      </span>
    </div>
  )
}
