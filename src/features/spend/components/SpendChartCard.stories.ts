import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ACTUAL, COMPANY_BUDGET_EUR, MONTH, forecast } from '@/data/spend'
import SpendChartCard from './SpendChartCard.vue'

/** The chart in its card, with the legend (ChartLegend) and a status badge. Hover shows ChartTooltip. */
const meta = {
  title: 'Spend/SpendChartCard',
  component: SpendChartCard,
  args: { month: MONTH, actual: ACTUAL, forecast: forecast(), budgetEur: COMPANY_BUDGET_EUR, loading: false },
} satisfies Meta<typeof SpendChartCard>

export default meta
type Story = StoryObj<typeof meta>

export const OnTrack: Story = {}
export const OverBudget: Story = {
  args: { forecast: forecast({ perDayEur: 160, spreadLinear: 12, spreadQuadratic: 2 }) },
}
export const Loading: Story = { args: { loading: true } }
