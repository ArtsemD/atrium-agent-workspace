import { METER_THRESHOLD } from '@/constants/thresholds'
import type { ForecastPoint, KpiTileProps, Month, SpendSummaryInput, TeamSpend } from '@/types/spend'
import { formatEur, formatInteger, percent } from '@/utils/format'
import { ratio, sumBy } from '@/utils/math'

const whole = { whole: true } as const

const usefulRuns = (team: TeamSpend): number => team.runs * team.usefulRate

export const costPerUsefulRun = (team: TeamSpend): number => ratio(team.spend, usefulRuns(team))
export const budgetUsed = (team: TeamSpend): number => ratio(team.spend, team.budget)
export const isNearLimit = (team: TeamSpend): boolean => budgetUsed(team) >= METER_THRESHOLD.warn

/** Whether the month-end forecast stays inside the budget */
export const isOnTrack = (forecast: readonly ForecastPoint[], budgetEur: number): boolean => {
  return (forecast.at(-1)?.mid ?? 0) <= budgetEur
}

/** The four headline numbers at the top of the Spend view */
export const buildKpis = ({ actual, forecast, budgetEur, teams, costTrend }: SpendSummaryInput): KpiTileProps[] => {
  const spent = actual.at(-1) ?? 0
  const end = forecast.at(-1)
  const totalRuns = sumBy(teams, (t) => t.runs)
  const useful = sumBy(teams, usefulRuns)
  const onTrack = isOnTrack(forecast, budgetEur)

  return [
    {
      label: 'Spent this month',
      value: formatEur(spent, whole),
      hint: `${percent(spent, budgetEur)}% of ${formatEur(budgetEur, whole)} budget`,
    },
    {
      label: 'Month-end forecast',
      value: formatEur(end?.mid ?? spent, whole),
      hint: end
        ? `likely ${formatEur(end.low, whole)}–${formatEur(end.high, whole)}, ${onTrack ? 'under' : 'over'} budget`
        : undefined,
      tone: onTrack ? 'ok' : 'warn',
    },
    {
      label: 'Useful runs',
      value: `${percent(useful, totalRuns)}%`,
      hint: `${formatInteger(useful)} of ${formatInteger(totalRuns)} rated useful`,
    },
    {
      label: 'Cost per useful run',
      value: formatEur(
        ratio(
          sumBy(teams, (t) => t.spend),
          useful,
        ),
      ),
      hint: costTrend,
      tone: 'ok',
    },
  ]
}

/** Text alternative for the chart, read by screen readers */
export const describeSpendChart = (
  month: Month,
  actual: readonly number[],
  forecast: readonly ForecastPoint[],
  budgetEur: number,
): string => {
  const spent = formatEur(actual.at(-1) ?? 0, whole)
  const end = forecast.at(-1)

  const outlook = end
    ? `, forecast ${formatEur(end.mid, whole)} by month end (likely ${formatEur(end.low, whole)} to ${formatEur(end.high, whole)})`
    : ''

  return `Cumulative AI spend for ${month.label}: ${spent} spent by day ${month.today}${outlook} against a budget of ${formatEur(budgetEur, whole)}.`
}
