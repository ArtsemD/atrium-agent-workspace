<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'
import type { RunModelCardProps } from '@/types/agent'

defineProps<RunModelCardProps>()
</script>

<template>
  <BaseCard size="sm" title="Model">
    <p class="m-0 text-body-sm text-fg">{{ model }}</p>
  </BaseCard>
</template>
