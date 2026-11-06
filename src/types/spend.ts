export interface Month {
  label: string
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
