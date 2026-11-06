<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseSkeleton from '@/components/base/BaseSkeleton.vue'
import type { SpendChartCardProps } from '@/types/spend'
import { isOnTrack } from '../utils/spend-metrics'
import SpendChart from './SpendChart.vue'

const props = defineProps<SpendChartCardProps>()

const onTrack = computed(() => isOnTrack(props.forecast, props.budgetEur))
</script>

<template>
  <BaseCard title="AI spend against budget" :description="`${month.label}, all teams and models`">
    <template #actions>
      <BaseBadge :tone="onTrack ? 'ok' : 'warn'" dot>{{ onTrack ? 'On track' : 'Over budget' }}</BaseBadge>
    </template>
    <BaseSkeleton v-if="loading" class="aspect-(--chart-aspect) min-h-(--size-chart-min) w-full" />
    <SpendChart v-else :month="month" :actual="actual" :forecast="forecast" :budget-eur="budgetEur" />
  </BaseCard>
</template>
