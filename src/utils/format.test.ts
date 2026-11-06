import { describe, expect, it } from 'vitest'
import { formatDuration, formatEur, formatTokens, percent } from '@/utils/format'

describe('format', () => {
  it('formats money in euros', () => {
    expect(formatEur(1140.2)).toBe('€1,140.20')
    expect(formatEur(1140.2, { whole: true })).toBe('€1,140')
  })
  it('keeps small token counts exact and compacts large ones', () => {
    expect(formatTokens(950)).toBe('950')
    expect(formatTokens(18_400)).toBe('18.4k')
  })
  it('formats durations', () => {
    expect(formatDuration(2200)).toBe('2s')
    expect(formatDuration(75_000)).toBe('1m 15s')
  })
  it('guards percent against a zero max', () => {
    expect(percent(5, 0)).toBe(0)
    expect(percent(94, 100)).toBe(94)
  })
})
