import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ICON_PATHS, ICON_SIZE } from '@/constants/icons'
import BaseIcon from './BaseIcon.vue'

const meta = {
  title: 'Base/BaseIcon',
  component: BaseIcon,
  args: { name: 'sparkles', size: ICON_SIZE.md },
  argTypes: {
    name: { control: 'select', options: Object.keys(ICON_PATHS) },
    size: { control: 'inline-radio', options: Object.values(ICON_SIZE) },
  },
} satisfies Meta<typeof BaseIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {}

/** Every icon in the set, at the large size */
export const Gallery: Story = {
  render: () => ({
    components: { BaseIcon },
    setup: () => ({ names: Object.keys(ICON_PATHS), size: ICON_SIZE.lg }),
    template: `
      <ul class="m-0 grid list-none grid-cols-4 gap-3 p-0 sm:grid-cols-6">
        <li v-for="n in names" :key="n" class="panel flex flex-col items-center gap-2 p-3 text-fg">
          <BaseIcon :name="n" :size="size" />
          <code class="text-meta text-fg-3">{{ n }}</code>
        </li>
      </ul>`,
  }),
}
