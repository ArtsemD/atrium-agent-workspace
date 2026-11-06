import { computed, type Ref } from 'vue'
import { CHART } from '@/features/spend/constants'
import type { ChartFrame, ChartPoint, SpendChartModel, SpendChartProps } from '@/features/spend/types'
import { createScales, niceCeil, ticks } from '../utils/chart-geometry'
import { describeSpendChart } from '../utils/spend-metrics'

/** Everything the spend chart draws, derived from its props and the width it has */
export const useSpendChart = (props: SpendChartProps, measuredWidth: Ref<number>): SpendChartModel => {
  const frame = computed<ChartFrame>(() => {
    const peak = Math.max(props.budgetEur * CHART.headroom, ...props.forecast.map((f) => f.high))
    const width = measuredWidth.value || CHART.width

    return {
      width,
      height: Math.max(CHART.minHeight, Math.round((width * CHART.height) / CHART.width)),
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
  const xTickDays = computed(() => (frame.value.width < CHART.compactWidth ? CHART.compactXTickDays : CHART.xTickDays))
  const today = computed(() => ({ day: props.month.today, value: props.actual.at(-1) ?? 0 }))
  const summary = computed(() => describeSpendChart(props.month, props.actual, props.forecast, props.budgetEur))

  return { frame, scales, paths, yTicks, xTickDays, today, summary }
}
