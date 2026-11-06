import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppSidebar from './AppSidebar.vue'

const meta = {
  title: 'Layout/AppSidebar',
  component: AppSidebar,
  args: { current: 'run' },
  argTypes: { current: { control: 'inline-radio', options: ['run', 'spend', 'system'] } },
  parameters: { layout: 'fullscreen' },
  decorators: [() => ({ template: '<div class="w-(--size-sidebar) p-4"><story /></div>' })],
} satisfies Meta<typeof AppSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const AgentRun: Story = {}
export const Spend: Story = { args: { current: 'spend' } }
