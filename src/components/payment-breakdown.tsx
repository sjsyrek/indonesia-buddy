import type { BidLadderEntry } from '../lib/types'

interface PaymentBreakdownProps {
  entry: BidLadderEntry
  ownerAName: string
  ownerBName: string
}

export function PaymentBreakdown({ entry, ownerAName, ownerBName }: PaymentBreakdownProps) {
  const nameA = ownerAName || 'Owner A'
  const nameB = ownerBName || 'Owner B'

  return (
    <section
      aria-label="Payment Breakdown"
      role="region"
      aria-live="polite"
      className="rounded-xl border-2 border-amber-400 bg-amber-50 p-3 shadow-md sm:p-4"
    >
      <h3 className="mb-3 text-base font-bold text-amber-900 sm:text-lg">Payment Breakdown</h3>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
        <div className="rounded-lg bg-amber-100 p-3 text-center">
          <p className="text-xs font-medium text-amber-700">Total Bid</p>
          <p className="text-xl font-bold text-amber-900 sm:text-2xl">Rp {entry.bidAmount}</p>
          <p className="text-xs text-amber-600">Rp {entry.perUnit} per unit</p>
        </div>

        <div className="rounded-lg bg-amber-100 p-3 text-center">
          <p className="text-xs font-medium text-amber-700">Payment to {nameA}</p>
          <p className="text-xl font-bold text-amber-900 sm:text-2xl">Rp {entry.paymentToA}</p>
        </div>

        <div className="rounded-lg bg-amber-100 p-3 text-center">
          <p className="text-xs font-medium text-amber-700">Payment to {nameB}</p>
          <p className="text-xl font-bold text-amber-900 sm:text-2xl">Rp {entry.paymentToB}</p>
        </div>
      </div>
    </section>
  )
}
