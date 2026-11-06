<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { RUN_STATUS_BADGE } from '@/constants/run'
import type { RunHeaderEmits, RunHeaderProps } from '@/types/agent'
import { isLive } from '../utils/run-status'
import AgentPresence from './AgentPresence.vue'
import RunStats from './RunStats.vue'

const props = defineProps<RunHeaderProps>()
const emit = defineEmits<RunHeaderEmits>()

const badge = computed(() => RUN_STATUS_BADGE[props.status])
const live = computed(() => isLive(props.status))
</script>

<template>
  <!-- Phones: who and status on top, numbers and the action under a divider. Desktop: one row. -->
  <section class="panel flex flex-wrap items-center gap-x-6 gap-y-4 p-4 sm:px-5" aria-label="Run status">
    <AgentPresence
      class="flex-1"
      :name="`${agent.name}, ${agent.role.toLowerCase()}`"
      :activity="activity"
      :active="status === 'running'"
    >
      <template #status>
        <BaseBadge :tone="badge.tone" dot>{{ badge.label }}</BaseBadge>
      </template>
    </AgentPresence>
    <div class="flex w-full items-center justify-between gap-4 border-t border-line pt-4 lg:w-auto lg:border-0 lg:pt-0">
      <RunStats :tokens="tokens" :cost-eur="costEur" :elapsed-ms="elapsedMs" />
      <BaseButton v-if="live" icon="square" @click="emit('stop')">Stop</BaseButton>
      <BaseButton v-else-if="status !== 'idle'" icon="play" @click="emit('reset')">New run</BaseButton>
    </div>
  </section>
</template>
