<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue'
import { ACCESS, AGENT, DEFAULT_TASK, RUN_SCRIPT, TEAM } from '@/data/run-script'
import RunAccessCard from '@/features/run/components/RunAccessCard.vue'
import RunBudgetCard from '@/features/run/components/RunBudgetCard.vue'
import RunComposer from '@/features/run/components/RunComposer.vue'
import RunHeader from '@/features/run/components/RunHeader.vue'
import RunModelCard from '@/features/run/components/RunModelCard.vue'
import RunTimeline from '@/features/run/components/RunTimeline.vue'
import { useAgentRun } from '@/features/run/composables/useAgentRun'
import { useElapsedTime } from '@/features/run/composables/useElapsedTime'
import { useScenePlayback } from '@/features/run/composables/useScenePlayback'
import { instantDelay, readScene } from '@/features/run/utils/run-scene'
import { describeActivity } from '@/features/run/utils/run-status'

const scene = readScene(location.search)
const run = useAgentRun(RUN_SCRIPT, scene ? instantDelay : undefined)
const { state } = run

useScenePlayback(run, scene)
const elapsedMs = useElapsedTime(state)
const activity = computed(() => describeActivity(state, run.pendingCount.value))

onBeforeUnmount(run.stop)
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <RunHeader
      :agent="AGENT"
      :status="state.status"
      :activity="activity"
      :tokens="run.tokens.value"
      :cost-eur="run.costEur.value"
      :elapsed-ms="elapsedMs"
      @stop="run.stop"
      @reset="run.reset"
    />

    <div class="grid items-start gap-4 lg:grid-cols-(--layout-run)">
      <section class="panel p-4 sm:p-5 lg:min-h-(--size-run-panel)" aria-labelledby="run-title">
        <template v-if="state.status === 'idle'">
          <h2 id="run-title" class="sr-only">New run</h2>
          <RunComposer :agent-name="AGENT.name" :default-task="DEFAULT_TASK" @start="run.start" />
        </template>
        <RunTimeline
          v-else
          :task="state.task"
          :status="state.status"
          :steps="state.steps"
          :rating="state.rating"
          @decide="run.decide"
          @decide-all="run.decideAll"
          @confirm="run.confirmDecisions"
          @rate="run.rate"
        />
      </section>

      <aside class="grid gap-4">
        <RunAccessCard :access="ACCESS" />
        <RunBudgetCard :team="TEAM" :run-cost-eur="run.costEur.value" />
        <RunModelCard :model="AGENT.model" />
      </aside>
    </div>
  </div>
</template>
