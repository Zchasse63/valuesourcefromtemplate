import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend
} from "recharts";
import { useState } from "react";
import { SalesMetrics } from "@/types/sales";
import { formatCurrency } from "@/utils/chartUtils";
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { PieChartComponent } from "@/components/charts/PieChartComponent";
import { ChartPie, BarChart } from "lucide-react";

const sampleSalesMetrics: SalesMetrics = {
  totalSales: 485600,
  totalCommissions: 24280,
  customerCount: 42,
  orderCount: 128,
  averageOrderValue: 3793.75,
  topSellingProducts: [
    { product: "Premium Pine Pallets", quantity: 350, revenue: 87500 },
    { product: "Hardwood Pallets", quantity: 280, revenue: 84000 },
    { product: "Recycled Pallets", quantity: 420, revenue: 75600 },
    { product: "Export-Grade Pallets", quantity: 180, revenue: 63000 },
    { product: "Plastic Pallets", quantity: 150, revenue: 52500 }
  ],
  monthlySales: [
    { month: "Jan", sales: 42500 },
    { month: "Feb", sales: 38900 },
    { month: "Mar", sales: 35700 },
    { month: "Apr", sales: 41200 },
    { month: "May", sales: 39800 },
    { month: "Jun", sales: 43600 },
    { month: "Jul", sales: 45200 },
    { month: "Aug", sales: 46800 },
    { month: "Sep", sales: 48300 },
    { month: "Oct", sales: 51200 },
    { month: "Nov", sales: 49800 },
    { month: "Dec", sales: 52600 }
  ]
};

const Analytics = () => {
  const [metrics] = useState<SalesMetrics>(sampleSalesMetrics);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-primary">Analytics Overview</h1>
        <p className="text-secondary-foreground">Track your financial performance</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-sm font-medium text-secondary-foreground">Total Sales</h3>
          <p className="text-3xl font-bold mt-2">{formatCurrency(metrics.totalSales)}</p>
        </Card>
        <Card className="glass-card p-6">
          <h3 className="text-sm font-medium text-secondary-foreground">Total Commissions</h3>
          <p className="text-3xl font-bold mt-2">{formatCurrency(metrics.totalCommissions)}</p>
        </Card>
        <Card className="glass-card p-6">
          <h3 className="text-sm font-medium text-secondary-foreground">Customer Count</h3>
          <p className="text-3xl font-bold mt-2">{metrics.customerCount}</p>
        </Card>
        <Card className="glass-card p-6">
          <h3 className="text-sm font-medium text-secondary-foreground">Average Order Value</h3>
          <p className="text-3xl font-bold mt-2">{formatCurrency(metrics.averageOrderValue)}</p>
        </Card>
      </div>

      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Monthly Sales Performance</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics.monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#888888" />
              <YAxis stroke="#888888" tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value) => [`${formatCurrency(value as number)}`, 'Sales']} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                name="Sales"
                stroke="#8989DE"
                strokeWidth={2}
                dot={{ stroke: '#8989DE', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartComponent
          data={metrics.topSellingProducts}
          title="Top Selling Products"
          icon={BarChart}
          xAxisKey="product"
          yAxisKey="revenue"
          yAxisFormatter={(value) => formatCurrency(value)}
          barName="Revenue"
          className="h-[350px]"
        />

        <PieChartComponent
          data={metrics.topSellingProducts}
          title="Product Sales Distribution"
          icon={ChartPie}
          nameKey="product"
          dataKey="revenue"
          valueFormatter={(value) => formatCurrency(value)}
          className="h-[350px]"
        />
      </div>
    </div>
  );
};

export default Analytics;
