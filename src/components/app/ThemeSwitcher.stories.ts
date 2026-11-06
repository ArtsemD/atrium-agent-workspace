import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ThemeSwitcher from './ThemeSwitcher.vue'

const meta = {
  title: 'App/ThemeSwitcher',
  component: ThemeSwitcher,
} satisfies Meta<typeof ThemeSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
