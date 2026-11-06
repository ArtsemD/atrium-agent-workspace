<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import KpiTile from '../components/spend/KpiTile.vue'
import SpendChart from '../components/spend/SpendChart.vue'
import Badge from '../components/ui/Badge.vue'
import Meter from '../components/ui/Meter.vue'
import Skeleton from '../components/ui/Skeleton.vue'
import { ACTUAL, COMPANY_BUDGET_EUR, MONTH, TEAMS, forecast } from '../data/spend'
import { formatEur, percent } from '../lib/format'

// Simulated fetch so the loading state is visible; skeletons match the final layout box for box
const loading = ref(true)
onMounted(() => setTimeout(() => (loading.value = false), 900))

const spent = ACTUAL[ACTUAL.length - 1] ?? 0
const end = forecast().at(-1)!
const totalRuns = TEAMS.reduce((s, t) => s + t.runs, 0)
const usefulRuns = TEAMS.reduce((s, t) => s + t.runs * t.usefulRate, 0)
const totalSpend = TEAMS.reduce((s, t) => s + t.spend, 0)

const kpis = computed(() => [
  { label: 'Spent this month', value: formatEur(spent, { whole: true }), hint: `${percent(spent, COMPANY_BUDGET_EUR)}% of ${formatEur(COMPANY_BUDGET_EUR, { whole: true })} budget` },
  {
    label: 'Month-end forecast',
    value: formatEur(end.mid, { whole: true }),
    hint: `likely ${formatEur(end.low, { whole: true })}–${formatEur(end.high, { whole: true })} · under budget`,
    tone: 'ok' as const,
  },
  { label: 'Useful runs', value: `${percent(usefulRuns, totalRuns)}%`, hint: `${Math.round(usefulRuns).toLocaleString('en-GB')} of ${totalRuns.toLocaleString('en-GB')} rated useful` },
  { label: 'Cost per useful run', value: formatEur(totalSpend / usefulRuns), hint: 'down 12% on October', tone: 'ok' as const },
])
</script>

<template>
  <div class="grid gap-4">
    <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <template v-if="loading">
        <div v-for="i in 4" :key="i" class="panel p-4">
          <Skeleton class="h-3 w-24" />
          <Skeleton class="mt-3 h-7 w-28" />
          <Skeleton class="mt-2 h-4 w-40" />
        </div>
      </template>
      <KpiTile v-for="k in kpis" v-else :key="k.label" v-bind="k" />
    </div>

    <section class="panel p-5" aria-labelledby="chart-title">
      <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 id="chart-title" class="m-0 text-[15px] font-semibold text-fg">AI spend against budget</h2>
          <p class="mt-0.5 text-[13px] text-fg-2">{{ MONTH.label }} · all teams, all models</p>
        </div>
        <Badge tone="ok" dot>On track</Badge>
      </div>
      <Skeleton v-if="loading" class="aspect-[1080/340] w-full" />
      <SpendChart v-else />
    </section>

    <section class="panel overflow-hidden" aria-labelledby="teams-title">
      <h2 id="teams-title" class="m-0 border-b border-line px-5 py-4 text-[15px] font-semibold text-fg">By team</h2>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr class="text-left">
              <th class="eyebrow px-5 py-2.5 font-semibold">Team</th>
              <th class="eyebrow w-[44%] px-5 py-2.5 font-semibold">Spend / budget</th>
              <th class="eyebrow px-5 py-2.5 text-right font-semibold">Runs</th>
              <th class="eyebrow px-5 py-2.5 text-right font-semibold">Useful</th>
              <th class="eyebrow px-5 py-2.5 text-right font-semibold">€ / useful run</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in TEAMS" :key="t.team" class="border-t border-line">
              <td class="px-5 py-3.5 font-medium text-fg">{{ t.team }}</td>
              <td class="px-5 py-3.5">
                <template v-if="loading"><Skeleton class="h-4 w-full" /></template>
                <div v-else class="flex items-center gap-3">
                  <Meter size="sm" :value="t.spend" :max="t.budget" :label="`${t.team} spend against budget`" />
                  <span class="num w-36 shrink-0 text-right text-[13px] text-fg-2">
                    {{ formatEur(t.spend, { whole: true }) }} / {{ formatEur(t.budget, { whole: true }) }}
                  </span>
                  <!-- fixed slot so every meter has the same length, with or without a badge -->
                  <span class="w-[84px] shrink-0">
                    <Badge v-if="t.spend / t.budget >= 0.9" tone="warn">Near limit</Badge>
                  </span>
                </div>
              </td>
              <td class="num px-5 py-3.5 text-right text-fg-2">{{ t.runs.toLocaleString('en-GB') }}</td>
              <td class="num px-5 py-3.5 text-right text-fg-2">{{ Math.round(t.usefulRate * 100) }}%</td>
              <td class="num px-5 py-3.5 text-right font-medium text-fg">{{ formatEur(t.spend / (t.runs * t.usefulRate)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>
