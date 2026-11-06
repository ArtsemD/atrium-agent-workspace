<script setup lang="ts">
import { BADGE_TONE_CLASS } from '@/components/base/constants'
import type { BaseBadgeProps } from '@/components/base/types'

withDefaults(defineProps<BaseBadgeProps>(), { tone: 'neutral' })
</script>

<template>
  <span
    class="inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-meta font-medium whitespace-nowrap"
    :class="BADGE_TONE_CLASS[tone]"
  >
    <span v-if="dot" class="size-1.5 rounded-full bg-current" aria-hidden="true" />
    <slot />
  </span>
</template>
