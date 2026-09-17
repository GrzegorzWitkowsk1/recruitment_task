import { categoryOptions, currencyOptions, producersOptions, productAttributesOptions } from '../../config'

export type Category = typeof categoryOptions[number]["value"];
export type Attributes = typeof productAttributesOptions[number]["value"];
export type Currency = typeof currencyOptions[number]["value"];
export type Producer = typeof producersOptions[number]["value"];
export interface ProductType {
  productName: string
  producer: Producer
  productSKU: string
  description?: string
  category: Category
  productsAttrs: Attributes[]
  netPrice?: number
  grossPrice?: number
  taxRate: number
  currency: Currency
  available: boolean
  limited: boolean
  quantityInStock?: number
  minQuantityInCart?: number
  maxQuantityInCart?: number
}