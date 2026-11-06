<script setup lang="ts">
import type { RunStatsProps } from '@/types/agent'
import { formatDuration, formatEur, formatTokens } from '@/utils/format'

defineProps<RunStatsProps>()
</script>

<template>
  <!--
    Phones: three equal columns across the row. Desktop: a compact inline group.
    Fixed value widths and tabular figures, so the numbers tick without moving their neighbours.
  -->
  <dl class="m-0 grid flex-1 grid-cols-3 gap-4 text-body lg:flex lg:flex-none lg:gap-6">
    <div>
      <dt class="eyebrow">Tokens</dt>
      <dd class="num m-0 mt-0.5 w-16 font-semibold text-fg">{{ formatTokens(tokens) }}</dd>
    </div>
    <div>
      <dt class="eyebrow">Cost</dt>
      <dd class="num m-0 mt-0.5 w-14 font-semibold text-fg">{{ formatEur(costEur) }}</dd>
    </div>
    <div>
      <dt class="eyebrow">Time</dt>
      <dd class="num m-0 mt-0.5 w-12 font-semibold text-fg">{{ formatDuration(elapsedMs) }}</dd>
    </div>
  </dl>
</template>
