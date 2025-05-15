export interface WarehouseInfoResult {
    warehouse_name: string;
    first_name: string | null;
    last_name: string | null;
}

export interface WarehouseInfo {
    warehouse_name: string;
    manager_id: string | null;
}