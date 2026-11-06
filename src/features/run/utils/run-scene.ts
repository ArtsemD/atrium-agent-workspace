import { QUERY } from '@/constants/app'
import { SCENES } from '@/features/run/constants'
import type { Delay, Scene } from '@/features/run/types'

const isScene = (value: string | null): value is Scene => SCENES.some((s) => s === value)

/** Reads ?scene=approval|done from a query string */
export const readScene = (search: string): Scene | null => {
  const value = new URLSearchParams(search).get(QUERY.scene)

  return isScene(value) ? value : null
}

/** A delay that resolves at once, so a scene plays instantly instead of in real time */
export const instantDelay: Delay = () => Promise.resolve()
