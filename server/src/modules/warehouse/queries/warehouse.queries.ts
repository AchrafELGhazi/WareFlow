import { PrismaClient } from "@prisma/client";
class WarehouseQueries {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getWarehouseInfoQuery = (warehouseId: string) => {
    return this.prisma.$queryRaw`
        SELECT w.warehouse_name, s.first_name, s.last_name
        FROM warehouses w LEFT OUTER JOIN staff s
        ON w.manager_id = s.staff_id
        WHERE warehouse_id = ${warehouseId}
      `;
  };

  updateWarehouseManagerQuery = (warehouseId: string, managerId: string) => {
    return this.prisma.$queryRaw`
      UPDATE warehouses
      SET manager_id = ${managerId}
      WHERE warehouse_id = ${warehouseId}
    `;
  };

  async deleteWarehouseQuery(warehouseId: string) {
    return this.prisma.$transaction([
      this.prisma.$queryRaw`
        DELETE FROM inventory_transactions 
        WHERE product_id IN (
          SELECT product_id FROM products WHERE warehouse_id = ${warehouseId}
        )
      `,
      this.prisma.$queryRaw`
        DELETE FROM product_price_history 
        WHERE product_id IN (
          SELECT product_id FROM products WHERE warehouse_id = ${warehouseId}
        )
      `,
      this.prisma.$queryRaw`
        DELETE FROM products WHERE warehouse_id = ${warehouseId}
      `,
      this.prisma.$queryRaw`
        DELETE FROM warehouses WHERE warehouse_id = ${warehouseId}
      `,
    ]);
  }
}

export default new WarehouseQueries();
