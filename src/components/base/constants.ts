import type { ButtonVariant, CardSize, CardSizeStyle } from '@/components/base/types'
import type { Tone } from '@/types/ui'

/** Background and text colour for each badge tone */
export const BADGE_TONE_CLASS: Record<Tone, string> = {
  neutral: 'bg-sunken text-fg-2',
  accent: 'bg-accent-soft text-accent',
  ok: 'bg-ok-soft text-ok',
  warn: 'bg-warn-soft text-warn',
  danger: 'bg-danger-soft text-danger',
}

/** Classes for each button variant */
export const BUTTON_VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-fg hover:bg-accent/90',
  secondary: 'border border-line-strong bg-surface-solid text-fg hover:bg-sunken',
  ghost: 'text-fg-2 hover:bg-sunken hover:text-fg',
  danger: 'border border-line-strong bg-surface-solid text-danger hover:bg-danger-soft',
}

/** Padding and heading level for each card size */
export const CARD_SIZE: Record<CardSize, CardSizeStyle> = {
  sm: { box: 'p-4', heading: 'h3', headingClass: 'eyebrow m-0' },
  md: { box: 'p-4 sm:p-5', heading: 'h2', headingClass: 'm-0 text-title font-semibold text-fg' },
}

export const ICON_STROKE_WIDTH = 1.8

/** Loading spinner geometry on the same 24×24 grid */
export const SPINNER = {
  viewBox: '0 0 24 24',
  center: 12,
  radius: 9,
  stroke: 2.5,
  trackOpacity: 0.25,
  arc: 'M21 12a9 9 0 0 0-9-9',
} as const
