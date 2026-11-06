const eur = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR' })
const eurWhole = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const compact = new Intl.NumberFormat('en-GB', { notation: 'compact', maximumFractionDigits: 1 })

export function formatEur(value: number, opts: { whole?: boolean } = {}): string {
  return (opts.whole ? eurWhole : eur).format(value)
}

/** 18400 → "18.4k"; small numbers stay exact */
export function formatTokens(value: number): string {
  return value < 1000 ? String(value) : compact.format(value)
}

export function formatDuration(ms: number): string {
  const s = Math.max(0, Math.round(ms / 1000))
  return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${String(s % 60).padStart(2, '0')}s`
}

export function percent(value: number, max: number): number {
  return max <= 0 ? 0 : Math.round((value / max) * 100)
}
