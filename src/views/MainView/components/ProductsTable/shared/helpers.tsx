import { Badge } from "@/components/ui/badge";
import type { ProductType } from "@/views/MainView/types";

export function pluralize(count: number) {
  const ones = count % 10;
  const tens = count % 100;
  if (ones === 1 && tens !== 11) return "produkt";
  if (ones >= 2 && ones <= 4 && (tens < 12 || tens > 14)) return "produkty";
  return "produktów";
}

export function renderQuantityInStock(product: ProductType) {
  if (!product.available) {
    return 0;
  }
  return product.quantityInStock ?? "—";
}

export function renderStatus(product: ProductType) {
  return product.available ? (
    <Badge variant="success">Dostępny</Badge>
  ) : (
    <Badge variant="destructive">Niedostępny</Badge>
  );
}