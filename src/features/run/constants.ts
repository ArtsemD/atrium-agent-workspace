import type { RatingOption, RunStatus, Scene, StatusBadge, StepKind } from '@/features/run/types'
import type { IconName } from '@/types/ui'

/** Token counter updates per step, so a step's tokens tick up like a streamed response */
export const TOKEN_TICKS_PER_STEP = 6
/** Microtask budget for jumping to a scene instantly (?scene=…) */
export const SCENE_FLUSH_LIMIT = 300

export const APPLY_STEP = {
  withWrites: { durationMs: 1200, tokens: 1100 },
  withoutWrites: { durationMs: 400, tokens: 200 },
} as const

export const RESULT_STEP = { durationMs: 600, tokens: 900 } as const

/** Badge shown for each run status in the run header */
export const RUN_STATUS_BADGE = {
  idle: { tone: 'neutral', label: 'Idle' },
  running: { tone: 'accent', label: 'Running' },
  'awaiting-approval': { tone: 'warn', label: 'Needs approval' },
  completed: { tone: 'ok', label: 'Completed' },
  stopped: { tone: 'neutral', label: 'Stopped' },
} as const satisfies Record<RunStatus, StatusBadge>

/** Timeline marker icon for each kind of step */
export const STEP_ICON: Record<StepKind, IconName> = {
  plan: 'list',
  read: 'database',
  analyze: 'search',
  proposal: 'pencil',
  apply: 'check',
  result: 'flag',
}

/** The two answers to "was this run useful?" */
export const RATING_OPTIONS: readonly RatingOption[] = [
  { id: 'useful', label: 'Useful', icon: 'thumbUp', activeClass: 'border-ok/40 bg-ok-soft text-ok' },
  {
    id: 'not-useful',
    label: 'Not useful',
    icon: 'thumbDown',
    activeClass: 'border-danger/40 bg-danger-soft text-danger',
  },
]

export const SCENES: readonly Scene[] = ['approval', 'done']

/** How often the run's elapsed time refreshes */
export const ELAPSED_TICK_MS = 500
