import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

/** Tracks an element's rendered width in CSS pixels */
export function useElementWidth(el: Readonly<Ref<HTMLElement | null>>) {
  const width = ref(0)
  let observer: ResizeObserver | undefined

  onMounted(() => {
    if (!el.value) return
    observer = new ResizeObserver(([entry]) => {
      if (entry) width.value = entry.contentRect.width
    })
    observer.observe(el.value)
  })
  onBeforeUnmount(() => observer?.disconnect())

  return width
}
