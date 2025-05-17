// warehouse.services.ts
import WarehouseQueries from '../queries/warehouse.queries';
import {
  WarehouseInfoResult,
  WarehouseListResult,
} from '../dtos/warehouse.dto';

class WarehouseServices {
  async getAllWarehousesService(): Promise<WarehouseListResult> {
    const warehouses = await WarehouseQueries.getAllWarehousesQuery();

    // Transform data if needed
    const formattedWarehouses = warehouses.map(warehouse => {
      return {
        warehouse_id: warehouse.warehouseId,
        warehouse_name: warehouse.warehouseName,
        manager_id: warehouse.managerId,
        manager_info: warehouse.manager
          ? {
              staff_id: warehouse.manager.staffId,
              first_name: warehouse.manager.firstName,
              last_name: warehouse.manager.lastName,
              job_code: warehouse.manager.jobCode,
              job_description: warehouse.manager.job?.jobDescription || '',
            }
          : null,
        products: warehouse.products.map(product => ({
          product_id: product.productId,
          product_name: product.productName,
          category_name: product.category.categoryName,
        })),
        inventory_transactions: warehouse.transactions.map(transaction => ({
          transaction_id: transaction.transactionId,
          product_name: transaction.product.productName,
          staff_name: `${transaction.staff.firstName} ${transaction.staff.lastName}`,
          transaction_type: transaction.transactionType,
          quantity: transaction.quantity,
          transaction_date: transaction.transactionDate,
        })),
      };
    });

    return { warehouses: formattedWarehouses };
  }

  async getWarehouseInfoService(
    warehouseId: string
  ): Promise<WarehouseInfoResult | null> {
    const warehouse = await WarehouseQueries.getWarehouseInfoQuery(warehouseId);

    if (!warehouse) {
      return null;
    }

    return {
      warehouse_id: warehouse.warehouseId,
      warehouse_name: warehouse.warehouseName,
      manager_id: warehouse.managerId,
      manager_info: warehouse.manager
        ? {
            staff_id: warehouse.manager.staffId,
            first_name: warehouse.manager.firstName,
            last_name: warehouse.manager.lastName,
            job_code: warehouse.manager.jobCode,
            job_description: warehouse.manager.job?.jobDescription || '',
          }
        : null,
      products: warehouse.products.map(product => ({
        product_id: product.productId,
        product_name: product.productName,
        category_name: product.category.categoryName,
      })),
      inventory_transactions: warehouse.transactions.map(transaction => ({
        transaction_id: transaction.transactionId,
        product_name: transaction.product.productName,
        staff_name: `${transaction.staff.firstName} ${transaction.staff.lastName}`,
        transaction_type: transaction.transactionType,
        quantity: transaction.quantity,
        transaction_date: transaction.transactionDate,
      })),
    };
  }

  async updateWarehouseManagerService(
    warehouseId: string,
    managerId: string
  ): Promise<WarehouseInfoResult | null> {
    const warehouse = await WarehouseQueries.updateWarehouseManagerQuery(
      warehouseId,
      managerId
    );

    if (!warehouse) {
      return null;
    }

    return {
      warehouse_id: warehouse.warehouseId,
      warehouse_name: warehouse.warehouseName,
      manager_id: warehouse.managerId,
      manager_info: warehouse.manager
        ? {
            staff_id: warehouse.manager.staffId,
            first_name: warehouse.manager.firstName,
            last_name: warehouse.manager.lastName,
            job_code: warehouse.manager.jobCode,
            job_description: '', // We don't have this in the returned data
          }
        : null,
    };
  }

  async deleteWarehouseService(warehouseId: string): Promise<boolean> {
    try {
      await WarehouseQueries.deleteWarehouseQuery(warehouseId);
      return true;
    } catch (error) {
      console.error('Error deleting warehouse:', error);
      return false;
    }
  }

  async createWarehouseService(warehouseName: string, managerId: string) {
    const warehouse = await WarehouseQueries.createWarehouseQuery(
      warehouseName,
      managerId
    );

    return {
      warehouse_id: warehouse.warehouseId,
      warehouse_name: warehouse.warehouseName,
      manager_id: warehouse.managerId,
      manager_info: warehouse.manager
        ? {
            staff_id: warehouse.manager.staffId,
            first_name: warehouse.manager.firstName,
            last_name: warehouse.manager.lastName,
          }
        : null,
    };
  }
}

export default new WarehouseServices();
