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
  const totalUnits = ownerAUnits + ownerBUnits

  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-amber-900">Company Sizes</legend>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50/50 p-3">
          <div>
            <label htmlFor="owner-a-name" className="block text-xs font-medium text-amber-800">
              Owner A Name
            </label>
            <input
              id="owner-a-name"
              type="text"
              value={ownerAName}
              onChange={(e) => onOwnerANameChange(e.target.value)}
              placeholder="Owner A"
              className="mt-1 w-full rounded border border-amber-300 bg-white px-2 py-1 text-sm text-amber-900 placeholder-amber-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="owner-a-units" className="block text-xs font-medium text-amber-800">
              Company A Units
            </label>
            <input
              id="owner-a-units"
              type="number"
              min={1}
              max={20}
              value={ownerAUnits}
              onChange={(e) => onOwnerAUnitsChange(clampUnits(Number(e.target.value)))}
              className="mt-1 w-full rounded border border-amber-300 bg-white px-2 py-1 text-sm text-amber-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2 rounded-lg border border-amber-200 bg-amber-50/50 p-3">
          <div>
            <label htmlFor="owner-b-name" className="block text-xs font-medium text-amber-800">
              Owner B Name
            </label>
            <input
              id="owner-b-name"
              type="text"
              value={ownerBName}
              onChange={(e) => onOwnerBNameChange(e.target.value)}
              placeholder="Owner B"
              className="mt-1 w-full rounded border border-amber-300 bg-white px-2 py-1 text-sm text-amber-900 placeholder-amber-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="owner-b-units" className="block text-xs font-medium text-amber-800">
              Company B Units
            </label>
            <input
              id="owner-b-units"
              type="number"
              min={1}
              max={20}
              value={ownerBUnits}
              onChange={(e) => onOwnerBUnitsChange(clampUnits(Number(e.target.value)))}
              className="mt-1 w-full rounded border border-amber-300 bg-white px-2 py-1 text-sm text-amber-900 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <p className="text-center text-sm font-medium text-amber-800">
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
