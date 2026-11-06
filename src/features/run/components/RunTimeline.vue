<script setup lang="ts">
import type { RunTimelineEmits, RunTimelineProps } from '@/types/agent'
import ProposedWrites from './ProposedWrites.vue'
import RunRating from './RunRating.vue'
import TimelineStep from './TimelineStep.vue'

const props = defineProps<RunTimelineProps>()
const emit = defineEmits<RunTimelineEmits>()

// The line under the last step continues while the run waits for approval
const isLast = (index: number) => index === props.steps.length - 1 && props.status !== 'awaiting-approval'
</script>

<template>
  <div>
    <div class="mb-5 border-b border-line pb-4">
      <p class="eyebrow">Task</p>
      <h2 id="run-title" class="mt-1.5 text-title font-medium text-fg">{{ task }}</h2>
    </div>

    <ol class="m-0 list-none p-0" aria-label="Run timeline">
      <TimelineStep v-for="(step, i) in steps" :key="step.id" v-bind="step" :last="isLast(i)">
        <ProposedWrites
          v-if="step.kind === 'proposal' && step.writes && step.status === 'done'"
          :writes="step.writes"
          :locked="status !== 'awaiting-approval'"
          @decide="(id, decision) => emit('decide', id, decision)"
          @decide-all="(decision) => emit('decideAll', decision)"
          @confirm="emit('confirm')"
        />
      </TimelineStep>
    </ol>

    <RunRating v-if="status === 'completed'" class="mt-1" :rating="rating" @rate="(r) => emit('rate', r)" />
  </div>
</template>
