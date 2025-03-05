
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartWrapperProps {
  title: string;
  icon?: LucideIcon;
  isLoading?: boolean;
  error?: Error | null;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export const ChartWrapper = ({
  title,
  icon: Icon,
  isLoading = false,
  error = null,
  children,
  actions,
  className = ''
}: ChartWrapperProps) => {
  return (
    <Card className={`glass-card ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5 text-primary" />}
            {title}
          </CardTitle>
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-[300px] w-full flex flex-col items-center justify-center space-y-4">
            <Skeleton className="h-8 w-32 rounded-md" />
            <p className="text-sm text-muted-foreground">Loading data...</p>
          </div>
        ) : error ? (
          <div className="h-[300px] w-full flex flex-col items-center justify-center space-y-4">
            <div className="text-red-500 text-center">
              <p className="text-lg font-semibold">Error loading data</p>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          </div>
        ) : (
          <div className="h-[300px] w-full">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
