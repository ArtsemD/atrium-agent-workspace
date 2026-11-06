import { ref, watchEffect } from 'vue'
import { DEFAULT_DARK_THEME, DEFAULT_THEME, QUERY, THEME_STORAGE_KEY, THEMES } from '@/constants/app'
import type { ThemeId } from '@/types/app'

function isTheme(value: string | null): value is ThemeId {
  return THEMES.some((t) => t.id === value)
}

function initialTheme(): ThemeId {
  const fromUrl = new URLSearchParams(location.search).get(QUERY.theme)
  if (isTheme(fromUrl)) return fromUrl
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY)
    if (isTheme(saved)) return saved
  } catch {
    // Storage can be blocked (private mode, sandboxed previews); fall back to the system preference
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? DEFAULT_DARK_THEME : DEFAULT_THEME
}

// Module scope: every component shares one theme
const theme = ref<ThemeId>(initialTheme())

watchEffect(() => {
  document.documentElement.dataset.theme = theme.value
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme.value)
  } catch {
    // Not critical: the theme just won't be remembered
  }
})

export function useTheme() {
  return { theme, themes: THEMES }
}
