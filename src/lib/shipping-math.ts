import { CompanyType } from './types'
import type { ShippingResult } from './types'
import { REVENUE_PER_GOOD, SHIPPING_COST_PER_HOP } from './game-constants'

export function calculateRevenue(
  goodType: CompanyType,
  quantity: number,
): number {
  const rate = REVENUE_PER_GOOD[goodType]
  if (rate === undefined) {
    throw new Error(`No revenue rate for good type: ${goodType}`)
  }
  return quantity * rate
}

export function calculateShippingCost(
  quantity: number,
  hops: number,
): number {
  return quantity * hops * SHIPPING_COST_PER_HOP
}

export function calculateNetProfit(
  goodType: CompanyType,
  quantity: number,
  hops: number,
): number {
  return calculateRevenue(goodType, quantity) - calculateShippingCost(quantity, hops)
}

export function calculateBreakEvenHops(goodType: CompanyType): number {
  const rate = REVENUE_PER_GOOD[goodType]
  if (rate === undefined) {
    throw new Error(`No revenue rate for good type: ${goodType}`)
  }
  return Math.floor(rate / SHIPPING_COST_PER_HOP)
}

export function calculateShipping(
  goodType: CompanyType,
  quantity: number,
  hops: number,
): ShippingResult {
  const grossRevenue = calculateRevenue(goodType, quantity)
  const shippingCost = calculateShippingCost(quantity, hops)
  const netProfit = grossRevenue - shippingCost

  return {
    grossRevenue,
    shippingCost,
    netProfit,
    isProfitable: netProfit > 0,
    breakEvenHops: calculateBreakEvenHops(goodType),
  }
}
