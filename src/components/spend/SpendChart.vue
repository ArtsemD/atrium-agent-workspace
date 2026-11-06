<script setup lang="ts">
import { computed, ref } from 'vue'
import { ACTUAL, COMPANY_BUDGET_EUR, MONTH, forecast } from '../../data/spend'
import { formatEur } from '../../lib/format'

// Fixed coordinate space; the SVG scales to its container and keeps its aspect ratio
const W = 1080
const H = 340
const PAD = { top: 16, right: 16, bottom: 28, left: 52 }

const fc = forecast()
const yMax = Math.ceil(Math.max(COMPANY_BUDGET_EUR * 1.08, ...fc.map((f) => f.high)) / 1000) * 1000

const x = (day: number) => PAD.left + ((day - 1) / (MONTH.days - 1)) * (W - PAD.left - PAD.right)
const y = (eur: number) => H - PAD.bottom - (eur / yMax) * (H - PAD.top - PAD.bottom)

const line = (pts: [number, number][]) => pts.map(([d, v], i) => `${i ? 'L' : 'M'}${x(d).toFixed(1)},${y(v).toFixed(1)}`).join('')

const actualPath = line(ACTUAL.map((v, i) => [i + 1, v]))
const actualArea = `${actualPath}L${x(ACTUAL.length)},${y(0)}L${x(1)},${y(0)}Z`
const forecastPath = line(fc.map((f) => [f.day, f.mid]))
const bandPath =
  line(fc.map((f) => [f.day, f.high])) +
  fc
    .slice()
    .reverse()
    .map((f) => `L${x(f.day).toFixed(1)},${y(f.low).toFixed(1)}`)
    .join('') +
  'Z'
const ticks = Array.from({ length: yMax / 1000 + 1 }, (_, i) => i * 1000)
const end = fc[fc.length - 1]!

// Hover: snap to the nearest day and show its value
const hoverDay = ref<number | null>(null)
function onMove(e: PointerEvent) {
  const svg = e.currentTarget as SVGSVGElement
  const box = svg.getBoundingClientRect()
  const px = ((e.clientX - box.left) / box.width) * W
  const day = Math.round(((px - PAD.left) / (W - PAD.left - PAD.right)) * (MONTH.days - 1)) + 1
  hoverDay.value = Math.min(MONTH.days, Math.max(1, day))
}
const hover = computed(() => {
  const d = hoverDay.value
  if (d == null) return null
  if (d <= ACTUAL.length) return { day: d, value: ACTUAL[d - 1]!, kind: 'Spent' as const }
  const f = fc.find((p) => p.day === d)!
  return { day: d, value: f.mid, low: f.low, high: f.high, kind: 'Forecast' as const }
})
</script>

<template>
  <figure class="m-0">
    <div class="relative">
      <svg
        :viewBox="`0 0 ${W} ${H}`"
        class="block h-auto w-full touch-none"
        role="img"
        :aria-label="`Cumulative AI spend for ${MONTH.label}: ${formatEur(ACTUAL[ACTUAL.length - 1] ?? 0, { whole: true })} spent by day ${MONTH.today}, forecast ${formatEur(end.mid, { whole: true })} by month end (likely range ${formatEur(end.low, { whole: true })} to ${formatEur(end.high, { whole: true })}) against a budget of ${formatEur(COMPANY_BUDGET_EUR, { whole: true })}.`"
        @pointermove="onMove"
        @pointerleave="hoverDay = null"
      >
        <defs>
          <linearGradient id="spend-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="var(--chart-1)" stop-opacity="0.22" />
            <stop offset="100%" stop-color="var(--chart-1)" stop-opacity="0" />
          </linearGradient>
        </defs>

        <g v-for="t in ticks" :key="t">
          <line :x1="PAD.left" :x2="W - PAD.right" :y1="y(t)" :y2="y(t)" stroke="var(--line)" />
          <text :x="PAD.left - 10" :y="y(t) + 4" text-anchor="end" font-size="12" fill="var(--fg-3)" class="num">
            {{ t === 0 ? '€0' : `€${t / 1000}k` }}
          </text>
        </g>
        <text v-for="d in [1, 8, 15, 22, 30]" :key="d" :x="x(d)" :y="H - 8" :text-anchor="d === 1 ? 'start' : d === 30 ? 'end' : 'middle'" font-size="12" fill="var(--fg-3)">
          {{ d }} Nov
        </text>

        <!-- budget -->
        <line :x1="PAD.left" :x2="W - PAD.right" :y1="y(COMPANY_BUDGET_EUR)" :y2="y(COMPANY_BUDGET_EUR)" stroke="var(--fg-2)" stroke-dasharray="2 4" />
        <text :x="W - PAD.right" :y="y(COMPANY_BUDGET_EUR) - 7" text-anchor="end" font-size="12" font-weight="600" fill="var(--fg-2)">
          Budget {{ formatEur(COMPANY_BUDGET_EUR, { whole: true }) }}
        </text>

        <!-- forecast with uncertainty band -->
        <path :d="bandPath" fill="var(--chart-1)" fill-opacity="0.12" />
        <path :d="forecastPath" fill="none" stroke="var(--chart-1)" stroke-width="2" stroke-dasharray="5 5" />

        <!-- actual -->
        <path :d="actualArea" fill="url(#spend-fill)" />
        <path :d="actualPath" fill="none" stroke="var(--chart-1)" stroke-width="2.5" stroke-linejoin="round" />

        <!-- today -->
        <line :x1="x(MONTH.today)" :x2="x(MONTH.today)" :y1="PAD.top" :y2="H - PAD.bottom" stroke="var(--line-strong)" />
        <circle :cx="x(MONTH.today)" :cy="y(ACTUAL[ACTUAL.length - 1] ?? 0)" r="4.5" fill="var(--chart-1)" stroke="var(--surface-solid)" stroke-width="2" />

        <g v-if="hover" pointer-events="none">
          <line :x1="x(hover.day)" :x2="x(hover.day)" :y1="PAD.top" :y2="H - PAD.bottom" stroke="var(--fg-3)" stroke-dasharray="2 3" />
          <circle :cx="x(hover.day)" :cy="y(hover.value)" r="4" fill="var(--surface-solid)" stroke="var(--chart-1)" stroke-width="2" />
        </g>
      </svg>

      <div
        v-if="hover"
        class="pointer-events-none absolute top-2 rounded-md border border-line bg-surface-solid px-2.5 py-1.5 text-xs shadow-lg"
        :style="{ left: `${(x(hover.day) / W) * 100}%`, transform: `translateX(${hover.day > 22 ? '-105%' : '8px'})` }"
      >
        <p class="text-fg-3">{{ hover.day }} Nov, {{ hover.kind.toLowerCase() }}</p>
        <p class="num font-semibold text-fg">{{ formatEur(hover.value, { whole: true }) }}</p>
        <p v-if="'low' in hover" class="num text-fg-3">
          likely {{ formatEur(hover.low!, { whole: true }) }}–{{ formatEur(hover.high!, { whole: true }) }}
        </p>
      </div>
    </div>

    <figcaption class="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-fg-2">
      <span class="inline-flex items-center gap-2"><span class="h-0.5 w-4 rounded bg-[var(--chart-1)]" />Spent so far</span>
      <span class="inline-flex items-center gap-2"><span class="h-0 w-4 border-t-2 border-dashed border-[var(--chart-1)]" />Forecast</span>
      <span class="inline-flex items-center gap-2"><span class="h-2.5 w-4 rounded-sm bg-[var(--chart-1)] opacity-20" />Likely range</span>
    </figcaption>
  </figure>
</template>
