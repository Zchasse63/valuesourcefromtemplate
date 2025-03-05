
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { useChartContext } from "@/contexts/ChartContext";
import { ChartWrapper } from "./ChartWrapper";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface BarChartProps {
  data: any[];
  title: string;
  icon?: LucideIcon;
  xAxisKey: string;
  yAxisKey: string;
  yAxisFormatter?: (value: number) => string;
  barName?: string;
  isLoading?: boolean;
  error?: Error | null;
  actions?: ReactNode;
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

export const BarChartComponent = ({
  data,
  title,
  icon,
  xAxisKey,
  yAxisKey,
  yAxisFormatter,
  barName,
  isLoading = false,
  error = null,
  actions,
  layout = 'horizontal',
  className = ''
}: BarChartProps) => {
  const { getColors, getTooltipProps, theme } = useChartContext();
  
  return (
    <ChartWrapper 
      title={title}
      icon={icon}
      isLoading={isLoading}
      error={error}
      actions={actions}
      className={className}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout={layout}
        >
          {layout === 'horizontal' ? (
            <>
              <XAxis dataKey={xAxisKey} stroke="#888888" />
              <YAxis 
                stroke="#888888" 
                tickFormatter={yAxisFormatter}
              />
            </>
          ) : (
            <>
              <XAxis type="number" stroke="#888888" tickFormatter={yAxisFormatter} />
              <YAxis dataKey={xAxisKey} type="category" width={80} />
            </>
          )}
          <Tooltip 
            {...getTooltipProps()}
            formatter={(value, name) => [
              yAxisFormatter ? yAxisFormatter(Number(value)) : value,
              name
            ]}
          />
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "#444" : "#f0f0f0"} opacity={0.3} />
          <Legend />
          <Bar 
            dataKey={yAxisKey} 
            name={barName || yAxisKey} 
            fill={getColors()[0]}
            radius={layout === 'horizontal' ? [4, 4, 0, 0] : [0, 4, 4, 0]}
            barSize={layout === 'horizontal' ? 30 : 15}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
