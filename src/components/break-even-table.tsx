import type { CompanyType } from '../lib/types'
import { SHIPPABLE_GOOD_TYPES, REVENUE_PER_GOOD } from '../lib/game-constants'
import { calculateBreakEvenHops } from '../lib/shipping-math'

interface BreakEvenTableProps {
  selectedGoodType: CompanyType
}

export function BreakEvenTable({ selectedGoodType }: BreakEvenTableProps) {
  return (
    <section aria-label="Break-even reference table" className="space-y-4">
      <h3 className="text-base font-semibold text-teal-300 sm:text-lg">
        Break-Even Reference
      </h3>
      <div className="overflow-x-auto rounded-xl border border-[#1e3354] bg-[#132038] shadow-sm">
        <table className="w-full min-w-[280px] text-left text-sm">
          <thead>
            <tr className="bg-teal-900/30">
              <th scope="col" className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold text-teal-300 sm:text-sm">
                Good Type
              </th>
              <th scope="col" className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold text-teal-300 sm:text-sm">
                Revenue/Unit
              </th>
              <th scope="col" className="whitespace-nowrap px-3 py-2.5 text-xs font-semibold text-teal-300 sm:text-sm">
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
                  className={`border-t border-teal-900/40 transition-colors ${
                    isSelected
                      ? 'border-l-4 border-l-teal-500 bg-teal-900/30 font-semibold text-teal-300'
                      : 'text-slate-300 hover:bg-teal-950/30'
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
