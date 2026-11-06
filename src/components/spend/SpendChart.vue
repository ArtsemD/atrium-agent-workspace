<script setup lang="ts">
import { computed, ref } from 'vue'
import { PERCENT } from '@/constants/app'
import { CHART } from '@/constants/chart'
import { ACTUAL, COMPANY_BUDGET_EUR, MONTH, forecast } from '@/data/spend'
import { formatEur } from '@/lib/format'

const { width: W, height: H, pad: PAD } = CHART
const fc = forecast()
const end = fc.at(-1)!
const lastActual = ACTUAL.at(-1) ?? 0
const peak = Math.max(COMPANY_BUDGET_EUR * CHART.headroom, ...fc.map((f) => f.high))
const yMax = Math.ceil(peak / CHART.yTickStepEur) * CHART.yTickStepEur

const x = (day: number) => PAD.left + ((day - 1) / (MONTH.days - 1)) * (W - PAD.left - PAD.right)
const y = (eur: number) => H - PAD.bottom - (eur / yMax) * (H - PAD.top - PAD.bottom)
const point = (day: number, eur: number) => `${x(day).toFixed(1)},${y(eur).toFixed(1)}`
const line = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([d, v], i) => `${i ? 'L' : 'M'}${point(d, v)}`).join('')

const actualPath = line(ACTUAL.map((v, i) => [i + 1, v] as const))
const actualArea = `${actualPath}L${point(ACTUAL.length, 0)}L${point(1, 0)}Z`
const forecastPath = line(fc.map((f) => [f.day, f.mid] as const))
const bandPath = `${line(fc.map((f) => [f.day, f.high] as const))}${[...fc]
  .reverse()
  .map((f) => `L${point(f.day, f.low)}`)
  .join('')}Z`
const yTicks = Array.from({ length: yMax / CHART.yTickStepEur + 1 }, (_, i) => i * CHART.yTickStepEur)

const tickAnchor = (day: number) => (day === 1 ? 'start' : day === MONTH.days ? 'end' : 'middle')
const tickLabel = (eur: number) => (eur === 0 ? '€0' : `€${eur / CHART.yTickStepEur}k`)

const summary = `Cumulative AI spend for ${MONTH.label}: ${formatEur(lastActual, { whole: true })} spent by day ${MONTH.today}, forecast ${formatEur(end.mid, { whole: true })} by month end (likely ${formatEur(end.low, { whole: true })} to ${formatEur(end.high, { whole: true })}) against a budget of ${formatEur(COMPANY_BUDGET_EUR, { whole: true })}.`

// Hover snaps to the nearest day
const hoverDay = ref<number | null>(null)
function onMove(e: PointerEvent) {
  const box = (e.currentTarget as SVGSVGElement).getBoundingClientRect()
  const px = ((e.clientX - box.left) / box.width) * W
  const day = Math.round(((px - PAD.left) / (W - PAD.left - PAD.right)) * (MONTH.days - 1)) + 1
  hoverDay.value = Math.min(MONTH.days, Math.max(1, day))
}
const hover = computed(() => {
  const d = hoverDay.value
  if (d == null) return null
  if (d <= ACTUAL.length) return { day: d, value: ACTUAL[d - 1] ?? 0, kind: 'spent', range: null }
  const f = fc.find((p) => p.day === d)
  return f ? { day: d, value: f.mid, kind: 'forecast', range: [f.low, f.high] as const } : null
})
const tooltipStyle = computed(() =>
  hover.value
    ? {
        left: `${(x(hover.value.day) / W) * PERCENT}%`,
        transform: hover.value.day > CHART.tooltipFlipDay ? CHART.tooltipShift.left : CHART.tooltipShift.right,
      }
    : undefined,
)
</script>

<template>
  <figure class="m-0">
    <div class="relative">
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        class="block h-auto w-full touch-none"
        role="img"
        :aria-label="summary"
        :font-size="CHART.fontSize"
        @pointermove="onMove"
        @pointerleave="hoverDay = null"
      >
        <defs>
          <linearGradient id="spend-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="var(--chart-1)" :stop-opacity="CHART.opacity.areaTop" />
            <stop offset="100%" stop-color="var(--chart-1)" stop-opacity="0" />
          </linearGradient>
        </defs>

        <g v-for="t in yTicks" :key="t">
          <line :x1="PAD.left" :x2="W - PAD.right" :y1="y(t)" :y2="y(t)" stroke="var(--line)" />
          <text
            :x="PAD.left - CHART.labelOffset.x"
            :y="y(t) + CHART.labelOffset.y"
            text-anchor="end"
            fill="var(--fg-3)"
            class="num"
          >
            {{ tickLabel(t) }}
          </text>
        </g>
        <text
          v-for="d in CHART.xTickDays"
          :key="d"
          :x="x(d)"
          :y="H - CHART.labelOffset.axis"
          :text-anchor="tickAnchor(d)"
          fill="var(--fg-3)"
        >
          {{ d }} Nov
        </text>

        <!-- Budget -->
        <line
          :x1="PAD.left"
          :x2="W - PAD.right"
          :y1="y(COMPANY_BUDGET_EUR)"
          :y2="y(COMPANY_BUDGET_EUR)"
          stroke="var(--fg-2)"
          :stroke-dasharray="CHART.dash.budget"
        />
        <text
          :x="W - PAD.right"
          :y="y(COMPANY_BUDGET_EUR) - CHART.labelOffset.budget"
          text-anchor="end"
          font-weight="600"
          fill="var(--fg-2)"
        >
          Budget {{ formatEur(COMPANY_BUDGET_EUR, { whole: true }) }}
        </text>

        <!-- Forecast with its uncertainty band -->
        <path :d="bandPath" fill="var(--chart-1)" :fill-opacity="CHART.opacity.band" />
        <path
          :d="forecastPath"
          fill="none"
          stroke="var(--chart-1)"
          :stroke-width="CHART.stroke.forecast"
          :stroke-dasharray="CHART.dash.forecast"
        />

        <!-- Spent so far -->
        <path :d="actualArea" fill="url(#spend-fill)" />
        <path
          :d="actualPath"
          fill="none"
          stroke="var(--chart-1)"
          :stroke-width="CHART.stroke.actual"
          stroke-linejoin="round"
        />

        <!-- Today -->
        <line
          :x1="x(MONTH.today)"
          :x2="x(MONTH.today)"
          :y1="PAD.top"
          :y2="H - PAD.bottom"
          stroke="var(--line-strong)"
        />
        <circle
          :cx="x(MONTH.today)"
          :cy="y(lastActual)"
          :r="CHART.radius.today"
          fill="var(--chart-1)"
          stroke="var(--surface-solid)"
          :stroke-width="CHART.stroke.todayRing"
        />

        <g v-if="hover" pointer-events="none">
          <line
            :x1="x(hover.day)"
            :x2="x(hover.day)"
            :y1="PAD.top"
            :y2="H - PAD.bottom"
            stroke="var(--fg-3)"
            :stroke-dasharray="CHART.dash.hover"
          />
          <circle
            :cx="x(hover.day)"
            :cy="y(hover.value)"
            :r="CHART.radius.hover"
            fill="var(--surface-solid)"
            stroke="var(--chart-1)"
            :stroke-width="CHART.stroke.hoverDot"
          />
        </g>
      </svg>

      <div
        v-if="hover"
        class="pointer-events-none absolute top-2 rounded-md border border-line bg-surface-solid px-2.5 py-1.5 text-meta shadow-lg"
        :style="tooltipStyle"
      >
        <p class="text-fg-3">{{ hover.day }} Nov, {{ hover.kind }}</p>
        <p class="num font-semibold text-fg">{{ formatEur(hover.value, { whole: true }) }}</p>
        <p v-if="hover.range" class="num text-fg-3">
          likely {{ formatEur(hover.range[0], { whole: true }) }}–{{ formatEur(hover.range[1], { whole: true }) }}
        </p>
      </div>
    </div>

    <figcaption class="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-meta text-fg-2">
      <span class="inline-flex items-center gap-2"><span class="h-0.5 w-4 rounded bg-chart-1" />Spent so far</span>
      <span class="inline-flex items-center gap-2"
        ><span class="h-0 w-4 border-t-2 border-dashed border-chart-1" />Forecast</span
      >
      <span class="inline-flex items-center gap-2"
        ><span class="h-2.5 w-4 rounded-sm bg-chart-1/20" />Likely range</span
      >
    </figcaption>
  </figure>
</template>
