import { describe, expect, it } from 'vitest'
import type { ForecastPoint, TeamSpend } from '@/types/spend'
import { buildKpis, costPerUsefulRun, isNearLimit, isOnTrack } from './spend-metrics'

const team = (spend: number, budget: number): TeamSpend => ({ team: 'T', spend, budget, runs: 100, usefulRate: 0.5 })
const point = (mid: number): ForecastPoint => ({ day: 30, mid, low: mid - 10, high: mid + 10 })

describe('spend metrics', () => {
  it('flags a team at 90% of its budget', () => {
    expect(isNearLimit(team(89, 100))).toBe(false)
    expect(isNearLimit(team(90, 100))).toBe(true)
  })

  it('divides spend by useful runs only', () => expect(costPerUsefulRun(team(100, 200))).toBe(2))

  it('is on track while the forecast stays inside the budget', () => {
    expect(isOnTrack([point(900)], 1000)).toBe(true)
    expect(isOnTrack([point(1100)], 1000)).toBe(false)
  })

  it('warns on the forecast tile when it goes over budget', () => {
    const kpis = buildKpis({
      actual: [500],
      forecast: [point(1100)],
      budgetEur: 1000,
      teams: [team(500, 1000)],
      costTrend: '',
    })
    expect(kpis[1]?.tone).toBe('warn')
    expect(kpis[1]?.hint).toContain('over budget')
  })
})
