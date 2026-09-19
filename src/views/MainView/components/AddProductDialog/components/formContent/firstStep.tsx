import { cn } from "cn"

import {
  categories,
  productAttributesOptions,
  producersOptions,
} from "@/config"
import { Badge } from "@/components/ui/badge"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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

export default function FirstStep({ form, getFieldErrors }: Props) {
  const renderErrors = (name: string, touched: boolean, dirty: boolean) => {
    const errors = getFieldErrors(name)
    if (!errors.length || (!touched && !dirty)) {
      return undefined
    }
    return errors.map((message) => ({ message }))
  }

  return (
    <FieldGroup>
      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="productName">
          {(field) => {
            const errors = renderErrors(
              "productName",
              field.state.meta.isTouched,
              field.state.value.length > 0
            )
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Nazwa produktu *</FieldLabel>
                <Input
                  placeholder="np. MacBook Pro 14"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={errors ? true : undefined}
                />
                <FieldError errors={errors} />
              </Field>
            )
          }}
        </form.Field>
        <form.Field name="productSku">
          {(field) => {
            const errors = renderErrors(
              "productSku",
              field.state.meta.isTouched,
              field.state.value.length > 0
            )
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>SKU produktu *</FieldLabel>
                <Input
                  placeholder="np. MBP14M3PRO"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  aria-invalid={errors ? true : undefined}
                />
                <FieldError errors={errors} />
              </Field>
            )
          }}
        </form.Field>
      </div>

      <form.Field name="description">
        {(field) => (
          <Field>
            <FieldLabel htmlFor={field.name}>Opis produktu</FieldLabel>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
              placeholder="Krótki opis produktu"
            />
          </Field>
        )}
      </form.Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="producer">
          {(field) => {
            const errors = renderErrors(
              "producer",
              field.state.meta.isTouched,
              field.state.value.length > 0
            )
            return (
              <Field>
                <FieldLabel>Producent *</FieldLabel>
                <Select
                  required
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
                          ? producersOptions[
                              value as keyof typeof producersOptions
                            ]
                          : "Wybierz producenta"
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectPositioner>
                      <SelectPopup>
                        <SelectList>
                          {Object.entries(producersOptions).map(
                            ([value, label]) => (
                              <SelectItem key={value} value={value}>
                                <SelectItemText>{label}</SelectItemText>
                              </SelectItem>
                            )
                          )}
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
        <form.Field name="category">
          {(field) => {
            const errors = renderErrors(
              "category",
              field.state.meta.isTouched,
              field.state.value.length > 0
            )
            return (
              <Field>
                <FieldLabel>Kategoria *</FieldLabel>
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
                          ? categories[value as keyof typeof categories]
                          : "Wybierz kategorię"
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectPositioner>
                      <SelectPopup>
                        <SelectList>
                          {Object.keys(categories).map((value) => (
                            <SelectItem key={value} value={value}>
                              <SelectItemText>
                                {categories[value as keyof typeof categories]}
                              </SelectItemText>
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

      <form.Field name="productAttributes">
        {(field) => {
          const errors = renderErrors(
            "productAttributes",
            field.state.meta.isTouched,
            field.state.value.length > 0
          )
          const toggle = (value: string, checked: boolean) => {
            const current = field.state.value
            field.handleChange(
              checked
                ? [...current, value]
                : current.filter((item) => item !== value)
            )
            field.handleBlur()
          }
          return (
            <Field>
              <FieldLabel>Cechy produktu</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {Object.entries(productAttributesOptions).map(
                  ([value, label]) => {
                    const selected = field.state.value.includes(value)
                    return (
                      <Badge
                        key={value}
                        variant="outline"
                        render={<button type="button" />}
                        aria-pressed={selected}
                        data-selected={selected ? "" : undefined}
                        onClick={() => toggle(value, !selected)}
                        className={cn(
                          "cursor-pointer text-muted-foreground",
                          selected
                            ? "border-primary font-bold text-foreground"
                            : "hover:bg-muted hover:text-foreground"
                        )}
                      >
                        {label}
                      </Badge>
                    )
                  }
                )}
              </div>
              <FieldError errors={errors} />
            </Field>
          )
        }}
      </form.Field>
    </FieldGroup>
  )
}
