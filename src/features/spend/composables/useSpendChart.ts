import { computed } from 'vue'
import { CHART } from '@/constants/chart'
import type { ChartFrame, ChartPoint, SpendChartProps } from '@/types/spend'
import { createScales, niceCeil, ticks } from '../utils/chart-geometry'
import { describeSpendChart } from '../utils/spend-metrics'

/** Everything the spend chart draws, derived from its props */
export function useSpendChart(props: SpendChartProps) {
  const frame = computed<ChartFrame>(() => {
    const peak = Math.max(props.budgetEur * CHART.headroom, ...props.forecast.map((f) => f.high))
    return {
      width: CHART.width,
      height: CHART.height,
      pad: CHART.pad,
      days: props.month.days,
      yMax: niceCeil(peak, CHART.yTickStepEur),
    }
  })
  const scales = computed(() => createScales(frame.value))

  const paths = computed(() => {
    const s = scales.value
    const actual: ChartPoint[] = props.actual.map((v, i) => [i + 1, v])
    return {
      actual: s.linePath(actual),
      actualArea: s.areaPath(actual),
      forecast: s.linePath(props.forecast.map((f) => [f.day, f.mid])),
      band: s.bandPath(
        props.forecast.map((f) => [f.day, f.high]),
        props.forecast.map((f) => [f.day, f.low]),
      ),
    }
  })

  const yTicks = computed(() => ticks(frame.value.yMax, CHART.yTickStepEur))
  const today = computed(() => ({ day: props.month.today, value: props.actual.at(-1) ?? 0 }))
  const summary = computed(() => describeSpendChart(props.month, props.actual, props.forecast, props.budgetEur))

  return { frame, scales, paths, yTicks, today, summary }
}
