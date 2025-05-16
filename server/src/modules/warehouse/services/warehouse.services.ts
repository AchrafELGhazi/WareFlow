import WarehouseQueries from "../queries/warehouse.queries";
import { WarehouseInfoResult } from "../dtos/warehouse.dto";

class WarehouseServices {
  async getWarehouseInfoService(
    warehouseId: string
  ): Promise<WarehouseInfoResult | null> {
    const results = await WarehouseQueries.getWarehouseInfoQuery(warehouseId);

    if (Array.isArray(results) && results.length > 0) {
      return results[0] as WarehouseInfoResult;
    }
    return null;
  }

  async updateWarehouseManagerService(
    warehouseId: string,
    managerId: string
  ): Promise<WarehouseInfoResult | null> {
    const results = await WarehouseQueries.updateWarehouseManagerQuery(
      warehouseId,
      managerId
    );

    if (Array.isArray(results) && results.length > 0) {
      return results[0] as WarehouseInfoResult;
    }

    return null;
  }

  async deleteWarehouseService(warehouseId: string): Promise<null> {
    await WarehouseQueries.deleteWarehouseQuery(warehouseId);

    return null;
  }

  async createWarehouseService(warehouseName: string, managerId: string) : Promise<null>{
    await WarehouseQueries.createWarehouseQuery(warehouseName, managerId);

    return null;
  }
}

export default new WarehouseServices();
