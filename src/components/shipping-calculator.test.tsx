import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { ShippingCalculator } from './shipping-calculator'

describe('ShippingCalculator', () => {
  it('renders without crashing', () => {
    render(<ShippingCalculator />)
    expect(
      screen.getByRole('heading', { name: /shipping calculator/i }),
    ).toBeInTheDocument()
  })

  it('has accessible labels on all inputs', () => {
    render(<ShippingCalculator />)
    expect(screen.getByLabelText(/good type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/hops/i)).toBeInTheDocument()
  })

  describe('ShippingInputs', () => {
    it('renders all shippable good types in dropdown', () => {
      render(<ShippingCalculator />)
      const select = screen.getByLabelText(/good type/i)
      const options = within(select).getAllByRole('option')
      const optionTexts = options.map((o) => o.textContent)
      expect(optionTexts).toContain('Rice')
      expect(optionTexts).toContain('Spice')
      expect(optionTexts).toContain('Rubber')
      expect(optionTexts).toContain('Oil')
      expect(optionTexts).not.toContain('Shipping')
    })

    it('shows revenue per good next to type selector', () => {
      render(<ShippingCalculator />)
      // Default is Rice with Rp 20/unit
      expect(screen.getByText(/Rp 20\/unit/)).toBeInTheDocument()
    })

    it('updates revenue display when good type changes', async () => {
      const user = userEvent.setup()
      render(<ShippingCalculator />)
      const select = screen.getByLabelText(/good type/i)
      await user.selectOptions(select, 'Oil')
      expect(screen.getByText(/Rp 40\/unit/)).toBeInTheDocument()
    })

    it('constrains quantity to 1-50 range', () => {
      render(<ShippingCalculator />)
      const input = screen.getByLabelText(/quantity/i) as HTMLInputElement
      expect(input.min).toBe('1')
      expect(input.max).toBe('50')
    })

    it('constrains hops to 0-15 range', () => {
      render(<ShippingCalculator />)
      const input = screen.getByLabelText(/hops/i) as HTMLInputElement
      expect(input.min).toBe('0')
      expect(input.max).toBe('15')
    })
  })

  describe('ShippingResults', () => {
    it('displays gross revenue, shipping cost, and net profit', () => {
      render(<ShippingCalculator />)
      expect(screen.getByText(/gross revenue/i)).toBeInTheDocument()
      expect(screen.getByText(/shipping cost/i)).toBeInTheDocument()
      expect(screen.getByText(/net profit/i)).toBeInTheDocument()
    })

    it('calculates results reactively on input change', async () => {
      const user = userEvent.setup()
      render(<ShippingCalculator />)

      // Default: Rice, quantity 1, hops 0
      // Revenue = 1 * 20 = 20, Cost = 0, Net = 20
      expect(screen.getByTestId('gross-revenue')).toHaveTextContent('Rp 20')
      expect(screen.getByTestId('shipping-cost')).toHaveTextContent('Rp 0')
      expect(screen.getByTestId('net-profit')).toHaveTextContent('Rp 20')

      // Change good type to Oil (Rp 40/unit)
      await user.selectOptions(screen.getByLabelText(/good type/i), 'Oil')

      // Revenue = 1 * 40 = 40, Cost = 0, Net = 40
      expect(screen.getByTestId('gross-revenue')).toHaveTextContent('Rp 40')

      // Change hops to 3
      const hopsInput = screen.getByLabelText(/hops/i)
      await user.clear(hopsInput)
      await user.type(hopsInput, '3')

      // Revenue = 1 * 40 = 40, Cost = 1 * 3 * 5 = 15, Net = 25
      expect(screen.getByTestId('shipping-cost')).toHaveTextContent('Rp 15')
      expect(screen.getByTestId('net-profit')).toHaveTextContent('Rp 25')
    })

    it('shows green color for profit', () => {
      render(<ShippingCalculator />)
      // Default: Rice, quantity 1, hops 0 => profit of 20
      const netProfit = screen.getByTestId('net-profit')
      expect(netProfit.className).toMatch(/green/)
    })

    it('shows red color for loss', async () => {
      const user = userEvent.setup()
      render(<ShippingCalculator />)

      // Set hops to 10 so cost > revenue for Rice
      // Revenue = 1 * 20 = 20, Cost = 1 * 10 * 5 = 50, Net = -30
      const hopsInput = screen.getByLabelText(/hops/i)
      await user.clear(hopsInput)
      await user.type(hopsInput, '10')

      const netProfit = screen.getByTestId('net-profit')
      expect(netProfit.className).toMatch(/red/)
    })

    it('shows break-even hops indicator', () => {
      render(<ShippingCalculator />)
      // Rice: break-even at floor(20/5) = 4 hops
      expect(screen.getByText(/break-even at 4 hops/i)).toBeInTheDocument()
    })
  })

  describe('BreakEvenTable', () => {
    it('renders a table with all shippable good types', () => {
      render(<ShippingCalculator />)
      const table = screen.getByRole('table')
      expect(table).toBeInTheDocument()

      const rows = within(table).getAllByRole('row')
      // Header + 6 good types
      expect(rows).toHaveLength(7)
    })

    it('shows correct column headers', () => {
      render(<ShippingCalculator />)
      const table = screen.getByRole('table')
      expect(within(table).getByText(/good type/i)).toBeInTheDocument()
      expect(within(table).getByText(/revenue\/unit/i)).toBeInTheDocument()
      expect(within(table).getByText(/break-even hops/i)).toBeInTheDocument()
    })

    it('highlights the currently selected good type', () => {
      render(<ShippingCalculator />)
      const table = screen.getByRole('table')
      const rows = within(table).getAllByRole('row')
      // Rice is the default, find its row (index 1, after header)
      const riceRow = rows.find((row) => within(row).queryByText('Rice'))
      expect(riceRow).toBeDefined()
      expect(riceRow!.getAttribute('aria-current')).toBe('true')
    })

    it('updates highlight when good type changes', async () => {
      const user = userEvent.setup()
      render(<ShippingCalculator />)

      await user.selectOptions(screen.getByLabelText(/good type/i), 'Oil')

      const table = screen.getByRole('table')
      const rows = within(table).getAllByRole('row')
      const oilRow = rows.find((row) => within(row).queryByText('Oil'))
      expect(oilRow!.getAttribute('aria-current')).toBe('true')

      const riceRow = rows.find((row) => within(row).queryByText('Rice'))
      expect(riceRow!.getAttribute('aria-current')).not.toBe('true')
    })
  })
})
