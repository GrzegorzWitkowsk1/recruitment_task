import { categories, currencyOptions, producersOptions, productAttributesOptions } from '../../config'

export type Category = keyof typeof categories;
export type Attributes = keyof typeof productAttributesOptions;
export type Currency = keyof typeof currencyOptions;
export type Producer = keyof typeof producersOptions;
export interface ProductBaseType {
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

export type ProductType =
  | (ProductBaseType & {
      limited: true;
      quantityInStock: number;
    })
  | (ProductBaseType & {
      limited: false;
      quantityInStock?: number;
    });