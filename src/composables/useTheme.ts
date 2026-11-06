import { ref, watchEffect } from 'vue'

export const THEMES = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'dusk', label: 'Dusk' },
  { id: 'sand', label: 'Sand' },
] as const

export type ThemeId = (typeof THEMES)[number]['id']

const KEY = 'atrium-theme'

function initial(): ThemeId {
  const fromUrl = new URLSearchParams(location.search).get('theme')
  if (THEMES.some((t) => t.id === fromUrl)) return fromUrl as ThemeId
  try {
    const saved = localStorage.getItem(KEY)
    if (THEMES.some((t) => t.id === saved)) return saved as ThemeId
  } catch {
    /* storage can be blocked; fall through */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Module-level so every component shares one theme
const theme = ref<ThemeId>(initial())

watchEffect(() => {
  document.documentElement.dataset.theme = theme.value
  try {
    localStorage.setItem(KEY, theme.value)
  } catch {
    /* ignore */
  }
})

export function useTheme() {
  return { theme, themes: THEMES }
}
