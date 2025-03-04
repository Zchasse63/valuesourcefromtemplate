
import { User } from "./auth";
import { Product } from "./product";

export interface OrderItem {
  id: string;
  product: Product;
  quantity: number;
  pricePerUnit: number;
  discountedPricePerUnit: number | null;
  subtotal: number;
}

export interface Order {
  id: string;
  customer: User;
  salesperson: User | null;
  items: OrderItem[];
  totalPallets: number;
  subtotal: number;
  discount: number;
  total: number;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  purchaseOrderNumber: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface DiscountTier {
  minimumPallets: number;
  discountPercentage: number;
}
