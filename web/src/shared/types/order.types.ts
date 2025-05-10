import { Client, Supplier, Vendor } from "./client-business.types";
import { Product } from "./product-warehouse.types";

export interface ClientOrder {
  clientOrderId: string;
  clientId: string;
  client: Client;
  vendorId?: string | null;
  vendor?: Vendor | null;
  status: string;
  orderDate: Date;
  orderItems: ClientOrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientOrderItem {
  itemId: string;
  clientOrderId: string;
  clientOrder: ClientOrder;
  productId: string;
  product: Product;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SupplierOrder {
  supplierOrderId: string;
  supplierId: string;
  supplier: Supplier;
  vendorId?: string | null;
  vendor?: Vendor | null;
  status: string;
  orderDate: Date;
  orderItems: SupplierOrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SupplierOrderItem {
  itemId: string;
  supplierOrderId: string;
  supplierOrder: SupplierOrder;
  productId: string;
  product: Product;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
