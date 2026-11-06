import type { ICON_PATHS } from '@/constants/icons'

export type IconName = keyof typeof ICON_PATHS
export type Tone = 'neutral' | 'accent' | 'ok' | 'warn' | 'danger'
