/** Inline icon set: Lucide paths on a 24×24 grid, stroke-based so icons inherit currentColor */
export const ICON_PATHS = {
  sparkles:
    'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z',
  check: 'M20 6 9 17l-5-5',
  x: 'M18 6 6 18 M6 6l12 12',
  database:
    'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M21 21l-4.3-4.3',
  pencil: 'M17 3l4 4L8 20H4v-4z',
  list: 'M8 6h13 M8 12h13 M8 18h13 M3 6h.01 M3 12h.01 M3 18h.01',
  flag: 'M4 22V4 M4 4h13l-2 4 2 4H4',
  play: 'M7 4l13 8-13 8z',
  square: 'M6 6h12v12H6z',
  chart: 'M3 3v18h18 M7 15l4-4 3 3 6-7',
  undo: 'M9 14 4 9l5-5 M4 9h11a5 5 0 0 1 0 10h-2',
  thumbUp: 'M7 10v11 M15 5.9 14 10h5.8a2 2 0 0 1 2 2.3l-1.4 7A2 2 0 0 1 18.4 21H7V10l4-8a3 3 0 0 1 4 3.9z',
  thumbDown: 'M17 14V3 M9 18.1 10 14H4.2a2 2 0 0 1-2-2.3l1.4-7A2 2 0 0 1 5.6 3H17v11l-4 8a3 3 0 0 1-4-3.9z',
  lock: 'M5 11h14v10H5z M8 11V7a4 4 0 0 1 8 0v4',
  eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
  grid: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  logo: 'M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14z',
  inbox: 'M22 12h-6l-2 3h-4l-2-3H2 M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z',
} as const

export const ICON_SIZE = { sm: 14, md: 16, lg: 20 } as const
export const ICON_STROKE_WIDTH = 1.8
/** Loading spinner geometry on the same 24×24 grid */
export const SPINNER = {
  viewBox: '0 0 24 24',
  center: 12,
  radius: 9,
  stroke: 2.5,
  trackOpacity: 0.25,
  arc: 'M21 12a9 9 0 0 0-9-9',
} as const
