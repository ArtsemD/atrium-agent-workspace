import type { RunStep, WriteState } from '@/features/run/types'

/** Fixed sample data for the Components page and Storybook. Not used by the live run. */

export const SAMPLE_WRITES: WriteState[] = [
  {
    id: 'a',
    target: 'INV-1001, Example Ltd',
    field: 'Amount',
    from: '€100.00',
    to: '€110.00',
    reason: 'Pending: waiting for a decision.',
    decision: 'pending',
  },
  {
    id: 'b',
    target: 'INV-1002, Example Ltd',
    field: 'Status',
    from: 'Draft',
    to: 'Approved',
    reason: 'Approved: will be written.',
    decision: 'approved',
  },
  {
    id: 'c',
    target: 'INV-1003, Example Ltd',
    field: 'Vendor',
    from: 'Acme',
    to: 'Acme GmbH',
    reason: 'Rejected: stays as it is.',
    decision: 'rejected',
  },
]

export const SAMPLE_STEP_DONE: RunStep = {
  id: 1,
  kind: 'read',
  title: 'Read 312 October invoices',
  detail: 'Pulled every invoice dated 1–31 October.',
  source: 'Billing, read-only',
  status: 'done',
  tokens: 18_400,
  durationMs: 2200,
}

export const SAMPLE_STEP_RUNNING: RunStep = {
  id: 2,
  kind: 'analyze',
  title: 'Checking the mismatches',
  detail: '',
  status: 'running',
  tokens: 4200,
  durationMs: 0,
}

/** Meter examples: under, near and over the limit (value out of 100) */
export const SAMPLE_METER_VALUES = [52, 94, 112] as const
export const SAMPLE_METER_MAX = 100
