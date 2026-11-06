<script setup lang="ts">
import Icon from '../ui/Icon.vue'

defineProps<{ name: string; activity: string; active: boolean }>()
</script>

<template>
  <div class="flex items-center gap-3">
    <!-- The agent's presence: a soft ring breathes while it is working, and stops when it waits for you -->
    <div class="relative grid size-9 place-items-center">
      <span
        v-if="active"
        class="absolute inset-0 rounded-full bg-accent/40"
        style="animation: pulse-ring 1.8s var(--ease-out) infinite"
        aria-hidden="true"
      />
      <span class="relative grid size-9 place-items-center rounded-full bg-accent text-accent-fg">
        <Icon name="sparkles" :size="16" />
      </span>
    </div>
    <div class="min-w-0">
      <p class="text-sm font-semibold text-fg">{{ name }}</p>
      <!-- polite live region: screen readers hear what the agent is doing without being interrupted -->
      <p class="truncate text-[13px] text-fg-2" aria-live="polite">{{ activity }}</p>
    </div>
  </div>
</template>
