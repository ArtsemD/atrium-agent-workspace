<script setup lang="ts">
defineProps<{ label: string; value: string; hint?: string; tone?: 'neutral' | 'ok' | 'warn' }>()
</script>

<template>
  <div class="panel p-4">
    <p class="eyebrow">{{ label }}</p>
    <p class="num mt-2 text-2xl font-semibold tracking-tight text-fg">{{ value }}</p>
    <p
      v-if="hint"
      class="mt-1 text-[13px]"
      :class="{ 'text-fg-2': !tone || tone === 'neutral', 'text-ok': tone === 'ok', 'text-warn': tone === 'warn' }"
    >
      {{ hint }}
    </p>
    <slot />
  </div>
</template>
