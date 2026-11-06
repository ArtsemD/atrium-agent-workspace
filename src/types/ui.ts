import type { ICON_PATHS } from '@/constants/icons'

export type IconName = keyof typeof ICON_PATHS
export type Tone = 'neutral' | 'accent' | 'ok' | 'warn' | 'danger'
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ControlSize = 'sm' | 'md'

export interface BaseIconProps {
  name: IconName
  size?: number
}

export interface BaseButtonProps {
  variant?: ButtonVariant
  size?: ControlSize
  icon?: IconName
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit'
}

export interface BaseBadgeProps {
  tone?: Tone
  dot?: boolean
}

export interface BaseMeterProps {
  value: number
  max: number
  /** Accessible name, e.g. "Finance ops spend against budget" */
  label: string
  size?: ControlSize
}

export interface EmptyStateProps {
  icon: IconName
  title: string
  description?: string
}
