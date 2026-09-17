import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
import { categories } from "@/config";
import { Pagination } from "../shared/Pagination";
import {
  pluralize,
  renderQuantityInStock,
  renderStatus,
} from "../shared/helpers";
import type { ProductType } from "@/views/MainView/types";

interface Props { 
  pageItems: ProductType[]
  page: number
  totalPages: number
  setPage:(value: number) => Promise<URLSearchParams>
  productsCount: number
}

export default function DesktopProductsTable({pageItems, page, totalPages, setPage,productsCount}: Props) {
  return (

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Nazwa
            </TableHead>
            <TableHead> SKU</TableHead>
            <TableHead> Kategoria </TableHead>
            <TableHead> Cena brutto </TableHead>
            <TableHead> Status </TableHead>
            <TableHead>Magazyn </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageItems.map((product) => (
            <TableRow key={product.productSKU}>
              <TableCell>{product.productName}</TableCell>
              <TableCell className="text-xs text-muted-foreground">
                {product.productSKU}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {categories[product.category]}
              </TableCell>
              <TableCell className="font-medium">
                {`${product.grossPrice?.toFixed(2)} ${product.currency}`}
              </TableCell>
              <TableCell>{renderStatus(product)}</TableCell>
              <TableCell>{renderQuantityInStock(product)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="h-auto py-4">
              <div className="flex w-full items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground">
                  Strona {page} z {totalPages} · {productsCount}{" "}
                  {pluralize(productsCount)}
                </span>
                <Pagination page={page} setPage={setPage} totalPages={totalPages} />
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
  );
}