<script setup lang="ts">
import Icon from './Icon.vue'
import type { IconName } from './icons'

withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md'
    icon?: IconName
    loading?: boolean
    disabled?: boolean
    type?: 'button' | 'submit'
  }>(),
  { variant: 'secondary', size: 'md', type: 'button' },
)
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    class="inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium transition-[background-color,color,box-shadow,opacity] duration-150 select-none disabled:cursor-not-allowed disabled:opacity-50"
    :class="[
      size === 'sm' ? 'h-8 px-2.5 text-[13px]' : 'h-9 px-3.5 text-sm',
      {
        'bg-accent text-accent-fg hover:opacity-90': variant === 'primary',
        'border border-line-strong bg-surface-solid text-fg hover:bg-sunken': variant === 'secondary',
        'text-fg-2 hover:bg-sunken hover:text-fg': variant === 'ghost',
        'border border-line-strong bg-surface-solid text-danger hover:bg-danger-soft': variant === 'danger',
      },
    ]"
  >
    <Icon v-if="icon" :name="icon" :size="size === 'sm' ? 14 : 16" />
    <slot />
  </button>
</template>
