import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseButton from './BaseButton.vue'
import EmptyState from './EmptyState.vue'

const meta = {
  title: 'Base/EmptyState',
  component: EmptyState,
  args: {
    icon: 'inbox',
    title: 'No runs yet',
    description: 'When your team hands a task to an agent, its runs and their cost show up here.',
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithAction: Story = {
  render: (args) => ({
    components: { EmptyState, BaseButton },
    setup: () => ({ args }),
    template:
      '<EmptyState v-bind="args"><BaseButton variant="primary" icon="play">Start a run</BaseButton></EmptyState>',
  }),
}
