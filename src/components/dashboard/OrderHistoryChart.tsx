
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { useOrders } from "@/hooks/useOrdersApi";
import { useState } from "react";
import { Calendar, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, getLastMonths } from "@/utils/chartUtils";

export const OrderHistoryChart = () => {
  const { data: orders, isLoading } = useOrders();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const actions = (
    <Button 
      variant="ghost" 
      size="sm"
      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      className="h-8 px-2"
    >
      <ArrowUpDown className="h-4 w-4 mr-1" />
      {sortOrder === "asc" ? "Ascending" : "Descending"}
    </Button>
  );

  // Process order data for chart visualization
  const chartData = () => {
    if (!orders || orders.length === 0) {
      return [];
    }

    const lastSixMonths = getLastMonths(6);

    // Create chart data based on orders
    const data = lastSixMonths.map(({ month, fullDate }) => {
      const startOfMonth = new Date(fullDate.getFullYear(), fullDate.getMonth(), 1);
      const endOfMonth = new Date(fullDate.getFullYear(), fullDate.getMonth() + 1, 0);
      
      const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startOfMonth && orderDate <= endOfMonth;
      });
      
      const totalAmount = monthOrders.reduce((sum, order) => sum + order.total, 0);
      
      return {
        month,
        orders: monthOrders.length,
        amount: totalAmount
      };
    });

    // Sort the data if needed
    return sortOrder === "asc" 
      ? [...data].sort((a, b) => a.amount - b.amount)
      : data;
  };

  return (
    <BarChartComponent
      data={chartData()}
      title="Order History"
      icon={Calendar}
      xAxisKey="month"
      yAxisKey="amount"
      yAxisFormatter={(value) => formatCurrency(value)}
      barName="Revenue"
      isLoading={isLoading}
      error={!orders && !isLoading ? new Error("No order data available") : null}
      actions={actions}
    />
  );
};
