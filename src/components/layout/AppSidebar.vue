<script setup lang="ts">
import BaseIcon from '@/components/base/BaseIcon.vue'
import { ROUTES } from '@/constants/app'
import type { AppSidebarProps } from '@/types/app'
import ThemeSwitcher from './ThemeSwitcher.vue'

defineProps<AppSidebarProps>()
</script>

<template>
  <nav class="panel flex flex-col gap-3 p-3 md:sticky md:top-4 md:h-(--size-sidebar-height) md:gap-0" aria-label="Main">
    <div class="flex items-center gap-2.5 px-2 pt-1 md:pb-4">
      <span class="grid size-8 place-items-center rounded-lg bg-accent text-accent-fg">
        <BaseIcon name="logo" />
      </span>
      <div>
        <p class="text-body font-semibold text-fg">Atrium</p>
        <p class="text-meta text-fg-3">Agent workspace</p>
      </div>
    </div>

    <ul class="m-0 grid list-none grid-cols-3 gap-1 p-0 md:grid-cols-1 md:gap-0.5">
      <li v-for="r in ROUTES" :key="r.id">
        <a
          :href="`#/${r.id}`"
          :aria-current="current === r.id ? 'page' : undefined"
          class="flex flex-col items-center justify-center gap-1 rounded-md px-1 py-2 text-center text-meta transition-colors md:h-9 md:flex-row md:justify-start md:gap-2.5 md:px-2.5 md:py-0 md:text-left md:text-body"
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

    <div class="grid gap-3 md:mt-auto md:pt-6">
      <ThemeSwitcher />
      <p class="hidden px-1 text-meta text-fg-3 md:block">Portfolio demo by Artsem D. Fictional data, scripted runs.</p>
    </div>
  </nav>
</template>
