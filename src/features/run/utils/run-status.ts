import type { DeepReadonly } from 'vue'
import type { RunState, RunStatus } from '@/features/run/types'

/** The run is doing something or waiting on a person; the timer runs and it can be stopped */
export const isLive = (status: RunStatus): boolean => {
  return status === 'running' || status === 'awaiting-approval'
}

/** One line under the agent's name that says what it is doing right now */
export const describeActivity = (state: DeepReadonly<RunState>, pendingCount: number): string => {
  switch (state.status) {
    case 'idle':
      return 'Ready for a task'
    case 'running': {
      const current = state.steps.find((s) => s.status === 'running')

      return current ? `${current.title}…` : 'Working…'
    }

    case 'awaiting-approval':
      return `Waiting for you to review ${pendingCount} proposed ${pendingCount === 1 ? 'change' : 'changes'}`
    case 'completed':
      return 'Finished. Tell it whether the result was useful'
    case 'stopped':
      return 'Stopped by you'
  }
}

/** Elapsed run time: up to now while it runs, frozen once it finishes */
export const elapsedMs = (state: DeepReadonly<RunState>, now: number): number => {
  if (!state.startedAt) {
    return 0
  }

  return (state.finishedAt || now) - state.startedAt
}
