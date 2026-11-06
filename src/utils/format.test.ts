import { describe, expect, it } from 'vitest'
import { formatEur } from '@/utils/format'

describe('format', () => {
  it('formats money in euros', () => {
    expect(formatEur(1140.2)).toBe('€1,140.20')
    expect(formatEur(1140.2, { whole: true })).toBe('€1,140')
  })
})
