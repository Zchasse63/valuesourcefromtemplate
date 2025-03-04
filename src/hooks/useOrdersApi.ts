
import { useQuery } from "@tanstack/react-query";
import { getOrders, getOrderById } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

export const useOrders = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => getOrders(user?.id || "", user?.role || "customer"),
    enabled: !!user,
  });
};

export const useOrderById = (orderId: string | undefined) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId || ""),
    enabled: !!orderId,
  });
};
