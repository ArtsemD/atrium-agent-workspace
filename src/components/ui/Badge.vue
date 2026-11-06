<script setup lang="ts">
withDefaults(
  defineProps<{ tone?: 'neutral' | 'accent' | 'ok' | 'warn' | 'danger'; dot?: boolean }>(),
  { tone: 'neutral' },
)
</script>

<template>
  <span
    class="inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium whitespace-nowrap"
    :class="{
      'bg-sunken text-fg-2': tone === 'neutral',
      'bg-accent-soft text-accent': tone === 'accent',
      'bg-ok-soft text-ok': tone === 'ok',
      'bg-warn-soft text-warn': tone === 'warn',
      'bg-danger-soft text-danger': tone === 'danger',
    }"
  >
    <span v-if="dot" class="size-1.5 rounded-full bg-current" aria-hidden="true" />
    <slot />
  </span>
</template>
