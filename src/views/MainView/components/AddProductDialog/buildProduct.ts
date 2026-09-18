import type { ProductType } from "@/views/MainView/types"
import type { FormData } from "./schema"

export function buildProduct(data: FormData): ProductType {
  if (data.limited) {
    return {
      productName: data.productName,
      producer: data.producer,
      productSKU: data.productSku,
      description: data.description,
      category: data.category,
      productsAttrs: data.productAttributes,
      netPrice: data.netPrice,
      grossPrice: data.grossPrice,
      taxRate: data.taxRate,
      currency: data.currency,
      available: data.available,
      limited: true,
      quantityInStock: data.quantityInStock!,
      minQuantityInCart: data.minQuantity,
      maxQuantityInCart: data.maxQuantity,
    }
  }
  return {
    productName: data.productName,
    producer: data.producer,
    productSKU: data.productSku,
    description: data.description,
    category: data.category,
    productsAttrs: data.productAttributes,
    netPrice: data.netPrice,
    grossPrice: data.grossPrice,
    taxRate: data.taxRate,
    currency: data.currency,
    available: data.available,
    limited: false,
    quantityInStock: data.quantityInStock,
    minQuantityInCart: data.minQuantity,
    maxQuantityInCart: data.maxQuantity,
  }
}
