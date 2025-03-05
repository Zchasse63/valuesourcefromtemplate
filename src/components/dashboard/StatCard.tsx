
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  Icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
}

export const StatCard = ({ 
  title, 
  value, 
  change, 
  isPositive, 
  Icon, 
  iconBgColor, 
  iconColor 
}: StatCardProps) => {
  return (
    <Card className="glass-card p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h2 className="text-2xl font-bold">{value}</h2>
          <p className={`text-xs ${isPositive ? 'text-green-600' : 'text-red-600'} mt-1`}>{change}</p>
        </div>
        <div className={`p-2 ${iconBgColor} rounded-full`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
      </div>
    </Card>
  );
};
