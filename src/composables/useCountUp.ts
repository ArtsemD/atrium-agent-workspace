import { onBeforeUnmount, readonly, ref, watch, type Ref } from 'vue'
import { COUNT_UP_MS, REDUCED_MOTION_QUERY } from '@/constants/app'

/** Fast start, gentle landing: the number settles instead of stopping dead */
const easeOutCubic = (t: number): number => {
  return 1 - (1 - t) ** 3
}

const prefersReducedMotion = (): boolean => {
  return window.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false
}

/**
 * A number that counts from its previous value to the new one whenever the source changes.
 * Starts from 0, so a value counts up when it first appears. Jumps straight there with reduced motion.
 */
export const useCountUp = (source: () => number, durationMs: number = COUNT_UP_MS): Readonly<Ref<number>> => {
  const shown = ref(0)
  let frame = 0

  const animate = (to: number): void => {
    cancelAnimationFrame(frame)

    const from = shown.value

    if (from === to || prefersReducedMotion()) {
      shown.value = to

      return
    }

    const startedAt = performance.now()

    const step = (now: number): void => {
      const progress = Math.min(1, (now - startedAt) / durationMs)

      shown.value = from + (to - from) * easeOutCubic(progress)

      if (progress < 1) {
        frame = requestAnimationFrame(step)
      }
    }

    frame = requestAnimationFrame(step)
  }

  watch(source, animate, { immediate: true })
  onBeforeUnmount(() => cancelAnimationFrame(frame))

  return readonly(shown)
}
