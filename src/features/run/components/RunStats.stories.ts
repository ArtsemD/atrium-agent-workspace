import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RunStats from './RunStats.vue'

const meta = {
  title: 'Run/RunStats',
  component: RunStats,
  args: { tokens: 55_100, costEur: 0.5, elapsedMs: 14_000 },
} satisfies Meta<typeof RunStats>

export default meta
type Story = StoryObj<typeof meta>

export const Running: Story = {}
export const Idle: Story = { args: { tokens: 0, costEur: 0, elapsedMs: 0 } }
