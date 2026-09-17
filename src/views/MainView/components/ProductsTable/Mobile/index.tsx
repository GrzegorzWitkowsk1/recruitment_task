import { categories } from "@/config";
import type { ProductType } from "@/views/MainView/types";
import { Pagination } from "../shared/Pagination";
import {
  pluralize,
  renderQuantityInStock,
  renderStatus,
} from "../shared/helpers";

function ProductCard({ product }: { product: ProductType }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">{product.productName}</span>
          <span className="text-xs text-muted-foreground">
            {product.productSKU}
          </span>
        </div>
        {renderStatus(product)}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-muted p-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted-foreground">Kategoria</span>
          <span className="text-sm">{categories[product.category]}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted-foreground">Cena brutto</span>
          <span className="text-sm font-medium">
            {`${product.grossPrice?.toFixed(2)} ${product.currency}`}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted-foreground">Magazyn</span>
          <span className="text-sm">{renderQuantityInStock(product)}</span>
        </div>
      </div>
    </div>
  );
}

interface Props { 
  pageItems: ProductType[]
  page: number
  totalPages: number
  setPage:(value: number) => Promise<URLSearchParams>
  productsCount: number
}


export default function MobileProductsTable({pageItems, page, totalPages, setPage, productsCount}: Props) {

  return (
      <>
      <div className="flex flex-col gap-3">
      {pageItems.map((product) => (
        <ProductCard key={product.productSKU} product={product} />
      ))}
    </div><div className="flex flex-col items-center gap-3 py-6">
        <span className="text-xs text-muted-foreground">
          Strona {page} z {totalPages} · {productsCount} {pluralize(productsCount)}
        </span>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
      </>
  
  );
}