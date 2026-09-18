import { useCallback, useEffect, useMemo } from "react"
import { useSelector } from "@tanstack/react-form"
import { ArrowLeft, ArrowRight } from "lucide-react"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Stepper } from "@/components/ui/stepper"
import type { ProductType } from "@/views/MainView/types"
import { buildProduct } from "./buildProduct"
import FirstStep from "./components/formContent/firstStep"
import SecondStep from "./components/formContent/secondStep"
import ThirdStep from "./components/formContent/thirdStep"
import { useAddProductForm } from "./form"
import {
  availabilitySchema,
  fullSchema,
  generalSchema,
  priceSchema,
} from "./schema"

const STEPS = [
  { title: "Informacje", description: "Dane podstawowe" },
  { title: "Cena", description: "Dane cenowe" },
  { title: "Dostępność", description: "Stany magazynowe" },
]

const STEP_SCHEMAS: z.ZodType[] = [
  generalSchema,
  priceSchema,
  availabilitySchema,
]

export default function AddProductDialog({
  open,
  step,
  onStepChange,
  onSubmitted,
}: {
  open?: boolean
  step: number
  onStepChange: (updater: number | ((prev: number) => number)) => void
  onSubmitted?: (product: ProductType) => void
}) {
  const form = useAddProductForm()

  useEffect(() => {
    if (!open) {
      form.reset()
    }
  }, [open, form])

  const values = useSelector(form.store, (state) => state.values)

  const validation = useMemo(() => {
    const source = step === 2 ? fullSchema : STEP_SCHEMAS[step]
    return source.safeParse(values)
  }, [values, step])

  const stepValid = validation.success

  const allValid = useMemo(() => fullSchema.safeParse(values).success, [values])

  const getFieldErrors = useCallback(
    (name: string) => {
      if (validation.success) {
        return []
      }
      return validation.error.issues
        .filter((issue) => issue.path[0] === name)
        .map((issue) => issue.message)
    },
    [validation]
  )

  const goToNextStep = () => {
    if (validation.success) {
      onStepChange((current) => Math.min(current + 1, STEPS.length - 1))
    }
  }

  const goToPreviousStep = () =>
    onStepChange((current) => Math.max(current - 1, 0))

  const handleSubmitProduct = () => {
    const parsed = fullSchema.safeParse(values)
    if (!parsed.success) {
      return
    }
    onSubmitted?.(buildProduct(parsed.data))
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dodaj nowy produkt</DialogTitle>
      </DialogHeader>
      <Stepper steps={STEPS} current={step} />
      <form
        className="min-h-0 flex-1 overflow-y-auto sm:overflow-visible"
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmitProduct()
        }}
      >
        {step === 0 && (
          <FirstStep form={form} getFieldErrors={getFieldErrors} />
        )}
        {step === 1 && (
          <SecondStep form={form} getFieldErrors={getFieldErrors} />
        )}
        {step === 2 && (
          <ThirdStep form={form} getFieldErrors={getFieldErrors} />
        )}
      </form>
      <span className="mt-auto font-medium">* Pole obowiązkowe </span>
      <DialogFooter>
        <div className="flex w-full justify-between">
          {step > 0 && (
            <Button type="button" variant="outline" onClick={goToPreviousStep}>
              <ArrowLeft data-icon="inline-start" className="size-4" />
              Wstecz
            </Button>
          )}
          {step < 2 ? (
            <Button
              type="button"
              className="ml-auto"
              disabled={!stepValid}
              onClick={goToNextStep}
            >
              Dalej
              <ArrowRight data-icon="inline-end" className="size-4" />
            </Button>
          ) : (
            <Button
              type="button"
              className="ml-auto"
              disabled={!allValid}
              onClick={handleSubmitProduct}
            >
              Zapisz produkt
            </Button>
          )}
        </div>
      </DialogFooter>
    </DialogContent>
  )
}
