
import { User } from "./auth";
import { Order } from "./order";

export interface Customer {
  id: string;
  user: User;
  company: string;
  contactPhone: string;
  shippingAddresses: ShippingAddress[];
  billingAddress: BillingAddress;
  assignedSalesperson: User | null;
  orders: Order[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ShippingAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface BillingAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CustomerSummary {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  lastOrderDate: Date | null;
}
