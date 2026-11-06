<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import Icon from './components/ui/Icon.vue'
import type { IconName } from './components/ui/icons'
import { useTheme } from './composables/useTheme'
import RunView from './views/RunView.vue'
import SpendView from './views/SpendView.vue'
import SystemView from './views/SystemView.vue'

const ROUTES = [
  { id: 'run', label: 'Agent run', icon: 'sparkles', title: 'Reconcile October invoices', crumb: 'Finance ops', view: RunView },
  { id: 'spend', label: 'Spend → Value', icon: 'chart', title: 'Spend → Value', crumb: 'Company', view: SpendView },
  { id: 'system', label: 'Components', icon: 'grid', title: 'Components & themes', crumb: 'Design system', view: SystemView },
] as const satisfies readonly { id: string; label: string; icon: IconName; title: string; crumb: string; view: unknown }[]

// Tiny hash router: enough for three screens and works on GitHub Pages without a 404 fallback
const hash = ref(location.hash)
const onHash = () => (hash.value = location.hash)
onMounted(() => window.addEventListener('hashchange', onHash))
onBeforeUnmount(() => window.removeEventListener('hashchange', onHash))
const route = computed(() => ROUTES.find((r) => `#/${r.id}` === hash.value) ?? ROUTES[0])

const { theme, themes } = useTheme()
</script>

<template>
  <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-surface-solid focus:px-3 focus:py-2">
    Skip to content
  </a>
  <div class="mx-auto grid min-h-dvh max-w-[1440px] gap-4 p-3 md:grid-cols-[232px_minmax(0,1fr)] md:p-4">
    <!-- Frosted-glass sidebar -->
    <nav class="panel flex flex-col p-3 md:sticky md:top-4 md:h-[calc(100dvh-2rem)]" aria-label="Main">
      <div class="flex items-center gap-2.5 px-2 pt-1 pb-4">
        <span class="grid size-8 place-items-center rounded-lg bg-accent text-accent-fg">
          <svg viewBox="0 0 24 24" class="size-4" fill="none" stroke="currentColor" stroke-width="2.4" aria-hidden="true"><circle cx="12" cy="12" r="7" /></svg>
        </span>
        <div>
          <p class="text-sm leading-4 font-semibold text-fg">Atrium</p>
          <p class="text-xs text-fg-3">Agent workspace</p>
        </div>
      </div>

      <ul class="grid list-none gap-0.5 p-0">
        <li v-for="r in ROUTES" :key="r.id">
          <a
            :href="`#/${r.id}`"
            :aria-current="route.id === r.id ? 'page' : undefined"
            class="flex h-9 items-center gap-2.5 rounded-md px-2.5 text-sm transition-colors"
            :class="route.id === r.id ? 'bg-surface-solid font-medium text-fg shadow-sm' : 'text-fg-2 hover:bg-sunken hover:text-fg'"
          >
            <Icon :name="r.icon" :size="16" />{{ r.label }}
          </a>
        </li>
      </ul>

      <div class="mt-auto grid gap-3 pt-6">
        <fieldset class="m-0 border-0 p-0">
          <legend class="eyebrow mb-2 px-1">Theme</legend>
          <div class="grid grid-cols-4 gap-1 rounded-md bg-sunken p-1">
            <label
              v-for="t in themes"
              :key="t.id"
              class="cursor-pointer rounded px-1 py-1 text-center text-xs transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent"
              :class="theme === t.id ? 'bg-surface-solid font-medium text-fg shadow-sm' : 'text-fg-2 hover:text-fg'"
            >
              <input v-model="theme" type="radio" name="theme" :value="t.id" class="sr-only" />{{ t.label }}
            </label>
          </div>
        </fieldset>
        <p class="px-1 text-xs leading-5 text-fg-3">
          Portfolio demo by Artsem D. Fictional data, scripted runs.
        </p>
      </div>
    </nav>

    <main id="main" class="min-w-0">
      <header class="mb-4 flex flex-wrap items-end justify-between gap-2 px-1 pt-1">
        <div>
          <p class="text-[13px] text-fg-3">{{ route.crumb }}</p>
          <h1 class="m-0 mt-0.5 text-[22px] font-semibold tracking-tight text-fg">{{ route.title }}</h1>
        </div>
      </header>
      <KeepAlive>
        <component :is="route.view" :key="route.id" />
      </KeepAlive>
    </main>
  </div>
</template>
