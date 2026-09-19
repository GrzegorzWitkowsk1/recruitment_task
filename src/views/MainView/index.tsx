import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"

import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Toast } from "@/components/ui/toast"
import AddProductDialog from "./components/AddProductDialog"
import { addProduct } from "@/store/products"
import { usePaginatedProducts } from "@/store/usePaginatedProducts"

import DesktopProductsTable from "./components/ProductsTable/desktop"
import MobileProductsTable from "./components/ProductsTable/Mobile"
import { pluralize } from "./components/ProductsTable/shared/helpers"

export default function MainView() {
  const { products, page, setPage, pageItems, totalPages } =
    usePaginatedProducts()
  const productsCount = products.length
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimeoutRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    return () => window.clearTimeout(toastTimeoutRef.current)
  }, [])

  const showToast = () => {
    setToastVisible(true)
    window.clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = window.setTimeout(
      () => setToastVisible(false),
      3000
    )
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 p-4 md:mb-6 mt-2 sm:mt-6 md:p-0">
        <div className="flex w-full flex-row items-center justify-between md:w-[70%]">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">Produkty</h1>
            <span className="text-sm text-muted-foreground">
              {productsCount} {pluralize(productsCount)} w katalogu
            </span>
          </div>
          <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
              setOpen(nextOpen)
              if (!nextOpen) {
                setStep(0)
              }
            }}
          >
            <DialogTrigger
              render={<Button variant="default">+ Dodaj produkt</Button>}
            />
            <AddProductDialog
              open={open}
              step={step}
              onStepChange={setStep}
              onSubmitted={(product) => {
                addProduct(product)
                setOpen(false)
                setStep(0)
                showToast()
              }}
            />
          </Dialog>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="hidden w-[70%] flex-col items-center gap-6 md:flex">
          <DesktopProductsTable
            pageItems={pageItems}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            productsCount={productsCount}
          />
        </div>
        <div className="mx-auto w-full max-w-md px-4 md:hidden">
          <MobileProductsTable
            pageItems={pageItems}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            productsCount={productsCount}
          />
        </div>
      </div>
      {toastVisible && (
        <Toast>
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-success">
            <Check className="size-4 text-white" />
          </span>
          Produkt został dodany
        </Toast>
      )}
    </>
  )
}
