import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'
import { AGENT } from '@/data/run-script'
import RunHeader from './RunHeader.vue'

const meta = {
  title: 'Run/RunHeader',
  component: RunHeader,
  args: {
    agent: AGENT,
    status: 'running',
    activity: 'Matched 298 of 312 invoices to purchase orders…',
    tokens: 42_300,
    costEur: 0.38,
    elapsedMs: 6400,
    onStop: fn(),
    onReset: fn(),
  },
  argTypes: {
    status: { control: 'inline-radio', options: ['idle', 'running', 'awaiting-approval', 'completed', 'stopped'] },
  },
} satisfies Meta<typeof RunHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Running: Story = {}
export const NeedsApproval: Story = {
  args: { status: 'awaiting-approval', activity: 'Waiting for you to review 3 proposed changes' },
}
export const Completed: Story = {
  args: { status: 'completed', activity: 'Finished. Tell it whether the result was useful' },
}
