export const CompanyType = {
  Shipping: 'Shipping',
  Rice: 'Rice',
  Spice: 'Spice',
  Rubber: 'Rubber',
  Oil: 'Oil',
  SiapFaji: 'SiapFaji',
  SiapFajiCreation: 'SiapFajiCreation',
  SiapFajiMerger: 'SiapFajiMerger',
} as const

export type CompanyType = (typeof CompanyType)[keyof typeof CompanyType]

export interface Player {
  name: string
  color?: string
}

export interface MergerInput {
  companyType: CompanyType
  ownerA: Player
  ownerAUnits: number
  ownerB: Player
  ownerBUnits: number
}

export interface BidLadderEntry {
  bidAmount: number
  perUnit: number
  paymentToA: number
  paymentToB: number
}

export interface MergerResult {
  companyType: CompanyType
  totalUnits: number
  minimumBid: number
  bidIncrement: number
  bidLadder: BidLadderEntry[]
}

export interface ShippingInput {
  goodType: CompanyType
  quantity: number
  hops: number
}

export interface ShippingResult {
  grossRevenue: number
  shippingCost: number
  netProfit: number
  isProfitable: boolean
  breakEvenHops: number
}
