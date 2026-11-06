import type { ComputedRef, Ref } from 'vue'
import type { IconName } from './ui'

export type ThemeId = 'light' | 'dark' | 'dusk' | 'sand'

export interface Theme {
  id: ThemeId
  label: string
}

export type RouteId = 'run' | 'spend' | 'system'

export interface AppRoute {
  id: RouteId
  label: string
  icon: IconName
  title: string
  crumb: string
}

export type Scene = 'approval' | 'done'

export interface AppSidebarProps {
  current: RouteId
}

export interface ThemePreviewCardProps {
  theme: Theme
}

/** What useTheme returns */
export interface ThemeState {
  theme: Ref<ThemeId>
  themes: readonly Theme[]
}

/** What useHashRoute returns */
export interface HashRoute {
  route: ComputedRef<AppRoute>
}

/** What useSimulatedLoading returns */
export interface SimulatedLoading {
  loading: Ref<boolean>
}
