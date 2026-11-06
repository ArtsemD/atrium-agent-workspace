<script setup lang="ts">
import { ICON_SIZE } from '@/constants/icons'
import type { BaseButtonProps, ButtonVariant } from '@/types/ui'
import BaseIcon from './BaseIcon.vue'

withDefaults(defineProps<BaseButtonProps>(), { variant: 'secondary', size: 'md', type: 'button' })

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-fg hover:bg-accent/90',
  secondary: 'border border-line-strong bg-surface-solid text-fg hover:bg-sunken',
  ghost: 'text-fg-2 hover:bg-sunken hover:text-fg',
  danger: 'border border-line-strong bg-surface-solid text-danger hover:bg-danger-soft',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    class="inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap transition-colors duration-(--dur-fast) select-none disabled:cursor-not-allowed disabled:opacity-50"
    :class="[size === 'sm' ? 'h-8 px-2.5 text-body-sm' : 'h-9 px-3.5 text-body', VARIANT_CLASS[variant]]"
  >
    <BaseIcon v-if="icon" :name="icon" :size="size === 'sm' ? ICON_SIZE.sm : ICON_SIZE.md" />
    <slot />
  </button>
</template>
