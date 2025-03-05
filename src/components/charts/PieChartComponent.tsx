
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useChartContext } from "@/contexts/ChartContext";
import { ChartWrapper } from "./ChartWrapper";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface PieChartProps {
  data: any[];
  title: string;
  icon?: LucideIcon;
  nameKey: string;
  dataKey: string;
  valueFormatter?: (value: number) => string;
  isLoading?: boolean;
  error?: Error | null;
  actions?: ReactNode;
  className?: string;
  centerLabel?: boolean;
}

export const PieChartComponent = ({
  data,
  title,
  icon,
  nameKey,
  dataKey,
  valueFormatter,
  isLoading = false,
  error = null,
  actions,
  className = '',
  centerLabel = true
}: PieChartProps) => {
  const { getColors, getTooltipProps } = useChartContext();
  
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
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={centerLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
            label={centerLabel ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : undefined}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColors()[index % getColors().length]} />
            ))}
          </Pie>
          <Tooltip 
            {...getTooltipProps()}
            formatter={(value, name) => [
              valueFormatter ? valueFormatter(Number(value)) : value,
              name
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};
