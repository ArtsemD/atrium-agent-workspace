import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SpendChart from './SpendChart.vue'

const meta = {
  title: 'Spend/SpendChart',
  component: SpendChart,
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

export const November: Story = {}
