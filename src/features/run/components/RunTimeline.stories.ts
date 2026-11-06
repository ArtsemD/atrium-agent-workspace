import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'
import { DEFAULT_TASK } from '@/data/run-script'
import { SAMPLE_STEP_DONE, SAMPLE_STEP_RUNNING, SAMPLE_WRITES } from '@/data/samples'
import RunTimeline from './RunTimeline.vue'

const meta = {
  title: 'Run/RunTimeline',
  component: RunTimeline,
  args: {
    task: DEFAULT_TASK,
    status: 'running',
    steps: [SAMPLE_STEP_DONE, SAMPLE_STEP_RUNNING],
    rating: null,
    onDecide: fn(),
    onDecideAll: fn(),
    onConfirm: fn(),
    onRate: fn(),
  },
} satisfies Meta<typeof RunTimeline>

export default meta
type Story = StoryObj<typeof meta>

export const Running: Story = {}
export const AwaitingApproval: Story = {
  args: {
    status: 'awaiting-approval',
    steps: [
      SAMPLE_STEP_DONE,
      {
        ...SAMPLE_STEP_DONE,
        id: 3,
        kind: 'proposal',
        title: 'Wants to write 3 changes to the ERP',
        source: undefined,
        writes: SAMPLE_WRITES,
      },
    ],
  },
}
export const Completed: Story = { args: { status: 'completed', steps: [SAMPLE_STEP_DONE] } }
