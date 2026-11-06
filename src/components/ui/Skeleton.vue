<script setup lang="ts">
// Placeholder with the same box as the content it stands in for, so nothing shifts on load
</script>

<template>
  <div
    aria-hidden="true"
    class="rounded-md"
    style="
      background: linear-gradient(90deg, var(--surface-sunken) 25%, var(--line) 50%, var(--surface-sunken) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.6s linear infinite;
    "
  />
</template>
