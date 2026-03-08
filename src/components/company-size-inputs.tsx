import { useState } from 'react'

interface CompanySizeInputsProps {
  ownerAUnits: number
  ownerBUnits: number
  ownerAName: string
  ownerBName: string
  onOwnerAUnitsChange: (value: number) => void
  onOwnerBUnitsChange: (value: number) => void
  onOwnerANameChange: (value: string) => void
  onOwnerBNameChange: (value: string) => void
}

export function CompanySizeInputs({
  ownerAUnits,
  ownerBUnits,
  ownerAName,
  ownerBName,
  onOwnerAUnitsChange,
  onOwnerBUnitsChange,
  onOwnerANameChange,
  onOwnerBNameChange,
}: CompanySizeInputsProps) {
  const [unitADisplay, setUnitADisplay] = useState(String(ownerAUnits))
  const [unitBDisplay, setUnitBDisplay] = useState(String(ownerBUnits))

  const totalUnits = ownerAUnits + ownerBUnits

  function handleUnitAChange(raw: string) {
    setUnitADisplay(raw)
    const n = Number(raw)
    if (raw !== '' && !Number.isNaN(n)) onOwnerAUnitsChange(clampUnits(n))
  }

  function handleUnitABlur() {
    const clamped = clampUnits(Number(unitADisplay))
    onOwnerAUnitsChange(clamped)
    setUnitADisplay(String(clamped))
  }

  function handleUnitBChange(raw: string) {
    setUnitBDisplay(raw)
    const n = Number(raw)
    if (raw !== '' && !Number.isNaN(n)) onOwnerBUnitsChange(clampUnits(n))
  }

  function handleUnitBBlur() {
    const clamped = clampUnits(Number(unitBDisplay))
    onOwnerBUnitsChange(clamped)
    setUnitBDisplay(String(clamped))
  }

  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-semibold text-amber-900">Company Sizes</legend>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="space-y-2 rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
          <div>
            <label htmlFor="owner-a-name" className="block text-xs font-medium text-amber-800 sm:text-sm">
              Owner A Name
            </label>
            <input
              id="owner-a-name"
              type="text"
              value={ownerAName}
              onChange={(e) => onOwnerANameChange(e.target.value)}
              placeholder="Owner A"
              className="mt-1 min-h-[44px] w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-sm text-amber-900 placeholder-amber-400 transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="owner-a-units" className="block text-xs font-medium text-amber-800 sm:text-sm">
              Company A Units
            </label>
            <input
              id="owner-a-units"
              type="number"
              inputMode="numeric"
              min={1}
              max={20}
              value={unitADisplay}
              onChange={(e) => handleUnitAChange(e.target.value)}
              onBlur={handleUnitABlur}
              className="mt-1 min-h-[44px] w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-sm text-amber-900 transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2 rounded-xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
          <div>
            <label htmlFor="owner-b-name" className="block text-xs font-medium text-amber-800 sm:text-sm">
              Owner B Name
            </label>
            <input
              id="owner-b-name"
              type="text"
              value={ownerBName}
              onChange={(e) => onOwnerBNameChange(e.target.value)}
              placeholder="Owner B"
              className="mt-1 min-h-[44px] w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-sm text-amber-900 placeholder-amber-400 transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="owner-b-units" className="block text-xs font-medium text-amber-800 sm:text-sm">
              Company B Units
            </label>
            <input
              id="owner-b-units"
              type="number"
              inputMode="numeric"
              min={1}
              max={20}
              value={unitBDisplay}
              onChange={(e) => handleUnitBChange(e.target.value)}
              onBlur={handleUnitBBlur}
              className="mt-1 min-h-[44px] w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-sm text-amber-900 transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <p className="text-center text-sm font-semibold text-amber-800" aria-live="polite">
        {totalUnits} total units
      </p>
    </fieldset>
  )
}

function clampUnits(value: number): number {
  if (Number.isNaN(value) || value < 1) return 1
  if (value > 20) return 20
  return Math.floor(value)
}
