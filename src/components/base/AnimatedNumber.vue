<script setup lang="ts">
import { computed } from 'vue'
import { useCountUp } from '@/composables/useCountUp'
import type { AnimatedNumberProps } from './types'

const props = defineProps<AnimatedNumberProps>()

const shown = useCountUp(() => props.value)
const text = computed(() => props.format(shown.value))
</script>

<template>
  <!-- Screen readers get the final value once, not every frame of the count -->
  <span class="num"
    ><span aria-hidden="true">{{ text }}</span
    ><span class="sr-only">{{ format(value) }}</span></span
  >
</template>
