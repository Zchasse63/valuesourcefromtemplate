
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card } from "@/components/ui/card";

interface ChartData {
  name: string;
  value: number;
}

interface RevenueChartProps {
  data: ChartData[];
  activeTab: "day" | "week" | "month";
  onTabChange: (tab: "day" | "week" | "month") => void;
}

export const RevenueChart = ({ data, activeTab, onTabChange }: RevenueChartProps) => {
  return (
    <Card className="glass-card p-6 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Spending Overview</h3>
        <div className="flex rounded-md overflow-hidden">
          <button 
            className={`px-3 py-1 text-sm ${activeTab === 'day' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            onClick={() => onTabChange('day')}
          >
            Day
          </button>
          <button 
            className={`px-3 py-1 text-sm ${activeTab === 'week' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            onClick={() => onTabChange('week')}
          >
            Week
          </button>
          <button 
            className={`px-3 py-1 text-sm ${activeTab === 'month' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            onClick={() => onTabChange('month')}
          >
            Month
          </button>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
  );
};
