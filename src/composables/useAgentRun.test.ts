import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { useAgentRun } from './useAgentRun'

const instant = () => Promise.resolve()
const flush = async () => {
  for (let i = 0; i < 200; i++) await Promise.resolve()
  await nextTick()
}

describe('useAgentRun', () => {
  it('pauses at proposed writes and writes nothing until a person decides', async () => {
    const run = useAgentRun(undefined, instant)
    void run.start('Reconcile invoices')
    await flush()

    expect(run.state.status).toBe('awaiting-approval')
    expect(run.pendingCount.value).toBe(3)
    expect(run.state.steps.some((s) => s.kind === 'apply')).toBe(false)

    // Continuing with undecided writes is ignored
    run.confirmDecisions()
    await flush()
    expect(run.state.status).toBe('awaiting-approval')
  })

  it('applies only the approved writes', async () => {
    const run = useAgentRun(undefined, instant)
    void run.start('Reconcile invoices')
    await flush()

    run.decide('w1', 'approved')
    run.decide('w2', 'rejected')
    run.decide('w3', 'approved')
    run.confirmDecisions()
    await flush()

    const apply = run.state.steps.find((s) => s.kind === 'apply')
    expect(apply?.title).toBe('Wrote 2 approved changes to the ERP')
    expect(apply?.detail).not.toContain('Nordlicht Logistik')
    expect(run.state.status).toBe('completed')
  })

  it('counts tokens and cost across every step', async () => {
    const run = useAgentRun(undefined, instant)
    void run.start('Reconcile invoices')
    await flush()
    run.decideAll('rejected')
    run.confirmDecisions()
    await flush()

    expect(run.tokens.value).toBe(1840 + 18400 + 22100 + 9600 + 3200 + 200 + 900)
    expect(run.costEur.value).toBeCloseTo((run.tokens.value / 1e6) * 9)
  })

  it('stop() ends a live run and a stale run cannot write into a new one', async () => {
    let release!: () => void
    const gated = () => new Promise<void>((r) => (release = r))
    const run = useAgentRun(undefined, gated)
    void run.start('first')
    run.stop()
    expect(run.state.status).toBe('stopped')

    run.reset()
    release()
    await flush()
    expect(run.state.steps).toHaveLength(0)
    expect(run.state.status).toBe('idle')
  })

  it('only lets a completed run be rated, and toggles the rating', async () => {
    const run = useAgentRun(undefined, instant)
    run.rate('useful')
    expect(run.state.rating).toBeNull()

    void run.start('x')
    await flush()
    run.decideAll('approved')
    run.confirmDecisions()
    await flush()
    run.rate('useful')
    expect(run.state.rating).toBe('useful')
    run.rate('useful')
    expect(run.state.rating).toBeNull()
  })
})
