<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'
import BaseSkeleton from '@/components/base/BaseSkeleton.vue'
import EmptyState from '@/components/base/EmptyState.vue'
import { THEMES } from '@/constants/app'
import { SAMPLE_STEP_DONE, SAMPLE_STEP_RUNNING, SAMPLE_WRITES } from '@/data/samples'
import ProposedWrites from '@/features/run/components/ProposedWrites.vue'
import TimelineStep from '@/features/run/components/TimelineStep.vue'
import ControlsShowcase from '@/features/system/components/ControlsShowcase.vue'
import ThemePreviewCard from '@/features/system/components/ThemePreviewCard.vue'
</script>

<template>
  <div class="grid gap-4">
    <BaseCard
      title="Themes"
      description="Four themes from one set of semantic tokens. Components only use tokens, so a new theme is one CSS block."
    >
      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <ThemePreviewCard v-for="t in THEMES" :key="t.id" :theme="t" />
      </div>
    </BaseCard>

    <div class="grid gap-4 xl:grid-cols-2">
      <BaseCard title="Buttons and badges">
        <ControlsShowcase />
      </BaseCard>
      <BaseCard title="Timeline step: running and done">
        <ol class="m-0 list-none p-0">
          <TimelineStep v-bind="SAMPLE_STEP_DONE" />
          <TimelineStep v-bind="SAMPLE_STEP_RUNNING" last />
        </ol>
      </BaseCard>
    </div>

    <BaseCard title="Proposed writes: pending, approved, rejected">
      <ProposedWrites :writes="SAMPLE_WRITES" :locked="false" />
    </BaseCard>

    <div class="grid gap-4 xl:grid-cols-2">
      <BaseCard title="Loading: same box as the content">
        <div class="rounded-lg border border-line p-4">
          <BaseSkeleton class="h-3 w-24" />
          <BaseSkeleton class="mt-3 h-7 w-28" />
          <BaseSkeleton class="mt-2 h-4 w-40" />
        </div>
      </BaseCard>
      <BaseCard title="Empty">
        <EmptyState
          icon="inbox"
          title="No runs yet"
          description="When your team hands a task to an agent, its runs and their cost show up here."
        />
      </BaseCard>
    </div>
  </div>
</template>
