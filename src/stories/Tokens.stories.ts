import type { Meta, StoryObj } from '@storybook/vue3-vite'

const COLOR_TOKENS = [
  'bg',
  'surface-solid',
  'surface-sunken',
  'line',
  'line-strong',
  'fg',
  'fg-2',
  'fg-3',
  'accent',
  'accent-soft',
  'ok',
  'ok-soft',
  'warn',
  'warn-soft',
  'danger',
  'danger-soft',
  'chart-1',
] as const
// Full class names so Tailwind finds them when it scans this file
const TYPE_STEPS = [
  'text-caption',
  'text-meta',
  'text-body-sm',
  'text-body',
  'text-title',
  'text-heading',
  'text-display',
] as const

const meta = { title: 'Foundations/Tokens' } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Semantic colours for the theme picked in the toolbar */
export const Colours: Story = {
  render: () => ({
    setup: () => ({ tokens: COLOR_TOKENS }),
    template: `
      <ul class="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-6">
        <li v-for="t in tokens" :key="t" class="panel overflow-hidden">
          <div class="h-14 border-b border-line" :style="{ background: 'var(--' + t + ')' }" />
          <code class="block px-3 py-2 text-meta text-fg-2">--{{ t }}</code>
        </li>
      </ul>`,
  }),
}

/** Type scale: each step is a Tailwind utility, text-caption to text-display */
export const Typography: Story = {
  render: () => ({
    setup: () => ({ steps: TYPE_STEPS }),
    template: `
      <dl class="m-0 grid gap-3">
        <div v-for="s in steps" :key="s" class="flex items-baseline gap-6">
          <dt class="w-24 shrink-0"><code class="text-meta text-fg-3">{{ s }}</code></dt>
          <dd class="m-0 text-fg" :class="s">Reconcile October invoices</dd>
        </div>
      </dl>`,
  }),
}
