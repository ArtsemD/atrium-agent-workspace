import { onBeforeUnmount, onMounted, ref } from 'vue'

/** A loading flag that clears after a delay, standing in for a network request */
export function useSimulatedLoading(ms: number) {
  const loading = ref(true)
  let timer: number | undefined
  onMounted(() => (timer = window.setTimeout(() => (loading.value = false), ms)))
  onBeforeUnmount(() => window.clearTimeout(timer))
  return { loading }
}
