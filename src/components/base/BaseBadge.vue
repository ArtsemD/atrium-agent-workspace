<script setup lang="ts">
import type { BaseBadgeProps, Tone } from '@/types/ui'

withDefaults(defineProps<BaseBadgeProps>(), { tone: 'neutral' })

const TONE_CLASS: Record<Tone, string> = {
  neutral: 'bg-sunken text-fg-2',
  accent: 'bg-accent-soft text-accent',
  ok: 'bg-ok-soft text-ok',
  warn: 'bg-warn-soft text-warn',
  danger: 'bg-danger-soft text-danger',
}
</script>

<template>
  <span
    class="inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-meta font-medium whitespace-nowrap"
    :class="TONE_CLASS[tone]"
  >
    <span v-if="dot" class="size-1.5 rounded-full bg-current" aria-hidden="true" />
    <slot />
  </span>
</template>
