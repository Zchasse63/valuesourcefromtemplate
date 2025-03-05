
import { useDashboard, BusinessObjective } from "@/contexts/DashboardContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, BarChart3, Clock } from "lucide-react";
import { formatCurrency } from "@/utils/chartUtils";

export const BusinessObjectives = () => {
  const { businessObjectives } = useDashboard();

  // Get appropriate icon for each category
  const getCategoryIcon = (category: BusinessObjective['category']) => {
    switch (category) {
      case 'revenue': return <BarChart3 className="h-5 w-5 text-green-500" />;
      case 'cost': return <Clock className="h-5 w-5 text-red-500" />;
      case 'growth': return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'efficiency': return <Target className="h-5 w-5 text-purple-500" />;
    }
  };

  // Format value based on unit
  const formatValue = (value: number, unit: string) => {
    if (unit === 'USD') return formatCurrency(value);
    if (unit === 'percent') return `${value}%`;
    return `${value} ${unit}`;
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Business Objectives
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {businessObjectives.map((objective) => {
            const progressPercentage = Math.min(
              Math.round((objective.current / objective.target) * 100), 
              100
            );
            
            return (
              <div key={objective.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(objective.category)}
                    <span className="text-sm font-medium">{objective.title}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {formatValue(objective.current, objective.unit)} / {formatValue(objective.target, objective.unit)}
                  </div>
                </div>
                <div className="space-y-1">
                  <Progress value={progressPercentage} 
                    className={`h-2 ${progressPercentage >= 80 ? 'bg-green-200' : 'bg-gray-200'}`} />
                  <p className="text-xs text-right text-muted-foreground">
                    {progressPercentage}% Complete
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
