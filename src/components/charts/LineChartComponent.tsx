
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from "recharts";
import { useChartContext } from "@/contexts/ChartContext";
import { ChartWrapper } from "./ChartWrapper";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface LineChartProps {
  data: any[];
  title: string;
  icon?: LucideIcon;
  xAxisKey: string;
  yAxisKey: string;
  yAxisFormatter?: (value: number) => string;
  lineName?: string;
  isLoading?: boolean;
  error?: Error | null;
  actions?: ReactNode;
  className?: string;
}

export const LineChartComponent = ({
  data,
  title,
  icon,
  xAxisKey,
  yAxisKey,
  yAxisFormatter,
  lineName,
  isLoading = false,
  error = null,
  actions,
  className = ''
}: LineChartProps) => {
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
        <LineChart data={data}>
          <XAxis dataKey={xAxisKey} stroke="#888888" />
          <YAxis 
            stroke="#888888" 
            tickFormatter={yAxisFormatter}
          />
          <Tooltip 
            {...getTooltipProps()}
            formatter={(value, name) => [
              yAxisFormatter ? yAxisFormatter(Number(value)) : value,
              name
            ]}
          />
          <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? "#444" : "#f0f0f0"} opacity={0.3} />
          <Legend />
          <Line
            type="monotone"
            dataKey={yAxisKey}
            name={lineName || yAxisKey}
            stroke={getColors()[0]}
            strokeWidth={3}
            dot={{ r: 4, fill: getColors()[0] }}
            activeDot={{ r: 6, fill: getColors()[0] }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
