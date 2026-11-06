<script setup lang="ts">
import type { Component } from 'vue'
import AppSidebar from '@/components/app/AppSidebar.vue'
import { useHashRoute } from '@/composables/useHashRoute'
import type { RouteId } from '@/types/app'
import RunView from '@/views/RunView.vue'
import SpendView from '@/views/SpendView.vue'
import SystemView from '@/views/SystemView.vue'

const VIEWS: Record<RouteId, Component> = { run: RunView, spend: SpendView, system: SystemView }
const { route } = useHashRoute()
</script>

<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface-solid focus:px-3 focus:py-2"
  >
    Skip to content
  </a>
  <div class="mx-auto grid min-h-dvh max-w-(--size-page) gap-4 p-3 md:grid-cols-(--layout-shell) md:p-4">
    <AppSidebar :current="route.id" />
    <main id="main" class="min-w-0">
      <header class="mb-4 px-1 pt-1">
        <p class="text-body-sm text-fg-3">{{ route.crumb }}</p>
        <h1 class="m-0 mt-0.5 text-heading font-semibold tracking-tight text-fg">{{ route.title }}</h1>
      </header>
      <KeepAlive>
        <component :is="VIEWS[route.id]" :key="route.id" />
      </KeepAlive>
    </main>
  </div>
</template>
