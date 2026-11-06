import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TEAMS } from '@/features/spend/data/spend'
import TeamBudgetCell from './TeamBudgetCell.vue'

const meta = {
  title: 'Spend/TeamBudgetCell',
  component: TeamBudgetCell,
  args: { team: TEAMS[0]! },
  decorators: [() => ({ template: '<div class="w-96"><story /></div>' })],
} satisfies Meta<typeof TeamBudgetCell>

export default meta
type Story = StoryObj<typeof meta>

export const UnderLimit: Story = {}
export const NearLimit: Story = { args: { team: TEAMS[1]! } }
export const OverLimit: Story = {
  args: { team: { team: 'Marketing', spend: 640, budget: 600, runs: 120, usefulRate: 0.6 } },
}
