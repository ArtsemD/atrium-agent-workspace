import type { IconName } from './ui'

export type StepKind = 'plan' | 'read' | 'analyze' | 'proposal' | 'apply' | 'result'
export type RunStatus = 'idle' | 'running' | 'awaiting-approval' | 'completed' | 'stopped'
export type Decision = 'pending' | 'approved' | 'rejected'
export type FinalDecision = Exclude<Decision, 'pending'>
export type Rating = 'useful' | 'not-useful'
export type StepStatus = 'running' | 'done'
export type AccessMode = 'read' | 'write'

export interface ProposedWrite {
  id: string
  /** Record the change applies to, e.g. "INV-20418, Halden Supplies" */
  target: string
  field: string
  from: string
  to: string
  reason: string
}

export interface WriteState extends ProposedWrite {
  decision: Decision
}

export interface ScriptStep {
  kind: StepKind
  title: string
  detail: string
  /** How long the step runs before it completes */
  durationMs: number
  tokens: number
  source?: string
  writes?: ProposedWrite[]
}

export interface RunStep {
  id: number
  kind: StepKind
  title: string
  detail: string
  source?: string
  status: StepStatus
  tokens: number
  durationMs: number
  writes?: WriteState[]
}

export interface RunState {
  status: RunStatus
  task: string
  steps: RunStep[]
  startedAt: number
  finishedAt: number
  rating: Rating | null
}

export type Delay = (ms: number) => Promise<void>

export interface Agent {
  name: string
  role: string
  model: string
}

export interface TeamBudget {
  name: string
  monthSpendEur: number
  monthBudgetEur: number
}

export interface AccessScope {
  scope: string
  mode: AccessMode
}

export interface AgentPresenceProps {
  name: string
  activity: string
  active: boolean
}

export interface TimelineStepProps {
  kind: StepKind
  title: string
  detail: string
  source?: string
  status: StepStatus
  tokens: number
  durationMs: number
  /** Last item hides the connecting rail */
  last?: boolean
}

export interface ProposedWritesProps {
  writes: readonly WriteState[]
  /** Locked once the run has moved past the approval step */
  locked: boolean
}

export interface RunRatingProps {
  rating: Rating | null
}

export interface ProposedWritesEmits {
  decide: [id: string, decision: Decision]
  decideAll: [decision: FinalDecision]
  confirm: []
}

export interface RunRatingEmits {
  rate: [rating: Rating]
}

export interface RatingOption {
  id: Rating
  label: string
  icon: IconName
  /** Classes applied while this option is selected */
  activeClass: string
}
