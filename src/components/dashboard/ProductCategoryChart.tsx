
import { useMemo } from "react";
import { ChartPie } from "lucide-react";
import { useProducts } from "@/hooks/useProductsApi";
import { PieChartComponent } from "@/components/charts/PieChartComponent";
import { formatCurrency } from "@/utils/chartUtils";

export const ProductCategoryChart = () => {
  const { data: products, isLoading } = useProducts();
  
  // Memoized chart data calculation to prevent unnecessary recalculations on re-renders
  const chartData = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }

    // Optimized grouping logic for large datasets
    const categoryMap: Record<string, { name: string; value: number; count: number }> = {};
    
    // Single pass through the data for better performance
    for (const product of products) {
      const category = product.category;
      
      if (!categoryMap[category]) {
        categoryMap[category] = {
          name: category,
          value: 0,
          count: 0
        };
      }
      
      // Calculate value only if product is in stock to avoid unnecessary calculations
      if (product.inStock) {
        categoryMap[category].value += product.pricePerPallet;
      }
      
      categoryMap[category].count += 1;
    }

    return Object.values(categoryMap);
  }, [products]);  // Only recalculate when products change

  const error = !products && !isLoading ? new Error("No product data available") : null;

  return (
    <PieChartComponent
      data={chartData}
      title="Product Categories"
      icon={ChartPie}
      nameKey="name"
      dataKey="value"
      valueFormatter={(value) => formatCurrency(value)}
      isLoading={isLoading}
      error={error}
      // Add centerLabel prop to improve rendering performance for large datasets
      centerLabel={chartData.length <= 10}
    />
  );
};
