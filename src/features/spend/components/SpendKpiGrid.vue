<script setup lang="ts">
import type { SpendKpiGridProps } from '@/features/spend/types'
import KpiTile from './KpiTile.vue'
import KpiTileSkeleton from './KpiTileSkeleton.vue'

defineProps<SpendKpiGridProps>()
</script>

<template>
  <div class="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
    <template v-if="loading">
      <KpiTileSkeleton v-for="k in kpis" :key="k.label" />
    </template>
    <KpiTile v-for="k in kpis" v-else :key="k.label" v-bind="k" />
  </div>
</template>
