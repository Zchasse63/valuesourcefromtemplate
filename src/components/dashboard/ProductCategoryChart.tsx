
import { ChartPie } from "lucide-react";
import { useProducts } from "@/hooks/useProductsApi";
import { PieChartComponent } from "@/components/charts/PieChartComponent";
import { formatCurrency } from "@/utils/chartUtils";

export const ProductCategoryChart = () => {
  const { data: products, isLoading } = useProducts();
  
  // Process product data for chart visualization
  const chartData = () => {
    if (!products || products.length === 0) {
      return [];
    }

    // Group products by category and calculate totals
    const categories = products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = {
          name: category,
          value: 0,
          count: 0
        };
      }
      // Use pricePerPallet instead of price, and inStock as a binary value (1 or 0) since there's no inventory field
      acc[category].value += product.pricePerPallet * (product.inStock ? 1 : 0);
      acc[category].count += 1;
      return acc;
    }, {} as Record<string, { name: string; value: number; count: number }>);

    return Object.values(categories);
  };

  return (
    <PieChartComponent
      data={chartData()}
      title="Product Categories"
      icon={ChartPie}
      nameKey="name"
      dataKey="value"
      valueFormatter={(value) => formatCurrency(value)}
      isLoading={isLoading}
      error={!products && !isLoading ? new Error("No product data available") : null}
    />
  );
};
