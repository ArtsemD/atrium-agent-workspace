import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseSpinner from './BaseSpinner.vue'

const meta = {
  title: 'Base/BaseSpinner',
  component: BaseSpinner,
  render: () => ({ components: { BaseSpinner }, template: '<span class="text-accent"><BaseSpinner /></span>' }),
} satisfies Meta<typeof BaseSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
