import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ACCESS, AGENT, EUR_PER_MILLION_TOKENS, TEAM } from '@/features/run/data/run-script'
import RunAccessCard from './RunAccessCard.vue'
import RunBudgetCard from './RunBudgetCard.vue'
import RunModelCard from './RunModelCard.vue'

/** The cards beside the run: what the agent may touch, what it costs, which model */
const meta = {
  title: 'Run/RunAside',
  component: RunBudgetCard,
  args: { team: TEAM, runCostEur: 0.5 },
  decorators: [() => ({ template: '<div class="w-(--size-aside)"><story /></div>' })],
} satisfies Meta<typeof RunBudgetCard>

export default meta
type Story = StoryObj<typeof meta>

export const Budget: Story = {}

export const AllCards: Story = {
  render: (args) => ({
    components: { RunAccessCard, RunBudgetCard, RunModelCard },
    setup: () => ({ args, access: ACCESS, agent: AGENT, rate: EUR_PER_MILLION_TOKENS }),
    template: `
      <div class="grid gap-4">
        <RunAccessCard :access="access" />
        <RunBudgetCard v-bind="args" />
        <RunModelCard :model="agent.model" :gateway="agent.gateway" :eur-per-million-tokens="rate" />
      </div>`,
  }),
}
