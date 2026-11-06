<script setup lang="ts">
import { ICON_SIZE } from '@/constants/icons'
import { BUTTON_VARIANT_CLASS } from '@/components/base/constants'
import type { BaseButtonProps } from '@/components/base/types'
import BaseIcon from './BaseIcon.vue'

withDefaults(defineProps<BaseButtonProps>(), { variant: 'secondary', size: 'md', type: 'button' })
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    class="inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap transition-colors duration-(--dur-fast) select-none disabled:cursor-not-allowed disabled:opacity-50"
    :class="[size === 'sm' ? 'h-8 px-2.5 text-body-sm' : 'h-9 px-3.5 text-body', BUTTON_VARIANT_CLASS[variant]]"
  >
    <BaseIcon v-if="icon" :name="icon" :size="size === 'sm' ? ICON_SIZE.sm : ICON_SIZE.md" />
    <slot />
  </button>
</template>
