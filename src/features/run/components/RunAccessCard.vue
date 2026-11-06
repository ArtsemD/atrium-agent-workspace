<script setup lang="ts">
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseIcon from '@/components/base/BaseIcon.vue'
import { ICON_SIZE } from '@/constants/icons'
import type { RunAccessCardProps } from '@/types/agent'

defineProps<RunAccessCardProps>()
</script>

<template>
  <BaseCard size="sm" title="What it can touch">
    <ul class="m-0 grid list-none gap-2.5 p-0">
      <li v-for="a in access" :key="a.scope" class="flex items-center justify-between gap-2 text-body-sm">
        <span class="inline-flex items-center gap-2 text-fg">
          <BaseIcon :name="a.mode === 'read' ? 'eye' : 'pencil'" :size="ICON_SIZE.sm" class="text-fg-3" />{{ a.scope }}
        </span>
        <BaseBadge :tone="a.mode === 'read' ? 'neutral' : 'warn'">
          {{ a.mode === 'read' ? 'Read' : 'Write, asks first' }}
        </BaseBadge>
      </li>
    </ul>
  </BaseCard>
</template>
