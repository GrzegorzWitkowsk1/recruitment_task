import {
  categories,
  currencyOptions as currencyOptionsConfig,
  producersOptions,
  productAttributesOptions,
} from "@/config"
import { z } from "zod"

const producerOptions = Object.keys(producersOptions) as [
  keyof typeof producersOptions,
  ...(keyof typeof producersOptions)[],
]
const categoryOptions = Object.keys(categories) as [
  keyof typeof categories,
  ...(keyof typeof categories)[],
]
const productAttributes = Object.keys(productAttributesOptions) as [
  keyof typeof productAttributesOptions,
  ...(keyof typeof productAttributesOptions)[],
]
const currencyOptions = Object.keys(currencyOptionsConfig) as [
  keyof typeof currencyOptionsConfig,
  ...(keyof typeof currencyOptionsConfig)[],
]

const generalSchema = z.object({
  productName: z.string().min(3, "Nazwa musi być dłuższa niż 3 znaki"),
  productSku: z
    .string()
    .min(1, "SKU jest wymagane")
    .max(24, "SKU nie może być dłuższe niż 24 znaki")
    .regex(/^[a-zA-Z0-9]+$/, "Tylko litery i cyfry"),
  description: z.string().optional(),
  producer: z.enum(producerOptions),
  category: z.enum(categoryOptions),
  productAttributes: z.array(z.enum(productAttributes)),
})

const priceSchema = z.object({
  netPrice: z.number(),
  grossPrice: z.number(),
  taxRate: z.number().min(1).max(100),
  currency: z.enum(currencyOptions),
})

const availabilitySchema = z.object({
  available: z.boolean(),
  limited: z.boolean(),
  quantityInStock: z.number().int().positive().optional(),
  minQuantity: z.number().int().positive().optional(),
  maxQuantity: z.number().int().positive().optional(),
})

const fullSchema = generalSchema
  .merge(priceSchema)
  .merge(availabilitySchema)
  .superRefine((data, ctx) => {
    if (data.limited && data.quantityInStock === undefined) {
      ctx.addIssue({
        code: "custom",
        path: ["quantityInStock"],
        message:
          "Ilość w magazynie jest obowiązkowa, jeśli produkt jest limitowany",
      })
    }
  })
  .refine(
    (data) =>
      data.minQuantity === undefined ||
      data.maxQuantity === undefined ||
      data.minQuantity <= data.maxQuantity,
    {
      path: ["minQuantity"],
      message: "Min. ilość nie może być większa niż maksymalna",
    }
  )
  .refine(
    (data) =>
      data.maxQuantity === undefined ||
      data.minQuantity === undefined ||
      data.maxQuantity >= data.minQuantity,
    {
      path: ["maxQuantity"],
      message: "Maks. ilość nie może być mniejsza niż minimalna",
    }
  )

type FormData = z.infer<typeof fullSchema>

export interface AddProductFormValues {
  productName: string
  productSku: string
  description: string
  producer: string
  category: string
  productAttributes: string[]
  netPrice?: number
  grossPrice?: number
  taxRate?: number
  currency: string
  available: boolean
  limited: boolean
  quantityInStock?: number
  minQuantity?: number
  maxQuantity?: number
}

export { fullSchema, generalSchema, priceSchema, availabilitySchema }
export type { FormData }
