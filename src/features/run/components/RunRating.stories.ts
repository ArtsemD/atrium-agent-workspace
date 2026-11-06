import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'
import RunRating from './RunRating.vue'

const meta = {
  title: 'Run/RunRating',
  component: RunRating,
  args: { rating: null, onRate: fn() },
  argTypes: { rating: { control: 'inline-radio', options: [null, 'useful', 'not-useful'] } },
} satisfies Meta<typeof RunRating>

export default meta
type Story = StoryObj<typeof meta>

export const NotRated: Story = {}
export const Useful: Story = { args: { rating: 'useful' } }
export const NotUseful: Story = { args: { rating: 'not-useful' } }
