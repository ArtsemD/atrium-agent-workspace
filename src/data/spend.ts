/** Fictional November spend for one company, used by the Spend view */

export const MONTH = { label: 'November 2026', days: 30, today: 18 }
export const COMPANY_BUDGET_EUR = 4000

/** Cumulative spend per day, days 1..today */
export const ACTUAL: number[] = [
  64, 131, 190, 262, 318, 341, 359, 441, 528, 612, 701, 788, 822, 840, 951, 1068, 1182, 1309,
].map((v) => v * 1.765)

/**
 * Forecast for the rest of the month with an uncertainty band.
 * The band widens with distance from today: we know less about later days.
 */
export function forecast(): { day: number; mid: number; low: number; high: number }[] {
  const last = ACTUAL[ACTUAL.length - 1] ?? 0
  const perDay = 78
  const out = []
  for (let day = MONTH.today; day <= MONTH.days; day++) {
    const ahead = day - MONTH.today
    const mid = last + perDay * ahead
    const spread = 9 * ahead + 1.6 * ahead * ahead
    out.push({ day, mid, low: mid - spread, high: mid + spread })
  }
  return out
}

export interface TeamSpend {
  team: string
  spend: number
  budget: number
  runs: number
  usefulRate: number
}

export const TEAMS: TeamSpend[] = [
  { team: 'Finance ops', spend: 1140.2, budget: 1500, runs: 412, usefulRate: 0.84 },
  { team: 'Customer support', spend: 468.9, budget: 500, runs: 1310, usefulRate: 0.71 },
  { team: 'Sales', spend: 452.4, budget: 1200, runs: 233, usefulRate: 0.76 },
  { team: 'Legal', spend: 248.5, budget: 800, runs: 41, usefulRate: 0.9 },
]
