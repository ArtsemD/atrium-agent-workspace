<script setup lang="ts">
import { computed } from 'vue'
import BaseMeter from '@/components/base/BaseMeter.vue'
import { PERCENT } from '@/constants/app'
import type { TeamBudgetCellProps } from '@/types/spend'
import { formatEur } from '@/utils/format'
import { budgetUsed, isNearLimit } from '../utils/spend-metrics'

const props = defineProps<TeamBudgetCellProps>()

const used = computed(() => Math.round(budgetUsed(props.team) * PERCENT))
const nearLimit = computed(() => isNearLimit(props.team))
</script>

<template>
  <!-- Amount and share on one line, the meter full width under them: same layout for every row -->
  <div class="grid gap-2">
    <div class="flex items-baseline justify-between gap-3 text-body-sm">
      <span class="num">
        <span class="font-medium text-fg">{{ formatEur(team.spend, { whole: true }) }}</span>
        <span class="text-fg-3"> of {{ formatEur(team.budget, { whole: true }) }}</span>
      </span>
      <span class="num" :class="nearLimit ? 'font-medium text-warn' : 'text-fg-3'">
        {{ nearLimit ? `Near limit, ${used}%` : `${used}%` }}
      </span>
    </div>
    <BaseMeter size="sm" :value="team.spend" :max="team.budget" :label="`${team.team} spend against budget`" />
  </div>
</template>
