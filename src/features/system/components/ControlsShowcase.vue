<script setup lang="ts">
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseMeter from '@/components/base/BaseMeter.vue'
import { SAMPLE_METER_MAX, SAMPLE_METER_VALUES } from '@/data/samples'
</script>

<template>
  <div>
    <div class="flex flex-wrap gap-2">
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
      <BaseMeter v-for="v in SAMPLE_METER_VALUES" :key="v" :value="v" :max="SAMPLE_METER_MAX" :label="`${v}% used`" />
    </div>
  </div>
</template>
