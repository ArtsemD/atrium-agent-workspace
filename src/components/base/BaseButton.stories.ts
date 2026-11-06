import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ICON_PATHS } from '@/constants/icons'
import BaseButton from './BaseButton.vue'

const meta = {
  title: 'Base/BaseButton',
  component: BaseButton,
  args: { variant: 'secondary', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    icon: { control: 'select', options: [undefined, ...Object.keys(ICON_PATHS)] },
  },
  render: (args) => ({
    components: { BaseButton },
    setup: () => ({ args }),
    template: '<BaseButton v-bind="args">Approve</BaseButton>',
  }),
} satisfies Meta<typeof BaseButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = { args: { variant: 'primary', icon: 'check' } }
export const Secondary: Story = {}
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Danger: Story = { args: { variant: 'danger', icon: 'x' } }
export const Loading: Story = { args: { variant: 'primary', loading: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Small: Story = { args: { size: 'sm' } }
