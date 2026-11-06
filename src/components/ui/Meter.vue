<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ value: number; max: number; label: string; size?: 'sm' | 'md' }>(), {
  size: 'md',
})

const ratio = computed(() => (props.max > 0 ? props.value / props.max : 0))
// Tone carries meaning, so it is paired with a text label wherever the meter is used
const tone = computed(() => (ratio.value >= 1 ? 'danger' : ratio.value >= 0.9 ? 'warn' : 'accent'))
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
      class="h-full rounded-full transition-[width] duration-500 ease-out"
      :class="{ 'bg-accent': tone === 'accent', 'bg-warn': tone === 'warn', 'bg-danger': tone === 'danger' }"
      :style="{ width: `${Math.min(ratio, 1) * 100}%` }"
    />
  </div>
</template>
