import { computed, ref, type Ref } from 'vue'
import { PERCENT } from '@/constants/app'
import { CHART } from '@/constants/chart'
import type { ChartFrame, ChartScales, SpendChartProps } from '@/types/spend'
import { hoverPointAt } from '../utils/chart-geometry'

/** Pointer tracking for the spend chart: snaps to the nearest day and places the tooltip */
export function useChartHover(props: SpendChartProps, frame: Ref<ChartFrame>, scales: Ref<ChartScales>) {
  const hoverDay = ref<number | null>(null)

  function onPointerMove(e: PointerEvent) {
    const box = (e.currentTarget as Element).getBoundingClientRect()
    hoverDay.value = scales.value.dayAt((e.clientX - box.left) / box.width)
  }
  function onPointerLeave() {
    hoverDay.value = null
  }

  const hover = computed(() =>
    hoverDay.value == null ? null : hoverPointAt(hoverDay.value, props.actual, props.forecast),
  )

  const tooltipStyle = computed(() =>
    hover.value
      ? {
          left: `${(scales.value.x(hover.value.day) / frame.value.width) * PERCENT}%`,
          transform: hover.value.day > CHART.tooltipFlipDay ? CHART.tooltipShift.left : CHART.tooltipShift.right,
        }
      : undefined,
  )

  return { hover, tooltipStyle, onPointerMove, onPointerLeave }
}
