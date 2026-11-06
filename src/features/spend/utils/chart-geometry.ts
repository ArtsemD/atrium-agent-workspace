import type { ChartFrame, ChartHover, ChartPoint, ChartScales, ForecastPoint } from '@/types/spend'
import { clamp } from '@/utils/math'

/** Rounds up to the next whole step, so the top gridline is a round number */
export const niceCeil = (value: number, step: number): number => {
  return Math.ceil(value / step) * step
}

/** Gridline values from 0 to max */
export const ticks = (max: number, step: number): number[] => {
  return Array.from({ length: Math.floor(max / step) + 1 }, (_, i) => i * step)
}

/** Maps days and euros to SVG coordinates inside the frame's padding */
export const createScales = (frame: ChartFrame): ChartScales => {
  const { width, height, pad, days, yMax } = frame
  const innerWidth = width - pad.left - pad.right
  const innerHeight = height - pad.top - pad.bottom

  const x = (day: number): number => pad.left + ((day - 1) / (days - 1)) * innerWidth
  const y = (eur: number): number => height - pad.bottom - (eur / yMax) * innerHeight
  const point = ([day, eur]: ChartPoint): string => `${x(day).toFixed(1)},${y(eur).toFixed(1)}`

  const linePath = (points: readonly ChartPoint[]): string =>
    points.map((p, i) => `${i ? 'L' : 'M'}${point(p)}`).join('')

  return {
    x,
    y,
    linePath,
    areaPath: (points) => {
      const first = points[0]
      const last = points.at(-1)

      if (!first || !last) {
        return ''
      }

      return `${linePath(points)}L${point([last[0], 0])}L${point([first[0], 0])}Z`
    },
    bandPath: (upper, lower) => {
      return `${linePath(upper)}${[...lower]
        .reverse()
        .map((p) => `L${point(p)}`)
        .join('')}Z`
    },
    dayAt: (fractionX) => {
      const day = Math.round(((fractionX * width - pad.left) / innerWidth) * (days - 1)) + 1

      return clamp(day, 1, days)
    },
  }
}

/** The value under the pointer: actual spend up to today, the forecast after it */
export const hoverPointAt = (
  day: number,
  actual: readonly number[],
  forecast: readonly ForecastPoint[],
): ChartHover | null => {
  if (day <= actual.length) {
    return { day, value: actual[day - 1] ?? 0, kind: 'spent', range: null }
  }

  const f = forecast.find((p) => p.day === day)

  return f ? { day, value: f.mid, kind: 'forecast', range: [f.low, f.high] } : null
}
