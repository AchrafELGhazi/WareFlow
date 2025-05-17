import { baseApi } from '@/services/baseApi';

export interface Manager {
  staff_id: string;
  first_name: string;
  last_name: string;
  job_code: string;
  job_description: string;
}

export interface Product {
  product_id: string;
  product_name: string;
  category_name: string;
}

export interface InventoryTransaction {
  transaction_id: string;
  product_name: string;
  staff_name: string;
  transaction_type: string;
  quantity: number;
  transaction_date: string;
}

export interface Warehouse {
  warehouse_id: string;
  warehouse_name: string;
  manager_id: string | null;
  manager_info: Manager | null;
  products?: Product[];
  inventory_transactions?: InventoryTransaction[];
}

export interface WarehouseListResponse {
  success: boolean;
  warehouses: Warehouse[];
}

export interface WarehouseResponse {
  success: boolean;
  warehouse: Warehouse;
}

export interface CreateWarehouseRequest {
  warehouseName: string;
  managerId: string;
}

export const warehouseApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getAllWarehouses: builder.query<WarehouseListResponse, void>({
      query: () => 'warehouse',
      providesTags: result =>
        result
          ? [
              ...result.warehouses.map(({ warehouse_id }) => ({
                type: 'Warehouses' as const,
                id: warehouse_id,
              })),
              { type: 'Warehouses', id: 'LIST' },
            ]
          : [{ type: 'Warehouses', id: 'LIST' }],
    }),

    getWarehouseById: builder.query<WarehouseResponse, string>({
      query: warehouseId => `warehouse/${warehouseId}`,
      providesTags: (result, error, warehouseId) => [
        { type: 'Warehouses', id: warehouseId },
      ],
    }),

    createWarehouse: builder.mutation<
      WarehouseResponse,
      CreateWarehouseRequest
    >({
      query: warehouseData => ({
        url: 'warehouse',
        method: 'POST',
        body: warehouseData,
      }),
      invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }],
    }),

    updateWarehouseManager: builder.mutation<
      WarehouseResponse,
      { warehouseId: string; managerId: string }
    >({
      query: ({ warehouseId, managerId }) => ({
        url: `warehouse/${warehouseId}/${managerId}`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, { warehouseId }) => [
        { type: 'Warehouses', id: warehouseId },
      ],
    }),

    deleteWarehouse: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: warehouseId => ({
        url: `warehouse/${warehouseId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Warehouses', id: 'LIST' }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllWarehousesQuery,
  useGetWarehouseByIdQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseManagerMutation,
  useDeleteWarehouseMutation,
} = warehouseApi;
