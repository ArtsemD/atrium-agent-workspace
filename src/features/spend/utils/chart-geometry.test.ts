import { describe, expect, it } from 'vitest'
import type { ChartFrame } from '@/types/spend'
import { createScales, hoverPointAt, niceCeil, ticks } from './chart-geometry'

const frame: ChartFrame = {
  width: 100,
  height: 50,
  pad: { top: 0, right: 10, bottom: 10, left: 10 },
  days: 9,
  yMax: 40,
}

describe('chart geometry', () => {
  const s = createScales(frame)

  it('maps the first and last day to the plot edges', () => {
    expect(s.x(1)).toBe(10)
    expect(s.x(9)).toBe(90)
  })

  it('maps 0 to the x axis and yMax to the top', () => {
    expect(s.y(0)).toBe(40)
    expect(s.y(40)).toBe(0)
  })

  it('snaps the pointer to the nearest day and stays inside the month', () => {
    expect(s.dayAt(0.5)).toBe(5)
    expect(s.dayAt(0)).toBe(1)
    expect(s.dayAt(1)).toBe(9)
  })

  it('closes an area down to the axis', () => {
    expect(
      s.areaPath([
        [1, 20],
        [9, 40],
      ]),
    ).toBe('M10.0,20.0L90.0,0.0L90.0,40.0L10.0,40.0Z')
  })

  it('rounds the axis up to a whole step', () => {
    expect(niceCeil(4320, 1000)).toBe(5000)
    expect(ticks(3000, 1000)).toEqual([0, 1000, 2000, 3000])
  })

  it('reads actual spend up to today and the forecast after it', () => {
    const forecast = [{ day: 3, mid: 30, low: 25, high: 35 }]
    expect(hoverPointAt(2, [10, 20], forecast)).toMatchObject({ kind: 'spent', value: 20 })
    expect(hoverPointAt(3, [10, 20], forecast)).toMatchObject({ kind: 'forecast', range: [25, 35] })
  })
})
