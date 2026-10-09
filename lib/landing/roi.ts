export interface RoiInput {
  visitors: number
  /** Percent, e.g. 2 for 2%. */
  conversionRate: number
  aov: number
  /** Relative lift on conversion rate, e.g. 0.1 for +10%. */
  relativeLift: number
}

export interface RoiEstimate {
  baselineOrders: number
  baselineRevenue: number
  extraOrders: number
  extraMonthly: number
  extraAnnual: number
  newConversionRate: number
  leftWithoutBuying: number
}

/**
 * Honest upside estimate: only the lift on orders you already get.
 * visitors × conversion rate × relative lift × AOV.
 */
export function estimateRoi({ visitors, conversionRate, aov, relativeLift }: RoiInput): RoiEstimate {
  const safeVisitors = Math.max(0, visitors || 0)
  const safeRate = Math.min(100, Math.max(0, conversionRate || 0))
  const safeAov = Math.max(0, aov || 0)
  const baselineOrders = safeVisitors * (safeRate / 100)
  const extraOrders = baselineOrders * relativeLift
  const extraMonthly = extraOrders * safeAov
  return {
    baselineOrders,
    baselineRevenue: baselineOrders * safeAov,
    extraOrders,
    extraMonthly,
    extraAnnual: extraMonthly * 12,
    newConversionRate: safeRate * (1 + relativeLift),
    leftWithoutBuying: safeVisitors - baselineOrders,
  }
}
