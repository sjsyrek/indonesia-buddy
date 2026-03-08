import type { ShippingResult } from '../lib/types'

interface ShippingResultsProps {
  result: ShippingResult
  currentHops: number
}

export function ShippingResults({ result, currentHops }: ShippingResultsProps) {
  const profitColorClass = result.netProfit > 0
    ? 'text-emerald-400'
    : result.netProfit < 0
      ? 'text-red-400'
      : 'text-slate-300'

  const profitBgClass = result.netProfit > 0
    ? 'bg-emerald-950/40 border-emerald-800'
    : result.netProfit < 0
      ? 'bg-red-950/40 border-red-800'
      : 'bg-slate-800 border-slate-600'

  const profitLabel = result.netProfit > 0
    ? 'Net Profit'
    : result.netProfit < 0
      ? 'Net Loss'
      : 'Break Even'

  const profitBadge = result.netProfit > 0
    ? { text: 'Profit', className: 'bg-emerald-900/40 text-emerald-300' }
    : result.netProfit < 0
      ? { text: 'Loss', className: 'bg-red-900/40 text-red-400' }
      : null

  return (
    <section aria-label="Shipping results" className="space-y-4" aria-live="polite">
      <h3 className="text-base font-semibold text-teal-300 sm:text-lg">Results</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        <div className="rounded-xl border-2 border-teal-800 bg-teal-950/40 p-4 shadow-sm sm:p-5">
          <p className="text-xs font-medium text-teal-400 sm:text-sm">Gross Revenue</p>
          <p
            data-testid="gross-revenue"
            className="text-xl font-bold text-teal-300 sm:text-2xl"
          >
            Rp {result.grossRevenue}
          </p>
        </div>

        <div className="rounded-xl border border-[#1e3354] bg-[#132038] p-4 shadow-sm sm:p-5">
          <p className="text-xs font-medium text-blue-400 sm:text-sm">Shipping Cost</p>
          <p
            data-testid="shipping-cost"
            className="text-xl font-bold text-blue-300 sm:text-2xl"
          >
            Rp {result.shippingCost}
          </p>
        </div>

        <div className={`rounded-xl border p-4 shadow-sm sm:p-5 ${profitBgClass}`}>
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-slate-300 sm:text-sm">{profitLabel}</p>
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

      <p className="text-sm font-medium text-teal-400" aria-live="polite">
        Break-even at {result.breakEvenHops} hops
        {currentHops <= result.breakEvenHops
          ? ' — currently profitable'
          : ' — currently at a loss'}
      </p>
    </section>
  )
}
