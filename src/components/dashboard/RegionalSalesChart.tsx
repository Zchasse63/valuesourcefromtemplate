
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

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

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Regional Performance
          </CardTitle>
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
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionalSalesData} layout="vertical">
              <XAxis type="number" />
              <YAxis dataKey="region" type="category" width={80} />
              <Tooltip
                formatter={(value) => [
                  dataKey === "sales" 
                    ? `$${Number(value).toLocaleString()}` 
                    : value,
                  dataKey === "sales" ? "Sales" : "Customers"
                ]}
              />
              <Legend />
              <Bar 
                dataKey={dataKey} 
                fill={dataKey === "sales" ? "#8884d8" : "#82ca9d"} 
                name={dataKey === "sales" ? "Sales ($)" : "Customer Count"}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
