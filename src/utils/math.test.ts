import { describe, expect, it } from 'vitest'
import { clamp, ratio, sumBy } from './math'

describe('math', () => {
  it('sums a field', () => expect(sumBy([{ n: 2 }, { n: 3 }], (i) => i.n)).toBe(5))
  it('clamps to the range', () => {
    expect(clamp(-1, 0, 10)).toBe(0)
    expect(clamp(11, 0, 10)).toBe(10)
    expect(clamp(5, 0, 10)).toBe(5)
  })
  it('returns 0 for an empty total', () => expect(ratio(5, 0)).toBe(0))
})
