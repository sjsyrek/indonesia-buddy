import { CompanyType } from './types'

export const BASE_PRICES: Record<CompanyType, number> = {
  [CompanyType.Shipping]: 10,
  [CompanyType.Rice]: 20,
  [CompanyType.Spice]: 25,
  [CompanyType.SiapFaji]: 35,
  [CompanyType.SiapFajiCreation]: 25,
  [CompanyType.Rubber]: 30,
  [CompanyType.SiapFajiMerger]: 35,
  [CompanyType.Oil]: 40,
}

export const REVENUE_PER_GOOD: Record<string, number> = {
  [CompanyType.Rice]: 20,
  [CompanyType.Spice]: 25,
  [CompanyType.Rubber]: 30,
  [CompanyType.SiapFaji]: 35,
  [CompanyType.Oil]: 40,
}

export const SHIPPING_COST_PER_HOP = 5

export const MAX_BID_INCREMENTS = 150

/** Merger-eligible company types (excludes Shipping) */
export const MERGER_COMPANY_TYPES = [
  CompanyType.Rice,
  CompanyType.Spice,
  CompanyType.SiapFajiCreation,
  CompanyType.Rubber,
  CompanyType.SiapFajiMerger,
  CompanyType.Oil,
  CompanyType.Shipping,
] as const

/** Good types that can be shipped (excludes Shipping) */
export const SHIPPABLE_GOOD_TYPES = [
  CompanyType.Rice,
  CompanyType.Spice,
  CompanyType.Rubber,
  CompanyType.SiapFaji,
  CompanyType.Oil,
] as const
