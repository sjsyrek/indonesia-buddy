import { describe, it, expect } from 'vitest'
import {
  playerAidSections,
  clarifiedRuleSections,
  type PlayerAidSection,
  type ClarifiedRuleSection,
} from './rules-content'

describe('rules-content', () => {
  describe('playerAidSections', () => {
    it('should have 8 sections', () => {
      expect(playerAidSections).toHaveLength(8)
    })

    it('should have unique IDs', () => {
      const ids = playerAidSections.map((s) => s.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('should have non-empty titles and content for every section', () => {
      playerAidSections.forEach((section: PlayerAidSection) => {
        expect(section.title.length).toBeGreaterThan(0)
        expect(section.content.length).toBeGreaterThan(0)
        section.content.forEach((item) => {
          expect(item.length).toBeGreaterThan(0)
        })
      })
    })

    it('should include expected section IDs', () => {
      const ids = playerAidSections.map((s) => s.id)
      expect(ids).toContain('turn-structure')
      expect(ids).toContain('rd-tracks')
      expect(ids).toContain('company-types')
      expect(ids).toContain('expansion-rules')
      expect(ids).toContain('shipping-costs')
      expect(ids).toContain('city-growth')
      expect(ids).toContain('merger-checklist')
      expect(ids).toContain('final-scoring')
    })

    it('should have a valid table in the company-types section', () => {
      const companyTypes = playerAidSections.find((s) => s.id === 'company-types')
      expect(companyTypes?.table).toBeDefined()
      expect(companyTypes!.table!.headers).toHaveLength(3)
      expect(companyTypes!.table!.rows.length).toBeGreaterThan(0)
      companyTypes!.table!.rows.forEach((row) => {
        expect(row).toHaveLength(companyTypes!.table!.headers.length)
      })
    })
  })

  describe('clarifiedRuleSections', () => {
    it('should have 6 sections', () => {
      expect(clarifiedRuleSections).toHaveLength(6)
    })

    it('should have unique IDs', () => {
      const ids = clarifiedRuleSections.map((s) => s.id)
      expect(new Set(ids).size).toBe(ids.length)
    })

    it('should have non-empty titles, summaries, and details for every section', () => {
      clarifiedRuleSections.forEach((section: ClarifiedRuleSection) => {
        expect(section.title.length).toBeGreaterThan(0)
        expect(section.summary.length).toBeGreaterThan(0)
        expect(section.details.length).toBeGreaterThan(0)
        section.details.forEach((item) => {
          expect(item.length).toBeGreaterThan(0)
        })
      })
    })

    it('should include expected section IDs', () => {
      const ids = clarifiedRuleSections.map((s) => s.id)
      expect(ids).toContain('expansion-detailed')
      expect(ids).toContain('shipping-detailed')
      expect(ids).toContain('merger-detailed')
      expect(ids).toContain('cash-flow')
      expect(ids).toContain('city-growth-detailed')
      expect(ids).toContain('rd-strategy')
    })

    it('should have at least 3 detail items per section', () => {
      clarifiedRuleSections.forEach((section) => {
        expect(section.details.length).toBeGreaterThanOrEqual(3)
      })
    })
  })
})
