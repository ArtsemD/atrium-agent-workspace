import { QUERY, SCENES } from '@/constants/app'
import type { Delay } from '@/types/agent'
import type { Scene } from '@/types/app'

const isScene = (value: string | null): value is Scene => SCENES.some((s) => s === value)

/** Reads ?scene=approval|done from a query string */
export function readScene(search: string): Scene | null {
  const value = new URLSearchParams(search).get(QUERY.scene)
  return isScene(value) ? value : null
}

/** A delay that resolves at once, so a scene plays instantly instead of in real time */
export const instantDelay: Delay = () => Promise.resolve()
