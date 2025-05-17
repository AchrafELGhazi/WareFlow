export interface WarehouseInfoResult {
  warehouse_id: string;
  warehouse_name: string;
  manager_id: string | null;
  manager_info?: {
    staff_id: string;
    first_name: string;
    last_name: string;
    job_code: string;
    job_description: string;
  } | null;
  products?: {
    product_id: string;
    product_name: string;
    category_name: string;
  }[];
  inventory_transactions?: {
    transaction_id: string;
    product_name: string;
    staff_name: string;
    transaction_type: string;
    quantity: number;
    transaction_date: Date;
  }[];
}

export interface WarehouseListResult {
  warehouses: WarehouseInfoResult[];
}
