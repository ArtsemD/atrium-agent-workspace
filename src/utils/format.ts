import { CURRENCY, LOCALE } from '@/constants/app'

const eur = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY })
const eurWhole = new Intl.NumberFormat(LOCALE, { style: 'currency', currency: CURRENCY, maximumFractionDigits: 0 })

export const formatEur = (value: number, opts: { whole?: boolean } = {}): string => {
  return (opts.whole ? eurWhole : eur).format(value)
}
