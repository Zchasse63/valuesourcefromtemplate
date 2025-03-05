
import { Card } from "@/components/ui/card";
import { DollarSign, Package, Calendar } from "lucide-react";
import { CustomerSummary } from "@/types/customer";

interface CustomerMetricsProps {
  summary: CustomerSummary;
  formatCurrency: (value: number) => string;
  formatDate: (date: Date | null) => string;
}

export const CustomerMetrics = ({ summary, formatCurrency, formatDate }: CustomerMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="glass-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <h2 className="text-2xl font-bold">{summary.totalOrders}</h2>
          </div>
          <div className="p-2 bg-blue-100 rounded-full">
            <Package className="h-4 w-4 text-blue-600" />
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <h2 className="text-2xl font-bold">{formatCurrency(summary.totalSpent)}</h2>
          </div>
          <div className="p-2 bg-green-100 rounded-full">
            <DollarSign className="h-4 w-4 text-green-600" />
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Average Order</p>
            <h2 className="text-2xl font-bold">{formatCurrency(summary.averageOrderValue)}</h2>
          </div>
          <div className="p-2 bg-purple-100 rounded-full">
            <DollarSign className="h-4 w-4 text-purple-600" />
          </div>
        </div>
      </Card>

      <Card className="glass-card p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Last Order</p>
            <h2 className="text-2xl font-bold">{formatDate(summary.lastOrderDate)}</h2>
          </div>
          <div className="p-2 bg-amber-100 rounded-full">
            <Calendar className="h-4 w-4 text-amber-600" />
          </div>
        </div>
      </Card>
    </div>
  );
};
