<script setup lang="ts">
import { useId } from 'vue'
import type { BaseCardProps, CardSize } from '@/types/ui'

withDefaults(defineProps<BaseCardProps>(), { size: 'md' })

const headingId = useId()

const SIZE: Record<CardSize, { box: string; heading: 'h2' | 'h3'; headingClass: string }> = {
  sm: { box: 'p-4', heading: 'h3', headingClass: 'eyebrow m-0' },
  md: { box: 'p-5', heading: 'h2', headingClass: 'm-0 text-title font-semibold text-fg' },
}
</script>

<template>
  <section class="panel" :class="SIZE[size].box" :aria-labelledby="title ? headingId : undefined">
    <header
      v-if="title"
      class="flex flex-wrap items-baseline justify-between gap-2"
      :class="size === 'sm' ? 'mb-3' : 'mb-4'"
    >
      <div>
        <component :is="SIZE[size].heading" :id="headingId" :class="SIZE[size].headingClass">{{ title }}</component>
        <p v-if="description" class="mt-0.5 text-body-sm text-fg-2">{{ description }}</p>
      </div>
      <slot name="actions" />
    </header>
    <slot />
  </section>
</template>
