import type { ShippingResult } from '../lib/types'

interface ShippingResultsProps {
  result: ShippingResult
  currentHops: number
}

export function ShippingResults({ result, currentHops }: ShippingResultsProps) {
  const profitColorClass = result.netProfit > 0
    ? 'text-green-800'
    : result.netProfit < 0
      ? 'text-red-800'
      : 'text-gray-800'

  const profitBgClass = result.netProfit > 0
    ? 'bg-green-50 border-green-300'
    : result.netProfit < 0
      ? 'bg-red-50 border-red-300'
      : 'bg-gray-50 border-gray-300'

  const profitLabel = result.netProfit > 0
    ? 'Net Profit'
    : result.netProfit < 0
      ? 'Net Loss'
      : 'Break Even'

  const profitBadge = result.netProfit > 0
    ? { text: 'Profit', className: 'bg-green-100 text-green-800' }
    : result.netProfit < 0
      ? { text: 'Loss', className: 'bg-red-100 text-red-800' }
      : null

  return (
    <section aria-label="Shipping results" className="space-y-4" aria-live="polite">
      <h3 className="text-base font-semibold text-teal-900 sm:text-lg">Results</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        <div className="rounded-xl border-2 border-teal-200 bg-teal-50 p-4 shadow-sm sm:p-5">
          <p className="text-xs font-medium text-teal-700 sm:text-sm">Gross Revenue</p>
          <p
            data-testid="gross-revenue"
            className="text-xl font-bold text-teal-900 sm:text-2xl"
          >
            Rp {result.grossRevenue}
          </p>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
          <p className="text-xs font-medium text-blue-700 sm:text-sm">Shipping Cost</p>
          <p
            data-testid="shipping-cost"
            className="text-xl font-bold text-blue-900 sm:text-2xl"
          >
            Rp {result.shippingCost}
          </p>
        </div>

        <div className={`rounded-xl border p-4 shadow-sm sm:p-5 ${profitBgClass}`}>
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-gray-700 sm:text-sm">{profitLabel}</p>
            {profitBadge && (
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${profitBadge.className}`}>
                {profitBadge.text}
              </span>
            )}
          </div>
          <p
            data-testid="net-profit"
            className={`text-xl font-bold sm:text-2xl ${profitColorClass}`}
          >
            Rp {result.netProfit}
          </p>
        </div>
      </div>

      <p className="text-sm font-medium text-teal-800" aria-live="polite">
        Break-even at {result.breakEvenHops} hops
        {currentHops <= result.breakEvenHops
          ? ' — currently profitable'
          : ' — currently at a loss'}
      </p>
    </section>
  )
}
