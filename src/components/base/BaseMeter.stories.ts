import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { SAMPLE_METER_MAX } from '@/data/samples'
import BaseMeter from './BaseMeter.vue'

const meta = {
  title: 'Base/BaseMeter',
  component: BaseMeter,
  args: { value: 52, max: SAMPLE_METER_MAX, label: 'Spend against budget', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
} satisfies Meta<typeof BaseMeter>

export default meta
type Story = StoryObj<typeof meta>

export const UnderLimit: Story = {}
export const NearLimit: Story = { args: { value: 94 } }
export const OverLimit: Story = { args: { value: 112 } }
export const Small: Story = { args: { size: 'sm' } }
