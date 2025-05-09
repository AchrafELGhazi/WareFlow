import { PrismaClient } from '@prisma/client';
import { readJsonFile } from '../utils/fileReader';
import { logger } from '../utils/logger';

interface ProductSeedData {
  productName: string;
  warehouseName: string; // Reference to a warehouse
  categoryName: string; // Reference to a category
  clientUsername?: string; // Reference to a client
  initialPrice: number; // Initial price to set in price history
  quantity?: number; // Initial quantity to set in inventory
}

export const seedProducts = async (prisma: PrismaClient): Promise<void> => {
  logger.info('Seeding products...');

  const productsData = readJsonFile<ProductSeedData>('products.json');

  for (const productData of productsData) {
    try {
      const warehouse = await prisma.warehouse.findFirst({
        where: { warehouseName: productData.warehouseName },
      });

      const category = await prisma.category.findFirst({
        where: { categoryName: productData.categoryName },
      });

      let clientId: string | null = null;
      if (productData.clientUsername) {
        const client = await prisma.user.findUnique({
          where: { username: productData.clientUsername },
          include: { client: true },
        });

        if (client?.client) {
          clientId = client.client.clientId;
        } else {
          logger.warning(
            `Client with username ${productData.clientUsername} not found`
          );
        }
      }

      if (!warehouse) {
        logger.error(
          `Warehouse with name ${productData.warehouseName} not found`
        );
        continue;
      }

      if (!category) {
        logger.error(
          `Category with name ${productData.categoryName} not found`
        );
        continue;
      }

      const existingProduct = await prisma.product.findFirst({
        where: {
          productName: productData.productName,
          warehouseId: warehouse.warehouseId,
        },
      });

      let product;

      if (existingProduct) {
        product = await prisma.product.update({
          where: { productId: existingProduct.productId },
          data: {
            categoryId: category.categoryId,
            clientId,
          },
        });
        logger.info(`Updated product: ${productData.productName}`);
      } else {
        product = await prisma.product.create({
          data: {
            productName: productData.productName,
            warehouseId: warehouse.warehouseId,
            categoryId: category.categoryId,
            clientId,
          },
        });
        logger.info(`Created product: ${productData.productName}`);
      }

      await prisma.productPriceHistory.create({
        data: {
          productId: product.productId,
          price: productData.initialPrice,
          effectiveDate: new Date(),
        },
      });

      if (productData.quantity && productData.quantity > 0) {
        const staffMember = await prisma.staff.findFirst();

        if (staffMember) {
          await prisma.inventoryTransaction.create({
            data: {
              productId: product.productId,
              warehouseId: warehouse.warehouseId,
              staffId: staffMember.staffId,
              transactionType: 'receive',
              quantity: productData.quantity,
            },
          });
        } else {
          logger.warning(
            `No staff member found to create inventory transaction for ${productData.productName}`
          );
        }
      }
    } catch (error) {
      logger.error(`Failed to seed product ${productData.productName}`);
      logger.error((error as Error).message);
    }
  }

  logger.success(`Seeded ${productsData.length} products`);
};
