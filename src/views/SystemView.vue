<script setup lang="ts">
import ProposedWrites from '@/components/agent/ProposedWrites.vue'
import TimelineStep from '@/components/agent/TimelineStep.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseMeter from '@/components/base/BaseMeter.vue'
import BaseSkeleton from '@/components/base/BaseSkeleton.vue'
import EmptyState from '@/components/base/EmptyState.vue'
import { THEMES, THEME_SWATCHES } from '@/constants/app'
import {
  SAMPLE_METER_MAX,
  SAMPLE_METER_VALUES,
  SAMPLE_STEP_DONE,
  SAMPLE_STEP_RUNNING,
  SAMPLE_WRITES,
} from '@/data/samples'
</script>

<template>
  <div class="grid gap-4">
    <section class="panel p-5">
      <h2 class="m-0 text-title font-semibold text-fg">Themes</h2>
      <p class="mt-1 text-body-sm text-fg-2">
        Four themes from one set of semantic tokens. Components only use tokens, so a new theme is one CSS block.
      </p>
      <div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div v-for="t in THEMES" :key="t.id" :data-theme="t.id" class="rounded-lg border border-line bg-bg p-3 text-fg">
          <p class="text-body-sm font-semibold">{{ t.label }}</p>
          <div class="mt-2 grid grid-cols-8 gap-1">
            <span
              v-for="tok in THEME_SWATCHES"
              :key="tok"
              class="aspect-square rounded border border-line"
              :style="{ background: `var(--${tok})` }"
              :title="`--${tok}`"
            />
          </div>
          <div class="mt-3 flex gap-1.5">
            <BaseButton size="sm" variant="primary">Approve</BaseButton>
            <BaseButton size="sm">Reject</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <div class="grid gap-4 xl:grid-cols-2">
      <section class="panel p-5">
        <h2 class="m-0 text-title font-semibold text-fg">Buttons and badges</h2>
        <div class="mt-4 flex flex-wrap gap-2">
          <BaseButton variant="primary" icon="check">Primary</BaseButton>
          <BaseButton>Secondary</BaseButton>
          <BaseButton variant="ghost">Ghost</BaseButton>
          <BaseButton variant="danger" icon="x">Danger</BaseButton>
          <BaseButton variant="primary" loading>Loading</BaseButton>
          <BaseButton disabled>Disabled</BaseButton>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <BaseBadge>Neutral</BaseBadge>
          <BaseBadge tone="accent" dot>Running</BaseBadge>
          <BaseBadge tone="ok" dot>Completed</BaseBadge>
          <BaseBadge tone="warn" dot>Needs approval</BaseBadge>
          <BaseBadge tone="danger" dot>Rejected</BaseBadge>
        </div>
        <h3 class="eyebrow mt-6 mb-3">Meter: under, near and over the limit</h3>
        <div class="grid gap-3">
          <BaseMeter
            v-for="v in SAMPLE_METER_VALUES"
            :key="v"
            :value="v"
            :max="SAMPLE_METER_MAX"
            :label="`${v}% used`"
          />
        </div>
      </section>

      <section class="panel p-5">
        <h2 class="m-0 text-title font-semibold text-fg">Timeline step: running and done</h2>
        <ol class="mt-4 list-none p-0">
          <TimelineStep v-bind="SAMPLE_STEP_DONE" />
          <TimelineStep v-bind="SAMPLE_STEP_RUNNING" last />
        </ol>
      </section>
    </div>

    <section class="panel p-5">
      <h2 class="m-0 text-title font-semibold text-fg">Proposed writes: pending, approved, rejected</h2>
      <ProposedWrites class="mt-4" :writes="SAMPLE_WRITES" :locked="false" />
    </section>

    <div class="grid gap-4 xl:grid-cols-2">
      <section class="panel p-5">
        <h2 class="m-0 text-title font-semibold text-fg">Loading: same box as the content</h2>
        <div class="mt-4 rounded-lg border border-line p-4">
          <BaseSkeleton class="h-3 w-24" />
          <BaseSkeleton class="mt-3 h-7 w-28" />
          <BaseSkeleton class="mt-2 h-4 w-40" />
        </div>
      </section>
      <section class="panel p-5">
        <h2 class="m-0 text-title font-semibold text-fg">Empty</h2>
        <EmptyState
          icon="inbox"
          title="No runs yet"
          description="When your team hands a task to an agent, its runs and their cost show up here."
        />
      </section>
    </div>
  </div>
</template>
