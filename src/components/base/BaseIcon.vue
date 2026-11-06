<script setup lang="ts">
import { ICON_PATHS, ICON_SIZE } from '@/constants/icons'
import { ICON_STROKE_WIDTH } from '@/components/base/constants'
import type { BaseIconProps } from '@/components/base/types'

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
