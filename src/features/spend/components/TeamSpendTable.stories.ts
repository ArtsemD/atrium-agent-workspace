import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { TEAMS } from '@/data/spend'
import TeamSpendTable from './TeamSpendTable.vue'

const meta = {
  title: 'Spend/TeamSpendTable',
  component: TeamSpendTable,
  args: { teams: TEAMS, loading: false },
} satisfies Meta<typeof TeamSpendTable>

export default meta
type Story = StoryObj<typeof meta>

export const Loaded: Story = {}
export const Loading: Story = { args: { loading: true } }
