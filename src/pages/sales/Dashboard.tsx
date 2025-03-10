
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { useToast } from "@/hooks/use-toast";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ArrowUpRight, Users, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";

const recentTransactions = [
  { id: 1, title: "Customer #156 Order", time: "2 hours ago", amount: 4500.00, category: "Income" },
  { id: 2, title: "Customer #278 Renewal", time: "5 hours ago", amount: 2400.00, category: "Income" },
  { id: 3, title: "Customer #319 Return", time: "Yesterday", amount: -650.50, category: "Refund" },
];

const SalesDashboard = () => {
  const { toast } = useToast();
  
  const handleRefresh = () => {
    toast.success({
      title: "Dashboard Updated",
      description: "Latest data has been loaded",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary">Sales Dashboard</h1>
      <p className="text-secondary-foreground">Your sales performance at a glance.</p>

      <DashboardHeader onRefresh={handleRefresh} onShowAllToasts={() => {}} />

      <ErrorBoundary componentName="SalesStatCards">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Your Sales" 
            value="$45,563.00" 
            change="+8.5% from last month" 
            isPositive={true}
            Icon={ArrowUpRight}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard 
            title="Your Customers" 
            value="37" 
            change="+3 new assignments" 
            isPositive={true}
            Icon={Users}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard 
            title="Performance" 
            value="104%" 
            change="+4% above target" 
            isPositive={true}
            Icon={DollarSign}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
        </div>
      </ErrorBoundary>

      <ErrorBoundary componentName="SalesOverview">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Monthly Performance</h2>
            <div className="h-48 flex items-center justify-center text-gray-500">
              Performance chart will be displayed here
            </div>
          </Card>
          <TransactionList transactions={recentTransactions} />
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6">
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Sales Opportunities</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Customer #129 - Upsell Opportunity</h3>
                  <p className="text-sm text-gray-500">Due for renewal in 15 days</p>
                </div>
                <span className="text-green-600 font-medium">$2,500</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Customer #245 - New Product</h3>
                  <p className="text-sm text-gray-500">Interested in additional services</p>
                </div>
                <span className="text-blue-600 font-medium">$3,750</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Customer #302 - Upgrade</h3>
                  <p className="text-sm text-gray-500">Current plan insufficient</p>
                </div>
                <span className="text-purple-600 font-medium">$1,200</span>
              </div>
            </div>
          </Card>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default SalesDashboard;
