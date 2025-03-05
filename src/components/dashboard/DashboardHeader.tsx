
import { Bell, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DashboardHeaderProps {
  onRefresh: () => void;
  onShowAllToasts: () => void;
}

export const DashboardHeader = ({ onRefresh, onShowAllToasts }: DashboardHeaderProps) => {
  return (
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-4xl font-bold text-primary">Good Morning!</h1>
        <p className="text-secondary-foreground">Welcome back to your financial overview</p>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          className="glass-card px-4 py-2 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 flex items-center gap-2"
          onClick={onRefresh}
        >
          <Bell className="h-5 w-5" />
          <span className="hidden md:inline">Notifications</span>
        </button>
        <button 
          className="glass-card px-4 py-2 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 flex items-center gap-2"
          onClick={onShowAllToasts}
        >
          <Calendar className="h-5 w-5" />
          <span className="hidden md:inline">Test Toasts</span>
        </button>
      </div>
    </header>
  );
};
