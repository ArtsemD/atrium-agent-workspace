import { describe, expect, it } from 'vitest'
import { percent } from './format'

describe('spend format', () => {
  it('guards percent against a zero max', () => {
    expect(percent(5, 0)).toBe(0)
    expect(percent(94, 100)).toBe(94)
  })
})
