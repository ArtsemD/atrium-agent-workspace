import { LOCALE, PERCENT } from '@/constants/app'

const integer = new Intl.NumberFormat(LOCALE)

export const formatInteger = (value: number): string => {
  return integer.format(Math.round(value))
}

/** Whole-number percentage; 0 when max is 0 */
export const percent = (value: number, max: number): number => {
  return max <= 0 ? 0 : Math.round((value / max) * PERCENT)
}
