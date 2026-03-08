import type { ShippingResult } from '../lib/types'

interface ShippingResultsProps {
  result: ShippingResult
  currentHops: number
}

export function ShippingResults({ result, currentHops }: ShippingResultsProps) {
  const profitColorClass = result.netProfit > 0
    ? 'text-green-700'
    : result.netProfit < 0
      ? 'text-red-700'
      : 'text-gray-700'

  const profitBgClass = result.netProfit > 0
    ? 'bg-green-50 border-green-200'
    : result.netProfit < 0
      ? 'bg-red-50 border-red-200'
      : 'bg-gray-50 border-gray-200'

  return (
    <section aria-label="Shipping results" className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800">Results</h3>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-teal-200 bg-teal-50 p-3">
          <p className="text-sm text-teal-600">Gross Revenue</p>
          <p
            data-testid="gross-revenue"
            className="text-2xl font-bold text-teal-800"
          >
            Rp {result.grossRevenue}
          </p>
        </div>

        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="text-sm text-blue-600">Shipping Cost</p>
          <p
            data-testid="shipping-cost"
            className="text-2xl font-bold text-blue-800"
          >
            Rp {result.shippingCost}
          </p>
        </div>

        <div className={`rounded-lg border p-3 ${profitBgClass}`}>
          <p className="text-sm text-gray-600">Net Profit</p>
          <p
            data-testid="net-profit"
            className={`text-2xl font-bold ${profitColorClass}`}
          >
            Rp {result.netProfit}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-600" aria-live="polite">
        Break-even at {result.breakEvenHops} hops
        {currentHops <= result.breakEvenHops
          ? ' — currently profitable'
          : ' — currently at a loss'}
      </p>
    </section>
  )
}
