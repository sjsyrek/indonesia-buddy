import { useState } from 'react'
import { CompanyType } from '../lib/types'
import type { CompanyType as CompanyTypeValue } from '../lib/types'
import { calculateShipping } from '../lib/shipping-math'
import { ShippingInputs } from './shipping-inputs'
import { ShippingResults } from './shipping-results'
import { BreakEvenTable } from './break-even-table'

export function ShippingCalculator() {
  const [goodType, setGoodType] = useState<CompanyTypeValue>(CompanyType.Rice)
  const [quantity, setQuantity] = useState(1)
  const [hops, setHops] = useState(0)

  const result = calculateShipping(goodType, quantity, hops)

  return (
    <article
      aria-label="Shipping calculator"
      className="space-y-4 rounded-xl border border-[#1e3354] bg-[#132038] p-4 shadow-sm sm:space-y-5 sm:p-5"
    >
      <h2 className="text-xl font-bold text-teal-300 sm:text-2xl">
        Shipping Calculator
      </h2>

      <ShippingInputs
        goodType={goodType}
        quantity={quantity}
        hops={hops}
        onGoodTypeChange={setGoodType}
        onQuantityChange={setQuantity}
        onHopsChange={setHops}
      />

      <ShippingResults result={result} currentHops={hops} />

      <BreakEvenTable selectedGoodType={goodType} />
    </article>
  )
}
