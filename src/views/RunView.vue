<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import AgentPresence from '@/components/agent/AgentPresence.vue'
import ProposedWrites from '@/components/agent/ProposedWrites.vue'
import RunRating from '@/components/agent/RunRating.vue'
import TimelineStep from '@/components/agent/TimelineStep.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import BaseMeter from '@/components/base/BaseMeter.vue'
import EmptyState from '@/components/base/EmptyState.vue'
import { ELAPSED_TICK_MS, QUERY } from '@/constants/app'
import { ICON_SIZE } from '@/constants/icons'
import { SCENE_FLUSH_LIMIT } from '@/constants/run'
import { useAgentRun } from '@/composables/useAgentRun'
import { ACCESS, AGENT, DEFAULT_TASK, TEAM } from '@/data/run-script'
import { formatDuration, formatEur, formatTokens } from '@/lib/format'
import type { RunStatus } from '@/types/agent'
import type { Scene } from '@/types/app'
import type { Tone } from '@/types/ui'

const STATUS_BADGE: Record<RunStatus, { tone: Tone; label: string }> = {
  idle: { tone: 'neutral', label: 'Idle' },
  running: { tone: 'accent', label: 'Running' },
  'awaiting-approval': { tone: 'warn', label: 'Needs approval' },
  completed: { tone: 'ok', label: 'Completed' },
  stopped: { tone: 'neutral', label: 'Stopped' },
}

const sceneParam = new URLSearchParams(location.search).get(QUERY.scene)
const scene: Scene | null = sceneParam === 'approval' || sceneParam === 'done' ? sceneParam : null

// A scene plays the run instantly instead of in real time
const run = useAgentRun(undefined, scene ? () => Promise.resolve() : undefined)
const { state } = run
const task = ref(DEFAULT_TASK)

const isLive = computed(() => state.status === 'running' || state.status === 'awaiting-approval')
const teamSpend = computed(() => TEAM.monthSpendEur + run.costEur.value)

const activity = computed(() => {
  switch (state.status) {
    case 'idle':
      return 'Ready for a task'
    case 'running': {
      const current = state.steps.find((s) => s.status === 'running')
      return current ? `${current.title}…` : 'Working…'
    }
    case 'awaiting-approval':
      return `Waiting for you to review ${run.pendingCount.value} proposed changes`
    case 'completed':
      return 'Finished. Tell it whether the result was useful'
    case 'stopped':
      return 'Stopped by you'
  }
  return ''
})

// Elapsed time ticks only while the run is live
const now = ref(Date.now())
let timer: number | undefined
watch(isLive, (live) => {
  window.clearInterval(timer)
  if (live) timer = window.setInterval(() => (now.value = Date.now()), ELAPSED_TICK_MS)
})
const elapsed = computed(() => (state.startedAt ? (state.finishedAt || now.value) - state.startedAt : 0))

async function settle(until: () => boolean) {
  for (let i = 0; i < SCENE_FLUSH_LIMIT && !until(); i++) await Promise.resolve()
}

onMounted(async () => {
  if (!scene) return
  void run.start(DEFAULT_TASK)
  await settle(() => state.status === 'awaiting-approval')
  if (scene !== 'done') return
  run.decide('w1', 'approved')
  run.decide('w2', 'approved')
  run.decide('w3', 'rejected')
  run.confirmDecisions()
  await settle(() => state.status === 'completed')
  run.rate('useful')
})

onBeforeUnmount(() => {
  window.clearInterval(timer)
  run.stop()
})

function startRun() {
  if (task.value.trim()) void run.start(task.value.trim())
}
</script>

<template>
  <div class="grid gap-4">
    <!-- Who is working, on what, and what it has cost so far -->
    <section class="panel flex flex-wrap items-center gap-x-6 gap-y-4 px-5 py-4">
      <AgentPresence
        :name="`${AGENT.name}, ${AGENT.role.toLowerCase()}`"
        :activity="activity"
        :active="state.status === 'running'"
      />
      <div class="ml-auto flex flex-wrap items-center gap-x-6 gap-y-2">
        <BaseBadge :tone="STATUS_BADGE[state.status].tone" dot>{{ STATUS_BADGE[state.status].label }}</BaseBadge>
        <dl class="flex gap-6 text-body">
          <div>
            <dt class="eyebrow">Tokens</dt>
            <dd class="num m-0 mt-0.5 w-16 font-semibold text-fg">{{ formatTokens(run.tokens.value) }}</dd>
          </div>
          <div>
            <dt class="eyebrow">Cost</dt>
            <dd class="num m-0 mt-0.5 w-14 font-semibold text-fg">{{ formatEur(run.costEur.value) }}</dd>
          </div>
          <div>
            <dt class="eyebrow">Time</dt>
            <dd class="num m-0 mt-0.5 w-12 font-semibold text-fg">{{ formatDuration(elapsed) }}</dd>
          </div>
        </dl>
        <BaseButton v-if="isLive" icon="square" @click="run.stop()">Stop</BaseButton>
        <BaseButton v-else-if="state.status !== 'idle'" icon="play" @click="run.reset()">New run</BaseButton>
      </div>
    </section>

    <div class="grid items-start gap-4 lg:grid-cols-(--layout-run)">
      <section class="panel min-h-(--size-run-panel) p-5" aria-labelledby="run-title">
        <template v-if="state.status === 'idle'">
          <h2 id="run-title" class="sr-only">New run</h2>
          <EmptyState
            icon="sparkles"
            :title="`Hand a task to ${AGENT.name}`"
            description="It plans the work, reads what it needs and shows you every change before anything is written."
          >
            <form class="w-(--size-composer) text-left" @submit.prevent="startRun">
              <label for="task" class="eyebrow">Task</label>
              <textarea
                id="task"
                v-model="task"
                rows="3"
                class="mt-2 w-full resize-none rounded-md border border-line-strong bg-surface-solid px-3 py-2.5 text-body text-fg outline-none placeholder:text-fg-3 focus:border-accent"
              />
              <div class="mt-3 flex items-center justify-between gap-3">
                <p class="text-meta text-fg-3">Scripted demo run, no real data</p>
                <BaseButton type="submit" variant="primary" icon="play" :disabled="!task.trim()">Start run</BaseButton>
              </div>
            </form>
          </EmptyState>
        </template>

        <template v-else>
          <div class="mb-5 border-b border-line pb-4">
            <p class="eyebrow">Task</p>
            <h2 id="run-title" class="mt-1.5 text-title font-medium text-fg">{{ state.task }}</h2>
          </div>

          <ol class="m-0 list-none p-0" aria-label="Run timeline">
            <TimelineStep
              v-for="(step, i) in state.steps"
              :key="step.id"
              v-bind="step"
              :last="i === state.steps.length - 1 && state.status !== 'awaiting-approval'"
            >
              <ProposedWrites
                v-if="step.kind === 'proposal' && step.writes && step.status === 'done'"
                :writes="step.writes"
                :locked="state.status !== 'awaiting-approval'"
                @decide="run.decide"
                @decide-all="run.decideAll"
                @confirm="run.confirmDecisions"
              />
            </TimelineStep>
          </ol>

          <RunRating v-if="state.status === 'completed'" class="mt-1" :rating="state.rating" @rate="run.rate" />
        </template>
      </section>

      <aside class="grid gap-4">
        <section class="panel p-4" aria-labelledby="access-title">
          <h3 id="access-title" class="eyebrow m-0">What it can touch</h3>
          <ul class="mt-3 grid list-none gap-2.5 p-0">
            <li v-for="a in ACCESS" :key="a.scope" class="flex items-center justify-between gap-2 text-body-sm">
              <span class="inline-flex items-center gap-2 text-fg">
                <BaseIcon :name="a.mode === 'read' ? 'eye' : 'pencil'" :size="ICON_SIZE.sm" class="text-fg-3" />{{
                  a.scope
                }}
              </span>
              <BaseBadge :tone="a.mode === 'read' ? 'neutral' : 'warn'">{{
                a.mode === 'read' ? 'Read' : 'Write, asks first'
              }}</BaseBadge>
            </li>
          </ul>
        </section>

        <section class="panel p-4" aria-labelledby="budget-title">
          <h3 id="budget-title" class="eyebrow m-0">{{ TEAM.name }} this month</h3>
          <p class="num mt-2 text-heading font-semibold text-fg">
            {{ formatEur(teamSpend, { whole: true }) }}
            <span class="text-body font-normal text-fg-3"
              >of {{ formatEur(TEAM.monthBudgetEur, { whole: true }) }}</span
            >
          </p>
          <BaseMeter
            class="mt-3"
            :value="teamSpend"
            :max="TEAM.monthBudgetEur"
            :label="`${TEAM.name} spend against monthly budget`"
          />
          <p class="mt-2.5 text-body-sm text-fg-2">
            This run adds <span class="num font-medium text-fg">{{ formatEur(run.costEur.value) }}</span
            >, charged to {{ TEAM.name }}.
          </p>
        </section>

        <section class="panel p-4 text-body-sm">
          <p class="eyebrow m-0">Model</p>
          <p class="mt-2 text-fg">{{ AGENT.model }}</p>
        </section>
      </aside>
    </div>
  </div>
</template>
