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
  <!-- Who is working, on what, and what it has cost so far -->
  <section class="panel flex flex-wrap items-center gap-x-6 gap-y-4 px-5 py-4" aria-label="Run status">
    <AgentPresence
      :name="`${agent.name}, ${agent.role.toLowerCase()}`"
      :activity="activity"
      :active="status === 'running'"
    />
    <div class="ml-auto flex flex-wrap items-center gap-x-6 gap-y-2">
      <BaseBadge :tone="badge.tone" dot>{{ badge.label }}</BaseBadge>
      <RunStats :tokens="tokens" :cost-eur="costEur" :elapsed-ms="elapsedMs" />
      <BaseButton v-if="live" icon="square" @click="emit('stop')">Stop</BaseButton>
      <BaseButton v-else-if="status !== 'idle'" icon="play" @click="emit('reset')">New run</BaseButton>
    </div>
  </section>
</template>
