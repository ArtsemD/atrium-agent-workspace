import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { formatEur } from '@/utils/format'
import KpiTile from './KpiTile.vue'

const eurWhole = (value: number): string => formatEur(value, { whole: true })
const wholePercent = (value: number): string => `${Math.round(value)}%`

const meta = {
  title: 'Spend/KpiTile',
  component: KpiTile,
  args: { label: 'Spent this month', value: 2310, format: eurWhole, hint: '58% of €4,000 budget', tone: 'neutral' },
  argTypes: { tone: { control: 'inline-radio', options: ['neutral', 'ok', 'warn'] } },
  decorators: [() => ({ template: '<div class="w-72"><story /></div>' })],
} satisfies Meta<typeof KpiTile>

export default meta
type Story = StoryObj<typeof meta>

export const Neutral: Story = {}
export const Good: Story = {
  args: { label: 'Month-end forecast', value: 3246, format: eurWhole, hint: 'likely €2,970–€3,523', tone: 'ok' },
}
export const Warning: Story = {
  args: { label: 'Customer support', value: 94, format: wholePercent, hint: 'of monthly budget used', tone: 'warn' },
}
