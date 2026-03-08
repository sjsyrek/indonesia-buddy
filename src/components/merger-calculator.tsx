import { useState, useMemo } from 'react'
import { CompanyType } from '../lib/types'
import type { CompanyType as CompanyTypeValue } from '../lib/types'
import { calculateMerger } from '../lib/merger-math'
import { CompanyTypeSelector } from './company-type-selector'
import { CompanySizeInputs } from './company-size-inputs'
import { BidLadderTable } from './bid-ladder-table'
import { PaymentBreakdown } from './payment-breakdown'

export function MergerCalculator() {
  const [companyType, setCompanyType] = useState<CompanyTypeValue>(CompanyType.Rice)
  const [ownerAUnits, setOwnerAUnits] = useState(1)
  const [ownerBUnits, setOwnerBUnits] = useState(1)
  const [ownerAName, setOwnerAName] = useState('')
  const [ownerBName, setOwnerBName] = useState('')
  const [selectedBidIndex, setSelectedBidIndex] = useState<number | null>(null)

  const mergerResult = useMemo(
    () => calculateMerger(companyType, ownerAUnits, ownerBUnits),
    [companyType, ownerAUnits, ownerBUnits],
  )

  const selectedEntry =
    selectedBidIndex !== null ? mergerResult.bidLadder[selectedBidIndex] ?? null : null

  function handleCompanyTypeChange(value: CompanyTypeValue) {
    setCompanyType(value)
    setSelectedBidIndex(null)
  }

  function handleOwnerAUnitsChange(value: number) {
    setOwnerAUnits(value)
    setSelectedBidIndex(null)
  }

  function handleOwnerBUnitsChange(value: number) {
    setOwnerBUnits(value)
    setSelectedBidIndex(null)
  }

  return (
    <article className="space-y-4 rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:space-y-5 sm:p-5">
      <h2 className="text-xl font-bold text-amber-900 sm:text-2xl">Merger Calculator</h2>

      <CompanyTypeSelector value={companyType} onChange={handleCompanyTypeChange} />

      <CompanySizeInputs
        ownerAUnits={ownerAUnits}
        ownerBUnits={ownerBUnits}
        ownerAName={ownerAName}
        ownerBName={ownerBName}
        onOwnerAUnitsChange={handleOwnerAUnitsChange}
        onOwnerBUnitsChange={handleOwnerBUnitsChange}
        onOwnerANameChange={setOwnerAName}
        onOwnerBNameChange={setOwnerBName}
      />

      <BidLadderTable
        bidLadder={mergerResult.bidLadder}
        minimumBid={mergerResult.minimumBid}
        ownerAName={ownerAName}
        ownerBName={ownerBName}
        selectedBidIndex={selectedBidIndex}
        onSelectBid={setSelectedBidIndex}
      />

      {selectedEntry && (
        <PaymentBreakdown
          entry={selectedEntry}
          ownerAName={ownerAName}
          ownerBName={ownerBName}
        />
      )}
    </article>
  )
}
