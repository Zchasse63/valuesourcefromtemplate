
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { LineChartComponent } from "@/components/charts/LineChartComponent";
import { PieChartComponent } from "@/components/charts/PieChartComponent";
import { DataTable } from "@/components/ui/DataTable";
import { useToast } from "@/hooks/use-toast";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { 
  BarChart3, 
  Calendar, 
  DollarSign, 
  Download, 
  LineChart, 
  PieChart, 
  RefreshCcw, 
  TrendingDown, 
  TrendingUp, 
  Users 
} from "lucide-react";
import { formatCurrency } from "@/utils/chartUtils";

// Mock sales data
const monthlySalesData = [
  { month: "Jan", revenue: 156000, target: 150000 },
  { month: "Feb", revenue: 142000, target: 150000 },
  { month: "Mar", revenue: 164000, target: 160000 },
  { month: "Apr", revenue: 178000, target: 170000 },
  { month: "May", revenue: 189000, target: 180000 },
  { month: "Jun", revenue: 176000, target: 185000 },
  { month: "Jul", revenue: 204000, target: 190000 },
  { month: "Aug", revenue: 215000, target: 200000 },
  { month: "Sep", revenue: 207000, target: 205000 },
  { month: "Oct", revenue: 236000, target: 210000 },
  { month: "Nov", revenue: 228000, target: 220000 },
  { month: "Dec", revenue: 252000, target: 240000 },
];

const productCategoryData = [
  { name: "Premium Pallets", value: 320000 },
  { name: "Standard Pallets", value: 280000 },
  { name: "Recycled Pallets", value: 180000 },
  { name: "Custom Pallets", value: 150000 },
  { name: "Specialty Pallets", value: 70000 },
];

const salesChannelData = [
  { name: "Direct Sales", value: 62 },
  { name: "Distributor", value: 28 },
  { name: "Online", value: 10 },
];

const topSalesTeamMembers = [
  { id: "1", name: "Sarah Williams", deals: 42, revenue: 285000, conversion: 68 },
  { id: "2", name: "David Wilson", deals: 38, revenue: 264000, conversion: 72 },
  { id: "3", name: "Alex Johnson", deals: 36, revenue: 245000, conversion: 65 },
  { id: "4", name: "Emily Davis", deals: 28, revenue: 196000, conversion: 63 },
  { id: "5", name: "Michael Brown", deals: 25, revenue: 182000, conversion: 60 },
];

const SalesAnalytics = () => {
  const { toast } = useToast();
  const [timeframe, setTimeframe] = useState<"monthly" | "quarterly" | "yearly">("monthly");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success({
        title: "Data Refreshed",
        description: "Sales analytics data has been updated",
      });
    }, 1000);
  };

  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Sales analytics data is being exported to CSV",
    });
  };

  const timeframeActions = (
    <div className="flex items-center space-x-2">
      <Button
        variant={timeframe === "monthly" ? "default" : "outline"}
        size="sm"
        onClick={() => setTimeframe("monthly")}
      >
        Monthly
      </Button>
      <Button
        variant={timeframe === "quarterly" ? "default" : "outline"}
        size="sm"
        onClick={() => setTimeframe("quarterly")}
      >
        Quarterly
      </Button>
      <Button
        variant={timeframe === "yearly" ? "default" : "outline"}
        size="sm"
        onClick={() => setTimeframe("yearly")}
      >
        Yearly
      </Button>
    </div>
  );

  const headerActions = (
    <div className="flex items-center space-x-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={refreshData}
        disabled={isRefreshing}
      >
        <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        {isRefreshing ? "Refreshing..." : "Refresh"}
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
        onClick={handleExport}
      >
        <Download className="h-4 w-4" />
        Export
      </Button>
    </div>
  );

  // Calculate key metrics
  const totalRevenue = monthlySalesData.reduce((sum, month) => sum + month.revenue, 0);
  const totalTarget = monthlySalesData.reduce((sum, month) => sum + month.target, 0);
  const performance = Math.round((totalRevenue / totalTarget) * 100);
  const avgDealSize = Math.round(totalRevenue / topSalesTeamMembers.reduce((sum, member) => sum + member.deals, 0));
  
  // Table columns for top sales team members
  const columns = [
    {
      key: "name",
      title: "Name",
      render: (row: typeof topSalesTeamMembers[0]) => (
        <div className="font-medium">{row.name}</div>
      ),
      sortable: true,
    },
    {
      key: "deals",
      title: "Deals Closed",
      render: (row: typeof topSalesTeamMembers[0]) => row.deals,
      sortable: true,
    },
    {
      key: "revenue",
      title: "Revenue",
      render: (row: typeof topSalesTeamMembers[0]) => formatCurrency(row.revenue),
      sortable: true,
    },
    {
      key: "conversion",
      title: "Conversion Rate",
      render: (row: typeof topSalesTeamMembers[0]) => (
        <div className="flex items-center">
          <span>{row.conversion}%</span>
          {row.conversion > 65 ? (
            <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="ml-2 h-4 w-4 text-amber-500" />
          )}
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <ErrorBoundary componentName="SalesAnalytics">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
              <BarChart3 className="h-8 w-8" />
              Sales Analytics
            </h1>
            <p className="text-secondary-foreground">Comprehensive view of sales performance</p>
          </div>
          {headerActions}
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <h2 className="text-3xl font-bold">{formatCurrency(totalRevenue)}</h2>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Performance</p>
                  <h2 className="text-3xl font-bold">{performance}%</h2>
                </div>
                <div className={`p-3 rounded-full ${performance >= 100 ? 'bg-green-100' : 'bg-amber-100'}`}>
                  {performance >= 100 ? (
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-amber-600" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sales Team</p>
                  <h2 className="text-3xl font-bold">{topSalesTeamMembers.length}</h2>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Deal Size</p>
                  <h2 className="text-3xl font-bold">{formatCurrency(avgDealSize)}</h2>
                </div>
                <div className="p-3 bg-emerald-100 rounded-full">
                  <LineChart className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LineChartComponent
            data={monthlySalesData}
            title="Revenue vs. Target"
            icon={Calendar}
            xAxisKey="month"
            yAxisKey="revenue"
            yAxisFormatter={(value) => formatCurrency(value)}
            lineName="Monthly Revenue"
            actions={timeframeActions}
          />
          
          <BarChartComponent
            data={monthlySalesData}
            title="Monthly Sales Performance"
            icon={BarChart3}
            xAxisKey="month"
            yAxisKey="revenue"
            yAxisFormatter={(value) => formatCurrency(value)}
            barName="Revenue"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PieChartComponent
            data={productCategoryData}
            title="Sales by Product Category"
            icon={PieChart}
            nameKey="name"
            dataKey="value"
            valueFormatter={(value) => formatCurrency(value)}
          />
          
          <PieChartComponent
            data={salesChannelData}
            title="Sales by Channel (%)"
            icon={PieChart}
            nameKey="name"
            dataKey="value"
            valueFormatter={(value) => `${value}%`}
          />
        </div>

        {/* Top Performers Table */}
        <DataTable
          title="Top Sales Team Members"
          columns={columns}
          data={topSalesTeamMembers}
          keyExtractor={(item) => item.id}
          searchable={true}
          pagination={true}
          initialItemsPerPage={5}
        />
      </div>
    </ErrorBoundary>
  );
};

export default SalesAnalytics;
