<script setup lang="ts">
import { SPINNER } from '@/components/base/constants'
</script>

<template>
  <svg class="size-4 animate-spin" :viewBox="SPINNER.viewBox" fill="none" aria-hidden="true">
    <circle
      :cx="SPINNER.center"
      :cy="SPINNER.center"
      :r="SPINNER.radius"
      stroke="currentColor"
      :stroke-opacity="SPINNER.trackOpacity"
      :stroke-width="SPINNER.stroke"
    />
    <path :d="SPINNER.arc" stroke="currentColor" :stroke-width="SPINNER.stroke" stroke-linecap="round" />
  </svg>
</template>
