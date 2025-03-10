
import { Card } from "@/components/ui/card";
import { BarChart } from "lucide-react";

const SalesPerformance = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-primary flex items-center gap-2">
        <BarChart className="h-8 w-8" />
        Performance Metrics
      </h1>
      <p className="text-secondary-foreground">Track your sales performance and KPIs.</p>

      <Card className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4">Sales Performance Dashboard</h2>
        <p className="text-gray-500">This page is under development.</p>
      </Card>
    </div>
  );
};

export default SalesPerformance;
