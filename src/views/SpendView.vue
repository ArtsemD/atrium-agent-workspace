<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseMeter from '@/components/base/BaseMeter.vue'
import BaseSkeleton from '@/components/base/BaseSkeleton.vue'
import KpiTile from '@/components/spend/KpiTile.vue'
import SpendChart from '@/components/spend/SpendChart.vue'
import { PERCENT, SPEND_LOADING_MS } from '@/constants/app'
import { METER_THRESHOLD } from '@/constants/thresholds'
import { ACTUAL, COMPANY_BUDGET_EUR, MONTH, TEAMS, forecast } from '@/data/spend'
import { formatEur, formatInteger, percent } from '@/lib/format'
import type { KpiTileProps, TeamSpend } from '@/types/spend'

const KPI_SKELETON_COUNT = 4
/** Fictional month-on-month change shown on the last tile */
const COST_PER_USEFUL_RUN_CHANGE = 'down 12% on October'

// Simulated fetch so the loading state is visible; skeletons match the final layout box for box
const loading = ref(true)
onMounted(() => setTimeout(() => (loading.value = false), SPEND_LOADING_MS))

const spent = ACTUAL.at(-1) ?? 0
const end = forecast().at(-1)!
const totalRuns = TEAMS.reduce((s, t) => s + t.runs, 0)
const usefulRuns = TEAMS.reduce((s, t) => s + t.runs * t.usefulRate, 0)
const totalSpend = TEAMS.reduce((s, t) => s + t.spend, 0)

const kpis: KpiTileProps[] = [
  {
    label: 'Spent this month',
    value: formatEur(spent, { whole: true }),
    hint: `${percent(spent, COMPANY_BUDGET_EUR)}% of ${formatEur(COMPANY_BUDGET_EUR, { whole: true })} budget`,
  },
  {
    label: 'Month-end forecast',
    value: formatEur(end.mid, { whole: true }),
    hint: `likely ${formatEur(end.low, { whole: true })}–${formatEur(end.high, { whole: true })}, under budget`,
    tone: 'ok',
  },
  {
    label: 'Useful runs',
    value: `${percent(usefulRuns, totalRuns)}%`,
    hint: `${formatInteger(usefulRuns)} of ${formatInteger(totalRuns)} rated useful`,
  },
  {
    label: 'Cost per useful run',
    value: formatEur(totalSpend / usefulRuns),
    hint: COST_PER_USEFUL_RUN_CHANGE,
    tone: 'ok',
  },
]

const nearLimit = (t: TeamSpend) => t.spend / t.budget >= METER_THRESHOLD.warn
const costPerUsefulRun = (t: TeamSpend) => formatEur(t.spend / (t.runs * t.usefulRate))
</script>

<template>
  <div class="grid gap-4">
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <template v-if="loading">
        <div v-for="i in KPI_SKELETON_COUNT" :key="i" class="panel p-4">
          <BaseSkeleton class="h-3 w-24" />
          <BaseSkeleton class="mt-3 h-7 w-28" />
          <BaseSkeleton class="mt-2 h-4 w-40" />
        </div>
      </template>
      <KpiTile v-for="k in kpis" v-else :key="k.label" v-bind="k" />
    </div>

    <section class="panel p-5" aria-labelledby="chart-title">
      <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 id="chart-title" class="m-0 text-title font-semibold text-fg">AI spend against budget</h2>
          <p class="mt-0.5 text-body-sm text-fg-2">{{ MONTH.label }}, all teams and models</p>
        </div>
        <BaseBadge tone="ok" dot>On track</BaseBadge>
      </div>
      <BaseSkeleton v-if="loading" class="aspect-(--chart-aspect) w-full" />
      <SpendChart v-else />
    </section>

    <section class="panel overflow-hidden" aria-labelledby="teams-title">
      <h2 id="teams-title" class="m-0 border-b border-line px-5 py-4 text-title font-semibold text-fg">By team</h2>
      <div class="overflow-x-auto">
        <table class="w-full min-w-(--size-table-min) border-collapse text-body">
          <thead>
            <tr class="text-left">
              <th class="eyebrow px-5 py-2.5 font-semibold">Team</th>
              <th class="eyebrow w-(--size-meter-col) px-5 py-2.5 font-semibold">Spend / budget</th>
              <th class="eyebrow px-5 py-2.5 text-right font-semibold">Runs</th>
              <th class="eyebrow px-5 py-2.5 text-right font-semibold">Useful</th>
              <th class="eyebrow px-5 py-2.5 text-right font-semibold">€ / useful run</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in TEAMS" :key="t.team" class="border-t border-line">
              <td class="px-5 py-3.5 font-medium text-fg">{{ t.team }}</td>
              <td class="px-5 py-3.5">
                <BaseSkeleton v-if="loading" class="h-4 w-full" />
                <div v-else class="flex items-center gap-3">
                  <BaseMeter size="sm" :value="t.spend" :max="t.budget" :label="`${t.team} spend against budget`" />
                  <span class="num w-36 shrink-0 text-right text-body-sm text-fg-2">
                    {{ formatEur(t.spend, { whole: true }) }} / {{ formatEur(t.budget, { whole: true }) }}
                  </span>
                  <!-- Fixed slot so every meter has the same length, with or without a badge -->
                  <span class="w-(--size-badge-slot) shrink-0">
                    <BaseBadge v-if="nearLimit(t)" tone="warn">Near limit</BaseBadge>
                  </span>
                </div>
              </td>
              <td class="num px-5 py-3.5 text-right text-fg-2">{{ formatInteger(t.runs) }}</td>
              <td class="num px-5 py-3.5 text-right text-fg-2">{{ Math.round(t.usefulRate * PERCENT) }}%</td>
              <td class="num px-5 py-3.5 text-right font-medium text-fg">{{ costPerUsefulRun(t) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
