
import { RefreshCw, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartThemeToggle } from "./ChartThemeToggle";

interface DashboardHeaderProps {
  onRefresh?: () => void;
  onShowAllToasts?: () => void;
}

export const DashboardHeader = ({ onRefresh, onShowAllToasts }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your financial overview</p>
      </div>
      <div className="flex items-center space-x-2">
        <ChartThemeToggle />
        <Button variant="outline" size="icon" onClick={onRefresh} title="Refresh data">
          <RefreshCw className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={onShowAllToasts} title="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
