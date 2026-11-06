<script setup lang="ts">
import { useId } from 'vue'
import BaseSkeleton from '@/components/base/BaseSkeleton.vue'
import { PERCENT } from '@/constants/app'
import type { TeamSpendTableProps } from '@/types/spend'
import { formatEur, formatInteger } from '@/utils/format'
import { costPerUsefulRun } from '../utils/spend-metrics'
import TeamBudgetCell from './TeamBudgetCell.vue'

defineProps<TeamSpendTableProps>()

const headingId = useId()
</script>

<template>
  <section class="panel overflow-hidden" :aria-labelledby="headingId">
    <h2 :id="headingId" class="m-0 border-b border-line px-5 py-4 text-title font-semibold text-fg">By team</h2>
    <div class="overflow-x-auto">
      <table class="w-full min-w-(--size-table-min) border-collapse text-body">
        <thead>
          <tr class="text-left">
            <th class="eyebrow px-5 py-2.5 font-semibold">Team</th>
            <th class="eyebrow w-(--size-meter-col) px-5 py-2.5 font-semibold">Spend against budget</th>
            <th class="eyebrow px-5 py-2.5 text-right font-semibold">Runs</th>
            <th class="eyebrow px-5 py-2.5 text-right font-semibold">Useful</th>
            <th class="eyebrow px-5 py-2.5 text-right font-semibold">€ / useful run</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in teams" :key="t.team" class="border-t border-line">
            <td class="px-5 py-3.5 font-medium text-fg">{{ t.team }}</td>
            <td class="px-5 py-3.5">
              <div v-if="loading" class="grid gap-2" aria-hidden="true">
                <BaseSkeleton class="h-5 w-full" />
                <BaseSkeleton class="h-1.5 w-full" />
              </div>
              <TeamBudgetCell v-else :team="t" />
            </td>
            <td class="num px-5 py-3.5 text-right text-fg-2">{{ formatInteger(t.runs) }}</td>
            <td class="num px-5 py-3.5 text-right text-fg-2">{{ Math.round(t.usefulRate * PERCENT) }}%</td>
            <td class="num px-5 py-3.5 text-right font-medium text-fg">{{ formatEur(costPerUsefulRun(t)) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
