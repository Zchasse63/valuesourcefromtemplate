
import { useState } from "react";
import { BarChartComponent } from "@/components/charts/BarChartComponent";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import { formatCurrency } from "@/utils/chartUtils";

// Sample data - in a real app, this would come from an API
const regionalSalesData = [
  { region: "North", sales: 65400, customers: 42 },
  { region: "South", sales: 81200, customers: 53 },
  { region: "East", sales: 47800, customers: 31 },
  { region: "West", sales: 91600, customers: 58 },
  { region: "Central", sales: 72300, customers: 47 }
];

export const RegionalSalesChart = () => {
  const [dataKey, setDataKey] = useState<"sales" | "customers">("sales");

  const actions = (
    <div className="flex space-x-1">
      <Button 
        variant={dataKey === "sales" ? "default" : "outline"} 
        size="sm"
        onClick={() => setDataKey("sales")}
        className="h-8 px-3"
      >
        Sales
      </Button>
      <Button 
        variant={dataKey === "customers" ? "default" : "outline"} 
        size="sm"
        onClick={() => setDataKey("customers")}
        className="h-8 px-3"
      >
        Customers
      </Button>
    </div>
  );

  return (
    <BarChartComponent
      data={regionalSalesData}
      title="Regional Performance"
      icon={Activity}
      xAxisKey={dataKey === "sales" ? "sales" : "customers"}
      yAxisKey={dataKey}
      yAxisFormatter={(value) => dataKey === "sales" ? formatCurrency(value) : value.toString()}
      barName={dataKey === "sales" ? "Sales ($)" : "Customer Count"}
      layout="vertical"
      actions={actions}
      className="h-[350px]"
    />
  );
};
