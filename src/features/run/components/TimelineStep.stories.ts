import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { SAMPLE_STEP_DONE, SAMPLE_STEP_RUNNING } from '@/data/samples'
import TimelineStep from './TimelineStep.vue'

const meta = {
  title: 'Run/TimelineStep',
  component: TimelineStep,
  args: { ...SAMPLE_STEP_DONE, last: true },
  argTypes: {
    kind: { control: 'inline-radio', options: ['plan', 'read', 'analyze', 'proposal', 'apply', 'result'] },
    status: { control: 'inline-radio', options: ['running', 'done'] },
  },
  decorators: [() => ({ template: '<ol class="m-0 list-none p-0"><story /></ol>' })],
} satisfies Meta<typeof TimelineStep>

export default meta
type Story = StoryObj<typeof meta>

export const Done: Story = {}
export const Running: Story = { args: { ...SAMPLE_STEP_RUNNING, last: true } }
export const Proposal: Story = {
  args: {
    kind: 'proposal',
    title: 'Wants to write 3 changes to the ERP',
    detail: 'Nothing is written until you approve it.',
  },
}
