export interface ProductType { 
    productName: string
    productSKU: string
    description?: string
    category: string
    productsAttrs: string[]
    netPrice: number
    grossPrice: number
    taxRate: number
    currency: string
    available: boolean
    limited: boolean
    quantityInStock?: number
    minQuantityInCart: number
    maxQuantityInCart: number
}