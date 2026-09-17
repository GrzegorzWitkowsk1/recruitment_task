import { useEffect, useMemo } from "react";
import { parseAsInteger, useQueryState } from "nuqs";

import { useProducts } from "@/store/products";

export const PRODUCTS_PAGE_SIZE = 5;

export function usePaginatedProducts() {
  const products = useProducts();
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const totalPages = Math.max(1, Math.ceil(products.length / PRODUCTS_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const isClamped = page !== safePage;

  useEffect(() => {
    if (isClamped) {
      setPage(safePage, { history: "replace" });
    }
  }, [isClamped, safePage, setPage]);

  const pageItems = useMemo(
    () => products.slice((safePage - 1) * PRODUCTS_PAGE_SIZE, safePage * PRODUCTS_PAGE_SIZE),
    [products, safePage]
  );

  return {
    products,
    page: safePage,
    setPage,
    pageItems,
    totalPages,
    pageSize: PRODUCTS_PAGE_SIZE,
  };
}