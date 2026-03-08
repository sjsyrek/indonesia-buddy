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
      className="rounded-xl border-2 border-amber-800 bg-amber-950/40 p-4 shadow-sm sm:p-5"
    >
      <h3 className="mb-3 text-base font-bold text-amber-300 sm:text-lg">Payment Breakdown</h3>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        <div className="rounded-lg bg-amber-900/30 p-3 text-center">
          <p className="text-xs font-medium text-amber-400">Total Bid</p>
          <p className="text-xl font-bold text-amber-300 sm:text-2xl">Rp {entry.bidAmount}</p>
          <p className="text-xs text-amber-400">Rp {entry.perUnit} per unit</p>
        </div>

        <div className="rounded-lg bg-amber-900/30 p-3 text-center">
          <p className="text-xs font-medium text-amber-400">Payment to {nameA}</p>
          <p className="text-xl font-bold text-amber-300 sm:text-2xl">Rp {entry.paymentToA}</p>
        </div>

        <div className="rounded-lg bg-amber-900/30 p-3 text-center">
          <p className="text-xs font-medium text-amber-400">Payment to {nameB}</p>
          <p className="text-xl font-bold text-amber-300 sm:text-2xl">Rp {entry.paymentToB}</p>
        </div>
      </div>
    </section>
  )
}
