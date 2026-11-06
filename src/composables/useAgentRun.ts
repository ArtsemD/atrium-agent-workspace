import { computed, reactive, readonly } from 'vue'
import { APPLY_STEP, RESULT_STEP, TOKEN_TICKS_PER_STEP } from '@/constants/run'
import { RUN_FACTS, RUN_SCRIPT, tokensToEur } from '@/data/run-script'
import type { Decision, Delay, FinalDecision, Rating, RunState, RunStep, ScriptStep, WriteState } from '@/types/agent'

const wait: Delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function initialState(): RunState {
  return { status: 'idle', task: '', steps: [], startedAt: 0, finishedAt: 0, rating: null }
}

/** "INV-20418, Halden Supplies" → "INV-20418" */
function recordId(target: string): string {
  return target.split(', ')[0] ?? target
}

function applyStep(approved: readonly WriteState[]): ScriptStep {
  if (!approved.length) {
    return {
      kind: 'apply',
      title: 'Wrote nothing: every change was rejected',
      detail: 'The ERP is unchanged.',
      ...APPLY_STEP.withoutWrites,
    }
  }
  return {
    kind: 'apply',
    title: `Wrote ${approved.length} approved ${approved.length === 1 ? 'change' : 'changes'} to the ERP`,
    detail: approved.map((w) => `${recordId(w.target)}: ${w.field.toLowerCase()} → ${w.to}`).join('; '),
    source: 'ERP audit log updated',
    ...APPLY_STEP.withWrites,
  }
}

function resultStep(approvedCount: number, proposedCount: number): ScriptStep {
  return {
    kind: 'result',
    title: 'Run complete',
    detail: `Reconciled ${RUN_FACTS.invoices} invoices. ${approvedCount} fixed, ${proposedCount - approvedCount} left for a person, ${RUN_FACTS.roundingIgnored} rounding differences ignored.`,
    ...RESULT_STEP,
  }
}

/**
 * Plays a scripted agent run step by step, pausing at proposed writes until a
 * person decides on each one. `delay` is injectable so tests run instantly.
 */
export function useAgentRun(script: readonly ScriptStep[] = RUN_SCRIPT, delay: Delay = wait) {
  const state = reactive<RunState>(initialState())

  // Bumped on every start, stop and reset, so an older run that is still sleeping can't write into a newer one
  let generation = 0
  let resumeAfterApproval: (() => void) | null = null

  const tokens = computed(() => state.steps.reduce((sum, s) => sum + s.tokens, 0))
  const costEur = computed(() => tokensToEur(tokens.value))
  const proposal = computed(() => state.steps.find((s) => s.kind === 'proposal'))
  const writes = computed(() => proposal.value?.writes ?? [])
  const pendingCount = computed(() => writes.value.filter((w) => w.decision === 'pending').length)

  async function playStep(step: ScriptStep, gen: number): Promise<RunStep | null> {
    const live = reactive<RunStep>({
      id: state.steps.length + 1,
      kind: step.kind,
      title: step.title,
      detail: step.detail,
      source: step.source,
      status: 'running',
      tokens: 0,
      durationMs: step.durationMs,
      writes: step.writes?.map((w) => ({ ...w, decision: 'pending' })),
    })
    state.steps.push(live)

    for (let tick = 1; tick <= TOKEN_TICKS_PER_STEP; tick++) {
      await delay(step.durationMs / TOKEN_TICKS_PER_STEP)
      if (gen !== generation) return null
      live.tokens = Math.round((step.tokens * tick) / TOKEN_TICKS_PER_STEP)
    }
    live.status = 'done'
    return live
  }

  async function start(task: string) {
    const gen = ++generation
    Object.assign(state, initialState(), { status: 'running', task, startedAt: Date.now() })

    for (const step of script) {
      if (!(await playStep(step, gen))) return
      if (step.kind === 'proposal') {
        state.status = 'awaiting-approval'
        await new Promise<void>((resolve) => (resumeAfterApproval = resolve))
        if (gen !== generation) return
        state.status = 'running'
      }
    }

    const approved = writes.value.filter((w) => w.decision === 'approved')
    if (!(await playStep(applyStep(approved), gen))) return
    if (!(await playStep(resultStep(approved.length, writes.value.length), gen))) return
    state.status = 'completed'
    state.finishedAt = Date.now()
  }

  function decide(writeId: string, decision: Decision) {
    if (state.status !== 'awaiting-approval') return
    const write = writes.value.find((w) => w.id === writeId)
    if (write) write.decision = decision
  }

  function decideAll(decision: FinalDecision) {
    if (state.status !== 'awaiting-approval') return
    writes.value.forEach((w) => {
      if (w.decision === 'pending') w.decision = decision
    })
  }

  /** Continue the run once every proposed write has a decision */
  function confirmDecisions() {
    if (pendingCount.value > 0 || !resumeAfterApproval) return
    const resume = resumeAfterApproval
    resumeAfterApproval = null
    resume()
  }

  function stop() {
    generation++
    resumeAfterApproval = null
    if (state.status === 'running' || state.status === 'awaiting-approval') {
      state.status = 'stopped'
      state.finishedAt = Date.now()
      state.steps.forEach((s) => (s.status = 'done'))
    }
  }

  function reset() {
    generation++
    resumeAfterApproval = null
    Object.assign(state, initialState())
  }

  function rate(rating: Rating) {
    if (state.status === 'completed') state.rating = state.rating === rating ? null : rating
  }

  return {
    state: readonly(state),
    tokens,
    costEur,
    pendingCount,
    start,
    decide,
    decideAll,
    confirmDecisions,
    stop,
    reset,
    rate,
  }
}
