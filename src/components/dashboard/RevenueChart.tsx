
import { LineChartComponent } from "@/components/charts/LineChartComponent";
import { ChartWrapper } from "@/components/charts/ChartWrapper";
import { formatCurrency } from "@/utils/chartUtils";

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
  const actions = (
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
  );

  return (
    <LineChartComponent
      data={data}
      title="Spending Overview"
      xAxisKey="name"
      yAxisKey="value"
      yAxisFormatter={(value) => formatCurrency(value)}
      lineName="Revenue"
      actions={actions}
      className="lg:col-span-2"
    />
  );
};
