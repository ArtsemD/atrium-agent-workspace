import type { ForecastModel, ForecastPoint, Month, TeamSpend } from '@/features/spend/types'

/** Fictional November spend for one company, used by the Spend view */

export const MONTH: Month = { label: 'November 2026', short: 'Nov', days: 30, today: 18 }
export const COMPANY_BUDGET_EUR = 4000

/** Cumulative spend in euros at the end of each day so far */
export const ACTUAL: readonly number[] = [
  113, 231, 335, 462, 561, 602, 634, 778, 932, 1080, 1237, 1391, 1451, 1483, 1679, 1885, 2086, 2310,
]

const FORECAST_MODEL: ForecastModel = { perDayEur: 78, spreadLinear: 9, spreadQuadratic: 1.6 }

/** Forecast for the rest of the month. The band widens with distance from today: we know less about later days. */
export const forecast = (model: ForecastModel = FORECAST_MODEL): ForecastPoint[] => {
  const last = ACTUAL.at(-1) ?? 0
  const out: ForecastPoint[] = []

  for (let day = MONTH.today; day <= MONTH.days; day++) {
    const ahead = day - MONTH.today
    const mid = last + model.perDayEur * ahead
    const spread = model.spreadLinear * ahead + model.spreadQuadratic * ahead ** 2

    out.push({ day, mid, low: mid - spread, high: mid + spread })
  }

  return out
}

export const TEAMS: readonly TeamSpend[] = [
  { team: 'Finance ops', spend: 1140.2, budget: 1500, runs: 412, usefulRate: 0.84 },
  { team: 'Customer support', spend: 468.9, budget: 500, runs: 1310, usefulRate: 0.71 },
  { team: 'Sales', spend: 452.4, budget: 1200, runs: 233, usefulRate: 0.76 },
  { team: 'Legal', spend: 248.5, budget: 800, runs: 41, usefulRate: 0.9 },
]

/** Fictional month-on-month change shown on the cost per useful run tile */
export const COST_PER_USEFUL_RUN_TREND = 'down 12% on October'
