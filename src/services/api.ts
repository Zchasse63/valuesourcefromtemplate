
import { User, UserRole } from "@/types/auth";
import { Product, ProductCategory } from "@/types/product";
import { Order, OrderStatus, ShippingAddress } from "@/types/order";
import { SalesMetrics } from "@/types/sales";

// Mock delay to simulate API requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Products Data
const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: `Product ${i + 1}`,
  description: `Description for Product ${i + 1}`,
  image: `/images/products/product-${(i % 10) + 1}.jpg`,
  category: `category-${Math.floor(i / 10) + 1}`,
  pricePerPallet: 250 + Math.floor(Math.random() * 500),
  defaultPalletQuantity: 5,
  inStock: Math.random() > 0.2,
  cost: 150 + Math.floor(Math.random() * 300),
}));

// Mock Categories
const mockCategories: ProductCategory[] = Array.from({ length: 5 }, (_, i) => ({
  id: `category-${i + 1}`,
  name: `Category ${i + 1}`,
  description: `Products in category ${i + 1}`
}));

// Get all products
export const getProducts = async (): Promise<Product[]> => {
  await delay(500);
  return mockProducts;
};

// Get products by category
export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  await delay(300);
  return mockProducts.filter(product => product.category === categoryId);
};

// Get product by ID
export const getProductById = async (productId: string): Promise<Product | null> => {
  await delay(200);
  return mockProducts.find(product => product.id === productId) || null;
};

// Get all categories
export const getCategories = async (): Promise<ProductCategory[]> => {
  await delay(300);
  return mockCategories;
};

// Mock Orders
export const getOrders = async (userId: string, role: UserRole): Promise<Order[]> => {
  await delay(600);
  // Would normally filter based on user role and ID
  return [];
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  await delay(400);
  return null;
};

// Get sales metrics for dashboard
export const getSalesMetrics = async (userId: string, role: UserRole): Promise<SalesMetrics> => {
  await delay(800);
  
  // Sample data - in a real app we'd generate different metrics based on user role
  return {
    totalSales: 485600,
    totalCommissions: 24280,
    customerCount: 42,
    orderCount: 128,
    averageOrderValue: 3793.75,
    topSellingProducts: [
      { product: "Premium Pine Pallets", quantity: 350, revenue: 87500 },
      { product: "Hardwood Pallets", quantity: 280, revenue: 84000 },
      { product: "Recycled Pallets", quantity: 420, revenue: 75600 },
      { product: "Export-Grade Pallets", quantity: 180, revenue: 63000 },
      { product: "Plastic Pallets", quantity: 150, revenue: 52500 }
    ],
    monthlySales: [
      { month: "Jan", sales: 42500 },
      { month: "Feb", sales: 38900 },
      { month: "Mar", sales: 35700 },
      { month: "Apr", sales: 41200 },
      { month: "May", sales: 39800 },
      { month: "Jun", sales: 43600 },
      { month: "Jul", sales: 45200 },
      { month: "Aug", sales: 46800 },
      { month: "Sep", sales: 48300 },
      { month: "Oct", sales: 51200 },
      { month: "Nov", sales: 49800 },
      { month: "Dec", sales: 52600 }
    ]
  };
};

// Create a new order
export const createOrder = async (
  userId: string, 
  items: { productId: string; quantity: number }[], 
  shippingAddress: ShippingAddress
): Promise<Order | null> => {
  await delay(1000);
  // In a real app, we'd create an order in the database
  return null;
};

// Update order status
export const updateOrderStatus = async (
  orderId: string, 
  status: OrderStatus
): Promise<boolean> => {
  await delay(400);
  return true;
};
