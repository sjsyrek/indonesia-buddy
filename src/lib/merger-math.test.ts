import { describe, it, expect } from 'vitest'
import { CompanyType } from './types'
import {
  calculateMinimumBid,
  generateBidLadder,
  calculatePaymentSplit,
  calculateMerger,
} from './merger-math'

describe('merger-math', () => {
  describe('calculateMinimumBid', () => {
    it('calculates minimum bid for each company type', () => {
      expect(calculateMinimumBid(CompanyType.Shipping, 10)).toBe(100)
      expect(calculateMinimumBid(CompanyType.Rice, 5)).toBe(100)
      expect(calculateMinimumBid(CompanyType.Spice, 4)).toBe(100)
      expect(calculateMinimumBid(CompanyType.SiapFajiCreation, 4)).toBe(100)
      expect(calculateMinimumBid(CompanyType.Rubber, 3)).toBe(90)
      expect(calculateMinimumBid(CompanyType.SiapFajiMerger, 2)).toBe(70)
      expect(calculateMinimumBid(CompanyType.Oil, 2)).toBe(80)
    })

    it('handles single-unit companies', () => {
      expect(calculateMinimumBid(CompanyType.Rice, 1)).toBe(20)
      expect(calculateMinimumBid(CompanyType.Oil, 1)).toBe(40)
    })

    it('handles large mergers (13+ units)', () => {
      expect(calculateMinimumBid(CompanyType.Oil, 17)).toBe(680)
      expect(calculateMinimumBid(CompanyType.Rice, 13)).toBe(260)
    })
  })

  describe('generateBidLadder', () => {
    it('generates correct ladder with minimum bid as first entry', () => {
      const ladder = generateBidLadder(CompanyType.Rice, 3, 2, 5)
      expect(ladder[0].bidAmount).toBe(100) // 5 units * 20
      expect(ladder[0].perUnit).toBe(20)
    })

    it('increments by total units', () => {
      const ladder = generateBidLadder(CompanyType.Rice, 3, 2, 3)
      expect(ladder[0].bidAmount).toBe(100)
      expect(ladder[1].bidAmount).toBe(105) // +5
      expect(ladder[2].bidAmount).toBe(110) // +5
      expect(ladder[3].bidAmount).toBe(115) // +5
    })

    it('splits payments proportionally', () => {
      const ladder = generateBidLadder(CompanyType.Rice, 3, 2, 0)
      // Bid 100, Owner A has 3/5, Owner B has 2/5
      expect(ladder[0].paymentToA).toBe(60)
      expect(ladder[0].paymentToB).toBe(40)
    })

    it('produces whole number payments when bid is divisible by total units', () => {
      const ladder = generateBidLadder(CompanyType.Oil, 7, 6, 10)
      for (const entry of ladder) {
        expect(entry.bidAmount % 13).toBe(0)
        expect(Number.isInteger(entry.paymentToA)).toBe(true)
        expect(Number.isInteger(entry.paymentToB)).toBe(true)
        expect(entry.paymentToA + entry.paymentToB).toBe(entry.bidAmount)
      }
    })

    it('returns maxIncrements + 1 entries', () => {
      const ladder = generateBidLadder(CompanyType.Spice, 2, 3, 150)
      expect(ladder).toHaveLength(151)
    })

    it('handles same-owner scenario (equal split)', () => {
      const ladder = generateBidLadder(CompanyType.Rubber, 5, 5, 2)
      expect(ladder[0].paymentToA).toBe(ladder[0].paymentToB)
    })
  })

  describe('calculatePaymentSplit', () => {
    it('splits payment proportionally', () => {
      const result = calculatePaymentSplit(130, 7, 6)
      expect(result.paymentToA).toBe(70)
      expect(result.paymentToB).toBe(60)
    })

    it('handles equal ownership', () => {
      const result = calculatePaymentSplit(200, 5, 5)
      expect(result.paymentToA).toBe(100)
      expect(result.paymentToB).toBe(100)
    })

    it('handles lopsided ownership', () => {
      const result = calculatePaymentSplit(100, 9, 1)
      expect(result.paymentToA).toBe(90)
      expect(result.paymentToB).toBe(10)
    })
  })

  describe('calculateMerger', () => {
    it('returns complete merger result', () => {
      const result = calculateMerger(CompanyType.Spice, 4, 3, 5)
      expect(result.companyType).toBe(CompanyType.Spice)
      expect(result.totalUnits).toBe(7)
      expect(result.minimumBid).toBe(175) // 7 * 25
      expect(result.bidIncrement).toBe(7)
      expect(result.bidLadder).toHaveLength(6)
    })

    it('works for all 7 company types', () => {
      const types = Object.values(CompanyType)
      for (const type of types) {
        const result = calculateMerger(type, 3, 2, 2)
        expect(result.totalUnits).toBe(5)
        expect(result.bidLadder).toHaveLength(3)
        expect(result.bidLadder[0].bidAmount).toBe(result.minimumBid)
      }
    })
  })
})
