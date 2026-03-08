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

      // Should show bank and cash inputs
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

      // Should be back in setup phase
      expect(screen.getAllByLabelText(/player \d+ name/i)).toHaveLength(2)
    })

    it('uses default names when names are left empty', async () => {
      const user = userEvent.setup()
      render(<ScoreTracker />)

      await user.click(screen.getByRole('button', { name: /2 players/i }))
      await user.click(screen.getByRole('button', { name: /start scoring/i }))

      // Should show default names like "Player 1", "Player 2"
      expect(screen.getByLabelText(/player 1.*bank/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/player 2.*bank/i)).toBeInTheDocument()
    })
  })

  describe('bank and cash tracking', () => {
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

    it('shows bank and cash inputs for each player', async () => {
      await setupScoringPhase()

      expect(screen.getByLabelText(/alice.*bank/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/alice.*cash/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/bob.*bank/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/bob.*cash/i)).toBeInTheDocument()
    })

    it('updates totals when bank and cash values change', async () => {
      const user = await setupScoringPhase()

      const aliceBank = screen.getByLabelText(/alice.*bank/i)
      const aliceCash = screen.getByLabelText(/alice.*cash/i)

      await user.type(aliceBank, '100')
      await user.type(aliceCash, '50')

      // Should display total of 150 for Alice (in scoring card and/or rankings)
      const aliceSection = screen.getByRole('region', { name: /alice scoring/i })
      expect(within(aliceSection).getByText(/150/)).toBeInTheDocument()
    })

    it('shows running total for each player', async () => {
      const user = await setupScoringPhase()

      const aliceBank = screen.getByLabelText(/alice.*bank/i)
      const aliceCash = screen.getByLabelText(/alice.*cash/i)
      const bobBank = screen.getByLabelText(/bob.*bank/i)
      const bobCash = screen.getByLabelText(/bob.*cash/i)

      await user.type(aliceBank, '200')
      await user.type(aliceCash, '100')
      await user.type(bobBank, '150')
      await user.type(bobCash, '75')

      // Alice total: 300, Bob total: 225
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
      await user.type(screen.getByLabelText(/bob.*bank/i), '80')
      await user.type(screen.getByLabelText(/bob.*cash/i), '60')

      return user
    }

    it('shows doubling toggle for each player', async () => {
      await setupWithScores()

      const toggles = screen.getAllByRole('checkbox', { name: /double cash for/i })
      expect(toggles).toHaveLength(2)
    })

    it('doubles cash amount when toggle is enabled', async () => {
      const user = await setupWithScores()

      // Alice: bank 100, cash 50 = 150
      // Enable doubling for Alice: bank 100 + cash 50*2 = 200
      const aliceToggle = screen.getAllByRole('checkbox', { name: /double cash for/i })[0]
      await user.click(aliceToggle)

      // Alice total should now be 200 (in her scoring card)
      const aliceSection = screen.getByRole('region', { name: /alice scoring/i })
      expect(within(aliceSection).getByText(/200/)).toBeInTheDocument()
    })

    it('shows adjusted total clearly when doubled', async () => {
      const user = await setupWithScores()

      const aliceToggle = screen.getAllByRole('checkbox', { name: /double cash for/i })[0]
      await user.click(aliceToggle)

      // Should show the doubling indicator in Alice's scoring card
      const aliceSection = screen.getByRole('region', { name: /alice scoring/i })
      expect(within(aliceSection).getByText(/×2/)).toBeInTheDocument()
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

      // Bob (300) should be first, Alice (150) second, Carol (120) third
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

      // First item (winner) should have a distinguishing attribute
      expect(items[0]).toHaveAttribute('data-winner', 'true')
    })

    it('shows score breakdown in ranking', async () => {
      await setupWithDifferentScores()

      const rankings = screen.getByRole('region', { name: /rankings/i })
      // Bob: Bank 200 + Cash 100 = 300
      expect(within(rankings).getByText(/300/)).toBeInTheDocument()
    })

    it('shows doubled indicator in ranking when cash is doubled', async () => {
      const user = await setupWithDifferentScores()

      // Enable doubling for Carol: bank 80 + cash 40*2 = 160
      const carolToggle = screen.getAllByRole('checkbox', { name: /double cash for/i })[2]
      await user.click(carolToggle)

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
