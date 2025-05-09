import { PrismaClient } from '@prisma/client';
import { readJsonFile } from '../utils/fileReader';
import { logger } from '../utils/logger';

interface CategorySeedData {
  categoryName: string;
  categoryDescription?: string;
}

export const seedCategories = async (prisma: PrismaClient): Promise<void> => {
  logger.info('Seeding categories...');

  const categoriesData = readJsonFile<CategorySeedData>('categories.json');

  for (const categoryData of categoriesData) {
    try {
      const existingCategory = await prisma.category.findFirst({
        where: { categoryName: categoryData.categoryName },
      });

      if (existingCategory) {
        await prisma.category.update({
          where: { categoryId: existingCategory.categoryId },
          data: {
            categoryDescription: categoryData.categoryDescription,
          },
        });
        logger.info(`Updated category: ${categoryData.categoryName}`);
      } else {
        await prisma.category.create({
          data: {
            categoryName: categoryData.categoryName,
            categoryDescription: categoryData.categoryDescription,
          },
        });
        logger.info(`Created category: ${categoryData.categoryName}`);
      }
    } catch (error) {
      logger.error(`Failed to seed category ${categoryData.categoryName}`);
      logger.error((error as Error).message);
    }
  }

  logger.success(`Seeded ${categoriesData.length} categories`);
};
