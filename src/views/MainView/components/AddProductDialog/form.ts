import { useForm } from "@tanstack/react-form"

import { fullSchema, type AddProductFormValues } from "./schema"

export const DEFAULT_VALUES: AddProductFormValues = {
  productName: "",
  productSku: "",
  description: "",
  producer: "",
  category: "",
  productAttributes: [],
  netPrice: undefined,
  grossPrice: undefined,
  taxRate: undefined,
  currency: "",
  available: true,
  limited: false,
  quantityInStock: undefined,
  minQuantity: undefined,
  maxQuantity: undefined,
}

export function useAddProductForm() {
  return useForm({
    defaultValues: DEFAULT_VALUES,
    onSubmit: ({ value }) => fullSchema.safeParse(value).success,
  })
}

export type AddProductForm = ReturnType<typeof useAddProductForm>
