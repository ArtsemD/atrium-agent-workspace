import type { AppRoute, Scene, Theme } from '@/types/app'

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
export const SCENES: readonly Scene[] = ['approval', 'done']

export const ROUTES: readonly AppRoute[] = [
  { id: 'run', label: 'Agent run', icon: 'sparkles', title: 'Reconcile October invoices', crumb: 'Finance ops' },
  { id: 'spend', label: 'Spend → Value', icon: 'chart', title: 'Spend → Value', crumb: 'Company' },
  { id: 'system', label: 'Components', icon: 'grid', title: 'Components & themes', crumb: 'Design system' },
]

/** Simulated network latency for the Spend view, so its loading state is visible */
export const SPEND_LOADING_MS = 900
/** How often the run's elapsed time refreshes */
export const ELAPSED_TICK_MS = 500

export const PERCENT = 100

/** Tokens shown as swatches for each theme on the Components page */
export const THEME_SWATCHES = ['bg', 'surface-solid', 'fg', 'fg-2', 'accent', 'ok', 'warn', 'danger'] as const
