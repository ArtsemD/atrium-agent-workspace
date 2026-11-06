<script setup lang="ts">
import { computed } from 'vue'
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import type { ProposedWritesEmits, ProposedWritesProps } from '@/types/agent'

const props = defineProps<ProposedWritesProps>()
const emit = defineEmits<ProposedWritesEmits>()

const pending = computed(() => props.writes.filter((w) => w.decision === 'pending').length)
const approved = computed(() => props.writes.filter((w) => w.decision === 'approved').length)
</script>

<template>
  <section
    class="overflow-hidden rounded-lg border border-line bg-surface-solid"
    aria-label="Changes the agent wants to write"
  >
    <header class="flex flex-wrap items-center justify-between gap-2 border-b border-line px-3 py-2.5 sm:px-4">
      <p class="text-body-sm text-fg-2">
        <span class="font-semibold text-fg">{{ writes.length }} changes</span> to ERP invoices
      </p>
      <div v-if="!locked && pending > 0" class="flex gap-1">
        <BaseButton size="sm" variant="ghost" @click="emit('decideAll', 'rejected')">Reject all</BaseButton>
        <BaseButton size="sm" variant="ghost" icon="check" @click="emit('decideAll', 'approved')"
          >Approve all</BaseButton
        >
      </div>
    </header>

    <ul class="divide-y divide-line">
      <li
        v-for="w in writes"
        :key="w.id"
        class="grid gap-3 px-3 py-3.5 sm:grid-cols-(--layout-write-row) sm:items-start sm:px-4"
      >
        <div class="min-w-0">
          <p class="text-body-sm font-medium text-fg">
            {{ w.target }}
            <span class="ml-1.5 rounded bg-sunken px-1.5 py-0.5 text-meta font-normal text-fg-2">{{ w.field }}</span>
          </p>
          <!-- The diff: old value struck through, new value highlighted -->
          <p class="mt-1.5 flex flex-wrap items-center gap-2 font-mono text-body-sm">
            <span class="rounded bg-danger-soft px-1.5 py-0.5 text-danger line-through decoration-1">{{ w.from }}</span>
            <span class="text-fg-3" aria-label="changes to">→</span>
            <span class="rounded bg-ok-soft px-1.5 py-0.5 text-ok">{{ w.to }}</span>
          </p>
          <p class="mt-1.5 text-body-sm text-fg-2">{{ w.reason }}</p>
        </div>

        <!-- Fixed-width action column, so a row doesn't jump when its buttons turn into a badge -->
        <div class="flex h-8 items-center gap-1.5 sm:w-(--size-action-col) sm:justify-end">
          <template v-if="w.decision === 'pending'">
            <BaseButton
              size="sm"
              variant="danger"
              icon="x"
              :aria-label="`Reject change to ${w.target}`"
              @click="emit('decide', w.id, 'rejected')"
            >
              Reject
            </BaseButton>
            <BaseButton
              size="sm"
              variant="primary"
              icon="check"
              :aria-label="`Approve change to ${w.target}`"
              @click="emit('decide', w.id, 'approved')"
            >
              Approve
            </BaseButton>
          </template>
          <template v-else>
            <BaseBadge :tone="w.decision === 'approved' ? 'ok' : 'danger'" dot>
              {{ w.decision === 'approved' ? 'Approved' : 'Rejected' }}
            </BaseBadge>
            <BaseButton
              v-if="!locked"
              size="sm"
              variant="ghost"
              icon="undo"
              :aria-label="`Undo decision on ${w.target}`"
              @click="emit('decide', w.id, 'pending')"
            />
          </template>
        </div>
      </li>
    </ul>

    <footer
      v-if="!locked"
      class="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-sunken px-4 py-3"
    >
      <p class="text-body-sm text-fg-2" aria-live="polite">
        <template v-if="pending">{{ pending }} waiting for your decision</template>
        <template v-else>{{ approved }} of {{ writes.length }} will be written</template>
      </p>
      <BaseButton variant="primary" :disabled="pending > 0" @click="emit('confirm')">Continue run</BaseButton>
    </footer>
  </section>
</template>
