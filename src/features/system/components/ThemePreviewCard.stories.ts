import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { THEMES } from '@/constants/app'
import ThemePreviewCard from './ThemePreviewCard.vue'

/** Renders in its own theme whatever the toolbar says, because data-theme scopes the tokens */
const meta = {
  title: 'System/ThemePreviewCard',
  component: ThemePreviewCard,
  args: { theme: THEMES[0]! },
  argTypes: {
    theme: {
      control: 'select',
      options: THEMES.map((t) => t.id),
      mapping: Object.fromEntries(THEMES.map((t) => [t.id, t])),
    },
  },
  decorators: [() => ({ template: '<div class="w-64"><story /></div>' })],
} satisfies Meta<typeof ThemePreviewCard>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {}
export const Dusk: Story = { args: { theme: THEMES[2]! } }
