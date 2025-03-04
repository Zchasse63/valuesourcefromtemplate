
import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  CartesianGrid, 
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useState } from "react";
import { SalesMetrics } from "@/types/sales";

// Sample data for demonstration
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

const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];

const Analytics = () => {
  const [metrics] = useState<SalesMetrics>(sampleSalesMetrics);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

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
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.topSellingProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" stroke="#888888" tick={{ fontSize: 12 }} />
                <YAxis stroke="#888888" tickFormatter={(value) => `$${value / 1000}k`} />
                <Tooltip formatter={(value) => [`${formatCurrency(value as number)}`, 'Revenue']} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#8989DE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Product Sales Distribution</h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={metrics.topSellingProducts}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="revenue"
                  nameKey="product"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {metrics.topSellingProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
