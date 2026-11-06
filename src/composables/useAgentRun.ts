import { computed, reactive, readonly } from 'vue'
import { RUN_SCRIPT, tokensToEur, type ProposedWrite, type ScriptStep, type StepKind } from '../data/run-script'

export type RunStatus = 'idle' | 'running' | 'awaiting-approval' | 'completed' | 'stopped'
export type Decision = 'pending' | 'approved' | 'rejected'

export interface WriteState extends ProposedWrite {
  decision: Decision
}

export interface RunStep {
  id: number
  kind: StepKind
  title: string
  detail: string
  source?: string
  status: 'running' | 'done'
  tokens: number
  durationMs: number
  writes?: WriteState[]
}

export type Delay = (ms: number) => Promise<void>

const wait: Delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Plays a scripted agent run step by step, pausing at proposed writes until a
 * person decides on each one. `delay` is injectable so tests run instantly.
 */
export function useAgentRun(script: ScriptStep[] = RUN_SCRIPT, delay: Delay = wait) {
  const state = reactive({
    status: 'idle' as RunStatus,
    task: '',
    steps: [] as RunStep[],
    startedAt: 0,
    finishedAt: 0,
    rating: null as 'useful' | 'not-useful' | null,
  })

  // Bumped on every start/reset so an old, still-sleeping run can't write into a new one
  let generation = 0
  let resumeAfterApproval: (() => void) | null = null

  const tokens = computed(() => state.steps.reduce((sum, s) => sum + s.tokens, 0))
  const costEur = computed(() => tokensToEur(tokens.value))
  const proposal = computed(() => state.steps.find((s) => s.kind === 'proposal'))
  const pendingCount = computed(
    () => proposal.value?.writes?.filter((w) => w.decision === 'pending').length ?? 0,
  )

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
      writes: step.writes?.map((w) => ({ ...w, decision: 'pending' as Decision })),
    })
    state.steps.push(live)

    // Tokens tick up while the step runs, like a streamed response
    const ticks = 6
    for (let i = 1; i <= ticks; i++) {
      await delay(step.durationMs / ticks)
      if (gen !== generation) return null
      live.tokens = Math.round((step.tokens * i) / ticks)
    }
    live.status = 'done'
    return live
  }

  async function start(task: string) {
    const gen = ++generation
    Object.assign(state, {
      status: 'running',
      task,
      steps: [],
      startedAt: Date.now(),
      finishedAt: 0,
      rating: null,
    })

    for (const step of script) {
      const done = await playStep(step, gen)
      if (!done) return
      if (step.kind === 'proposal') {
        state.status = 'awaiting-approval'
        await new Promise<void>((resolve) => (resumeAfterApproval = resolve))
        if (gen !== generation) return
        state.status = 'running'
      }
    }

    const approved = proposal.value?.writes?.filter((w) => w.decision === 'approved') ?? []
    const applied = await playStep(
      {
        kind: 'apply',
        title: approved.length
          ? `Wrote ${approved.length} approved ${approved.length === 1 ? 'change' : 'changes'} to the ERP`
          : 'Wrote nothing: every change was rejected',
        detail: approved.length
          ? approved.map((w) => `${w.target.split(' · ')[0]}: ${w.field.toLowerCase()} → ${w.to}`).join('  ·  ')
          : 'The ERP is unchanged.',
        source: approved.length ? 'ERP · audit log updated' : undefined,
        durationMs: approved.length ? 1200 : 400,
        tokens: approved.length ? 1_100 : 200,
      },
      gen,
    )
    if (!applied) return

    const done = await playStep(
      {
        kind: 'result',
        title: 'Run complete',
        detail: `Reconciled 312 invoices. ${approved.length} fixed, ${3 - approved.length} left for a person, 11 rounding differences ignored.`,
        durationMs: 600,
        tokens: 900,
      },
      gen,
    )
    if (!done) return
    state.status = 'completed'
    state.finishedAt = Date.now()
  }

  function decide(writeId: string, decision: Decision) {
    const write = proposal.value?.writes?.find((w) => w.id === writeId)
    if (!write || state.status !== 'awaiting-approval') return
    write.decision = decision
  }

  function decideAll(decision: Exclude<Decision, 'pending'>) {
    proposal.value?.writes?.forEach((w) => {
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
    Object.assign(state, { status: 'idle', task: '', steps: [], startedAt: 0, finishedAt: 0, rating: null })
  }

  function rate(rating: 'useful' | 'not-useful') {
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
