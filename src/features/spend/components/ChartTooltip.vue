<script setup lang="ts">
import type { ChartTooltipProps } from '@/types/spend'
import { formatEur } from '@/utils/format'

defineProps<ChartTooltipProps>()
</script>

<template>
  <div
    class="pointer-events-none absolute top-2 rounded-md border border-line bg-surface-solid px-2.5 py-1.5 text-meta shadow-lg"
  >
    <p class="text-fg-3">{{ hover.day }} {{ monthShort }}, {{ hover.kind }}</p>
    <p class="num font-semibold text-fg">{{ formatEur(hover.value, { whole: true }) }}</p>
    <p v-if="hover.range" class="num text-fg-3">
      likely {{ formatEur(hover.range[0], { whole: true }) }}–{{ formatEur(hover.range[1], { whole: true }) }}
    </p>
  </div>
</template>
