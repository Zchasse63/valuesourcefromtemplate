
import { useQuery } from "@tanstack/react-query";
import { getSalesMetrics } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

export const useSalesMetrics = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["salesMetrics", user?.id],
    queryFn: () => getSalesMetrics(user?.id || "", user?.role || "customer"),
    enabled: !!user && (user.role === "admin" || user.role === "salesperson"),
  });
};
