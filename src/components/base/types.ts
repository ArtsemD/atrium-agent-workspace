import type { IconName, Tone } from '@/types/ui'

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

/** How a card of a given size is padded and titled */
export interface CardSizeStyle {
  box: string
  heading: 'h2' | 'h3'
  headingClass: string
}

export type CardSize = 'sm' | 'md'

export interface BaseCardProps {
  title?: string
  description?: string
  /** sm: compact side card with a small caps heading. md: page section with a title. */
  size?: CardSize
}
