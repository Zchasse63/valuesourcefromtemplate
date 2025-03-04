
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  pricePerPallet: number;
  defaultPalletQuantity: number;
  inStock: boolean;
  cost: number; // Only visible to salespersons and admins
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
}
