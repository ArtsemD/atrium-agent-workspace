import { describe, expect, it } from 'vitest'
import { readScene } from './run-scene'

describe('readScene', () => {
  it('reads a known scene', () => expect(readScene('?scene=done')).toBe('done'))
  it('ignores unknown values', () => expect(readScene('?scene=nope')).toBeNull())
  it('returns null without the parameter', () => expect(readScene('')).toBeNull())
})
