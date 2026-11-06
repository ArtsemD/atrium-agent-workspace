import { describe, expect, it } from 'vitest'
import { formatDuration, formatTokens } from './format'

describe('run format', () => {
  it('keeps small token counts exact and compacts large ones', () => {
    expect(formatTokens(950)).toBe('950')
    expect(formatTokens(18_400)).toBe('18.4k')
  })

  it('formats durations', () => {
    expect(formatDuration(2200)).toBe('2s')
    expect(formatDuration(75_000)).toBe('1m 15s')
  })
})
