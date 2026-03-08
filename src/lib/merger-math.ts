import { CompanyType } from './types'
import type { BidLadderEntry, MergerResult } from './types'
import { BASE_PRICES, MAX_BID_INCREMENTS } from './game-constants'

export function calculateMinimumBid(
  companyType: CompanyType,
  totalUnits: number,
): number {
  return totalUnits * BASE_PRICES[companyType]
}

export function generateBidLadder(
  companyType: CompanyType,
  ownerAUnits: number,
  ownerBUnits: number,
  maxIncrements: number = MAX_BID_INCREMENTS,
): BidLadderEntry[] {
  const totalUnits = ownerAUnits + ownerBUnits
  const minimumBid = calculateMinimumBid(companyType, totalUnits)
  const ladder: BidLadderEntry[] = []

  for (let i = 0; i <= maxIncrements; i++) {
    const bidAmount = minimumBid + i * totalUnits
    const perUnit = bidAmount / totalUnits
    const paymentToA = Math.round((ownerAUnits / totalUnits) * bidAmount)
    const paymentToB = Math.round((ownerBUnits / totalUnits) * bidAmount)

    ladder.push({ bidAmount, perUnit, paymentToA, paymentToB })
  }

  return ladder
}

export function calculatePaymentSplit(
  winningBid: number,
  ownerAUnits: number,
  ownerBUnits: number,
): { paymentToA: number; paymentToB: number } {
  const totalUnits = ownerAUnits + ownerBUnits
  return {
    paymentToA: Math.round((ownerAUnits / totalUnits) * winningBid),
    paymentToB: Math.round((ownerBUnits / totalUnits) * winningBid),
  }
}

export function calculateMerger(
  companyType: CompanyType,
  ownerAUnits: number,
  ownerBUnits: number,
  maxIncrements: number = MAX_BID_INCREMENTS,
): MergerResult {
  const totalUnits = ownerAUnits + ownerBUnits
  return {
    companyType,
    totalUnits,
    minimumBid: calculateMinimumBid(companyType, totalUnits),
    bidIncrement: totalUnits,
    bidLadder: generateBidLadder(companyType, ownerAUnits, ownerBUnits, maxIncrements),
  }
}
