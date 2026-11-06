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
  <div class="panel p-3.5 sm:p-4">
    <p class="eyebrow">{{ label }}</p>
    <p class="num mt-2 text-heading sm:text-display font-semibold tracking-tight text-fg">{{ value }}</p>
    <p v-if="hint" class="mt-1 text-body-sm" :class="HINT_CLASS[tone]">{{ hint }}</p>
    <slot />
  </div>
</template>
