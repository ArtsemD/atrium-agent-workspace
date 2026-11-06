import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'
import { AGENT, DEFAULT_TASK } from '@/features/run/data/run-script'
import RunComposer from './RunComposer.vue'

const meta = {
  title: 'Run/RunComposer',
  component: RunComposer,
  args: { agentName: AGENT.name, defaultTask: DEFAULT_TASK, onStart: fn() },
} satisfies Meta<typeof RunComposer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
/** Start stays disabled until there is a task */
export const Empty: Story = { args: { defaultTask: '' } }
