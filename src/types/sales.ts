
import { User } from "./auth";
import { Order } from "./order";

export interface SalesCommission {
  id: string;
  salesperson: User;
  order: Order;
  commissionPercentage: number;
  commissionAmount: number;
  isPaid: boolean;
  paidDate: Date | null;
}

export interface SalesMetrics {
  totalSales: number;
  totalCommissions: number;
  customerCount: number;
  orderCount: number;
  averageOrderValue: number;
  topSellingProducts: {
    product: string;
    quantity: number;
    revenue: number;
  }[];
  monthlySales: {
    month: string;
    sales: number;
  }[];
}
