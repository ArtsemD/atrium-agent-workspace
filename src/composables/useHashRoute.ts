import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ROUTES } from '@/constants/app'
import type { AppRoute } from '@/types/app'

/** Tiny hash router: enough for three screens, and works on GitHub Pages without a 404 fallback */
export function useHashRoute() {
  const hash = ref(location.hash)
  const sync = () => (hash.value = location.hash)
  onMounted(() => window.addEventListener('hashchange', sync))
  onBeforeUnmount(() => window.removeEventListener('hashchange', sync))

  const route = computed<AppRoute>(() => ROUTES.find((r) => `#/${r.id}` === hash.value) ?? ROUTES[0]!)
  return { route }
}
