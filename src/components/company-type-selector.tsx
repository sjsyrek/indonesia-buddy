import type { CompanyType } from '../lib/types'
import { MERGER_COMPANY_TYPES, BASE_PRICES } from '../lib/game-constants'

interface CompanyTypeSelectorProps {
  value: CompanyType
  onChange: (value: CompanyType) => void
}

const DISPLAY_NAMES: Record<CompanyType, string> = {
  Shipping: 'Shipping',
  Rice: 'Rice',
  Spice: 'Spice',
  Rubber: 'Rubber',
  Oil: 'Oil',
  SiapFajiCreation: 'Siap Faji (Creation)',
  SiapFajiMerger: 'Siap Faji (Merger)',
}

export function CompanyTypeSelector({ value, onChange }: CompanyTypeSelectorProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor="company-type" className="block text-sm font-semibold text-amber-900">
        Company Type
      </label>
      <select
        id="company-type"
        value={value}
        onChange={(e) => onChange(e.target.value as CompanyType)}
        className="min-h-[44px] w-full rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-sm text-amber-900 shadow-sm transition-colors focus:border-amber-500 focus:ring-2 focus:ring-amber-500 focus:outline-none sm:text-base"
      >
        {MERGER_COMPANY_TYPES.map((type) => (
          <option key={type} value={type}>
            {DISPLAY_NAMES[type]} — Rp {BASE_PRICES[type]} per unit
          </option>
        ))}
      </select>
      <p className="text-xs text-amber-700 sm:text-sm">
        Base price per unit: <strong>Rp {BASE_PRICES[value]}</strong>
      </p>
    </div>
  )
}
