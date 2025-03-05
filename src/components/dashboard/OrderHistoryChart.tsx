
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useOrders } from "@/hooks/useOrdersApi";
import { useState } from "react";
import { Calendar, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const OrderHistoryChart = () => {
  const { data: orders, isLoading } = useOrders();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  if (isLoading) {
    return (
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Order History</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="h-8 w-32 bg-muted/50 animate-pulse rounded-md"></div>
        </CardContent>
      </Card>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">Order History</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">No order history found</p>
        </CardContent>
      </Card>
    );
  }

  // Process order data for chart visualization
  const lastSixMonths = [...Array(6)].map((_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      month: date.toLocaleString('default', { month: 'short' }),
      fullDate: date,
    };
  }).reverse();

  // Create chart data based on orders
  const chartData = lastSixMonths.map(({ month, fullDate }) => {
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
  const sortedChartData = sortOrder === "asc" 
    ? [...chartData].sort((a, b) => a.amount - b.amount)
    : [...chartData];

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Order History
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="h-8 px-2"
          >
            <ArrowUpDown className="h-4 w-4 mr-1" />
            {sortOrder === "asc" ? "Ascending" : "Descending"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedChartData}>
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis stroke="#888888" tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip 
                contentStyle={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: '8px' }}
                formatter={(value, name) => [
                  name === 'amount' ? `$${Number(value).toLocaleString()}` : value,
                  name === 'amount' ? 'Revenue' : 'Orders'
                ]}
              />
              <Bar 
                dataKey="amount" 
                name="Revenue" 
                fill="#8884d8" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
