import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseBadge from './BaseBadge.vue'

const meta = {
  title: 'Base/BaseBadge',
  component: BaseBadge,
  args: { tone: 'neutral', dot: false },
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'accent', 'ok', 'warn', 'danger'] } },
  render: (args) => ({
    components: { BaseBadge },
    setup: () => ({ args }),
    template: '<BaseBadge v-bind="args">Needs approval</BaseBadge>',
  }),
} satisfies Meta<typeof BaseBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {}
export const Running: Story = { args: { tone: 'accent', dot: true } }
export const Completed: Story = { args: { tone: 'ok', dot: true } }
export const NeedsApproval: Story = { args: { tone: 'warn', dot: true } }
export const Rejected: Story = { args: { tone: 'danger', dot: true } }
