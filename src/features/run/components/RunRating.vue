<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'
import { ICON_SIZE } from '@/constants/icons'
import { RATING_OPTIONS } from '@/features/run/constants'
import type { RunRatingEmits, RunRatingProps } from '@/features/run/types'

defineProps<RunRatingProps>()
const emit = defineEmits<RunRatingEmits>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface-solid px-4 py-3">
    <p class="text-body-sm text-fg-2">Was this run useful? It counts towards the team's Spend → Value.</p>
    <div class="ml-auto flex gap-1.5" role="group" aria-label="Rate this run">
      <button
        v-for="opt in RATING_OPTIONS"
        :key="opt.id"
        type="button"
        :aria-pressed="rating === opt.id"
        class="inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-body-sm font-medium transition-colors"
        :class="rating === opt.id ? opt.activeClass : 'border-line-strong text-fg-2 hover:bg-sunken'"
        @click="emit('rate', opt.id)"
      >
        <BaseIcon :name="opt.icon" :size="ICON_SIZE.sm" />{{ opt.label }}
      </button>
    </div>
  </div>
</template>
