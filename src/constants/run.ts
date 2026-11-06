import type { RunStatus } from '@/types/agent'
import type { StatusBadge } from '@/types/ui'

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
