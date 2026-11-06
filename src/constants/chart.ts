/** Spend chart geometry, in the SVG's own coordinate space (it scales with its container) */
export const CHART = {
  width: 1080,
  height: 340,
  pad: { top: 16, right: 16, bottom: 28, left: 52 },
  yTickStepEur: 1000,
  /** Headroom above the higher of budget and forecast */
  headroom: 1.08,
  xTickDays: [1, 8, 15, 22, 30],
  /** After this day the tooltip opens to the left so it stays inside the chart */
  tooltipFlipDay: 22,
  tooltipShift: { left: 'translateX(-105%)', right: 'translateX(0.5rem)' },
  labelOffset: { x: 10, y: 4, budget: 7, axis: 8 },
  fontSize: 12,
  stroke: { actual: 2.5, forecast: 2, hoverDot: 2, todayRing: 2 },
  radius: { today: 4.5, hover: 4 },
  dash: { forecast: '5 5', budget: '2 4', hover: '2 3' },
  opacity: { band: 0.12, areaTop: 0.22 },
} as const
