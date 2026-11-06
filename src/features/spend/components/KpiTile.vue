<script setup lang="ts">
import type { KpiTileProps } from '@/types/spend'

withDefaults(defineProps<KpiTileProps>(), { tone: 'neutral' })

const HINT_CLASS: Record<NonNullable<KpiTileProps['tone']>, string> = {
  neutral: 'text-fg-2',
  ok: 'text-ok',
  warn: 'text-warn',
}
</script>

<template>
  <!-- On phones label and hint reserve two lines each: tiles in a row line up and match their skeleton -->
  <div class="panel p-3.5 sm:p-4">
    <p class="eyebrow min-h-8 sm:min-h-0">{{ label }}</p>
    <p class="num mt-2 text-heading sm:text-display font-semibold tracking-tight text-fg">{{ value }}</p>
    <p v-if="hint" class="mt-1 min-h-10 text-body-sm sm:min-h-0" :class="HINT_CLASS[tone]">{{ hint }}</p>
    <slot />
  </div>
</template>
