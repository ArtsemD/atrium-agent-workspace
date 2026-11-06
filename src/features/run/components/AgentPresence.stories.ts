import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { AGENT } from '@/features/run/data/run-script'
import AgentPresence from './AgentPresence.vue'

const meta = {
  title: 'Run/AgentPresence',
  component: AgentPresence,
  args: { name: `${AGENT.name}, ${AGENT.role.toLowerCase()}`, activity: 'Checked the 14 mismatches…', active: true },
} satisfies Meta<typeof AgentPresence>

export default meta
type Story = StoryObj<typeof meta>

export const Working: Story = {}
export const Waiting: Story = { args: { active: false, activity: 'Waiting for you to review 3 proposed changes' } }
