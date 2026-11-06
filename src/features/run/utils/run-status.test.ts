import { describe, expect, it } from 'vitest'
import type { RunState } from '@/types/agent'
import { describeActivity, elapsedMs, isLive } from './run-status'

const state = (patch: Partial<RunState>): RunState => ({
  status: 'idle',
  task: '',
  steps: [],
  startedAt: 0,
  finishedAt: 0,
  rating: null,
  ...patch,
})

describe('run status', () => {
  it('is live while running or waiting for approval', () => {
    expect(isLive('running')).toBe(true)
    expect(isLive('awaiting-approval')).toBe(true)
    expect(isLive('completed')).toBe(false)
  })

  it('names the step that is running', () => {
    const steps = [
      { id: 1, kind: 'read', title: 'Reading invoices', detail: '', status: 'running', tokens: 0, durationMs: 0 },
    ] as const

    expect(describeActivity(state({ status: 'running', steps: [...steps] }), 0)).toBe('Reading invoices…')
  })

  it('counts pending changes in the singular and plural', () => {
    expect(describeActivity(state({ status: 'awaiting-approval' }), 1)).toContain('1 proposed change')
    expect(describeActivity(state({ status: 'awaiting-approval' }), 3)).toContain('3 proposed changes')
  })

  it('freezes elapsed time once the run finishes', () => {
    expect(elapsedMs(state({ startedAt: 1000, finishedAt: 4000 }), 9000)).toBe(3000)
    expect(elapsedMs(state({ startedAt: 1000 }), 9000)).toBe(8000)
    expect(elapsedMs(state({}), 9000)).toBe(0)
  })
})
