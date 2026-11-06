<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseMeter from '@/components/base/BaseMeter.vue'
import type { RunBudgetCardProps } from '@/types/agent'
import { formatEur } from '@/utils/format'

const props = defineProps<RunBudgetCardProps>()

const spend = computed(() => props.team.monthSpendEur + props.runCostEur)
</script>

<template>
  <BaseCard size="sm" :title="`${team.name} this month`">
    <p class="num m-0 text-heading font-semibold text-fg">
      {{ formatEur(spend, { whole: true }) }}
      <span class="text-body font-normal text-fg-3">of {{ formatEur(team.monthBudgetEur, { whole: true }) }}</span>
    </p>
    <BaseMeter
      class="mt-3"
      :value="spend"
      :max="team.monthBudgetEur"
      :label="`${team.name} spend against monthly budget`"
    />
    <p class="mt-2.5 text-body-sm text-fg-2">
      This run adds <span class="num font-medium text-fg">{{ formatEur(runCostEur) }}</span
      >, charged to {{ team.name }}.
    </p>
  </BaseCard>
</template>
