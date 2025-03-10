
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { RegionalSalesChart } from "@/components/dashboard/RegionalSalesChart";
import { BusinessObjectives } from "@/components/dashboard/BusinessObjectives";
import { useToast } from "@/hooks/use-toast";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ArrowUpRight, Users, DollarSign } from "lucide-react";

const revenueData = [
  { name: "Jan", value: 42400 },
  { name: "Feb", value: 31398 },
  { name: "Mar", value: 59800 },
  { name: "Apr", value: 53908 },
  { name: "May", value: 64800 },
  { name: "Jun", value: 73800 },
];

const recentTransactions = [
  { id: 1, title: "New Enterprise Account", time: "2 hours ago", amount: 24500.00, category: "Income" },
  { id: 2, title: "Customer #385 Renewal", time: "5 hours ago", amount: 12400.00, category: "Income" },
  { id: 3, title: "Marketing Expense", time: "Yesterday", amount: -5650.50, category: "Expense" },
];

const AdminDashboard = () => {
  const { toast } = useToast();
  
  const handleRefresh = () => {
    toast.success({
      title: "Dashboard Updated",
      description: "Latest data has been loaded",
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
      <p className="text-secondary-foreground">Complete overview of all company operations.</p>

      <DashboardHeader onRefresh={handleRefresh} onShowAllToasts={() => {}} />

      <ErrorBoundary componentName="AdminStatCards">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            title="Total Revenue" 
            value="$845,563.00" 
            change="+12.5% from last month" 
            isPositive={true}
            Icon={ArrowUpRight}
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
          />
          <StatCard 
            title="Active Customers" 
            value="284" 
            change="+24 new customers" 
            isPositive={true}
            Icon={Users}
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
          />
          <StatCard 
            title="Sales Team Performance" 
            value="106%" 
            change="+6% above target" 
            isPositive={true}
            Icon={DollarSign}
            iconBgColor="bg-purple-100"
            iconColor="text-purple-600"
          />
        </div>
      </ErrorBoundary>

      <ErrorBoundary componentName="BusinessObjectives">
        <BusinessObjectives />
      </ErrorBoundary>

      <ErrorBoundary componentName="AdminCharts">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart 
            data={revenueData}
            activeTab="month"
            onTabChange={() => {}}
          />
          <TransactionList transactions={recentTransactions} />
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6">
          <RegionalSalesChart />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default AdminDashboard;
