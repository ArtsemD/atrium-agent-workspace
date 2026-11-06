import type { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseSkeleton from './BaseSkeleton.vue'

const meta = {
  title: 'Base/BaseSkeleton',
  component: BaseSkeleton,
} satisfies Meta<typeof BaseSkeleton>

export default meta
type Story = StoryObj<typeof meta>

/** A KPI tile while it loads. The skeleton keeps the final box, so nothing shifts. */
export const KpiTile: Story = {
  render: () => ({
    components: { BaseSkeleton },
    template: `
      <div class="panel w-64 p-4">
        <BaseSkeleton class="h-3 w-24" />
        <BaseSkeleton class="mt-3 h-7 w-28" />
        <BaseSkeleton class="mt-2 h-4 w-40" />
      </div>`,
  }),
}
