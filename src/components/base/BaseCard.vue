<script setup lang="ts">
import { useId } from 'vue'
import { CARD_SIZE } from '@/components/base/constants'
import type { BaseCardProps } from '@/components/base/types'

withDefaults(defineProps<BaseCardProps>(), { size: 'md' })

const headingId = useId()
</script>

<template>
  <section class="panel" :class="CARD_SIZE[size].box" :aria-labelledby="title ? headingId : undefined">
    <header
      v-if="title"
      class="flex flex-wrap items-baseline justify-between gap-2"
      :class="size === 'sm' ? 'mb-3' : 'mb-4'"
    >
      <div>
        <component :is="CARD_SIZE[size].heading" :id="headingId" :class="CARD_SIZE[size].headingClass">{{
          title
        }}</component>
        <p v-if="description" class="mt-0.5 text-body-sm text-fg-2">{{ description }}</p>
      </div>
      <slot name="actions" />
    </header>
    <slot />
  </section>
</template>
