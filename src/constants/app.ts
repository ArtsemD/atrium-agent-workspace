import type { AppRoute, Theme } from '@/types/app'

export const LOCALE = 'en-GB'
export const CURRENCY = 'EUR'

export const THEMES: readonly Theme[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'dusk', label: 'Dusk' },
  { id: 'sand', label: 'Sand' },
]
export const DEFAULT_THEME = 'light'
export const DEFAULT_DARK_THEME = 'dark'
export const THEME_STORAGE_KEY = 'atrium-theme'

/** URL query parameters that jump straight to a state (screenshots, impatient reviewers) */
export const QUERY = { theme: 'theme', scene: 'scene' } as const
export const ROUTES: readonly AppRoute[] = [
  { id: 'run', label: 'Agent run', icon: 'sparkles', title: 'Reconcile October invoices', crumb: 'Finance ops' },
  { id: 'spend', label: 'Spend → Value', icon: 'chart', title: 'Spend → Value', crumb: 'Company' },
  { id: 'system', label: 'Components', icon: 'grid', title: 'Components & themes', crumb: 'Design system' },
]

export const PERCENT = 100

/** How long a number takes to count to its new value */
export const COUNT_UP_MS = 600
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
