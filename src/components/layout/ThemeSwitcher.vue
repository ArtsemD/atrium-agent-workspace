<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { theme, themes } = useTheme()
</script>

<template>
  <fieldset class="m-0 border-0 p-0">
    <legend class="eyebrow mb-2 px-1">Theme</legend>
    <div class="grid grid-cols-4 gap-1 rounded-md bg-sunken p-1">
      <label
        v-for="t in themes"
        :key="t.id"
        class="cursor-pointer rounded px-1 py-1 text-center text-meta transition-colors has-focus-visible:outline-2 has-focus-visible:outline-accent"
        :class="theme === t.id ? 'bg-surface-solid font-medium text-fg shadow-sm' : 'text-fg-2 hover:text-fg'"
      >
        <input v-model="theme" type="radio" name="theme" :value="t.id" class="sr-only" />{{ t.label }}
      </label>
    </div>
  </fieldset>
</template>
