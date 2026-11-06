<script setup lang="ts">
import { useSimulatedLoading } from '@/composables/useSimulatedLoading'
import { SPEND_LOADING_MS } from '@/constants/app'
import { ACTUAL, COMPANY_BUDGET_EUR, COST_PER_USEFUL_RUN_TREND, MONTH, TEAMS, forecast } from '@/data/spend'
import SpendChartCard from '@/features/spend/components/SpendChartCard.vue'
import SpendKpiGrid from '@/features/spend/components/SpendKpiGrid.vue'
import TeamSpendTable from '@/features/spend/components/TeamSpendTable.vue'
import { buildKpis } from '@/features/spend/utils/spend-metrics'

const { loading } = useSimulatedLoading(SPEND_LOADING_MS)

const FORECAST = forecast()
const KPIS = buildKpis({
  actual: ACTUAL,
  forecast: FORECAST,
  budgetEur: COMPANY_BUDGET_EUR,
  teams: TEAMS,
  costTrend: COST_PER_USEFUL_RUN_TREND,
})
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <SpendKpiGrid :kpis="KPIS" :loading="loading" />
    <SpendChartCard
      :loading="loading"
      :month="MONTH"
      :actual="ACTUAL"
      :forecast="FORECAST"
      :budget-eur="COMPANY_BUDGET_EUR"
    />
    <TeamSpendTable :teams="TEAMS" :loading="loading" />
  </div>
</template>
