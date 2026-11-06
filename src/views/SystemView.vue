<script setup lang="ts">
import ProposedWrites from '../components/agent/ProposedWrites.vue'
import TimelineStep from '../components/agent/TimelineStep.vue'
import Badge from '../components/ui/Badge.vue'
import Button from '../components/ui/Button.vue'
import EmptyState from '../components/ui/EmptyState.vue'
import Meter from '../components/ui/Meter.vue'
import Skeleton from '../components/ui/Skeleton.vue'
import { THEMES } from '../composables/useTheme'
import type { WriteState } from '../composables/useAgentRun'

const TOKENS = ['bg', 'surface-solid', 'fg', 'fg-2', 'accent', 'ok', 'warn', 'danger'] as const

const writes: WriteState[] = [
  { id: 'a', target: 'INV-1001 · Example Ltd', field: 'Amount', from: '€100.00', to: '€110.00', reason: 'Pending: waiting for a decision.', decision: 'pending' },
  { id: 'b', target: 'INV-1002 · Example Ltd', field: 'Status', from: 'Draft', to: 'Approved', reason: 'Approved: will be written.', decision: 'approved' },
  { id: 'c', target: 'INV-1003 · Example Ltd', field: 'Vendor', from: 'Acme', to: 'Acme GmbH', reason: 'Rejected: stays as it is.', decision: 'rejected' },
]
</script>

<template>
  <div class="grid gap-4">
    <section class="panel p-5">
      <h2 class="m-0 text-[15px] font-semibold text-fg">Themes</h2>
      <p class="mt-1 text-[13px] text-fg-2">
        Four themes from one set of semantic tokens. Components only use tokens, so a new theme is one CSS block.
      </p>
      <div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div
          v-for="t in THEMES"
          :key="t.id"
          :data-theme="t.id"
          class="rounded-lg border border-line p-3"
          style="background: var(--bg); color: var(--fg)"
        >
          <p class="text-[13px] font-semibold">{{ t.label }}</p>
          <div class="mt-2 grid grid-cols-8 gap-1">
            <span
              v-for="tok in TOKENS"
              :key="tok"
              class="aspect-square rounded border border-line"
              :style="{ background: `var(--${tok})` }"
              :title="`--${tok}`"
            />
          </div>
          <div class="mt-3 flex gap-1.5">
            <Button size="sm" variant="primary">Approve</Button>
            <Button size="sm">Reject</Button>
          </div>
        </div>
      </div>
    </section>

    <div class="grid gap-4 xl:grid-cols-2">
      <section class="panel p-5">
        <h2 class="m-0 text-[15px] font-semibold text-fg">Buttons & badges</h2>
        <div class="mt-4 flex flex-wrap gap-2">
          <Button variant="primary" icon="check">Primary</Button>
          <Button>Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger" icon="x">Danger</Button>
          <Button variant="primary" loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <Badge>Neutral</Badge>
          <Badge tone="accent" dot>Running</Badge>
          <Badge tone="ok" dot>Completed</Badge>
          <Badge tone="warn" dot>Needs approval</Badge>
          <Badge tone="danger" dot>Rejected</Badge>
        </div>
        <h3 class="eyebrow mt-6 mb-3">Meter · under, near and over the limit</h3>
        <div class="grid gap-3">
          <Meter :value="52" :max="100" label="52% used" />
          <Meter :value="94" :max="100" label="94% used" />
          <Meter :value="112" :max="100" label="112% used" />
        </div>
      </section>

      <section class="panel p-5">
        <h2 class="m-0 text-[15px] font-semibold text-fg">Timeline step · running and done</h2>
        <ol class="mt-4 list-none p-0">
          <TimelineStep kind="read" title="Read 312 October invoices" detail="Pulled every invoice dated 1–31 October." source="Billing · read-only" status="done" :tokens="18400" :duration-ms="2200" />
          <TimelineStep kind="analyze" title="Checking the mismatches" detail="" status="running" :tokens="4200" :duration-ms="0" last />
        </ol>
      </section>
    </div>

    <section class="panel p-5">
      <h2 class="m-0 text-[15px] font-semibold text-fg">Proposed writes · pending, approved, rejected</h2>
      <ProposedWrites class="mt-4" :writes="writes" :locked="false" />
    </section>

    <div class="grid gap-4 xl:grid-cols-2">
      <section class="panel p-5">
        <h2 class="m-0 text-[15px] font-semibold text-fg">Loading · same box as the content</h2>
        <div class="mt-4 rounded-lg border border-line p-4">
          <Skeleton class="h-3 w-24" />
          <Skeleton class="mt-3 h-7 w-28" />
          <Skeleton class="mt-2 h-4 w-40" />
        </div>
      </section>
      <section class="panel p-5">
        <h2 class="m-0 text-[15px] font-semibold text-fg">Empty</h2>
        <EmptyState icon="inbox" title="No runs yet" description="When your team hands a task to an agent, its runs and their cost show up here." />
      </section>
    </div>
  </div>
</template>
