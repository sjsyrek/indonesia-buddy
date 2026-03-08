import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ClarifiedRules } from './clarified-rules'
import { clarifiedRuleSections } from '../lib/rules-content'

describe('ClarifiedRules', () => {
  it('should render all 6 section titles', () => {
    render(<ClarifiedRules />)
    clarifiedRuleSections.forEach((section) => {
      expect(screen.getByText(section.title)).toBeInTheDocument()
    })
  })

  it('should render summaries for all sections', () => {
    render(<ClarifiedRules />)
    clarifiedRuleSections.forEach((section) => {
      expect(screen.getByText(section.summary)).toBeInTheDocument()
    })
  })

  it('should hide details by default (collapsed)', () => {
    render(<ClarifiedRules />)
    const firstDetail = clarifiedRuleSections[0].details[0]
    expect(screen.queryByText(firstDetail)).not.toBeVisible()
  })

  it('should expand details when summary is clicked', async () => {
    const user = userEvent.setup()
    render(<ClarifiedRules />)

    const firstSection = clarifiedRuleSections[0]
    const summary = screen.getByText(firstSection.title)
    await user.click(summary)

    firstSection.details.forEach((detail) => {
      expect(screen.getByText(detail)).toBeVisible()
    })
  })

  it('should have an accessible region label', () => {
    render(<ClarifiedRules />)
    expect(
      screen.getByRole('region', { name: /clarified rules/i })
    ).toBeInTheDocument()
  })

  it('should use native details/summary elements', () => {
    const { container } = render(<ClarifiedRules />)
    const detailElements = container.querySelectorAll('details')
    expect(detailElements).toHaveLength(6)
    detailElements.forEach((el) => {
      expect(el.querySelector('summary')).toBeTruthy()
    })
  })
})
