<script setup lang="ts">
import { ICON_PATHS, ICON_SIZE, ICON_STROKE_WIDTH } from '@/constants/icons'
import type { BaseIconProps } from '@/types/ui'

withDefaults(defineProps<BaseIconProps>(), { size: ICON_SIZE.md })
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="ICON_STROKE_WIDTH"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    class="shrink-0"
  >
    <path :d="ICON_PATHS[name]" />
  </svg>
</template>
