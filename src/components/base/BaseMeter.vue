<script setup lang="ts">
import { computed } from 'vue'
import { PERCENT } from '@/constants/app'
import { METER_THRESHOLD } from '@/constants/thresholds'
import type { BaseMeterProps } from '@/types/ui'

const props = withDefaults(defineProps<BaseMeterProps>(), { size: 'md' })

const ratio = computed(() => (props.max > 0 ? props.value / props.max : 0))

// Colour carries meaning, so wherever the meter is used it is paired with a text label
const toneClass = computed(() => {
  if (ratio.value >= METER_THRESHOLD.over) {
    return 'bg-danger'
  }

  if (ratio.value >= METER_THRESHOLD.warn) {
    return 'bg-warn'
  }

  return 'bg-accent'
})

const fill = computed(() => `${Math.min(ratio.value, METER_THRESHOLD.over) * PERCENT}%`)
</script>

<template>
  <div
    role="meter"
    :aria-label="label"
    :aria-valuenow="Math.round(value)"
    aria-valuemin="0"
    :aria-valuemax="Math.round(max)"
    class="w-full overflow-hidden rounded-full bg-sunken"
    :class="size === 'sm' ? 'h-1.5' : 'h-2'"
  >
    <div
      class="h-full rounded-full transition-all duration-(--dur-meter) ease-out"
      :class="toneClass"
      :style="{ width: fill }"
    />
  </div>
</template>
