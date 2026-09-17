import DesktopProductsTable from "./components/ProductsTable/desktop";
import MobileProductsTable from "./components/ProductsTable/Mobile";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddProductDialog from "./components/AddProductDialog";
import { usePaginatedProducts } from "@/store/usePaginatedProducts";
import { pluralize } from "./components/ProductsTable/shared/helpers";

export default function MainView() {
  const { products, page, setPage, pageItems, totalPages } = usePaginatedProducts();
  const productsCount = products.length;

  return (
    <>
      <div className="flex justify-center flex-col items-center gap-6 p-4 md:mb-6 md:p-0">
        <div className="flex w-[100%] md:w-[70%] flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold">Produkty</h1>
            <span className="text-sm text-muted-foreground">
              {productsCount} {pluralize(productsCount)} w katalogu
            </span>
          </div>
          <Dialog>
            <DialogTrigger
              render={<Button variant="default">+ Dodaj produkt</Button>}
            />
            <AddProductDialog />
          </Dialog>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex hidden w-[70%] flex-col items-center gap-6 md:flex">
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
    </>
  )
}