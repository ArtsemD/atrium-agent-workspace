<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import AgentPresence from '../components/agent/AgentPresence.vue'
import ProposedWrites from '../components/agent/ProposedWrites.vue'
import RunRating from '../components/agent/RunRating.vue'
import TimelineStep from '../components/agent/TimelineStep.vue'
import Badge from '../components/ui/Badge.vue'
import Button from '../components/ui/Button.vue'
import EmptyState from '../components/ui/EmptyState.vue'
import Icon from '../components/ui/Icon.vue'
import Meter from '../components/ui/Meter.vue'
import { useAgentRun } from '../composables/useAgentRun'
import { ACCESS, AGENT, DEFAULT_TASK, TEAM } from '../data/run-script'
import { formatDuration, formatEur, formatTokens } from '../lib/format'

// ?scene=approval|done jumps straight to a state (used for screenshots and for impatient reviewers)
const scene = new URLSearchParams(location.search).get('scene')
const run = useAgentRun(undefined, scene ? () => Promise.resolve() : undefined)
const { state } = run
const task = ref(DEFAULT_TASK)

const isLive = computed(() => state.status === 'running' || state.status === 'awaiting-approval')

const activity = computed(() => {
  switch (state.status) {
    case 'idle':
      return 'Ready for a task'
    case 'running': {
      const current = state.steps.find((s) => s.status === 'running')
      return current ? `${current.title}…` : 'Working…'
    }
    case 'awaiting-approval':
      return `Waiting for you to review ${run.pendingCount.value || 'its'} proposed changes`
    case 'completed':
      return 'Finished. Tell it whether the result was useful'
    case 'stopped':
      return 'Stopped by you'
  }
})

const STATUS_BADGE = {
  idle: { tone: 'neutral', label: 'Idle' },
  running: { tone: 'accent', label: 'Running' },
  'awaiting-approval': { tone: 'warn', label: 'Needs approval' },
  completed: { tone: 'ok', label: 'Completed' },
  stopped: { tone: 'neutral', label: 'Stopped' },
} as const

// Elapsed time ticks only while the run is live
const now = ref(Date.now())
let timer: number | undefined
watch(isLive, (live) => {
  window.clearInterval(timer)
  if (live) timer = window.setInterval(() => (now.value = Date.now()), 500)
})
onBeforeUnmount(() => {
  window.clearInterval(timer)
  run.stop()
})
const elapsed = computed(() => (state.startedAt ? (state.finishedAt || now.value) - state.startedAt : 0))

onMounted(async () => {
  if (scene !== 'approval' && scene !== 'done') return
  void run.start(DEFAULT_TASK)
  for (let i = 0; i < 300 && state.status !== 'awaiting-approval'; i++) await Promise.resolve()
  if (scene === 'done') {
    run.decide('w1', 'approved')
    run.decide('w2', 'approved')
    run.decide('w3', 'rejected')
    run.confirmDecisions()
    for (let i = 0; i < 300 && state.status !== 'completed'; i++) await Promise.resolve()
    run.rate('useful')
  }
})

function startRun() {
  if (task.value.trim()) run.start(task.value.trim())
}
</script>

<template>
  <div class="grid gap-4">
    <!-- Run header: who is working, on what, and what it has cost so far -->
    <section class="panel flex flex-wrap items-center gap-x-6 gap-y-4 px-5 py-4">
      <AgentPresence :name="`${AGENT.name}, ${AGENT.role.toLowerCase()}`" :activity="activity" :active="state.status === 'running'" />
      <div class="ml-auto flex flex-wrap items-center gap-x-6 gap-y-2">
        <Badge :tone="STATUS_BADGE[state.status].tone" dot>{{ STATUS_BADGE[state.status].label }}</Badge>
        <dl class="flex gap-6 text-sm">
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
        <Button v-if="isLive" variant="secondary" icon="square" @click="run.stop()">Stop</Button>
        <Button v-else-if="state.status !== 'idle'" variant="secondary" icon="play" @click="run.reset()">New run</Button>
      </div>
    </section>

    <div class="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_300px]">
      <section class="panel min-h-[480px] p-5" aria-labelledby="run-title">
        <template v-if="state.status === 'idle'">
          <h2 id="run-title" class="sr-only">New run</h2>
          <EmptyState
            icon="sparkles"
            :title="`Hand a task to ${AGENT.name}`"
            description="It plans the work, reads what it needs and shows you every change before anything is written."
          >
            <form class="w-[min(560px,80vw)] text-left" @submit.prevent="startRun">
              <label for="task" class="eyebrow">Task</label>
              <textarea
                id="task"
                v-model="task"
                rows="3"
                class="mt-2 w-full resize-none rounded-md border border-line-strong bg-surface-solid px-3 py-2.5 text-sm text-fg outline-none placeholder:text-fg-3 focus:border-accent"
              />
              <div class="mt-3 flex items-center justify-between gap-3">
                <p class="text-xs text-fg-3">Scripted demo run, no real data</p>
                <Button type="submit" variant="primary" icon="play" :disabled="!task.trim()">Start run</Button>
              </div>
            </form>
          </EmptyState>
        </template>

        <template v-else>
          <div class="mb-5 border-b border-line pb-4">
            <p class="eyebrow">Task</p>
            <h2 id="run-title" class="mt-1.5 text-[15px] leading-6 font-medium text-fg">{{ state.task }}</h2>
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
            <li v-for="a in ACCESS" :key="a.scope" class="flex items-center justify-between gap-2 text-[13px]">
              <span class="inline-flex items-center gap-2 text-fg">
                <Icon :name="a.mode === 'read' ? 'eye' : 'pencil'" :size="14" class="text-fg-3" />{{ a.scope }}
              </span>
              <Badge :tone="a.mode === 'read' ? 'neutral' : 'warn'">{{ a.mode === 'read' ? 'Read' : 'Write, asks first' }}</Badge>
            </li>
          </ul>
        </section>

        <section class="panel p-4" aria-labelledby="budget-title">
          <h3 id="budget-title" class="eyebrow m-0">{{ TEAM.name }} this month</h3>
          <p class="num mt-2 text-xl font-semibold text-fg">
            {{ formatEur(TEAM.monthSpendEur + run.costEur.value, { whole: true }) }}
            <span class="text-sm font-normal text-fg-3">of {{ formatEur(TEAM.monthBudgetEur, { whole: true }) }}</span>
          </p>
          <Meter class="mt-3" :value="TEAM.monthSpendEur + run.costEur.value" :max="TEAM.monthBudgetEur" :label="`${TEAM.name} spend against monthly budget`" />
          <p class="mt-2.5 text-[13px] text-fg-2">
            This run adds <span class="num font-medium text-fg">{{ formatEur(run.costEur.value) }}</span>, charged to {{ TEAM.name }}.
          </p>
        </section>

        <section class="panel p-4 text-[13px] text-fg-2">
          <p class="eyebrow m-0">Model</p>
          <p class="mt-2 text-fg">{{ AGENT.model }}</p>
        </section>
      </aside>
    </div>
  </div>
</template>
