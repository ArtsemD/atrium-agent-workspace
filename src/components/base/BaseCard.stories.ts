import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseBadge from './BaseBadge.vue'
import BaseCard from './BaseCard.vue'

const meta = {
  title: 'Base/BaseCard',
  component: BaseCard,
  args: { title: 'AI spend against budget', description: 'November 2026, all teams and models', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
  render: (args) => ({
    components: { BaseCard, BaseBadge },
    setup: () => ({ args }),
    template: `
      <BaseCard v-bind="args">
        <template #actions><BaseBadge tone="ok" dot>On track</BaseBadge></template>
        <p class="m-0 text-body text-fg-2">Card content.</p>
      </BaseCard>`,
  }),
} satisfies Meta<typeof BaseCard>

export default meta
type Story = StoryObj<typeof meta>

export const Section: Story = {}
export const Side: Story = { args: { size: 'sm', title: 'What it can touch', description: undefined } }
