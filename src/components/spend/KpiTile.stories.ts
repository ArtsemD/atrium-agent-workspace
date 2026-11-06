import type { Meta, StoryObj } from '@storybook/vue3-vite'
import KpiTile from './KpiTile.vue'

const meta = {
  title: 'Spend/KpiTile',
  component: KpiTile,
  args: { label: 'Spent this month', value: '€2,310', hint: '58% of €4,000 budget', tone: 'neutral' },
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'ok', 'warn'] } },
  decorators: [() => ({ template: '<div class="w-72"><story /></div>' })],
} satisfies Meta<typeof KpiTile>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {}
export const Good: Story = {
  args: { label: 'Month-end forecast', value: '€3,246', hint: 'likely €2,970–€3,523', tone: 'ok' },
}
export const Warning: Story = {
  args: { label: 'Customer support', value: '94%', hint: 'of monthly budget used', tone: 'warn' },
}
