<script setup lang="ts">
import AnimatedNumber from '@/components/base/AnimatedNumber.vue'
import { KPI_HINT_CLASS } from '@/features/spend/constants'
import type { KpiTileProps } from '@/features/spend/types'

withDefaults(defineProps<KpiTileProps>(), { tone: 'neutral' })
</script>

<template>
  <!-- On phones label and hint reserve two lines each: tiles in a row line up and match their skeleton -->
  <div class="panel p-3.5 sm:p-4">
    <p class="eyebrow min-h-8 sm:min-h-0">{{ label }}</p>
    <p class="mt-2 text-heading sm:text-display font-semibold tracking-tight text-fg">
      <AnimatedNumber :value="value" :format="format" />
    </p>
    <p v-if="hint" class="mt-1 min-h-10 text-body-sm sm:min-h-0" :class="KPI_HINT_CLASS[tone]">{{ hint }}</p>
    <slot />
  </div>
</template>
