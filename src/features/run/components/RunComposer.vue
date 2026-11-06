<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import EmptyState from '@/components/base/EmptyState.vue'
import type { RunComposerEmits, RunComposerProps } from '@/types/agent'

const props = defineProps<RunComposerProps>()
const emit = defineEmits<RunComposerEmits>()

const task = ref(props.defaultTask)
const trimmed = computed(() => task.value.trim())

function submit() {
  if (trimmed.value) emit('start', trimmed.value)
}
</script>

<template>
  <EmptyState
    icon="sparkles"
    :title="`Hand a task to ${agentName}`"
    description="It plans the work, reads what it needs and shows you every change before anything is written."
  >
    <form class="w-full max-w-(--size-composer) text-left" @submit.prevent="submit">
      <label for="task" class="eyebrow">Task</label>
      <textarea
        id="task"
        v-model="task"
        rows="3"
        class="mt-2 w-full resize-none rounded-md border border-line-strong bg-surface-solid px-3 py-2.5 text-body text-fg outline-none placeholder:text-fg-3 focus:border-accent"
      />
      <div class="mt-3 flex items-center justify-between gap-3">
        <p class="text-meta text-fg-3">Scripted demo run, no real data</p>
        <BaseButton type="submit" variant="primary" icon="play" :disabled="!trimmed">Start run</BaseButton>
      </div>
    </form>
  </EmptyState>
</template>
