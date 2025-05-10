
import { ClientOrder, SupplierOrder } from "./order.types";
import { Product } from "./product-warehouse.types";
import { Profile, User } from "./user-profile.types";

export interface Client {
  clientId: string;
  userId: string;
  user: User;
  creditLimit?: number | null;
  creditRating?: string | null;
  accountStatus: string;
  companyId?: string | null;
  company?: Company | null;
  products: Product[];
  clientOrders: ClientOrder[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Supplier {
  supplierId: string;
  companyId: string;
  company: Company;
  userId: string;
  user: User;
  vendors: Vendor[];
  supplierOrders: SupplierOrder[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Vendor {
  vendorId: string;
  userId: string;
  user: User;
  supplierId?: string | null;
  supplier?: Supplier | null;
  position?: string | null;
  clientOrders: ClientOrder[];
  supplierOrders: SupplierOrder[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Company {
  companyId: string;
  companyName: string;
  companyDescription: string;
  taxId?: string | null;
  industry?: string | null;
  website?: string | null;
  foundedDate?: Date | null;
  managerName?: string | null;
  suppliers: Supplier[];
  profiles: Profile[];
  clients: Client[];
}
