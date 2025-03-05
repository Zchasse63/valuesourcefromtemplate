
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useProducts } from "@/hooks/useProductsApi";
import { ChartPie } from "lucide-react";
import { ChartWrapper } from "@/components/charts/ChartWrapper";
import { useChartContext } from "@/contexts/ChartContext";
import { formatCurrency } from "@/utils/chartUtils";

export const ProductCategoryChart = () => {
  const { data: products, isLoading } = useProducts();
  const { getColors, getTooltipProps } = useChartContext();
  
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
    <ChartWrapper
      title="Product Categories"
      icon={ChartPie}
      isLoading={isLoading}
      error={!products && !isLoading ? new Error("No product data available") : null}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData()}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {chartData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColors()[index % getColors().length]} />
            ))}
          </Pie>
          <Tooltip 
            {...getTooltipProps()}
            formatter={(value) => [formatCurrency(Number(value)), 'Value']}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
