import { Button } from "@/components/ui/button";
import { categories } from "@/config";
import { usePaginatedProducts } from "@/store/usePaginatedProducts";
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

export default function MobileProductsTable() {
  const { products, page, setPage, pageItems, totalPages } = usePaginatedProducts();
  const productsCount = products.length;

  return (
    <div className="mx-auto w-full max-w-md px-4 md:hidden">
      <div className="flex items-center justify-between py-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Produkty</h1>
          <span className="text-sm text-muted-foreground">
            {productsCount} {pluralize(productsCount)} w katalogu
          </span>
        </div>
        <Button variant="default">
          + Dodaj produkt
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {pageItems.map((product) => (
          <ProductCard key={product.productSKU} product={product} />
        ))}
      </div>
      <div className="flex flex-col items-center gap-3 py-6">
        <span className="text-xs text-muted-foreground">
          Strona {page} z {totalPages} · {productsCount} {pluralize(productsCount)}
        </span>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </div>
  );
}