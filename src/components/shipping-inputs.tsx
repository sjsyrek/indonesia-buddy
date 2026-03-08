import type { CompanyType } from '../lib/types'
import { SHIPPABLE_GOOD_TYPES, REVENUE_PER_GOOD } from '../lib/game-constants'

const DISPLAY_NAMES: Record<CompanyType, string> = {
  Shipping: 'Shipping',
  Rice: 'Rice',
  Spice: 'Spice',
  Rubber: 'Rubber',
  Oil: 'Oil',
  SiapFaji: 'Siap Faji',
  SiapFajiCreation: 'Siap Faji (Creation)',
  SiapFajiMerger: 'Siap Faji (Merger)',
}

interface ShippingInputsProps {
  goodType: CompanyType
  quantity: number
  hops: number
  onGoodTypeChange: (goodType: CompanyType) => void
  onQuantityChange: (quantity: number) => void
  onHopsChange: (hops: number) => void
}

export function ShippingInputs({
  goodType,
  quantity,
  hops,
  onGoodTypeChange,
  onQuantityChange,
  onHopsChange,
}: ShippingInputsProps) {
  const revenuePerUnit = REVENUE_PER_GOOD[goodType] ?? 0

  return (
    <fieldset className="space-y-4">
      <legend className="sr-only">Shipping inputs</legend>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <label
            htmlFor="good-type"
            className="text-sm font-semibold text-teal-900"
          >
            Good Type
          </label>
          <span className="rounded-md bg-teal-100 px-2 py-0.5 text-sm font-semibold text-teal-700">
            Rp {revenuePerUnit}/unit
          </span>
        </div>
        <select
          id="good-type"
          value={goodType}
          onChange={(e) => onGoodTypeChange(e.target.value as CompanyType)}
          className="min-h-[44px] rounded-lg border border-teal-300 bg-teal-50/50 px-3 py-2.5 text-sm text-teal-900 shadow-sm transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-base"
        >
          {SHIPPABLE_GOOD_TYPES.map((type) => (
            <option key={type} value={type}>
              {DISPLAY_NAMES[type]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
        <div className="flex flex-1 flex-col gap-1.5">
          <label
            htmlFor="quantity"
            className="text-sm font-semibold text-teal-900"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            inputMode="numeric"
            min={1}
            max={50}
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10)
              if (!Number.isNaN(val)) {
                onQuantityChange(Math.max(1, Math.min(50, val)))
              }
            }}
            className="min-h-[44px] rounded-lg border border-teal-300 bg-teal-50/50 px-3 py-2.5 text-sm text-teal-900 shadow-sm transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-base"
          />
        </div>

        <div className="flex flex-1 flex-col gap-1.5">
          <label
            htmlFor="hops"
            className="text-sm font-semibold text-teal-900"
          >
            Hops (route length)
          </label>
          <input
            id="hops"
            type="number"
            inputMode="numeric"
            min={0}
            max={15}
            value={hops}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10)
              if (!Number.isNaN(val)) {
                onHopsChange(Math.max(0, Math.min(15, val)))
              }
            }}
            className="min-h-[44px] rounded-lg border border-teal-300 bg-teal-50/50 px-3 py-2.5 text-sm text-teal-900 shadow-sm transition-colors focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none sm:text-base"
          />
        </div>
      </div>
    </fieldset>
  )
}
