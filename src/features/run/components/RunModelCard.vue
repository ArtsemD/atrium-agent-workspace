<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'
import type { RunModelCardProps } from '@/types/agent'
import { formatEur } from '@/utils/format'

defineProps<RunModelCardProps>()
</script>

<template>
  <!-- Says which model does the work and how the cost above is worked out -->
  <BaseCard size="sm" title="Model and price">
    <dl class="m-0 grid gap-2 text-body-sm">
      <div class="flex justify-between gap-3">
        <dt class="text-fg-2">Model</dt>
        <dd class="m-0 text-right text-fg">{{ model }}</dd>
      </div>
      <div class="flex justify-between gap-3">
        <dt class="text-fg-2">Routed through</dt>
        <dd class="m-0 text-right text-fg">{{ gateway }}</dd>
      </div>
      <div class="flex justify-between gap-3">
        <dt class="text-fg-2">Price</dt>
        <dd class="num m-0 text-right text-fg">{{ formatEur(eurPerMillionTokens) }} per 1M tokens</dd>
      </div>
    </dl>
    <p class="mt-3 text-meta text-fg-3">
      A small model reads, a stronger one checks. Every token is billed at one blended rate.
    </p>
  </BaseCard>
</template>
