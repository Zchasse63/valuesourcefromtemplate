
import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, CheckCircle, XCircle, Clock, Filter } from "lucide-react";
import { DataTable } from "@/components/ui/DataTable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { formatCurrency, formatDate } from "@/utils/chartUtils";
import { useDashboard } from "@/contexts/DashboardContext";
import { useToast } from "@/hooks/use-toast";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

// Transaction type
interface Transaction {
  id: string;
  date: string;
  customer: string;
  description: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  category: string;
}

// Mock data
const mockTransactions: Transaction[] = Array.from({ length: 50 }, (_, i) => {
  const statuses = ['completed', 'pending', 'failed'] as const;
  const categories = ['Sale', 'Purchase', 'Refund', 'Invoice', 'Subscription'];
  const customers = [
    'Acme Corporation', 'Globex Industries', 'Wayne Enterprises', 
    'Stark Industries', 'Umbrella Corp', 'Cyberdyne Systems'
  ];
  
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 60));
  
  const isIncome = Math.random() > 0.4;
  
  return {
    id: `trx-${i + 1000}`,
    date: date.toISOString(),
    customer: customers[Math.floor(Math.random() * customers.length)],
    description: `${categories[Math.floor(Math.random() * categories.length)]} #${1000 + i}`,
    amount: isIncome ? 
      Math.round(Math.random() * 10000) / 100 : 
      -Math.round(Math.random() * 5000) / 100,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    category: categories[Math.floor(Math.random() * categories.length)]
  };
});

const Transactions = () => {
  const { toast } = useToast();
  const { viewPeriod, setViewPeriod } = useDashboard();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    showIncome: true,
    showExpense: true,
    statuses: {
      completed: true,
      pending: true,
      failed: true
    }
  });
  
  useEffect(() => {
    // Simulate API call
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setTransactions(mockTransactions);
      } catch (error) {
        toast.error({
          title: "Failed to load transactions",
          description: "Please try again later",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransactions();
  }, [toast, viewPeriod]);
  
  // Apply filters
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by income/expense
    if (transaction.amount > 0 && !filters.showIncome) return false;
    if (transaction.amount < 0 && !filters.showExpense) return false;
    
    // Filter by status
    if (!filters.statuses[transaction.status]) return false;
    
    return true;
  });
  
  // Calculate totals
  const totals = filteredTransactions.reduce(
    (acc, transaction) => {
      if (transaction.amount > 0) {
        acc.income += transaction.amount;
      } else {
        acc.expense += Math.abs(transaction.amount);
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
  
  // Transaction columns
  const columns = [
    {
      key: 'date',
      title: 'Date',
      render: (transaction: Transaction) => formatDate(new Date(transaction.date)),
      sortable: true,
    },
    {
      key: 'customer',
      title: 'Customer',
      sortable: true,
    },
    {
      key: 'description',
      title: 'Description',
      sortable: true,
    },
    {
      key: 'category',
      title: 'Category',
      sortable: true,
    },
    {
      key: 'amount',
      title: 'Amount',
      render: (transaction: Transaction) => {
        const isPositive = transaction.amount > 0;
        return (
          <div className="flex items-center">
            {isPositive ? (
              <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            )}
            <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
              {formatCurrency(Math.abs(transaction.amount))}
            </span>
          </div>
        );
      },
      sortable: true,
    },
    {
      key: 'status',
      title: 'Status',
      render: (transaction: Transaction) => {
        const statusConfig = {
          completed: { icon: CheckCircle, className: 'text-green-500' },
          pending: { icon: Clock, className: 'text-amber-500' },
          failed: { icon: XCircle, className: 'text-red-500' },
        };
        
        const { icon: Icon, className } = statusConfig[transaction.status];
        
        return (
          <div className="flex items-center">
            <Icon className={`mr-1 h-4 w-4 ${className}`} />
            <span className="capitalize">{transaction.status}</span>
          </div>
        );
      },
      sortable: true,
    },
  ];
  
  const handleRowClick = (transaction: Transaction) => {
    toast({
      title: "Transaction Details",
      description: `${transaction.description} - ${formatCurrency(transaction.amount)}`,
    });
    // In a real app, this would navigate to transaction details
  };
  
  return (
    <ErrorBoundary componentName="TransactionsPage">
      <div className="space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-primary">Transactions</h1>
            <p className="text-secondary-foreground">Manage your financial activities</p>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Transaction Type</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="show-income" 
                          checked={filters.showIncome}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, showIncome: !!checked }))
                          }
                        />
                        <Label htmlFor="show-income">Income</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="show-expense" 
                          checked={filters.showExpense}
                          onCheckedChange={(checked) => 
                            setFilters(prev => ({ ...prev, showExpense: !!checked }))
                          }
                        />
                        <Label htmlFor="show-expense">Expenses</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Status</h4>
                    <div className="space-y-2">
                      {['completed', 'pending', 'failed'].map(status => (
                        <div key={status} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`status-${status}`} 
                            checked={filters.statuses[status as keyof typeof filters.statuses]}
                            onCheckedChange={(checked) => 
                              setFilters(prev => ({
                                ...prev,
                                statuses: {
                                  ...prev.statuses,
                                  [status]: !!checked
                                }
                              }))
                            }
                          />
                          <Label htmlFor={`status-${status}`} className="capitalize">{status}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setViewPeriod('month')}>This Month</Button>
              <Button variant="outline" onClick={() => setViewPeriod('quarter')}>This Quarter</Button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card p-6">
            <h3 className="text-sm font-medium text-secondary-foreground">Total Income</h3>
            <p className="text-3xl font-bold mt-2 text-green-600">{formatCurrency(totals.income)}</p>
          </Card>
          <Card className="glass-card p-6">
            <h3 className="text-sm font-medium text-secondary-foreground">Total Expenses</h3>
            <p className="text-3xl font-bold mt-2 text-red-600">{formatCurrency(totals.expense)}</p>
          </Card>
          <Card className="glass-card p-6">
            <h3 className="text-sm font-medium text-secondary-foreground">Net Balance</h3>
            <p className={`text-3xl font-bold mt-2 ${totals.income - totals.expense >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(totals.income - totals.expense)}
            </p>
          </Card>
        </div>

        <DataTable
          title="Transaction History"
          columns={columns}
          data={filteredTransactions}
          isLoading={isLoading}
          keyExtractor={(item) => item.id}
          onRowClick={handleRowClick}
          pagination={true}
          initialItemsPerPage={10}
          className=""
        />
      </div>
    </ErrorBoundary>
  );
};

export default Transactions;
