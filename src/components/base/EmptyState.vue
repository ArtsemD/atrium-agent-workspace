<script setup lang="ts">
import { ICON_SIZE } from '@/constants/icons'
import type { EmptyStateProps } from '@/types/ui'
import BaseIcon from './BaseIcon.vue'

defineProps<EmptyStateProps>()
</script>

<template>
  <div class="flex flex-col items-center px-0 py-8 text-center sm:px-6 sm:py-12">
    <div class="mb-4 grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
      <BaseIcon :name="icon" :size="ICON_SIZE.lg" />
    </div>
    <p class="text-title font-semibold text-fg">{{ title }}</p>
    <p v-if="description" class="mt-1 max-w-sm text-body text-fg-2">{{ description }}</p>
    <div v-if="$slots.default" class="mt-5"><slot /></div>
  </div>
</template>
