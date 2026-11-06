/** Sum of one numeric field across a list */
export function sumBy<T>(items: readonly T[], pick: (item: T) => number): number {
  return items.reduce((sum, item) => sum + pick(item), 0)
}

/** Keeps a value inside [min, max] */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/** Share of a total, 0 when the total is 0 */
export function ratio(part: number, total: number): number {
  return total > 0 ? part / total : 0
}
