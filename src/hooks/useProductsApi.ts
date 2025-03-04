
import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductById, getProductsByCategory, getCategories } from "@/services/api";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(),
  });
};

export const useProductById = (productId: string | undefined) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId || ""),
    enabled: !!productId,
  });
};

export const useProductsByCategory = (categoryId: string | undefined) => {
  return useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => getProductsByCategory(categoryId || ""),
    enabled: !!categoryId,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};
