import { CURRENCY, LOCALE, PERCENT } from '@/constants/app'

const MS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const COMPACT_FROM = 1000

const eur = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY })
const eurWhole = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY, maximumFractionDigits: 0 })
const compact = new Intl.NumberFormat(LOCALE, { notation: 'compact', maximumFractionDigits: 1 })
const integer = new Intl.NumberFormat(LOCALE)

export function formatEur(value: number, opts: { whole?: boolean } = {}): string {
  return (opts.whole ? eurWhole : eur).format(value)
}

/** 18400 → "18.4k"; small numbers stay exact */
export function formatTokens(value: number): string {
  return value < COMPACT_FROM ? String(value) : compact.format(value)
}

export function formatInteger(value: number): string {
  return integer.format(Math.round(value))
}

export function formatDuration(ms: number): string {
  const s = Math.max(0, Math.round(ms / MS_PER_SECOND))
  if (s < SECONDS_PER_MINUTE) return `${s}s`
  return `${Math.floor(s / SECONDS_PER_MINUTE)}m ${String(s % SECONDS_PER_MINUTE).padStart(2, '0')}s`
}

/** Whole-number percentage; 0 when max is 0 */
export function percent(value: number, max: number): number {
  return max <= 0 ? 0 : Math.round((value / max) * PERCENT)
}
