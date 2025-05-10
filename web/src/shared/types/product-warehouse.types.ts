
import { Client } from "./client-business.types";
import { ClientOrderItem, SupplierOrderItem } from "./order.types";
import { Staff } from "./user-profile.types";

export interface Product {
  productId: string;
  productName: string;
  warehouseId: string;
  warehouse: Warehouse;
  categoryId: string;
  category: Category;
  clientId?: string | null;
  client?: Client | null;
  priceHistory: ProductPriceHistory[];
  clientOrderItems: ClientOrderItem[];
  supplierOrderItems: SupplierOrderItem[];
  inventoryTransactions: InventoryTransaction[];
}

export interface Category {
  categoryId: string;
  categoryName: string;
  categoryDescription?: string | null;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Warehouse {
  warehouseId: string;
  warehouseName: string;
  managerId?: string | null;
  manager?: Staff | null;
  products: Product[];
  transactions: InventoryTransaction[];
}

export interface ProductPriceHistory {
  historyId: string;
  productId: string;
  product: Product;
  price: number;
  effectiveDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface InventoryTransaction {
  transactionId: string;
  productId: string;
  product: Product;
  warehouseId: string;
  warehouse: Warehouse;
  staffId: string;
  staff: Staff;
  transactionType: string; // "receive", "ship", "adjust", "transfer"
  quantity: number;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
