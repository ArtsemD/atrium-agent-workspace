import type { Decorator, Preview } from '@storybook/vue3-vite'
import { DEFAULT_THEME, THEMES } from '../src/constants/app'
import '../src/styles/main.css'

/** Applies the selected theme the same way the app does, through data-theme on <html> */
const withTheme: Decorator = (story, context) => {
  document.documentElement.dataset.theme = String(context.globals.theme ?? DEFAULT_THEME)
  return story()
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Design token theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: THEMES.map((t) => ({ value: t.id, title: t.label })),
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: DEFAULT_THEME },
  decorators: [withTheme],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
}

export default preview
