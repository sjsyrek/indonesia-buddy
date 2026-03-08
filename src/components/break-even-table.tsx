import type { CompanyType } from '../lib/types'
import { SHIPPABLE_GOOD_TYPES, REVENUE_PER_GOOD } from '../lib/game-constants'
import { calculateBreakEvenHops } from '../lib/shipping-math'

interface BreakEvenTableProps {
  selectedGoodType: CompanyType
}

export function BreakEvenTable({ selectedGoodType }: BreakEvenTableProps) {
  return (
    <section aria-label="Break-even reference table" className="mt-6">
      <h3 className="mb-2 text-lg font-semibold text-gray-800">
        Break-Even Reference
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="px-3 py-2 font-medium text-gray-600">
                Good Type
              </th>
              <th className="px-3 py-2 font-medium text-gray-600">
                Revenue/Unit
              </th>
              <th className="px-3 py-2 font-medium text-gray-600">
                Break-Even Hops
              </th>
            </tr>
          </thead>
          <tbody>
            {SHIPPABLE_GOOD_TYPES.map((type) => {
              const isSelected = type === selectedGoodType
              return (
                <tr
                  key={type}
                  aria-current={isSelected ? 'true' : undefined}
                  className={`border-b border-gray-200 ${
                    isSelected
                      ? 'bg-teal-50 font-semibold text-teal-900'
                      : 'text-gray-700'
                  }`}
                >
                  <td className="px-3 py-2">{type}</td>
                  <td className="px-3 py-2">Rp {REVENUE_PER_GOOD[type]}</td>
                  <td className="px-3 py-2">{calculateBreakEvenHops(type)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
