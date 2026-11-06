import { computed, onBeforeUnmount, ref, watch, type ComputedRef, type DeepReadonly } from 'vue'
import { ELAPSED_TICK_MS } from '@/features/run/constants'
import type { RunState } from '@/features/run/types'
import { elapsedMs, isLive } from '../utils/run-status'

/** Elapsed run time that ticks while the run is live and stops when it ends */
export const useElapsedTime = (state: DeepReadonly<RunState>): ComputedRef<number> => {
  const now = ref(Date.now())
  let timer: number | undefined

  watch(
    () => isLive(state.status),
    (live) => {
      window.clearInterval(timer)

      if (live) {
        timer = window.setInterval(() => (now.value = Date.now()), ELAPSED_TICK_MS)
      }
    },
    { immediate: true },
  )
  onBeforeUnmount(() => window.clearInterval(timer))

  return computed(() => elapsedMs(state, now.value))
}
