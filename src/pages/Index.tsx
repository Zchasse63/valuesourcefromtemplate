
import { DollarSign, PieChart, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { BudgetStatus } from "@/components/dashboard/BudgetStatus";

const revenueData = [
  { name: "Jan", value: 2400 },
  { name: "Feb", value: 1398 },
  { name: "Mar", value: 9800 },
  { name: "Apr", value: 3908 },
  { name: "May", value: 4800 },
  { name: "Jun", value: 3800 },
];

const expenseData = [
  { name: "Jan", expenses: 1400 },
  { name: "Feb", expenses: 1100 },
  { name: "Mar", expenses: 1800 },
  { name: "Apr", expenses: 1300 },
  { name: "May", expenses: 2100 },
  { name: "Jun", expenses: 1700 },
];

const recentTransactions = [
  { id: 1, title: "Grocery Shopping", time: "2 hours ago", amount: -150.00, category: "Shopping" },
  { id: 2, title: "Client Payment", time: "5 hours ago", amount: 1240.00, category: "Income" },
  { id: 3, title: "Restaurant Bill", time: "Yesterday", amount: -65.50, category: "Food" },
];

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"day" | "week" | "month">("month");
  
  const handleRefresh = () => {
    toast.success({
      title: "Dashboard Updated",
      description: "Latest financial data has been loaded",
    });
  };

  const handleTabChange = (tab: "day" | "week" | "month") => {
    setActiveTab(tab);
    toast({
      title: `View Changed to ${tab.charAt(0).toUpperCase() + tab.slice(1)}`,
      description: `Showing ${tab}ly financial overview`,
    });
  };

  const showAllToasts = () => {
    toast({
      title: "Default Toast",
      description: "This is a default toast notification",
    });
    
    setTimeout(() => {
      toast.success({
        title: "Success Toast",
        description: "Operation completed successfully",
      });
    }, 1000);
    
    setTimeout(() => {
      toast.warning({
        title: "Warning Toast",
        description: "This action might have consequences",
      });
    }, 2000);
    
    setTimeout(() => {
      toast.error({
        title: "Error Toast",
        description: "Something went wrong with this operation",
      });
    }, 3000);
  };

  return (
    <div className="space-y-8">
      <DashboardHeader onRefresh={handleRefresh} onShowAllToasts={showAllToasts} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Balance" 
          value="$24,563.00" 
          change="+2.5% from last month" 
          isPositive={true}
          Icon={ArrowUpRight}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard 
          title="Monthly Income" 
          value="$8,350.00" 
          change="+4.3% from last month" 
          isPositive={true}
          Icon={DollarSign}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard 
          title="Monthly Expenses" 
          value="$3,628.00" 
          change="+1.2% from last month" 
          isPositive={false}
          Icon={ArrowDownRight}
          iconBgColor="bg-red-100"
          iconColor="text-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart 
          data={revenueData}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
        <TransactionList transactions={recentTransactions} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpenseChart data={expenseData} />
        <BudgetStatus />
      </div>
    </div>
  );
};

export default Index;
