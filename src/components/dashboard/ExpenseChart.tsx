
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/utils/chartUtils";

interface ExpenseData {
  name: string;
  expenses: number;
}

interface ExpenseChartProps {
  data: ExpenseData[];
}

export const ExpenseChart = ({ data }: ExpenseChartProps) => {
  return (
    <BarChartComponent
      data={data}
      title="Expense Breakdown"
      icon={DollarSign}
      xAxisKey="name"
      yAxisKey="expenses"
      yAxisFormatter={(value) => formatCurrency(value)}
      barName="Expenses"
      className="h-[320px]"
    />
  );
};
