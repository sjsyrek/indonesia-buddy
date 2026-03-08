import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RulesPage } from './rules-page'

describe('RulesPage', () => {
  it('should render the Rules Reference heading', () => {
    render(<RulesPage />)
    expect(
      screen.getByRole('heading', { name: /rules reference/i })
    ).toBeInTheDocument()
  })

  it('should render Player Aid and Clarified Rules toggle buttons', () => {
    render(<RulesPage />)
    expect(screen.getByRole('tab', { name: /player aid/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /clarified rules/i })).toBeInTheDocument()
  })

  it('should show Player Aid by default', () => {
    render(<RulesPage />)
    const aidTab = screen.getByRole('tab', { name: /player aid/i })
    expect(aidTab).toHaveAttribute('aria-selected', 'true')

    expect(
      screen.getByRole('region', { name: /player aid quick reference/i })
    ).toBeInTheDocument()
  })

  it('should switch to Clarified Rules when clicked', async () => {
    const user = userEvent.setup()
    render(<RulesPage />)

    await user.click(screen.getByRole('tab', { name: /clarified rules/i }))

    const clarifiedTab = screen.getByRole('tab', { name: /clarified rules/i })
    expect(clarifiedTab).toHaveAttribute('aria-selected', 'true')

    expect(
      screen.getByRole('region', { name: /clarified rules/i })
    ).toBeInTheDocument()
  })

  it('should switch back to Player Aid', async () => {
    const user = userEvent.setup()
    render(<RulesPage />)

    await user.click(screen.getByRole('tab', { name: /clarified rules/i }))
    await user.click(screen.getByRole('tab', { name: /player aid/i }))

    const aidTab = screen.getByRole('tab', { name: /player aid/i })
    expect(aidTab).toHaveAttribute('aria-selected', 'true')
  })

  it('should have proper ARIA tablist structure', () => {
    render(<RulesPage />)
    expect(screen.getByRole('tablist', { name: /rules view/i })).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(2)
    expect(screen.getAllByRole('tabpanel')).toHaveLength(1)
  })

  it('should have an accessible article label', () => {
    render(<RulesPage />)
    expect(
      screen.getByRole('article')
    ).toHaveAttribute('aria-label', 'Rules reference')
  })
})
