import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ScoreTracker } from './score-tracker'

describe('ScoreTracker', () => {
  it('renders without crashing', () => {
    render(<ScoreTracker />)
    expect(
      screen.getByRole('heading', { name: /score tracker/i }),
    ).toBeInTheDocument()
  })

  describe('player setup', () => {
    it('shows player count selection buttons', () => {
      render(<ScoreTracker />)
      for (let i = 2; i <= 5; i++) {
        expect(
          screen.getByRole('button', { name: new RegExp(`${i} players`, 'i') }),
        ).toBeInTheDocument()
      }
    })

    it('shows name inputs after selecting player count', async () => {
      const user = userEvent.setup()
      render(<ScoreTracker />)

      await user.click(screen.getByRole('button', { name: /3 players/i }))

      const nameInputs = screen.getAllByLabelText(/player \d+ name/i)
      expect(nameInputs).toHaveLength(3)
    })

    it('allows entering player names', async () => {
      const user = userEvent.setup()
      render(<ScoreTracker />)

      await user.click(screen.getByRole('button', { name: /2 players/i }))

      const nameInputs = screen.getAllByLabelText(/player \d+ name/i)
      await user.type(nameInputs[0], 'Alice')
      await user.type(nameInputs[1], 'Bob')

      expect(nameInputs[0]).toHaveValue('Alice')
      expect(nameInputs[1]).toHaveValue('Bob')
    })

    it('shows start scoring button after selecting player count', async () => {
      const user = userEvent.setup()
      render(<ScoreTracker />)

      await user.click(screen.getByRole('button', { name: /2 players/i }))

      expect(
        screen.getByRole('button', { name: /start scoring/i }),
      ).toBeInTheDocument()
    })

    it('transitions to scoring phase when start scoring is clicked', async () => {
      const user = userEvent.setup()
      render(<ScoreTracker />)

      await user.click(screen.getByRole('button', { name: /2 players/i }))

      const nameInputs = screen.getAllByLabelText(/player \d+ name/i)
      await user.type(nameInputs[0], 'Alice')
      await user.type(nameInputs[1], 'Bob')

      await user.click(screen.getByRole('button', { name: /start scoring/i }))

      expect(screen.getByLabelText(/alice.*bank/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/bob.*bank/i)).toBeInTheDocument()
    })

    it('allows going back to edit player setup', async () => {
      const user = userEvent.setup()
      render(<ScoreTracker />)

      await user.click(screen.getByRole('button', { name: /2 players/i }))
      const nameInputs = screen.getAllByLabelText(/player \d+ name/i)
      await user.type(nameInputs[0], 'Alice')
      await user.type(nameInputs[1], 'Bob')
      await user.click(screen.getByRole('button', { name: /start scoring/i }))

      await user.click(screen.getByRole('button', { name: /edit players/i }))

      expect(screen.getAllByLabelText(/player \d+ name/i)).toHaveLength(2)
    })

    it('uses default names when names are left empty', async () => {
      const user = userEvent.setup()
      render(<ScoreTracker />)

      await user.click(screen.getByRole('button', { name: /2 players/i }))
      await user.click(screen.getByRole('button', { name: /start scoring/i }))

      expect(screen.getByLabelText(/player 1.*bank/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/player 2.*bank/i)).toBeInTheDocument()
    })
  })

  describe('score inputs', () => {
    async function setupScoringPhase() {
      const user = userEvent.setup()
      render(<ScoreTracker />)

      await user.click(screen.getByRole('button', { name: /2 players/i }))
      const nameInputs = screen.getAllByLabelText(/player \d+ name/i)
      await user.type(nameInputs[0], 'Alice')
      await user.type(nameInputs[1], 'Bob')
      await user.click(screen.getByRole('button', { name: /start scoring/i }))

      return user
    }

    it('shows bank, cash, and earnings inputs for each player', async () => {
      await setupScoringPhase()

      expect(screen.getByLabelText(/alice.*bank/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/alice.*cash/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/alice.*earnings/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/bob.*bank/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/bob.*cash/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/bob.*earnings/i)).toBeInTheDocument()
    })

    it('updates total when bank, cash, and earnings values change', async () => {
      const user = await setupScoringPhase()

      await user.type(screen.getByLabelText(/alice.*bank/i), '100')
      await user.type(screen.getByLabelText(/alice.*cash/i), '50')
      await user.type(screen.getByLabelText(/alice.*earnings/i), '30')

      // 100 + 50 + 30 = 180
      const aliceSection = screen.getByRole('region', { name: /alice scoring/i })
      expect(within(aliceSection).getByText(/180/)).toBeInTheDocument()
    })

    it('shows running total for each player', async () => {
      const user = await setupScoringPhase()

      await user.type(screen.getByLabelText(/alice.*bank/i), '200')
      await user.type(screen.getByLabelText(/alice.*cash/i), '100')
      await user.type(screen.getByLabelText(/bob.*bank/i), '150')
      await user.type(screen.getByLabelText(/bob.*cash/i), '75')

      // Alice: 300, Bob: 225
      const aliceSection = screen.getByRole('region', { name: /alice scoring/i })
      const bobSection = screen.getByRole('region', { name: /bob scoring/i })
      expect(within(aliceSection).getByText(/300/)).toBeInTheDocument()
      expect(within(bobSection).getByText(/225/)).toBeInTheDocument()
    })
  })

  describe('final-round doubling toggle', () => {
    async function setupWithScores() {
      const user = userEvent.setup()
      render(<ScoreTracker />)

      await user.click(screen.getByRole('button', { name: /2 players/i }))
      const nameInputs = screen.getAllByLabelText(/player \d+ name/i)
      await user.type(nameInputs[0], 'Alice')
      await user.type(nameInputs[1], 'Bob')
      await user.click(screen.getByRole('button', { name: /start scoring/i }))

      await user.type(screen.getByLabelText(/alice.*bank/i), '100')
      await user.type(screen.getByLabelText(/alice.*cash/i), '50')
      await user.type(screen.getByLabelText(/alice.*earnings/i), '60')
      await user.type(screen.getByLabelText(/bob.*bank/i), '80')
      await user.type(screen.getByLabelText(/bob.*cash/i), '40')
      await user.type(screen.getByLabelText(/bob.*earnings/i), '30')

      return user
    }

    it('shows a single global final round toggle', async () => {
      await setupWithScores()

      expect(screen.getByRole('checkbox', { name: /final round/i })).toBeInTheDocument()
    })

    it('doubles earnings for all players when final round is enabled', async () => {
      const user = await setupWithScores()

      // Alice before: 100 + 50 + 60 = 210
      // Alice after:  100 + 50 + 120 = 270
      const aliceSection = screen.getByRole('region', { name: /alice scoring/i })
      expect(within(aliceSection).getByText(/210/)).toBeInTheDocument()

      await user.click(screen.getByRole('checkbox', { name: /final round/i }))

      expect(within(aliceSection).getByText(/270/)).toBeInTheDocument()
    })

    it('shows ×2 indicator when final round is enabled and player has earnings', async () => {
      const user = await setupWithScores()

      await user.click(screen.getByRole('checkbox', { name: /final round/i }))

      const aliceSection = screen.getByRole('region', { name: /alice scoring/i })
      expect(within(aliceSection).getAllByText(/×2/).length).toBeGreaterThan(0)
    })

    it('does not double bank or cash, only earnings', async () => {
      const user = await setupWithScores()

      await user.click(screen.getByRole('checkbox', { name: /final round/i }))

      // Bob: bank 80, cash 40, earnings 30 doubled = 80 + 40 + 60 = 180 (not 300)
      const bobSection = screen.getByRole('region', { name: /bob scoring/i })
      expect(within(bobSection).getByText(/180/)).toBeInTheDocument()
    })
  })

  describe('ranking display', () => {
    async function setupWithDifferentScores() {
      const user = userEvent.setup()
      render(<ScoreTracker />)

      await user.click(screen.getByRole('button', { name: /3 players/i }))
      const nameInputs = screen.getAllByLabelText(/player \d+ name/i)
      await user.type(nameInputs[0], 'Alice')
      await user.type(nameInputs[1], 'Bob')
      await user.type(nameInputs[2], 'Carol')
      await user.click(screen.getByRole('button', { name: /start scoring/i }))

      // Alice: 100 + 50 = 150
      await user.type(screen.getByLabelText(/alice.*bank/i), '100')
      await user.type(screen.getByLabelText(/alice.*cash/i), '50')

      // Bob: 200 + 100 = 300 (winner)
      await user.type(screen.getByLabelText(/bob.*bank/i), '200')
      await user.type(screen.getByLabelText(/bob.*cash/i), '100')

      // Carol: 80 + 40 = 120
      await user.type(screen.getByLabelText(/carol.*bank/i), '80')
      await user.type(screen.getByLabelText(/carol.*cash/i), '40')

      return user
    }

    it('sorts players by total score highest first', async () => {
      await setupWithDifferentScores()

      const rankings = screen.getByRole('region', { name: /rankings/i })
      const items = within(rankings).getAllByRole('listitem')

      // Bob (300) first, Alice (150) second, Carol (120) third
      expect(items[0]).toHaveTextContent(/bob/i)
      expect(items[1]).toHaveTextContent(/alice/i)
      expect(items[2]).toHaveTextContent(/carol/i)
    })

    it('shows rank numbers', async () => {
      await setupWithDifferentScores()

      const rankings = screen.getByRole('region', { name: /rankings/i })
      expect(within(rankings).getByText(/1st/i)).toBeInTheDocument()
      expect(within(rankings).getByText(/2nd/i)).toBeInTheDocument()
      expect(within(rankings).getByText(/3rd/i)).toBeInTheDocument()
    })

    it('highlights the winner', async () => {
      await setupWithDifferentScores()

      const rankings = screen.getByRole('region', { name: /rankings/i })
      const items = within(rankings).getAllByRole('listitem')

      expect(items[0]).toHaveAttribute('data-winner', 'true')
    })

    it('shows score breakdown in ranking', async () => {
      await setupWithDifferentScores()

      const rankings = screen.getByRole('region', { name: /rankings/i })
      expect(within(rankings).getByText(/300/)).toBeInTheDocument()
    })

    it('shows ×2 indicator in ranking when final round is enabled and player has earnings', async () => {
      const user = await setupWithDifferentScores()

      await user.type(screen.getByLabelText(/carol.*earnings/i), '40')
      await user.click(screen.getByRole('checkbox', { name: /final round/i }))

      const rankings = screen.getByRole('region', { name: /rankings/i })
      expect(within(rankings).getByText(/×2/)).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<ScoreTracker />)
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent(/score tracker/i)
    })

    it('has accessible labels on player count buttons', () => {
      render(<ScoreTracker />)
      for (let i = 2; i <= 5; i++) {
        expect(
          screen.getByRole('button', { name: new RegExp(`${i} players`, 'i') }),
        ).toBeInTheDocument()
      }
    })
  })
})
