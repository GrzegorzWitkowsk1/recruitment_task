import { createStore, useStore } from "@tanstack/react-store";

import { DefaultProducts } from "@/mocks";
import type { ProductType } from "@/views/MainView/types";

export const productStore = createStore<{ products: ProductType[] }>({
  products: DefaultProducts,
});

export function addProduct(product: ProductType) {
  productStore.setState((state) => ({ products: [product, ...state.products] }));
}

export function useProducts() {
  return useStore(productStore, (state) => state.products);
}   