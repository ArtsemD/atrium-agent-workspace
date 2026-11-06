<script setup lang="ts">
import { ICON_SIZE } from '@/constants/icons'
import type { EmptyStateProps } from '@/components/base/types'
import BaseIcon from './BaseIcon.vue'

defineProps<EmptyStateProps>()
</script>

<template>
  <div class="flex flex-col items-center py-2 text-center">
    <div class="mb-3 grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
      <BaseIcon :name="icon" :size="ICON_SIZE.lg" />
    </div>
    <p class="text-title font-semibold text-fg">{{ title }}</p>
    <p v-if="description" class="mt-1 max-w-sm text-body text-fg-2">{{ description }}</p>
    <!-- Full width with no padding of its own: the card around it already has padding -->
    <div v-if="$slots.default" class="mt-4 flex w-full justify-center"><slot /></div>
  </div>
</template>
