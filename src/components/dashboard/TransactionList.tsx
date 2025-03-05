
import { Card } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Transaction {
  id: number;
  title: string;
  time: string;
  amount: number;
  category: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList = ({ transactions }: TransactionListProps) => {
  const { toast } = useToast();

  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <div className="space-y-4">
        {transactions.map((transaction) => (
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
  );
};
