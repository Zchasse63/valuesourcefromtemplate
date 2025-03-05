
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

// Add missing interfaces used by components
export interface CustomerProfile extends Customer {
  // CustomerProfile is essentially the same as Customer, just with a different name in some components
}

export interface Salesperson {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
}
