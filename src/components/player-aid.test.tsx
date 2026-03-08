import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { PlayerAid } from './player-aid'
import { playerAidSections } from '../lib/rules-content'

describe('PlayerAid', () => {
  it('should render all 8 sections', () => {
    render(<PlayerAid />)
    playerAidSections.forEach((section) => {
      expect(screen.getByText(section.title)).toBeInTheDocument()
    })
  })

  it('should render content items as list items', () => {
    render(<PlayerAid />)
    const region = screen.getByRole('region', { name: /player aid/i })
    const items = within(region).getAllByRole('listitem')
    const totalItems = playerAidSections.reduce(
      (sum, s) => sum + s.content.length,
      0
    )
    expect(items.length).toBe(totalItems)
  })

  it('should render the company types table', () => {
    render(<PlayerAid />)
    const table = screen.getByRole('table', { name: /company types/i })
    expect(table).toBeInTheDocument()
    expect(within(table).getAllByRole('columnheader')).toHaveLength(3)
    expect(within(table).getAllByRole('row').length).toBeGreaterThan(1)
  })

  it('should have proper section headings with IDs for accessibility', () => {
    render(<PlayerAid />)
    playerAidSections.forEach((section) => {
      const heading = screen.getByText(section.title)
      expect(heading.id).toBe(`aid-${section.id}`)
    })
  })

  it('should have an accessible region label', () => {
    render(<PlayerAid />)
    expect(
      screen.getByRole('region', { name: /player aid quick reference/i })
    ).toBeInTheDocument()
  })
})
