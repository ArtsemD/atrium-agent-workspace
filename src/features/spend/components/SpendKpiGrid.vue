<script setup lang="ts">
import BaseSkeleton from '@/components/base/BaseSkeleton.vue'
import type { SpendKpiGridProps } from '@/types/spend'
import KpiTile from './KpiTile.vue'

defineProps<SpendKpiGridProps>()
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
    <!-- Skeletons take the same box as the tiles, so nothing shifts when data arrives -->
    <template v-if="loading">
      <div v-for="k in kpis" :key="k.label" class="panel p-4" aria-hidden="true">
        <BaseSkeleton class="h-3 w-24" />
        <BaseSkeleton class="mt-3 h-7 w-28" />
        <BaseSkeleton class="mt-2 h-4 w-40" />
      </div>
    </template>
    <KpiTile v-for="k in kpis" v-else :key="k.label" v-bind="k" />
  </div>
</template>
