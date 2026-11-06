<script setup lang="ts">
import BaseSkeleton from '@/components/base/BaseSkeleton.vue'
</script>

<template>
  <!--
    Same box as KpiTile, line for line: each row is as tall as the text line it stands in for
    (label 16px, value 28px, hint 20px). On phones the label and hint wrap to two lines, so the
    skeleton adds a second row for each and the tile doesn't grow when data arrives.
  -->
  <div class="panel p-3.5 sm:p-4" aria-hidden="true">
    <div class="flex h-4 items-center"><BaseSkeleton class="h-3 w-1/2 max-w-24" /></div>
    <div class="flex h-4 items-center sm:hidden"><BaseSkeleton class="h-3 w-1/3" /></div>
    <div class="mt-2 flex h-7 items-center"><BaseSkeleton class="h-6 w-2/3 max-w-28" /></div>
    <div class="mt-1 flex h-5 items-center"><BaseSkeleton class="h-3.5 w-full max-w-40" /></div>
    <div class="flex h-5 items-center sm:hidden"><BaseSkeleton class="h-3.5 w-2/3" /></div>
  </div>
</template>
