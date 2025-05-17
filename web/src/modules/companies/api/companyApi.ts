import { baseApi } from '@/services/baseApi';

export interface Company {
  company_id: string;
  company_name: string;
  company_description: string | null;
  tax_id: string | null;
  industry: string | null;
  website: string | null;
  founded_date: string | null;
  manager_name: string | null;
  suppliers: Supplier[];
  clients: Client[];
  profiles: Profile[];
}

interface Supplier {
  supplierId: string;
  user: User;
  vendors: Vendor[];
  supplierOrders: SupplierOrder[];
}

interface Client {
  clientId: string;
  creditLimit: number | null;
  creditRating: string | null;
  accountStatus: string;
  user: User;
  products: Product[];
  clientOrders: ClientOrder[];
}

interface User {
  userId: string;
  username: string;
  email: string | null;
  isActive: boolean;
  role: string;
}

interface Vendor {
  vendorId: string;
  position: string | null;
}

interface Product {
  productId: string;
  productName: string;
}

interface OrderItem {
  itemId: string;
  quantity: number;
  product: {
    productId: string;
    productName: string;
  };
}

interface SupplierOrder {
  supplierOrderId: string;
  status: string;
  orderDate: Date;
  orderItems: OrderItem[];
}

interface ClientOrder {
  clientOrderId: string;
  status: string;
  orderDate: Date;
  orderItems: OrderItem[];
}

interface Profile {
  profileId: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  address: Address | null;
  user: {
    userId: string;
    username: string;
    email: string | null;
    role: string;
  };
}

interface Address {
  addressId: string;
  streetAddress: string | null;
  city: string;
  state: string | null;
  postalCode: string | null;
  country: string;
}

// Request and response types
interface CompanyResponse {
  success: boolean;
  company: Company;
}

interface CompaniesResponse {
  success: boolean;
  companies: Company[];
}

export interface CreateCompanyRequest {
  companyName: string;
  companyDescription: string;
  taxId: string;
  industry: string;
  website: string;
  foundedDate: string;
  managerName: string;
}

export interface UpdateCompanyRequest {
  companyName?: string;
  companyDescription?: string;
  taxId?: string;
  industry?: string;
  website?: string;
  foundedDate?: string;
  managerName?: string;
}

export const companyApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getCompanies: builder.query<Company[], void>({
      query: () => 'company/',
      transformResponse: (response: CompaniesResponse) => response.companies,
      providesTags: result =>
        result
          ? [
              ...result.map(({ company_id }) => ({
                type: 'Companies' as const,
                id: company_id,
              })),
              { type: 'Companies' as const, id: 'LIST' },
            ]
          : [{ type: 'Companies' as const, id: 'LIST' }],
    }),

    getCompanyById: builder.query<Company, string>({
      query: companyId => `company/${companyId}`,
      transformResponse: (response: CompanyResponse) => response.company,
      providesTags: (_, __, companyId) => [
        { type: 'Companies' as const, id: companyId },
      ],
    }),

    createCompany: builder.mutation<Company, CreateCompanyRequest>({
      query: companyData => ({
        url: 'company',
        method: 'POST',
        body: companyData,
      }),
      transformResponse: (response: CompanyResponse) => response.company,
      invalidatesTags: [{ type: 'Companies', id: 'LIST' }],
    }),

    updateCompany: builder.mutation<
      void,
      { companyId: string; data: UpdateCompanyRequest }
    >({
      query: ({ companyId, data }) => ({
        url: `company/${companyId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_, __, { companyId }) => [
        { type: 'Companies', id: companyId },
        { type: 'Companies', id: 'LIST' },
      ],
    }),

    deleteCompany: builder.mutation<void, string>({
      query: companyId => ({
        url: `company/${companyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Companies', id: 'LIST' }],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetCompaniesQuery,
  useGetCompanyByIdQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,
} = companyApi;
