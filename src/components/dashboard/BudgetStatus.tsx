
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const BudgetStatus = () => {
  const { toast } = useToast();

  return (
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
  );
};
