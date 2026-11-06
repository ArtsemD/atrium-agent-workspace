import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ROUTES } from '@/constants/app'
import type { AppRoute, HashRoute } from '@/types/app'

/** Tiny hash router: enough for three screens, and works on GitHub Pages without a 404 fallback */
export const useHashRoute = (): HashRoute => {
  const hash = ref(location.hash)

  const sync = (): void => {
    hash.value = location.hash
  }

  onMounted(() => window.addEventListener('hashchange', sync))
  onBeforeUnmount(() => window.removeEventListener('hashchange', sync))

  const route = computed<AppRoute>(() => ROUTES.find((r) => `#/${r.id}` === hash.value) ?? ROUTES[0]!)

  return { route }
}
