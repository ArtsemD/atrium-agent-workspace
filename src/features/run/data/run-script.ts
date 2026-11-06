import type { AccessScope, Agent, ScriptStep, TeamBudget } from '@/features/run/types'

/**
 * A scripted agent run. The demo has no LLM behind it: the run is replayed
 * from this script so it is free, deterministic and works offline. The shape
 * mirrors the events a real backend would stream over WebSocket.
 */

export const AGENT: Agent = {
  name: 'Ledger',
  role: 'Finance agent',
  model: 'Chosen per step',
  gateway: 'Company AI gateway',
}

export const TEAM: TeamBudget = {
  name: 'Finance ops',
  monthSpendEur: 1140.2,
  monthBudgetEur: 1500,
}

/** Blended price used to turn tokens into money for the demo */
export const EUR_PER_MILLION_TOKENS = 9

export const DEFAULT_TASK =
  'Reconcile October vendor invoices against purchase orders and fix anything that is wrong in the ERP.'

export const ACCESS: readonly AccessScope[] = [
  { scope: 'Billing invoices', mode: 'read' },
  { scope: 'ERP purchase orders', mode: 'read' },
  { scope: 'ERP invoices', mode: 'write' },
]

/** Facts the scripted run reports in its summary */
export const RUN_FACTS = { invoices: 312, roundingIgnored: 11 } as const

export const RUN_SCRIPT: ScriptStep[] = [
  {
    kind: 'plan',
    title: 'Planned the run',
    detail: 'Read invoices → match them to purchase orders → check mismatches → propose fixes.',
    durationMs: 1400,
    tokens: 1840,
  },
  {
    kind: 'read',
    title: 'Read 312 October invoices',
    detail: 'Pulled every invoice dated 1–31 October, including credit notes.',
    source: 'Billing, read-only',
    durationMs: 2200,
    tokens: 18_400,
  },
  {
    kind: 'read',
    title: 'Matched 298 of 312 invoices to purchase orders',
    detail: '14 invoices do not match their PO on amount, vendor or status.',
    source: 'ERP, read-only',
    durationMs: 2600,
    tokens: 22_100,
  },
  {
    kind: 'analyze',
    title: 'Checked the 14 mismatches',
    detail: '11 are rounding differences under €1 and can stay as they are. 3 need a change in the ERP.',
    durationMs: 2400,
    tokens: 9_600,
  },
  {
    kind: 'proposal',
    title: 'Wants to write 3 changes to the ERP',
    detail: 'Nothing is written until you approve it.',
    durationMs: 900,
    tokens: 3_200,
    writes: [
      {
        id: 'w1',
        target: 'INV-20418, Halden Supplies',
        field: 'Amount',
        from: '€12,400.00',
        to: '€12,040.00',
        reason: 'PO-7731 totals €12,040.00. The invoice has two digits swapped.',
      },
      {
        id: 'w2',
        target: 'INV-20455, Nordlicht',
        field: 'Vendor',
        from: 'Nordlicht GmbH',
        to: 'Nordlicht Logistik GmbH',
        reason: 'The VAT number on the invoice belongs to Nordlicht Logistik GmbH.',
      },
      {
        id: 'w3',
        target: 'INV-20502, Corvel Print',
        field: 'Status',
        from: 'Approved',
        to: 'On hold',
        reason: 'Same amount, date and PO as INV-20497, which was paid on 14 Oct. Likely a duplicate.',
      },
    ],
  },
]

const TOKENS_PER_MILLION = 1_000_000

export const tokensToEur = (tokens: number): number => {
  return (tokens / TOKENS_PER_MILLION) * EUR_PER_MILLION_TOKENS
}
