import { Client, Company, Supplier, Vendor } from "./client-business.types";
import { InventoryTransaction, Warehouse } from "./product-warehouse.types";

export enum UserRole {
  STAFF = 'STAFF',
  CLIENT = 'CLIENT',
  SUPPLIER = 'SUPPLIER',
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
}

export interface User {
  userId: string;
  username: string;
  passwordHash: string;
  email?: string | null;
  isActive: boolean;
  lastLogin?: Date | null;
  role: UserRole;
  staff?: Staff | null;
  client?: Client | null;
  supplier?: Supplier | null;
  vendor?: Vendor | null;
  profile?: Profile | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Profile {
  profileId: string;
  userId: string;
  user: User;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  language: string;
  timezone: string;
  address?: Address | null;
  companyId?: string | null;
  company?: Company | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  addressId: string;
  profileId: string;
  profile: Profile;
  streetAddress?: string | null;
  city: string;
  state?: string | null;
  postalCode?: string | null;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Staff {
  staffId: string;
  jobCode: string;
  job: Job;
  firstName: string;
  lastName: string;
  hireDate: Date;
  userId: string;
  user: User;
  warehouseManaged?: Warehouse | null;
  createdAt: Date;
  updatedAt: Date;
  transactions: InventoryTransaction[];
}

export interface Job {
  jobCode: string;
  jobDescription: string;
  jobChargeHour: number;
  staff: Staff[];
  createdAt: Date;
  updatedAt: Date;
}
