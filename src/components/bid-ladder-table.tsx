import type { BidLadderEntry } from '../lib/types'

interface BidLadderTableProps {
  bidLadder: BidLadderEntry[]
  minimumBid: number
  ownerAName: string
  ownerBName: string
  selectedBidIndex: number | null
  onSelectBid: (index: number) => void
}

const MAX_VISIBLE_ROWS = 50

export function BidLadderTable({
  bidLadder,
  minimumBid,
  ownerAName,
  ownerBName,
  selectedBidIndex,
  onSelectBid,
}: BidLadderTableProps) {
  const visibleEntries = bidLadder.slice(0, MAX_VISIBLE_ROWS)
  const nameA = ownerAName || 'Owner A'
  const nameB = ownerBName || 'Owner B'

  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-amber-900">
        Bid Ladder <span className="font-normal text-amber-700">(minimum bid: Rp {minimumBid})</span>
      </h3>
      <div
        className="max-h-96 overflow-y-auto rounded-lg border border-amber-200"
        role="region"
        aria-label="Bid ladder scrollable area"
        tabIndex={0}
      >
        <table className="w-full text-sm" aria-label="Bid ladder">
          <thead className="sticky top-0 bg-amber-100 text-amber-900">
            <tr>
              <th scope="col" className="px-2 py-2 text-left font-semibold">Bid Amount</th>
              <th scope="col" className="px-2 py-2 text-right font-semibold">Per Unit</th>
              <th scope="col" className="px-2 py-2 text-right font-semibold">{nameA}</th>
              <th scope="col" className="px-2 py-2 text-right font-semibold">{nameB}</th>
            </tr>
          </thead>
          <tbody>
            {visibleEntries.map((entry, index) => {
              const isMinimum = entry.bidAmount === minimumBid
              const isSelected = selectedBidIndex === index

              return (
                <tr
                  key={entry.bidAmount}
                  onClick={() => onSelectBid(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onSelectBid(index)
                    }
                  }}
                  tabIndex={0}
                  aria-selected={isSelected}
                  aria-label={`Bid Rp ${entry.bidAmount}`}
                  className={[
                    'cursor-pointer transition-colors',
                    'hover:bg-amber-100',
                    'focus:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500',
                    isMinimum && !isSelected ? 'bg-amber-50 font-semibold' : '',
                    isSelected ? 'bg-amber-300/60 font-semibold ring-2 ring-inset ring-amber-500' : '',
                  ].join(' ')}
                >
                  <td className="px-2 py-1.5">
                    Rp {entry.bidAmount}
                    {isMinimum && (
                      <span className="ml-1 text-xs text-amber-700">(min)</span>
                    )}
                  </td>
                  <td className="px-2 py-1.5 text-right">Rp {entry.perUnit}</td>
                  <td className="px-2 py-1.5 text-right">Rp {entry.paymentToA}</td>
                  <td className="px-2 py-1.5 text-right">Rp {entry.paymentToB}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
