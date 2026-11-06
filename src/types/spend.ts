export interface Month {
  label: string
  /** Short month name for axis labels, e.g. "Nov" */
  short: string
  days: number
  today: number
}

export interface ForecastPoint {
  day: number
  mid: number
  low: number
  high: number
}

export interface ForecastModel {
  perDayEur: number
  /** Spread grows as linear * days + quadratic * days² ahead of today */
  spreadLinear: number
  spreadQuadratic: number
}

export interface TeamSpend {
  team: string
  spend: number
  budget: number
  runs: number
  usefulRate: number
}

export interface KpiTileProps {
  label: string
  value: string
  hint?: string
  tone?: 'neutral' | 'ok' | 'warn'
}

/** A point on the spend chart: day of month and euros */
export type ChartPoint = readonly [day: number, eur: number]

export interface ChartFrame {
  width: number
  height: number
  pad: { top: number; right: number; bottom: number; left: number }
  days: number
  yMax: number
}

export interface ChartHover {
  day: number
  value: number
  kind: 'spent' | 'forecast'
  range: readonly [low: number, high: number] | null
}

export interface SpendChartProps {
  month: Month
  /** Cumulative spend at the end of each day so far */
  actual: readonly number[]
  forecast: readonly ForecastPoint[]
  budgetEur: number
}

export interface SpendKpiGridProps {
  kpis: readonly KpiTileProps[]
  loading: boolean
}

export interface SpendChartCardProps extends SpendChartProps {
  loading: boolean
}

export interface TeamSpendTableProps {
  teams: readonly TeamSpend[]
  loading: boolean
}

export interface TeamBudgetCellProps {
  team: TeamSpend
}

export interface ChartScales {
  x(day: number): number
  y(eur: number): number
  linePath(points: readonly ChartPoint[]): string
  /** Line closed down to the x axis, for a filled area */
  areaPath(points: readonly ChartPoint[]): string
  /** Area between an upper and a lower line, for an uncertainty band */
  bandPath(upper: readonly ChartPoint[], lower: readonly ChartPoint[]): string
  /** Nearest day for a horizontal position given as a fraction of the chart width */
  dayAt(fractionX: number): number
}

export interface SpendSummaryInput {
  actual: readonly number[]
  forecast: readonly ForecastPoint[]
  budgetEur: number
  teams: readonly TeamSpend[]
  costTrend: string
}

export interface ChartTooltipProps {
  hover: ChartHover
  monthShort: string
}
