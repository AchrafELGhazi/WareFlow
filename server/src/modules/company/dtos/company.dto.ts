export interface CompanyInfoResult {
    company_name: string;
    company_description: string | null;
    tax_id: string | null;
    industry: string | null;
    website: string | null;
    founded_date: string | null;
    manager_name: string | null;
}

export interface CompanyWithRelationsResult extends CompanyInfoResult {
  suppliers: {
    supplierId: string;
    user: {
      userId: string;
      username: string;
      email: string | null;
      isActive: boolean;
      role: string;
    };
    vendors: {
      vendorId: string;
      position: string | null;
    }[];
    supplierOrders: {
      supplierOrderId: string;
      status: string;
      orderDate: Date;
    }[];
  }[];
  clients: {
    clientId: string;
    creditLimit: number | null;
    creditRating: string | null;
    accountStatus: string;
    user: {
      userId: string;
      username: string;
      email: string | null;
      isActive: boolean;
      role: string;
    };
    products: {
      productId: string;
      productName: string;
    }[];
    clientOrders: {
      clientOrderId: string;
      status: string;
      orderDate: Date;
    }[];
  }[];
  profiles: {
    profileId: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
  }[];
}