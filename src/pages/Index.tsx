import { Card } from "@/components/ui/card";
import { DollarSign, PieChart, ArrowUpRight, ArrowDownRight, Bell, Calendar } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-primary">Good Morning!</h1>
          <p className="text-secondary-foreground">Welcome back to your financial overview</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            className="glass-card px-4 py-2 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 flex items-center gap-2"
            onClick={handleRefresh}
          >
            <Bell className="h-5 w-5" />
            <span className="hidden md:inline">Notifications</span>
          </button>
          <button 
            className="glass-card px-4 py-2 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 flex items-center gap-2"
            onClick={showAllToasts}
          >
            <Calendar className="h-5 w-5" />
            <span className="hidden md:inline">Test Toasts</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <h2 className="text-2xl font-bold">$24,563.00</h2>
              <p className="text-xs text-green-600 mt-1">+2.5% from last month</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <ArrowUpRight className="h-4 w-4 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Income</p>
              <h2 className="text-2xl font-bold">$8,350.00</h2>
              <p className="text-xs text-green-600 mt-1">+4.3% from last month</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-full">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Monthly Expenses</p>
              <h2 className="text-2xl font-bold">$3,628.00</h2>
              <p className="text-xs text-red-600 mt-1">+1.2% from last month</p>
            </div>
            <div className="p-2 bg-red-100 rounded-full">
              <ArrowDownRight className="h-4 w-4 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Spending Overview</h3>
            <div className="flex rounded-md overflow-hidden">
              <button 
                className={`px-3 py-1 text-sm ${activeTab === 'day' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                onClick={() => handleTabChange('day')}
              >
                Day
              </button>
              <button 
                className={`px-3 py-1 text-sm ${activeTab === 'week' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                onClick={() => handleTabChange('week')}
              >
                Week
              </button>
              <button 
                className={`px-3 py-1 text-sm ${activeTab === 'month' ? 'bg-primary text-white' : 'bg-gray-100'}`}
                onClick={() => handleTabChange('month')}
              >
                Month
              </button>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis dataKey="name" stroke="#888888" />
                <YAxis stroke="#888888" />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: '8px' }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#8884d8' }}
                  activeDot={{ r: 6, fill: '#8884d8' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    transaction.amount > 0 ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transaction.amount > 0 ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.title}</p>
                    <p className="text-sm text-muted-foreground">{transaction.time}</p>
                  </div>
                </div>
                <p className={`font-medium ${
                  transaction.amount > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                </p>
              </div>
            ))}
            <button 
              className="w-full mt-2 text-center text-sm text-primary hover:underline"
              onClick={() => toast.warning({
                title: "Coming Soon",
                description: "Full transaction history will be available soon",
              })}
            >
              View All Transactions
            </button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: '8px' }}
                  formatter={(value) => [`$${value}`, 'Expenses']}
                />
                <Bar dataKey="expenses" fill="#f87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Budget Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Entertainment</span>
                <span className="text-sm text-gray-500">65% used</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Groceries</span>
                <span className="text-sm text-gray-500">40% used</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Transportation</span>
                <span className="text-sm text-gray-500">85% used</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Shopping</span>
                <span className="text-sm text-gray-500">92% used</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
          <button 
            className="mt-4 w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            onClick={() => toast.error({
              title: "Budget Management",
              description: "Budget management tools are coming soon"
            })}
          >
            Manage Budgets
          </button>
        </Card>
      </div>
    </div>
  );
};

export default Index;
