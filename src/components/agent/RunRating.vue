<script setup lang="ts">
import Icon from '../ui/Icon.vue'

defineProps<{ rating: 'useful' | 'not-useful' | null }>()
const emit = defineEmits<{ rate: [rating: 'useful' | 'not-useful'] }>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 rounded-lg border border-line bg-surface-solid px-4 py-3">
    <p class="text-[13px] text-fg-2">Was this run useful? It counts towards the team's Spend → Value.</p>
    <div class="ml-auto flex gap-1.5" role="group" aria-label="Rate this run">
      <button
        v-for="opt in [
          { id: 'useful', label: 'Useful', icon: 'thumbUp' },
          { id: 'not-useful', label: 'Not useful', icon: 'thumbDown' },
        ] as const"
        :key="opt.id"
        type="button"
        :aria-pressed="rating === opt.id"
        class="inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-[13px] font-medium transition-colors"
        :class="
          rating === opt.id
            ? opt.id === 'useful'
              ? 'border-ok/40 bg-ok-soft text-ok'
              : 'border-danger/40 bg-danger-soft text-danger'
            : 'border-line-strong text-fg-2 hover:bg-sunken'
        "
        @click="emit('rate', opt.id)"
      >
        <Icon :name="opt.icon" :size="14" /> {{ opt.label }}
      </button>
    </div>
  </div>
</template>
