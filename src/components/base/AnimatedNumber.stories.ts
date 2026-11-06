import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { formatEur } from '@/utils/format'
import AnimatedNumber from './AnimatedNumber.vue'

const meta = {
  title: 'Base/AnimatedNumber',
  component: AnimatedNumber,
  args: { value: 2310, format: (value: number): string => formatEur(value, { whole: true }) },
  decorators: [() => ({ template: '<p class="text-display font-semibold text-fg"><story /></p>' })],
} satisfies Meta<typeof AnimatedNumber>

export default meta
type Story = StoryObj<typeof meta>

/** Change the value in Controls to see it count from the old number to the new one */
export const Money: Story = {}

export const Percent: Story = {
  args: { value: 75, format: (value: number): string => `${Math.round(value)}%` },
}
