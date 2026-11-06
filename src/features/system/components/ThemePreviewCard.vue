<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import { THEME_SWATCHES } from '@/constants/app'
import type { ThemePreviewCardProps } from '@/types/app'

defineProps<ThemePreviewCardProps>()
</script>

<template>
  <!-- data-theme scopes the tokens, so this card renders in its own theme whatever the page uses -->
  <div :data-theme="theme.id" class="rounded-lg border border-line bg-bg p-3 text-fg">
    <p class="text-body-sm font-semibold">{{ theme.label }}</p>
    <ul class="m-0 mt-2 grid list-none grid-cols-8 gap-1 p-0">
      <li
        v-for="token in THEME_SWATCHES"
        :key="token"
        class="aspect-square rounded border border-line"
        :style="{ background: `var(--${token})` }"
        :title="`--${token}`"
      />
    </ul>
    <div class="mt-3 flex gap-1.5">
      <BaseButton size="sm" variant="primary">Approve</BaseButton>
      <BaseButton size="sm">Reject</BaseButton>
    </div>
  </div>
</template>
