
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { OrderHistoryChart } from "@/components/dashboard/OrderHistoryChart";
import { ProductCategoryChart } from "@/components/dashboard/ProductCategoryChart";
import { useToast } from "@/hooks/use-toast";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Package, Clock, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const CustomerDashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const handleRefresh = () => {
    toast.success({
      title: "Dashboard Updated",
      description: "Latest data has been loaded",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary">Welcome, {user?.name}</h1>
      <p className="text-secondary-foreground">Here's an overview of your account.</p>

      <DashboardHeader onRefresh={handleRefresh} onShowAllToasts={() => {}} />

      <ErrorBoundary componentName="CustomerStatCards">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Active Orders" 
            value="3" 
            change="1 pending delivery" 
            isPositive={true}
            Icon={Package}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard 
            title="Last Order" 
            value="4 days ago" 
            change="Delivered on time" 
            isPositive={true}
            Icon={Clock}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard 
            title="Current Balance" 
            value="$350.00" 
            change="Invoice due in 15 days" 
            isPositive={false}
            Icon={CreditCard}
            iconBgColor="bg-amber-100"
            iconColor="text-amber-600"
          />
        </div>
      </ErrorBoundary>

      <ErrorBoundary componentName="CustomerCharts">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OrderHistoryChart />
          <ProductCategoryChart />
        </div>
      </ErrorBoundary>

      <ErrorBoundary componentName="RecentActivity">
        <Card className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-lg border border-gray-100">
              <Package className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="font-medium">Order #45678 Shipped</h3>
                <p className="text-sm text-gray-500">Your order has been shipped via Express Delivery</p>
                <p className="text-xs text-gray-400 mt-1">2 days ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 rounded-lg border border-gray-100">
              <CreditCard className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="font-medium">Invoice #INV-2023-045 Paid</h3>
                <p className="text-sm text-gray-500">Payment of $1,250.00 was received</p>
                <p className="text-xs text-gray-400 mt-1">1 week ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 rounded-lg border border-gray-100">
              <Package className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="font-medium">Order #45677 Delivered</h3>
                <p className="text-sm text-gray-500">Your order has been delivered successfully</p>
                <p className="text-xs text-gray-400 mt-1">2 weeks ago</p>
              </div>
            </div>
          </div>
        </Card>
      </ErrorBoundary>
    </div>
  );
};

export default CustomerDashboard;
