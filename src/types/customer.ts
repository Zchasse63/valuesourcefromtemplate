
import { User } from "./auth";
import { Order } from "./order";

export interface Customer {
  id: string;
  user: User;
  shippingAddresses: ShippingAddress[];
  defaultShippingAddress: ShippingAddress | null;
  assignedSalesperson: User | null;
  orders: Order[];
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
