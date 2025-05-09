import { PrismaClient } from '@prisma/client';
import { readJsonFile } from '../utils/fileReader';
import { logger } from '../utils/logger';

interface WarehouseSeedData {
  warehouseName: string;
  managerUsername?: string; // Reference to a user with STAFF role
}

export const seedWarehouses = async (prisma: PrismaClient): Promise<void> => {
  logger.info('Seeding warehouses...');

  const warehousesData = readJsonFile<WarehouseSeedData>('warehouses.json');

  for (const warehouseData of warehousesData) {
    try {
      let managerId: string | null = null;

      if (warehouseData.managerUsername) {
        const user = await prisma.user.findUnique({
          where: { username: warehouseData.managerUsername },
          include: { staff: true },
        });

        if (user?.staff) {
          managerId = user.staff.staffId;
        } else {
          logger.warning(
            `Manager with username ${warehouseData.managerUsername} not found or not a staff member`
          );
        }
      }

      const existingWarehouse = await prisma.warehouse.findFirst({
        where: { warehouseName: warehouseData.warehouseName },
      });

      if (existingWarehouse) {
        await prisma.warehouse.update({
          where: { warehouseId: existingWarehouse.warehouseId },
          data: {
            managerId,
          },
        });
        logger.info(`Updated warehouse: ${warehouseData.warehouseName}`);
      } else {
        await prisma.warehouse.create({
          data: {
            warehouseName: warehouseData.warehouseName,
            managerId,
          },
        });
        logger.info(`Created warehouse: ${warehouseData.warehouseName}`);
      }
    } catch (error) {
      logger.error(`Failed to seed warehouse ${warehouseData.warehouseName}`);
      logger.error((error as Error).message);
    }
  }

  logger.success(`Seeded ${warehousesData.length} warehouses`);
};
