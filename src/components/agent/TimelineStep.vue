<script setup lang="ts">
import { computed } from 'vue'
import Icon from '../ui/Icon.vue'
import type { IconName } from '../ui/icons'
import type { StepKind } from '../../data/run-script'
import { formatDuration, formatTokens } from '../../lib/format'

const props = defineProps<{
  kind: StepKind
  title: string
  detail: string
  source?: string
  status: 'running' | 'done'
  tokens: number
  durationMs: number
  last?: boolean
}>()

const ICON: Record<StepKind, IconName> = {
  plan: 'list',
  read: 'database',
  analyze: 'search',
  proposal: 'pencil',
  apply: 'check',
  result: 'flag',
}
const icon = computed(() => ICON[props.kind])
</script>

<template>
  <li class="relative grid grid-cols-[32px_1fr] gap-x-3" style="animation: rise 320ms var(--ease-out) both">
    <!-- rail -->
    <div class="relative flex justify-center">
      <span
        v-if="!last"
        class="absolute top-8 bottom-0 w-px bg-line-strong"
        aria-hidden="true"
      />
      <span
        class="relative z-10 grid size-8 place-items-center rounded-full border"
        :class="
          status === 'running'
            ? 'border-accent bg-accent-soft text-accent'
            : kind === 'proposal'
              ? 'border-warn/40 bg-warn-soft text-warn'
              : 'border-line bg-surface-solid text-fg-2'
        "
      >
        <svg v-if="status === 'running'" class="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".25" stroke-width="2.5" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
        </svg>
        <Icon v-else :name="icon" :size="15" />
      </span>
    </div>

    <div class="min-w-0 pb-6">
      <div class="flex min-h-8 flex-wrap items-center gap-x-3 gap-y-1">
        <p class="text-sm font-semibold text-fg">{{ title }}</p>
        <span v-if="source" class="inline-flex items-center gap-1 text-xs text-fg-3">
          <Icon name="lock" :size="12" /> {{ source }}
        </span>
      </div>
      <p v-if="status === 'running'" class="mt-1 h-5" aria-hidden="true">
        <span
          class="inline-block h-3 w-56 max-w-full rounded"
          style="
            background: linear-gradient(90deg, var(--surface-sunken) 25%, var(--line-strong) 50%, var(--surface-sunken) 75%);
            background-size: 200% 100%;
            animation: shimmer 1.4s linear infinite;
          "
        />
      </p>
      <p v-else class="mt-1 text-sm leading-5 text-fg-2">{{ detail }}</p>
      <p class="num mt-1.5 text-xs text-fg-3">
        {{ formatTokens(tokens) }} tokens<template v-if="status === 'done'"> · {{ formatDuration(durationMs) }}</template>
      </p>
      <div v-if="$slots.default" class="mt-3"><slot /></div>
    </div>
  </li>
</template>
