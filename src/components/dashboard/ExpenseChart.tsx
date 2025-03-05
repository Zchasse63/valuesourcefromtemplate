
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

interface ExpenseData {
  name: string;
  expenses: number;
}

interface ExpenseChartProps {
  data: ExpenseData[];
}

export const ExpenseChart = ({ data }: ExpenseChartProps) => {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
  );
};
