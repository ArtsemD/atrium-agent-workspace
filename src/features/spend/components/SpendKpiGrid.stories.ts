import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ACTUAL, COMPANY_BUDGET_EUR, COST_PER_USEFUL_RUN_TREND, TEAMS, forecast } from '@/features/spend/data/spend'
import { buildKpis } from '../utils/spend-metrics'
import SpendKpiGrid from './SpendKpiGrid.vue'

const KPIS = buildKpis({
  actual: ACTUAL,
  forecast: forecast(),
  budgetEur: COMPANY_BUDGET_EUR,
  teams: TEAMS,
  costTrend: COST_PER_USEFUL_RUN_TREND,
})

/** KPI tiles and their loading skeletons (KpiTileSkeleton), which keep the same box */
const meta = {
  title: 'Spend/SpendKpiGrid',
  component: SpendKpiGrid,
  args: { kpis: KPIS, loading: false },
} satisfies Meta<typeof SpendKpiGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Loaded: Story = {}
export const Loading: Story = { args: { loading: true } }
