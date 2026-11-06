<script setup lang="ts">
import { computed } from 'vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import BaseSpinner from '@/components/base/BaseSpinner.vue'
import { ICON_SIZE } from '@/constants/icons'
import { formatDuration, formatTokens } from '@/lib/format'
import type { StepKind, TimelineStepProps } from '@/types/agent'
import type { IconName } from '@/types/ui'

const props = defineProps<TimelineStepProps>()

const STEP_ICON: Record<StepKind, IconName> = {
  plan: 'list',
  read: 'database',
  analyze: 'search',
  proposal: 'pencil',
  apply: 'check',
  result: 'flag',
}

const markerClass = computed(() => {
  if (props.status === 'running') return 'border-accent bg-accent-soft text-accent'
  if (props.kind === 'proposal') return 'border-warn/40 bg-warn-soft text-warn'
  return 'border-line bg-surface-solid text-fg-2'
})
</script>

<template>
  <li class="rise-in relative grid grid-cols-(--layout-timeline) gap-x-3">
    <!-- Rail and marker -->
    <div class="relative flex justify-center">
      <span v-if="!last" class="absolute top-8 bottom-0 w-px bg-line-strong" aria-hidden="true" />
      <span class="relative z-10 grid size-8 place-items-center rounded-full border" :class="markerClass">
        <BaseSpinner v-if="status === 'running'" />
        <BaseIcon v-else :name="STEP_ICON[kind]" :size="ICON_SIZE.sm" />
      </span>
    </div>

    <div class="min-w-0 pb-6">
      <div class="flex min-h-8 flex-wrap items-center gap-x-3 gap-y-1">
        <p class="text-body font-semibold text-fg">{{ title }}</p>
        <span v-if="source" class="inline-flex items-center gap-1 text-meta text-fg-3">
          <BaseIcon name="lock" :size="ICON_SIZE.sm" />{{ source }}
        </span>
      </div>
      <p v-if="status === 'running'" class="mt-1 h-5" aria-hidden="true">
        <span class="skeleton inline-block h-3 w-56 max-w-full rounded" />
      </p>
      <p v-else class="mt-1 text-body text-fg-2">{{ detail }}</p>
      <p class="num mt-1.5 flex gap-3 text-meta text-fg-3">
        <span>{{ formatTokens(tokens) }} tokens</span>
        <span v-if="status === 'done'">{{ formatDuration(durationMs) }}</span>
      </p>
      <div v-if="$slots.default" class="mt-3"><slot /></div>
    </div>
  </li>
</template>
