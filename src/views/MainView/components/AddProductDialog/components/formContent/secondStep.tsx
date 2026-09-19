import { useState } from "react"

import { currencyOptions } from "@/config"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectItem,
  SelectItemText,
  SelectList,
  SelectPopup,
  SelectPortal,
  SelectPositioner,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { AddProductForm } from "../../form"

interface Props {
  form: AddProductForm
  getFieldErrors: (name: string) => string[]
}

const round2 = (value: number) => Math.round(value * 100) / 100

export default function SecondStep({ form, getFieldErrors }: Props) {
  const [priceSource, setPriceSource] = useState<"net" | "gross">("net")

  const renderErrors = (name: string, touched: boolean, dirty: boolean) => {
    const errors = getFieldErrors(name)
    if (!errors.length || (!touched && !dirty)) {
      return undefined
    }
    return errors.map((message) => ({ message }))
  }

  const updatePriceField = (
    source: "net" | "gross",
    value: number | undefined
  ) => {
    const taxRate = form.state.values.taxRate
    setPriceSource(source)
    form.setFieldValue(source === "net" ? "netPrice" : "grossPrice", value)
    if (value === undefined) {
      form.setFieldValue(
        source === "net" ? "grossPrice" : "netPrice",
        undefined
      )
    } else if (taxRate !== undefined) {
      form.setFieldValue(
        source === "net" ? "grossPrice" : "netPrice",
        source === "net"
          ? round2(value * (1 + taxRate / 100))
          : round2(value / (1 + taxRate / 100))
      )
    }
  }

  return (
    <FieldGroup>
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="netPrice">
          {(field) => {
            const errors = renderErrors(
              "netPrice",
              field.state.meta.isTouched,
              field.state.value !== undefined
            )
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Cena netto *</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={field.state.value ?? ""}
                  onChange={(event) => {
                    const value = event.target.valueAsNumber
                    updatePriceField(
                      "net",
                      Number.isNaN(value) ? undefined : value
                    )
                  }}
                  onBlur={field.handleBlur}
                  aria-invalid={errors ? true : undefined}
                  placeholder="0.00"
                />
                <FieldError errors={errors} />
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="grossPrice">
          {(field) => {
            const errors = renderErrors(
              "grossPrice",
              field.state.meta.isTouched,
              field.state.value !== undefined
            )
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Cena brutto *</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="number"
                  value={field.state.value ?? ""}
                  onChange={(event) => {
                    const value = event.target.valueAsNumber
                    updatePriceField(
                      "gross",
                      Number.isNaN(value) ? undefined : value
                    )
                  }}
                  onBlur={field.handleBlur}
                  aria-invalid={errors ? true : undefined}
                  placeholder="0.00"
                />
                <FieldError errors={errors} />
              </Field>
            )
          }}
        </form.Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="taxRate">
          {(field) => {
            const errors = renderErrors(
              "taxRate",
              field.state.meta.isTouched,
              field.state.value !== undefined
            )
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Stawka VAT *</FieldLabel>
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    min={1}
                    max={100}
                    value={field.state.value ?? ""}
                    onChange={(event) => {
                      const value = event.target.valueAsNumber
                      const rate = Number.isNaN(value) ? undefined : value
                      form.setFieldValue("taxRate", rate)
                      if (rate !== undefined) {
                        const net = form.state.values.netPrice
                        const gross = form.state.values.grossPrice
                        if (priceSource === "net" && net !== undefined) {
                          form.setFieldValue(
                            "grossPrice",
                            round2(net * (1 + rate / 100))
                          )
                        } else if (
                          priceSource === "gross" &&
                          gross !== undefined
                        ) {
                          form.setFieldValue(
                            "netPrice",
                            round2(gross / (1 + rate / 100))
                          )
                        }
                      }
                    }}
                    onBlur={field.handleBlur}
                    aria-invalid={errors ? true : undefined}
                    placeholder="23"
                    className="pr-8"
                  />
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                    %
                  </span>
                </div>
                <FieldError errors={errors} />
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="currency">
          {(field) => {
            const errors = renderErrors(
              "currency",
              field.state.meta.isTouched,
              field.state.value.length > 0
            )
            return (
              <Field>
                <FieldLabel>Waluta *</FieldLabel>
                <Select
                  value={field.state.value || null}
                  onValueChange={(value) => {
                    field.handleChange(value ?? "")
                    field.handleBlur()
                  }}
                >
                  <SelectTrigger aria-invalid={errors ? true : undefined}>
                    <SelectValue>
                      {(value) =>
                        value
                          ? currencyOptions[
                              value as keyof typeof currencyOptions
                            ]
                          : "Wybierz walutę"
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectPositioner>
                      <SelectPopup>
                        <SelectList>
                          {Object.keys(currencyOptions).map((value) => (
                            <SelectItem key={value} value={value}>
                              <SelectItemText>{value}</SelectItemText>
                            </SelectItem>
                          ))}
                        </SelectList>
                      </SelectPopup>
                    </SelectPositioner>
                  </SelectPortal>
                </Select>
                <FieldError errors={errors} />
              </Field>
            )
          }}
        </form.Field>
      </div>
    </FieldGroup>
  )
}
