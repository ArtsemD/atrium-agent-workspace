import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'
import { SAMPLE_WRITES } from '@/data/samples'
import ProposedWrites from './ProposedWrites.vue'

const meta = {
  title: 'Run/ProposedWrites',
  component: ProposedWrites,
  args: { writes: SAMPLE_WRITES, locked: false, onDecide: fn(), onDecideAll: fn(), onConfirm: fn() },
} satisfies Meta<typeof ProposedWrites>

export default meta
type Story = StoryObj<typeof meta>

/** One change of each kind: pending, approved and rejected */
export const MixedDecisions: Story = {}
export const AllPending: Story = {
  args: { writes: SAMPLE_WRITES.map((w) => ({ ...w, decision: 'pending' as const })) },
}
/** After the run moves on, decisions can no longer change */
export const Locked: Story = { args: { locked: true } }
