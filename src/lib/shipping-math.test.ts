import { describe, it, expect } from 'vitest'
import { CompanyType } from './types'
import {
  calculateRevenue,
  calculateShippingCost,
  calculateNetProfit,
  calculateBreakEvenHops,
  calculateShipping,
} from './shipping-math'

describe('shipping-math', () => {
  describe('calculateRevenue', () => {
    it('calculates revenue for each good type', () => {
      expect(calculateRevenue(CompanyType.Rice, 1)).toBe(20)
      expect(calculateRevenue(CompanyType.Spice, 1)).toBe(25)
      expect(calculateRevenue(CompanyType.Rubber, 1)).toBe(30)
      expect(calculateRevenue(CompanyType.SiapFajiCreation, 1)).toBe(35)
      expect(calculateRevenue(CompanyType.SiapFajiMerger, 1)).toBe(35)
      expect(calculateRevenue(CompanyType.Oil, 1)).toBe(40)
    })

    it('scales with quantity', () => {
      expect(calculateRevenue(CompanyType.Rice, 5)).toBe(100)
      expect(calculateRevenue(CompanyType.Oil, 10)).toBe(400)
    })

    it('throws for Shipping type (not a good)', () => {
      expect(() => calculateRevenue(CompanyType.Shipping, 1)).toThrow()
    })
  })

  describe('calculateShippingCost', () => {
    it('calculates cost as quantity * hops * 5', () => {
      expect(calculateShippingCost(1, 1)).toBe(5)
      expect(calculateShippingCost(3, 4)).toBe(60)
      expect(calculateShippingCost(10, 2)).toBe(100)
    })

    it('returns 0 for 0 hops', () => {
      expect(calculateShippingCost(5, 0)).toBe(0)
    })

    it('returns 0 for 0 quantity', () => {
      expect(calculateShippingCost(0, 3)).toBe(0)
    })
  })

  describe('calculateNetProfit', () => {
    it('calculates profit when revenue exceeds cost', () => {
      // Rice: 1 good, 2 hops → revenue 20 - cost 10 = 10
      expect(calculateNetProfit(CompanyType.Rice, 1, 2)).toBe(10)
    })

    it('calculates loss when cost exceeds revenue', () => {
      // Rice: 1 good, 5 hops → revenue 20 - cost 25 = -5
      expect(calculateNetProfit(CompanyType.Rice, 1, 5)).toBe(-5)
    })

    it('calculates zero at break-even', () => {
      // Rice: 1 good, 4 hops → revenue 20 - cost 20 = 0
      expect(calculateNetProfit(CompanyType.Rice, 1, 4)).toBe(0)
    })
  })

  describe('calculateBreakEvenHops', () => {
    it('returns correct break-even hops for each good type', () => {
      expect(calculateBreakEvenHops(CompanyType.Rice)).toBe(4)
      expect(calculateBreakEvenHops(CompanyType.Spice)).toBe(5)
      expect(calculateBreakEvenHops(CompanyType.Rubber)).toBe(6)
      expect(calculateBreakEvenHops(CompanyType.SiapFajiCreation)).toBe(7)
      expect(calculateBreakEvenHops(CompanyType.SiapFajiMerger)).toBe(7)
      expect(calculateBreakEvenHops(CompanyType.Oil)).toBe(8)
    })

    it('throws for Shipping type', () => {
      expect(() => calculateBreakEvenHops(CompanyType.Shipping)).toThrow()
    })
  })

  describe('calculateShipping', () => {
    it('returns complete shipping result', () => {
      const result = calculateShipping(CompanyType.Spice, 3, 2)
      expect(result.grossRevenue).toBe(75) // 3 * 25
      expect(result.shippingCost).toBe(30) // 3 * 2 * 5
      expect(result.netProfit).toBe(45)
      expect(result.isProfitable).toBe(true)
      expect(result.breakEvenHops).toBe(5)
    })

    it('marks unprofitable routes', () => {
      const result = calculateShipping(CompanyType.Rice, 2, 6)
      expect(result.netProfit).toBe(-20) // 40 - 60
      expect(result.isProfitable).toBe(false)
    })

    it('handles large quantities', () => {
      const result = calculateShipping(CompanyType.Oil, 100, 3)
      expect(result.grossRevenue).toBe(4000)
      expect(result.shippingCost).toBe(1500)
      expect(result.netProfit).toBe(2500)
    })
  })
})
