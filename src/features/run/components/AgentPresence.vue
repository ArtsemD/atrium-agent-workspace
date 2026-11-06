<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'
import type { AgentPresenceProps } from '@/features/run/types'

defineProps<AgentPresenceProps>()
</script>

<template>
  <div class="flex min-w-0 items-center gap-3">
    <!-- The ring breathes while the agent works and stops when it waits for a person -->
    <div class="relative grid size-9 shrink-0 place-items-center">
      <span v-if="active" class="presence-ring absolute inset-0 rounded-full bg-accent/40" aria-hidden="true" />
      <span class="relative grid size-9 place-items-center rounded-full bg-accent text-accent-fg">
        <BaseIcon name="sparkles" />
      </span>
    </div>
    <div class="min-w-0 flex-1">
      <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p class="text-body font-semibold text-fg">{{ name }}</p>
        <!-- Status sits on the name line, so the activity below gets the full width on a phone -->
        <slot name="status" />
      </div>
      <!-- Polite live region: screen readers hear what the agent is doing without being interrupted -->
      <p class="line-clamp-2 text-body-sm text-fg-2 lg:truncate" aria-live="polite">{{ activity }}</p>
    </div>
  </div>
</template>
