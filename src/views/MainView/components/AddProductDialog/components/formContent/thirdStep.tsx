import { useSelector } from "@tanstack/react-form"

import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

import type { AddProductForm } from "../../form"

interface Props {
  form: AddProductForm
  getFieldErrors: (name: string) => string[]
}

export default function ThirdStep({ form, getFieldErrors }: Props) {
  const values = useSelector(form.store, (state) => state.values)

  const renderErrors = (name: string, touched: boolean, dirty: boolean) => {
    const errors = getFieldErrors(name)
    if (!errors.length || (!touched && !dirty)) {
      return undefined
    }
    return errors.map((message) => ({ message }))
  }

  const renderNumberField = (
    name: "quantityInStock" | "minQuantity" | "maxQuantity",
    label: string,
    required?: boolean
  ) => (
    <form.Field name={name}>
      {(field) => {
        const dirty =
          name === "quantityInStock"
            ? field.state.value !== undefined || values.limited
            : field.state.value !== undefined
        const errors = renderErrors(name, field.state.meta.isTouched, dirty)
        return (
          <Field>
            <FieldLabel
              htmlFor={field.name}
            >{`${label}${required ? " *" : ""}`}</FieldLabel>
            <Input
              id={field.name}
              name={field.name}
              type="number"
              value={field.state.value ?? ""}
              onChange={(event) => {
                const value = event.target.valueAsNumber
                field.handleChange(Number.isNaN(value) ? undefined : value)
              }}
              onBlur={field.handleBlur}
              aria-invalid={errors ? true : undefined}
              placeholder="0"
            />
            <FieldError errors={errors} />
          </Field>
        )
      }}
    </form.Field>
  )

  const renderSwitch = (name: "available", title: string) => (
    <form.Field name={name}>
      {(field) => (
        <div className="flex items-center gap-4">
          <Switch
            checked={field.state.value}
            onCheckedChange={(checked) => {
              field.handleChange(checked)
              field.handleBlur()
            }}
          />
          <span className="text-sm font-medium">{title}</span>
        </div>
      )}
    </form.Field>
  )

  const renderCheckbox = (name: "limited", title: string) => (
    <form.Field name={name}>
      {(field) => (
        <div className="flex items-center gap-3 border-y border-border py-3">
          <label
            className="flex items-center gap-3"
            onClick={(event) => event.preventDefault()}
          >
            <Checkbox
              checked={field.state.value}
              onCheckedChange={(checked) => {
                field.handleChange(checked)
                field.handleBlur()
              }}
            />
            <span className="text-sm font-medium">{title}</span>
          </label>
        </div>
      )}
    </form.Field>
  )

  return (
    <FieldGroup>
      <div className="flex flex-col gap-4">
        {renderSwitch("available", "Produkt jest dostępny")}
        {renderCheckbox("limited", "Produkt limitowany")}
      </div>

      {values.limited && (
        <div className="grid gap-4 sm:grid-cols-2">
          {renderNumberField("quantityInStock", "Ilość w magazynie", true)}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {renderNumberField("minQuantity", "Minimalna ilość zamówienia")}
        {renderNumberField("maxQuantity", "Maksymalna ilość zamówienia")}
      </div>
    </FieldGroup>
  )
}
