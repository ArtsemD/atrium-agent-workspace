<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'
import { ROUTES } from '@/constants/app'
import type { AppSidebarProps } from '@/types/app'
import ThemeSwitcher from './ThemeSwitcher.vue'

defineProps<AppSidebarProps>()
</script>

<template>
  <nav class="panel flex flex-col p-3 md:sticky md:top-4 md:h-(--size-sidebar-height)" aria-label="Main">
    <div class="flex items-center gap-2.5 px-2 pt-1 pb-4">
      <span class="grid size-8 place-items-center rounded-lg bg-accent text-accent-fg">
        <BaseIcon name="logo" />
      </span>
      <div>
        <p class="text-body font-semibold text-fg">Atrium</p>
        <p class="text-meta text-fg-3">Agent workspace</p>
      </div>
    </div>

    <ul class="grid list-none gap-0.5 p-0">
      <li v-for="r in ROUTES" :key="r.id">
        <a
          :href="`#/${r.id}`"
          :aria-current="current === r.id ? 'page' : undefined"
          class="flex h-9 items-center gap-2.5 rounded-md px-2.5 text-body transition-colors"
          :class="
            current === r.id
              ? 'bg-surface-solid font-medium text-fg shadow-sm'
              : 'text-fg-2 hover:bg-sunken hover:text-fg'
          "
        >
          <BaseIcon :name="r.icon" />{{ r.label }}
        </a>
      </li>
    </ul>

    <div class="mt-auto grid gap-3 pt-6">
      <ThemeSwitcher />
      <p class="px-1 text-meta text-fg-3">Portfolio demo by Artsem D. Fictional data, scripted runs.</p>
    </div>
  </nav>
</template>
