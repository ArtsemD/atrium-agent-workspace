import { LOCALE } from '@/constants/app'

const MS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const COMPACT_FROM = 1000

const compact = new Intl.NumberFormat(LOCALE, { notation: 'compact', maximumFractionDigits: 1 })

/** 18400 → "18.4k"; small numbers stay exact */
export const formatTokens = (value: number): string => {
  return value < COMPACT_FROM ? String(Math.round(value)) : compact.format(value)
}

export const formatDuration = (ms: number): string => {
  const s = Math.max(0, Math.round(ms / MS_PER_SECOND))

  if (s < SECONDS_PER_MINUTE) {
    return `${s}s`
  }

  return `${Math.floor(s / SECONDS_PER_MINUTE)}m ${String(s % SECONDS_PER_MINUTE).padStart(2, '0')}s`
}
