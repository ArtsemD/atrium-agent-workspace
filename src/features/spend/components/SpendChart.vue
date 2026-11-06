<script setup lang="ts">
import { useTemplateRef } from 'vue'
import { useElementWidth } from '@/composables/useElementWidth'
import { CHART } from '@/features/spend/constants'
import type { SpendChartProps } from '@/features/spend/types'
import { formatEur } from '@/utils/format'
import { useChartHover } from '../composables/useChartHover'
import { useSpendChart } from '../composables/useSpendChart'
import ChartLegend from './ChartLegend.vue'
import ChartTooltip from './ChartTooltip.vue'

const props = defineProps<SpendChartProps>()

const container = useTemplateRef<HTMLElement>('container')
const width = useElementWidth(container)

const { frame, scales, paths, yTicks, xTickDays, today, summary } = useSpendChart(props, width)
const { hover, tooltipStyle, onPointerMove, onPointerLeave } = useChartHover(props, frame, scales)

const tickAnchor = (day: number): 'start' | 'middle' | 'end' =>
  day === 1 ? 'start' : day === props.month.days ? 'end' : 'middle'

const tickLabel = (eur: number): string => (eur === 0 ? '€0' : `€${eur / CHART.yTickStepEur}k`)
</script>

<template>
  <figure class="m-0">
    <div ref="container" class="relative">
      <svg
        :viewBox="`0 0 ${frame.width} ${frame.height}`"
        class="block h-auto w-full touch-none"
        role="img"
        :aria-label="summary"
        :font-size="CHART.fontSize"
        @pointermove="onPointerMove"
        @pointerleave="onPointerLeave"
      >
        <defs>
          <linearGradient id="spend-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="var(--chart-1)" :stop-opacity="CHART.opacity.areaTop" />
            <stop offset="100%" stop-color="var(--chart-1)" stop-opacity="0" />
          </linearGradient>
        </defs>

        <!-- Axes -->
        <g v-for="t in yTicks" :key="t">
          <line
            :x1="frame.pad.left"
            :x2="frame.width - frame.pad.right"
            :y1="scales.y(t)"
            :y2="scales.y(t)"
            stroke="var(--line)"
          />
          <text
            :x="frame.pad.left - CHART.labelOffset.x"
            :y="scales.y(t) + CHART.labelOffset.y"
            text-anchor="end"
            fill="var(--fg-3)"
            class="num"
          >
            {{ tickLabel(t) }}
          </text>
        </g>
        <text
          v-for="d in xTickDays"
          :key="d"
          :x="scales.x(d)"
          :y="frame.height - CHART.labelOffset.axis"
          :text-anchor="tickAnchor(d)"
          fill="var(--fg-3)"
        >
          {{ d }} {{ month.short }}
        </text>

        <!-- Budget -->
        <line
          :x1="frame.pad.left"
          :x2="frame.width - frame.pad.right"
          :y1="scales.y(budgetEur)"
          :y2="scales.y(budgetEur)"
          stroke="var(--fg-2)"
          :stroke-dasharray="CHART.dash.budget"
        />
        <text
          :x="frame.width - frame.pad.right"
          :y="scales.y(budgetEur) - CHART.labelOffset.budget"
          text-anchor="end"
          font-weight="600"
          fill="var(--fg-2)"
        >
          Budget {{ formatEur(budgetEur, { whole: true }) }}
        </text>

        <!-- Forecast with its uncertainty band -->
        <path :d="paths.band" fill="var(--chart-1)" :fill-opacity="CHART.opacity.band" />
        <path
          :d="paths.forecast"
          fill="none"
          stroke="var(--chart-1)"
          :stroke-width="CHART.stroke.forecast"
          :stroke-dasharray="CHART.dash.forecast"
        />

        <!-- Spent so far -->
        <path :d="paths.actualArea" fill="url(#spend-fill)" />
        <path
          :d="paths.actual"
          fill="none"
          stroke="var(--chart-1)"
          :stroke-width="CHART.stroke.actual"
          stroke-linejoin="round"
        />

        <!-- Today -->
        <line
          :x1="scales.x(today.day)"
          :x2="scales.x(today.day)"
          :y1="frame.pad.top"
          :y2="frame.height - frame.pad.bottom"
          stroke="var(--line-strong)"
        />
        <circle
          :cx="scales.x(today.day)"
          :cy="scales.y(today.value)"
          :r="CHART.radius.today"
          fill="var(--chart-1)"
          stroke="var(--surface-solid)"
          :stroke-width="CHART.stroke.todayRing"
        />

        <!-- Hover -->
        <g v-if="hover" pointer-events="none">
          <line
            :x1="scales.x(hover.day)"
            :x2="scales.x(hover.day)"
            :y1="frame.pad.top"
            :y2="frame.height - frame.pad.bottom"
            stroke="var(--fg-3)"
            :stroke-dasharray="CHART.dash.hover"
          />
          <circle
            :cx="scales.x(hover.day)"
            :cy="scales.y(hover.value)"
            :r="CHART.radius.hover"
            fill="var(--surface-solid)"
            stroke="var(--chart-1)"
            :stroke-width="CHART.stroke.hoverDot"
          />
        </g>
      </svg>

      <ChartTooltip v-if="hover" :hover="hover" :month-short="month.short" :style="tooltipStyle" />
    </div>

    <ChartLegend />
  </figure>
</template>
