
import { useQuery } from "@tanstack/react-query";
import { Customer, CustomerSummary } from "@/types/customer";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for customer profile
const mockCustomerData: Customer = {
  id: "cust-001",
  user: {
    id: "user-123",
    email: "customer@example.com",
    name: "John Smith",
    role: "customer",
    createdAt: new Date("2023-01-15")
  },
  company: "Smith Enterprises",
  contactPhone: "(555) 123-4567",
  shippingAddresses: [
    {
      id: "addr-001",
      street: "123 Main St",
      city: "Columbus",
      state: "Ohio",
      zipCode: "43215",
      country: "USA",
      isDefault: true
    },
    {
      id: "addr-002",
      street: "456 Warehouse Ave",
      city: "Cincinnati",
      state: "Ohio",
      zipCode: "45202",
      country: "USA",
      isDefault: false
    }
  ],
  billingAddress: {
    street: "123 Main St",
    city: "Columbus",
    state: "Ohio",
    zipCode: "43215",
    country: "USA"
  },
  assignedSalesperson: {
    id: "sales-001",
    email: "sales@example.com",
    name: "Jane Doe",
    role: "salesperson",
    createdAt: new Date("2022-10-05")
  },
  orders: [],
  createdAt: new Date("2023-01-15"),
  updatedAt: new Date("2023-06-22")
};

// Mock customer summary data
const mockCustomerSummary: CustomerSummary = {
  totalOrders: 24,
  totalSpent: 68750,
  averageOrderValue: 2864.58,
  lastOrderDate: new Date("2023-06-15")
};

export const useCustomerProfile = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["customerProfile", user?.id],
    queryFn: async () => {
      // In a real app, this would fetch from your API
      // await api.get(`/customers/${user.id}`);
      
      // For now, return mock data
      return mockCustomerData;
    },
    enabled: !!user && user.role === "customer",
  });
};

export const useCustomerSummary = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["customerSummary", user?.id],
    queryFn: async () => {
      // In a real app, this would fetch from your API
      // await api.get(`/customers/${user.id}/summary`);
      
      // For now, return mock data
      return mockCustomerSummary;
    },
    enabled: !!user && user.role === "customer",
  });
};

export const useSalespersonCustomers = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["salespersonCustomers", user?.id],
    queryFn: async () => {
      // Mock data for a salesperson's customers
      const customers = Array(5).fill(null).map((_, index) => ({
        ...mockCustomerData,
        id: `cust-00${index + 1}`,
        user: {
          ...mockCustomerData.user,
          id: `user-${index + 100}`,
          name: `Customer ${index + 1}`,
          email: `customer${index + 1}@example.com`
        },
        company: `Company ${index + 1}`
      }));
      
      return customers;
    },
    enabled: !!user && user.role === "salesperson",
  });
};
