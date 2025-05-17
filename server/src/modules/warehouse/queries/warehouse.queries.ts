import { PrismaClient } from '@prisma/client';
class WarehouseQueries {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  getAllWarehousesQuery = async () => {
    return this.prisma.warehouse.findMany({
      include: {
        manager: {
          include: {
            job: true,
          },
        },
        products: {
          include: {
            category: true,
          },
        },
        transactions: {
          include: {
            product: true,
            staff: true,
          },
          orderBy: {
            transactionDate: 'desc',
          },
          take: 20, // Limit the number of transactions
        },
      },
    });
  };

  getWarehouseInfoQuery = async (warehouseId: string) => {
    return this.prisma.warehouse.findUnique({
      where: {
        warehouseId,
      },
      include: {
        manager: {
          include: {
            job: true,
          },
        },
        products: {
          include: {
            category: true,
          },
        },
        transactions: {
          include: {
            product: true,
            staff: true,
          },
          orderBy: {
            transactionDate: 'desc',
          },
          take: 50, // Limit the number of transactions
        },
      },
    });
  };

  createWarehouseQuery = (warehouseName: string, managerId: string) => {
    return this.prisma.warehouse.create({
      data: {
        warehouseName,
        managerId,
      },
      include: {
        manager: true,
      },
    });
  };

  updateWarehouseManagerQuery = (warehouseId: string, managerId: string) => {
    return this.prisma.warehouse.update({
      where: {
        warehouseId,
      },
      data: {
        managerId,
      },
      include: {
        manager: true,
      },
    });
  };

  async deleteWarehouseQuery(warehouseId: string) {
    // Using Prisma's transaction capabilities more elegantly
    return this.prisma.$transaction(async tx => {
      // First, get all product IDs in this warehouse
      const products = await tx.product.findMany({
        where: { warehouseId },
        select: { productId: true },
      });

      const productIds = products.map(p => p.productId);

      // Delete related records
      if (productIds.length > 0) {
        await tx.inventoryTransaction.deleteMany({
          where: { productId: { in: productIds } },
        });

        await tx.productPriceHistory.deleteMany({
          where: { productId: { in: productIds } },
        });

        await tx.clientOrderItem.deleteMany({
          where: { productId: { in: productIds } },
        });

        await tx.supplierOrderItem.deleteMany({
          where: { productId: { in: productIds } },
        });

        await tx.product.deleteMany({
          where: { warehouseId },
        });
      }

      // Delete the warehouse itself
      return tx.warehouse.delete({
        where: { warehouseId },
      });
    });
  }
}

export default new WarehouseQueries();
