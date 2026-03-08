import type { CompanyType } from '../lib/types'
import { SHIPPABLE_GOOD_TYPES, REVENUE_PER_GOOD } from '../lib/game-constants'
import { calculateBreakEvenHops } from '../lib/shipping-math'

interface BreakEvenTableProps {
  selectedGoodType: CompanyType
}

export function BreakEvenTable({ selectedGoodType }: BreakEvenTableProps) {
  return (
    <section aria-label="Break-even reference table" className="mt-4 sm:mt-6">
      <h3 className="mb-2 text-base font-semibold text-teal-900 sm:text-lg">
        Break-Even Reference
      </h3>
      <div className="overflow-x-auto rounded-lg border border-teal-200 shadow-sm">
        <table className="w-full min-w-[280px] text-left text-sm">
          <thead>
            <tr className="bg-teal-50">
              <th scope="col" className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold text-teal-800 sm:text-sm">
                Good Type
              </th>
              <th scope="col" className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold text-teal-800 sm:text-sm">
                Revenue/Unit
              </th>
              <th scope="col" className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold text-teal-800 sm:text-sm">
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
                  className={`border-t border-teal-100 transition-colors ${
                    isSelected
                      ? 'bg-teal-100 font-semibold text-teal-900'
                      : 'text-gray-700 hover:bg-teal-50/50'
                  }`}
                >
                  <td className="whitespace-nowrap px-3 py-2">{type}</td>
                  <td className="whitespace-nowrap px-3 py-2">Rp {REVENUE_PER_GOOD[type]}</td>
                  <td className="whitespace-nowrap px-3 py-2">{calculateBreakEvenHops(type)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
