import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { MergerCalculator } from './merger-calculator'

describe('MergerCalculator', () => {
  it('renders without crashing', () => {
    render(<MergerCalculator />)
    expect(
      screen.getByRole('heading', { name: /merger calculator/i }),
    ).toBeInTheDocument()
  })

  it('renders company type selector', () => {
    render(<MergerCalculator />)
    expect(
      screen.getByLabelText(/company type/i),
    ).toBeInTheDocument()
  })

  it('renders size inputs for both owners', () => {
    render(<MergerCalculator />)
    expect(screen.getByLabelText(/company a.*units/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company b.*units/i)).toBeInTheDocument()
  })

  it('renders bid ladder table', () => {
    render(<MergerCalculator />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  describe('company type selection', () => {
    it('changes output when company type is changed', async () => {
      const user = userEvent.setup()
      render(<MergerCalculator />)

      const select = screen.getByLabelText(/company type/i)

      // Default is Rice (base price 20), units default to 1+1=2, min bid = 40
      expect(screen.getByText(/minimum bid.*40/i)).toBeInTheDocument()

      // Change to Oil (base price 40), min bid = 80
      await user.selectOptions(select, 'Oil')

      expect(screen.getByText(/minimum bid.*80/i)).toBeInTheDocument()
    })
  })

  describe('size inputs', () => {
    it('updates calculations when sizes change', async () => {
      const user = userEvent.setup()
      render(<MergerCalculator />)

      const unitAInput = screen.getByLabelText(/company a.*units/i) as HTMLInputElement
      const unitBInput = screen.getByLabelText(/company b.*units/i) as HTMLInputElement

      // Clear and set A=3, B=2, Rice (base 20), total=5, min bid=100
      await user.tripleClick(unitAInput)
      await user.keyboard('3')
      await user.tripleClick(unitBInput)
      await user.keyboard('2')

      expect(unitAInput.value).toBe('3')
      expect(unitBInput.value).toBe('2')

      // Min bid should now be 5 * 20 = 100
      expect(screen.getByText(/minimum bid.*100/)).toBeInTheDocument()
    })

    it('shows total units calculation', async () => {
      const user = userEvent.setup()
      render(<MergerCalculator />)

      const unitAInput = screen.getByLabelText(/company a.*units/i)
      const unitBInput = screen.getByLabelText(/company b.*units/i)

      await user.clear(unitAInput)
      await user.type(unitAInput, '5')
      await user.clear(unitBInput)
      await user.type(unitBInput, '3')

      expect(screen.getByText(/8 total units/i)).toBeInTheDocument()
    })
  })

  describe('bid selection and payment breakdown', () => {
    it('shows payment breakdown when a bid row is clicked', async () => {
      const user = userEvent.setup()
      render(<MergerCalculator />)

      // Default: Rice, A=1, B=1, total=2, min bid=40
      // Click the first data row (minimum bid)
      const table = screen.getByRole('table')
      const rows = within(table).getAllByRole('row')
      // rows[0] = header, rows[1] = first data row
      await user.click(rows[1])

      // Should show payment breakdown section
      expect(screen.getByRole('region', { name: /payment breakdown/i })).toBeInTheDocument()
    })

    it('displays correct payment amounts for selected bid', async () => {
      const user = userEvent.setup()
      render(<MergerCalculator />)

      // Default: Rice, A=1, B=1, total=2, min bid=40
      // Click the min bid row (first data row)
      const table = screen.getByRole('table')
      const rows = within(table).getAllByRole('row')
      await user.click(rows[1])

      // Min bid = 2 * 20 = 40. Payment to each = 40/2 = 20
      const breakdown = screen.getByRole('region', { name: /payment breakdown/i })
      // Total bid
      expect(within(breakdown).getByText('Rp 40')).toBeInTheDocument()
      // Each owner gets 20
      const payments = within(breakdown).getAllByText('Rp 20')
      expect(payments.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('owner names', () => {
    it('shows owner names in bid ladder headers when provided', async () => {
      const user = userEvent.setup()
      render(<MergerCalculator />)

      const nameAInput = screen.getByLabelText(/owner a name/i)
      const nameBInput = screen.getByLabelText(/owner b name/i)

      await user.type(nameAInput, 'Alice')
      await user.type(nameBInput, 'Bob')

      const table = screen.getByRole('table')
      expect(within(table).getByText(/alice/i)).toBeInTheDocument()
      expect(within(table).getByText(/bob/i)).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<MergerCalculator />)
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent(/merger calculator/i)
    })

    it('has accessible labels on all inputs', () => {
      render(<MergerCalculator />)
      expect(screen.getByLabelText(/company type/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/company a.*units/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/company b.*units/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/owner a name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/owner b name/i)).toBeInTheDocument()
    })
  })
})
