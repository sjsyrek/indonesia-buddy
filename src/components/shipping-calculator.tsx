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
      className="mx-auto max-w-2xl space-y-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">
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
