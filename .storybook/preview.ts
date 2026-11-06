import type { Decorator, Preview } from '@storybook/vue3-vite'
import { useTheme } from '../src/composables/useTheme'
import { DEFAULT_THEME, THEMES } from '../src/constants/app'
import type { ThemeId } from '../src/types/app'
import '../src/styles/main.css'

/**
 * Sets the toolbar theme through useTheme, the app's single source of truth,
 * so components that read the theme (such as ThemeSwitcher) agree with the canvas
 */
const withTheme: Decorator = (story, context) => {
  useTheme().theme.value = (context.globals.theme ?? DEFAULT_THEME) as ThemeId

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
