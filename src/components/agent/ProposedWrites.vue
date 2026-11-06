<script setup lang="ts">
import { computed } from 'vue'
import Badge from '../ui/Badge.vue'
import Button from '../ui/Button.vue'
import type { Decision, WriteState } from '../../composables/useAgentRun'

const props = defineProps<{ writes: readonly WriteState[]; locked: boolean }>()
const emit = defineEmits<{
  decide: [id: string, decision: Decision]
  decideAll: [decision: 'approved' | 'rejected']
  confirm: []
}>()

const pending = computed(() => props.writes.filter((w) => w.decision === 'pending').length)
const approved = computed(() => props.writes.filter((w) => w.decision === 'approved').length)
</script>

<template>
  <section class="overflow-hidden rounded-lg border border-line bg-surface-solid" aria-label="Changes the agent wants to write">
    <header class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-2.5">
      <p class="text-[13px] text-fg-2">
        <span class="font-semibold text-fg">{{ writes.length }} changes</span> to ERP · invoices
      </p>
      <div v-if="!locked && pending > 0" class="flex gap-1">
        <Button size="sm" variant="ghost" @click="emit('decideAll', 'rejected')">Reject all</Button>
        <Button size="sm" variant="ghost" icon="check" @click="emit('decideAll', 'approved')">Approve all</Button>
      </div>
    </header>

    <ul class="divide-y divide-line">
      <li v-for="w in writes" :key="w.id" class="grid gap-3 px-4 py-3.5 sm:grid-cols-[1fr_auto] sm:items-start">
        <div class="min-w-0">
          <p class="text-[13px] font-medium text-fg">
            {{ w.target }} <span class="font-normal text-fg-3">· {{ w.field }}</span>
          </p>
          <!-- the diff: old value struck through, new value highlighted -->
          <p class="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-[13px]">
            <span class="rounded bg-danger-soft px-1.5 py-0.5 text-danger line-through decoration-1">{{ w.from }}</span>
            <span class="text-fg-3" aria-label="changes to">→</span>
            <span class="rounded bg-ok-soft px-1.5 py-0.5 text-ok">{{ w.to }}</span>
          </p>
          <p class="mt-1.5 text-[13px] leading-5 text-fg-2">{{ w.reason }}</p>
        </div>

        <!-- fixed-width action column so rows don't jump when a decision swaps buttons for a badge -->
        <div class="flex h-8 w-[188px] items-center justify-end gap-1.5">
          <template v-if="w.decision === 'pending'">
            <Button size="sm" variant="danger" icon="x" :aria-label="`Reject change to ${w.target}`" @click="emit('decide', w.id, 'rejected')">
              Reject
            </Button>
            <Button size="sm" variant="primary" icon="check" :aria-label="`Approve change to ${w.target}`" @click="emit('decide', w.id, 'approved')">
              Approve
            </Button>
          </template>
          <template v-else>
            <Badge :tone="w.decision === 'approved' ? 'ok' : 'danger'" dot>
              {{ w.decision === 'approved' ? 'Approved' : 'Rejected' }}
            </Badge>
            <Button v-if="!locked" size="sm" variant="ghost" icon="undo" :aria-label="`Undo decision on ${w.target}`" @click="emit('decide', w.id, 'pending')" />
          </template>
        </div>
      </li>
    </ul>

    <footer v-if="!locked" class="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-sunken px-4 py-3">
      <p class="text-[13px] text-fg-2" aria-live="polite">
        <template v-if="pending">{{ pending }} waiting for your decision</template>
        <template v-else>{{ approved }} of {{ writes.length }} will be written</template>
      </p>
      <Button variant="primary" :disabled="pending > 0" @click="emit('confirm')">Continue run</Button>
    </footer>
  </section>
</template>
