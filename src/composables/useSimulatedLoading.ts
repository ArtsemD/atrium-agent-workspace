import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { SimulatedLoading } from '@/types/app'

/** A loading flag that clears after a delay, standing in for a network request */
export const useSimulatedLoading = (ms: number): SimulatedLoading => {
  const loading = ref(true)
  let timer: number | undefined

  onMounted(() => (timer = window.setTimeout(() => (loading.value = false), ms)))
  onBeforeUnmount(() => window.clearTimeout(timer))

  return { loading }
}
