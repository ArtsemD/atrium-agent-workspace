<script setup lang="ts">
import Icon from './Icon.vue'
import type { IconName } from './icons'

defineProps<{ icon: IconName; title: string; description?: string }>()
</script>

<template>
  <div class="flex flex-col items-center px-6 py-12 text-center">
    <div class="mb-4 grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
      <Icon :name="icon" :size="20" />
    </div>
    <p class="text-[15px] font-semibold text-fg">{{ title }}</p>
    <p v-if="description" class="mt-1 max-w-sm text-sm text-fg-2">{{ description }}</p>
    <div v-if="$slots.default" class="mt-5"><slot /></div>
  </div>
</template>
