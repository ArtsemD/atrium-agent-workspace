import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ACTUAL, COMPANY_BUDGET_EUR, MONTH, forecast } from '@/features/spend/data/spend'
import SpendChart from './SpendChart.vue'

const meta = {
  title: 'Spend/SpendChart',
  component: SpendChart,
  args: { month: MONTH, actual: ACTUAL, forecast: forecast(), budgetEur: COMPANY_BUDGET_EUR },
  parameters: {
    docs: {
      description: {
        component: 'Hand-built SVG: actual spend, forecast with an uncertainty band, and the budget line.',
      },
    },
  },
} satisfies Meta<typeof SpendChart>

export default meta
type Story = StoryObj<typeof meta>

export const OnTrack: Story = {}

/** A faster burn: the forecast band crosses the budget line */
export const OverBudget: Story = {
  args: { forecast: forecast({ perDayEur: 160, spreadLinear: 12, spreadQuadratic: 2 }) },
}
